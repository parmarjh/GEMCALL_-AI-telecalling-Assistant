
import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob as GenAIBlob } from '@google/genai';
import { decode, encode, decodeAudioData } from '../utils/audioUtils';
import type { TranscriptionTurn, Contact } from '../types';

interface LiveSession {
    close(): void;
    sendRealtimeInput(input: { media: GenAIBlob }): void;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const useLiveCall = (apiKey: string) => {
    const [isCalling, setIsCalling] = useState(false);
    const [activeContact, setActiveContact] = useState<Contact | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionTurn[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [callDuration, setCallDuration] = useState(0);

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const timerIntervalRef = useRef<number | null>(null);
    const frameIntervalRef = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const currentInputTranscriptionRef = useRef('');
    const currentOutputTranscriptionRef = useRef('');

    const stopVideo = useCallback(() => {
        if (frameIntervalRef.current) {
            clearInterval(frameIntervalRef.current);
            frameIntervalRef.current = null;
        }
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsVideoEnabled(false);
    }, []);

    const stopCall = useCallback((stopQueueCompletely: boolean = false) => {
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => session.close());
            sessionPromiseRef.current = null;
        }

        if (mediaStreamSourceRef.current && scriptProcessorRef.current) {
            mediaStreamSourceRef.current.disconnect();
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current.onaudioprocess = null;
        }

        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(console.error);
            audioContextRef.current = null;
        }

        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
        stopVideo();
        setIsCalling(false);
        setActiveContact(null);
        setIsMuted(false);
    }, [stopVideo]);

    const startCall = useCallback(async (contact: Contact, selectedVoice: string) => {
        setError(null);
        setIsCalling(true);
        setActiveContact(contact);
        setTranscriptionHistory([]);
        setCallDuration(0);

        timerIntervalRef.current = window.setInterval(() => {
            setCallDuration(prevDuration => prevDuration + 1);
        }, 1000);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;

            const inputAudioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            audioContextRef.current = inputAudioContext;

            let nextStartTime = 0;
            const outputAudioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            const outputNode = outputAudioContext.createGain();
            outputNode.connect(outputAudioContext.destination);
            const sources = new Set<AudioBufferSourceNode>();

            const ai = new GoogleGenAI({ apiKey });

            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        const source = inputAudioContext.createMediaStreamSource(stream);
                        mediaStreamSourceRef.current = source;
                        const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                        scriptProcessorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const l = inputData.length;
                            const int16 = new Int16Array(l);
                            for (let i = 0; i < l; i++) {
                                int16[i] = inputData[i] * 32768;
                            }
                            const pcmBlob: GenAIBlob = {
                                data: encode(new Uint8Array(int16.buffer)),
                                mimeType: 'audio/pcm;rate=16000',
                            };

                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContext.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.outputTranscription) {
                            currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
                        }
                        if (message.serverContent?.inputTranscription) {
                            currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
                        }

                        if (message.serverContent?.turnComplete) {
                            const fullInput = currentInputTranscriptionRef.current.trim();
                            const fullOutput = currentOutputTranscriptionRef.current.trim();

                            const newTurns: TranscriptionTurn[] = [];
                            if (fullInput) {
                                newTurns.push({ id: `user-${Date.now()}`, speaker: 'user', text: fullInput, timestamp: new Date().toLocaleTimeString() });
                            }
                            if (fullOutput) {
                                newTurns.push({ id: `model-${Date.now()}`, speaker: 'model', text: fullOutput, timestamp: new Date().toLocaleTimeString() });
                            }

                            if (newTurns.length > 0) {
                                setTranscriptionHistory(prev => [...prev, ...newTurns]);
                            }

                            currentInputTranscriptionRef.current = '';
                            currentOutputTranscriptionRef.current = '';
                        }

                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64Audio) {
                            nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
                            const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
                            const source = outputAudioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputNode);
                            source.addEventListener('ended', () => { sources.delete(source); });
                            source.start(nextStartTime);
                            nextStartTime += audioBuffer.duration;
                            sources.add(source);
                        }

                        if (message.serverContent?.interrupted) {
                            for (const source of sources.values()) {
                                source.stop();
                                sources.delete(source);
                            }
                            nextStartTime = 0;
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Live API Error:', e);
                        setError(`An error occurred: ${e.message}`);
                        stopCall(true);
                    },
                    onclose: () => {
                        stopCall();
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } } },
                    systemInstruction: `You are a friendly and helpful business assistant for a tele-calling platform. You are currently on a call with ${contact.name} whose contact number is ${contact.phone}.`,
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                },
            });

        } catch (err) {
            console.error(err);
            setError('Failed to start the call. Please check microphone permissions.');
            stopCall(true);
        }
    }, [stopCall, apiKey]);

    const handleToggleMute = useCallback(() => {
        if (!mediaStreamRef.current) return;
        const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            setIsMuted(!audioTrack.enabled);
        }
    }, []);

    const startVideo = useCallback(async () => {
        if (!isCalling) return;
        try {
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = videoStream;
            }
            setIsVideoEnabled(true);

            frameIntervalRef.current = window.setInterval(() => {
                if (!videoRef.current || !canvasRef.current || !sessionPromiseRef.current) return;

                const videoEl = videoRef.current;
                const canvasEl = canvasRef.current;
                const ctx = canvasEl.getContext('2d');
                if (!ctx || videoEl.videoWidth === 0) return;

                canvasEl.width = videoEl.videoWidth;
                canvasEl.height = videoEl.videoHeight;
                ctx.drawImage(videoEl, 0, 0, videoEl.videoWidth, videoEl.videoHeight);

                canvasEl.toBlob(async (blob) => {
                    if (blob) {
                        const base64Data = await blobToBase64(blob);
                        const imageBlob: GenAIBlob = {
                            data: base64Data,
                            mimeType: 'image/jpeg',
                        };
                        sessionPromiseRef.current?.then((session) => {
                            session.sendRealtimeInput({ media: imageBlob });
                        });
                    }
                }, 'image/jpeg', 0.8);
            }, 1000);

        } catch (err) {
            console.error("Failed to get video stream:", err);
            setError("Could not access camera. Please check permissions.");
            setIsVideoEnabled(false);
        }
    }, [isCalling]);

    const handleToggleVideo = useCallback(() => {
        if (isVideoEnabled) {
            stopVideo();
        } else {
            startVideo();
        }
    }, [isVideoEnabled, stopVideo, startVideo]);

    const handleRateAnswer = useCallback((turnId: string, rating: 'good' | 'bad') => {
        setTranscriptionHistory(prevHistory =>
            prevHistory.map(turn =>
                turn.id === turnId ? { ...turn, rating: turn.rating === rating ? undefined : rating } : turn
            )
        );
    }, []);

    useEffect(() => {
        return () => {
            if (isCalling) {
                stopCall(true);
            }
        };
    }, [isCalling, stopCall]);

    return {
        isCalling,
        activeContact,
        isMuted,
        isVideoEnabled,
        transcriptionHistory,
        error,
        callDuration,
        startCall,
        stopCall,
        handleToggleMute,
        handleToggleVideo,
        handleRateAnswer,
        videoRef,
        canvasRef,
        setError
    };
};
