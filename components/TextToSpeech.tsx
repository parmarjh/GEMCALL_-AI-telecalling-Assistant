
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { decode, decodeAudioData } from '../utils/audioUtils';

const ttsVoices = [
    { displayName: 'Zephyr (Female)', apiName: 'Zephyr' },
    { displayName: 'Kore (Male)', apiName: 'Kore' },
    { displayName: 'Puck (Male)', apiName: 'Puck' },
    { displayName: 'Charon (Male)', apiName: 'Charon' },
    { displayName: 'Fenrir (Female)', apiName: 'Fenrir' },
];

const TextToSpeech: React.FC = () => {
    const [textInput, setTextInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
    const [selectedVoice, setSelectedVoice] = useState<string>(ttsVoices[0].apiName);
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // FIX: Initialize AudioContext on component mount and close on unmount.
        // The sample rate must be 24000 for Gemini TTS audio.
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        return () => {
            audioContextRef.current?.close();
        };
    }, []);

    const playAudio = () => {
        if (!audioBuffer || !audioContextRef.current) return;
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.start();
    };

    const handleGenerateSpeech = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!textInput.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setAudioBuffer(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-preview-tts',
                contents: [{ parts: [{ text: textInput }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: selectedVoice },
                        },
                    },
                },
            });
            
            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

            if (base64Audio && audioContextRef.current) {
                // FIX: Decode the base64 raw PCM audio data and create an AudioBuffer.
                const audioBytes = decode(base64Audio);
                const buffer = await decodeAudioData(audioBytes, audioContextRef.current, 24000, 1);
                setAudioBuffer(buffer);
            } else {
                 throw new Error('No audio was generated. The response may have been blocked or empty.');
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            console.error(err);
            setError(`Failed to generate speech. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto">
             <div className="w-full p-6 bg-gray-800/50 rounded-lg shadow-lg mb-6">
                 <form onSubmit={handleGenerateSpeech} className="space-y-4">
                     <div>
                        <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-2">Enter Text</label>
                        <textarea
                            id="text-input"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder="Type what you want the AI to say..."
                            rows={5}
                            disabled={isLoading}
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 resize-y"
                        />
                     </div>
                     <div>
                        <label htmlFor="voice-select" className="block text-sm font-medium text-gray-300 mb-2">Select Voice</label>
                        <select
                            id="voice-select"
                            value={selectedVoice}
                            onChange={e => setSelectedVoice(e.target.value)}
                            disabled={isLoading}
                            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {ttsVoices.map(voice => (
                                <option key={voice.apiName} value={voice.apiName}>{voice.displayName}</option>
                            ))}
                        </select>
                     </div>
                      <button
                        type="submit"
                        disabled={isLoading || !textInput.trim()}
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors flex items-center justify-center h-14"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M7.75 2.75a.75.75 0 0 0-1.5 0v1.5H4a.75.75 0 0 0 0 1.5h2.25V7.5a.75.75 0 0 0 1.5 0V5.75H10a.75.75 0 0 0 0-1.5H7.75V2.75Zm-1.5 8.5a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM4.5 12a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75ZM12 11.25a.75.75 0 0 0-1.5 0v1.5h-2.25a.75.75 0 0 0 0 1.5H9.75V16a.75.75 0 0 0 1.5 0v-1.75H13.5a.75.75 0 0 0 0-1.5h-2.25v-1.5Z" /><path fillRule="evenodd" d="M15 4.5a.75.75 0 0 1 .75.75v1.313l.31.062a.75.75 0 0 1 0 1.47l-.31.063V9.5a.75.75 0 0 1-1.5 0V8.188l-.31-.063a.75.75 0 1 1 .62-1.47l.31-.062V5.25a.75.75 0 0 1 .75-.75ZM18.5 8a.75.75 0 0 1 .75.75v.313l.31.062a.75.75 0 1 1-.62 1.47l-.31-.063V11a.75.75 0 0 1-1.5 0v-.812l-.31.062a.75.75 0 1 1 .62-1.47l.31.063V8.75A.75.75 0 0 1 18.5 8Z" clipRule="evenodd" /></svg>
                                <span>Generate Speech</span>
                            </div>
                        )}
                    </button>
                </form>
            </div>

            {error && (
                <div className="p-4 mb-6 bg-red-500/20 text-red-300 text-sm rounded-lg text-center">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <div className="flex-grow w-full bg-gray-800/50 rounded-lg shadow-lg flex items-center justify-center p-4 min-h-[150px]">
                 {isLoading ? (
                    <div className="text-center text-gray-400">
                        <p>Generating audio...</p>
                    </div>
                ) : audioBuffer ? (
                    // FIX: Replaced non-functional <audio> element with a button to play the decoded AudioBuffer.
                    <button onClick={playAudio} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11V15.89a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" /></svg>
                        Play Generated Audio
                    </button>
                ) : (
                    <div className="text-center text-gray-500">
                        <div className="w-16 h-16 mx-auto mb-4 p-3 rounded-2xl bg-gray-700/50 text-gray-400">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" /><path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.75 6.75 0 1 1-13.5 0v-1.5A.75.75 0 0 1 6 10.5Z" /></svg>
                        </div>
                        <h2 className="text-xl font-semibold">Your generated audio will appear here.</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextToSpeech;
