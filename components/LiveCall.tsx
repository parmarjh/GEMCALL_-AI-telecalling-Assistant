
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import type { Contact } from '../types';
import { useLiveCall } from '../hooks/useLiveCall';
import { getJioCXService } from '../services/jiocxService';
import type { JioCXCallResponse } from '../types/jiocx';

const countryCodes = [
    { name: 'USA/Canada', code: '+1' },
    { name: 'Egypt', code: '+20' },
    { name: 'South Africa', code: '+27' },
    { name: 'Greece', code: '+30' },
    { name: 'Netherlands', code: '+31' },
    { name: 'Belgium', code: '+32' },
    { name: 'France', code: '+33' },
    { name: 'Spain', code: '+34' },
    { name: 'Hungary', code: '+36' },
    { name: 'Italy', code: '+39' },
    { name: 'Romania', code: '+40' },
    { name: 'Switzerland', code: '+41' },
    { name: 'Austria', code: '+43' },
    { name: 'UK', code: '+44' },
    { name: 'Denmark', code: '+45' },
    { name: 'Sweden', code: '+46' },
    { name: 'Norway', code: '+47' },
    { name: 'Poland', code: '+48' },
    { name: 'Germany', code: '+49' },
    { name: 'Mexico', code: '+52' },
    { name: 'Argentina', code: '+54' },
    { name: 'Brazil', code: '+55' },
    { name: 'Chile', code: '+56' },
    { name: 'Colombia', code: '+57' },
    { name: 'Venezuela', code: '+58' },
    { name: 'Malaysia', code: '+60' },
    { name: 'Australia', code: '+61' },
    { name: 'Indonesia', code: '+62' },
    { name: 'Philippines', code: '+63' },
    { name: 'New Zealand', code: '+64' },
    { name: 'Singapore', code: '+65' },
    { name: 'Thailand', code: '+66' },
    { name: 'Russia/Kazakhstan', code: '+7' },
    { name: 'Japan', code: '+81' },
    { name: 'South Korea', code: '+82' },
    { name: 'Vietnam', code: '+84' },
    { name: 'China', code: '+86' },
    { name: 'Turkey', code: '+90' },
    { name: 'India', code: '+91' },
    { name: 'Pakistan', code: '+92' },
    { name: 'Afghanistan', code: '+93' },
    { name: 'Sri Lanka', code: '+94' },
    { name: 'Iran', code: '+98' },
    { name: 'UAE', code: '+971' },
    { name: 'Nigeria', code: '+234' },
    { name: 'Kenya', code: '+254' },
    { name: 'Ireland', code: '+353' },
];


const availableVoices = [
    { displayName: 'Kore (Male)', apiName: 'Kore' },
    { displayName: 'Puck (Male)', apiName: 'Puck' },
    { displayName: 'Charon (Male)', apiName: 'Charon' },
    { displayName: 'Zephyr (Female)', apiName: 'Zephyr' },
    { displayName: 'Fenrir (Female)', apiName: 'Fenrir' },
];

const LiveCall: React.FC = () => {
    const {
        isCalling,
        activeContact,
        isMuted,
        isVideoEnabled,
        transcriptionHistory,
        error: callError,
        callDuration,
        startCall,
        stopCall,
        handleToggleMute,
        handleToggleVideo,
        handleRateAnswer,
        videoRef,
        canvasRef,
        setError: setCallError
    } = useLiveCall(process.env.API_KEY as string);

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [activeTab, setActiveTab] = useState<'manual' | 'csv'>('manual');
    const [manualName, setManualName] = useState('');
    const [manualPhone, setManualPhone] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);
    const [selectedVoice, setSelectedVoice] = useState<string>(availableVoices[0].apiName);
    const [transferMessage, setTransferMessage] = useState<string | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);

    // JioCX Real Phone Call State
    const [callMode, setCallMode] = useState<'web' | 'phone'>('web'); // web = browser AI, phone = real call
    const [jiocxCallId, setJiocxCallId] = useState<string | null>(null);
    const [jiocxCallStatus, setJiocxCallStatus] = useState<string>('');
    const [yourPhoneNumber, setYourPhoneNumber] = useState<string>(''); // User's phone to receive call

    // State for call queueing
    const [callQueue, setCallQueue] = useState<Contact[]>([]);
    const [selectedContactIds, setSelectedContactIds] = useState<Set<string>>(new Set());
    const [currentQueueIndex, setCurrentQueueIndex] = useState<number | null>(null);

    // Refs and state for drag-and-drop
    const dragContact = useRef<number | null>(null);
    const dragOverContact = useRef<number | null>(null);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const wasCallingRef = useRef(false);

    // Effect to handle sequential calling from the queue
    useEffect(() => {
        if (!isCalling && wasCallingRef.current && currentQueueIndex !== null) {
            const nextIndex = currentQueueIndex + 1;
            if (nextIndex < callQueue.length) {
                console.log(`Advancing to next call in queue: ${callQueue[nextIndex].name}`);
                setTimeout(() => {
                    setCurrentQueueIndex(nextIndex);
                    startCall(callQueue[nextIndex], selectedVoice);
                }, 2000); // 2-second pause between calls
            } else {
                console.log("Call queue finished.");
                setCallQueue([]);
                setCurrentQueueIndex(null);
            }
        }
        wasCallingRef.current = isCalling;
    }, [isCalling, currentQueueIndex, callQueue, startCall, selectedVoice]);

    const handleAddContact = () => {
        if (!manualName.trim() || !manualPhone.trim()) {
            setLocalError("Name and phone number cannot be empty.");
            return;
        }
        const newContact: Contact = {
            id: Date.now().toString(),
            name: manualName.trim(),
            phone: `${selectedCountryCode} ${manualPhone.trim()}`
        };
        setContacts(prev => [...prev, newContact]);
        setManualName('');
        setManualPhone('');
        setLocalError(null);
    };

    const handleDeleteContact = (contactId: string) => {
        setContacts(prev => prev.filter(c => c.id !== contactId));
        setSelectedContactIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(contactId);
            return newSet;
        });
    };

    const handleClearContacts = () => {
        if (window.confirm('Are you sure you want to clear all contacts?')) {
            setContacts([]);
            setSelectedContactIds(new Set());
        }
    };

    const handleCsvImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const lines = text.split('\n').filter(line => line.trim() !== '');
            const newContacts: Contact[] = [];
            lines.forEach(line => {
                const [name, phone] = line.split(',');
                if (name && phone) {
                    newContacts.push({
                        id: `${name}-${Date.now()}-${Math.random()}`,
                        name: name.trim(),
                        phone: phone.trim()
                    });
                }
            });
            setContacts(prev => [...prev, ...newContacts]);
            setLocalError(null);
        };
        reader.onerror = () => {
            setLocalError("Failed to read the CSV file.");
        };
        reader.readAsText(file);
    };

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleContactSelection = (contactId: string) => {
        setSelectedContactIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(contactId)) {
                newSet.delete(contactId);
            } else {
                newSet.add(contactId);
            }
            return newSet;
        });
    };

    const handleAddToQueue = () => {
        const contactsToAdd = contacts.filter(c => selectedContactIds.has(c.id));
        setCallQueue(prev => [...prev, ...contactsToAdd]);
        setSelectedContactIds(new Set());
    };

    // JioCX Real Phone Call Handlers
    const handleJioCXCall = async (contact: Contact) => {
        if (!yourPhoneNumber.trim()) {
            setLocalError('Please enter your phone number to receive the call');
            return;
        }

        try {
            const jiocxService = getJioCXService();
            setJiocxCallStatus('Initiating call...');

            // Click2Call: JioCX will call yourPhoneNumber first, then connect to contact
            const response: JioCXCallResponse = await jiocxService.initiateClick2Call({
                from: yourPhoneNumber, // Your phone number
                to: contact.phone, // Contact's phone number
                callerId: process.env.JIOCX_SENDER_ID,
                timeout: 30,
            });

            if (response.success && response.callId) {
                setJiocxCallId(response.callId);
                setJiocxCallStatus('Calling... Please answer your phone');
                setLocalError(null);

                // Poll for call status
                startStatusPolling(response.callId);
            } else {
                setLocalError(response.error || 'Failed to initiate call');
                setJiocxCallStatus('');
            }
        } catch (error) {
            setLocalError('Error initiating call: ' + (error instanceof Error ? error.message : 'Unknown error'));
            setJiocxCallStatus('');
        }
    };

    const startStatusPolling = (callId: string) => {
        const pollInterval = setInterval(async () => {
            try {
                const jiocxService = getJioCXService();
                const statusResponse = await jiocxService.getCallStatus(callId);

                if (statusResponse.success && statusResponse.status) {
                    setJiocxCallStatus(`Call Status: ${statusResponse.status}`);

                    if (statusResponse.status === 'completed' || statusResponse.status === 'failed') {
                        clearInterval(pollInterval);
                        setJiocxCallId(null);
                        setJiocxCallStatus('');
                    }
                }
            } catch (error) {
                clearInterval(pollInterval);
                console.error('Error polling call status:', error);
            }
        }, 3000); // Poll every 3 seconds
    };

    const handleEndJioCXCall = async () => {
        if (!jiocxCallId) return;

        try {
            const jiocxService = getJioCXService();
            await jiocxService.endCall(jiocxCallId);
            setJiocxCallId(null);
            setJiocxCallStatus('');
        } catch (error) {
            console.error('Error ending call:', error);
        }
    };

    const handleStartQueue = () => {
        if (callQueue.length === 0) {
            setLocalError("Queue is empty. Add contacts to the queue first.");
            return;
        }

        if (callMode === 'phone') {
            // Use JioCX for real phone calls
            handleJioCXCall(callQueue[0]);
        } else {
            // Use web-based AI call
            setCurrentQueueIndex(0);
            startCall(callQueue[0], selectedVoice);
        }
    };

    const handleDragAndDrop = () => {
        if (dragContact.current === null || dragOverContact.current === null) return;
        const queueCopy = [...callQueue];
        const draggedItemContent = queueCopy.splice(dragContact.current, 1)[0];
        queueCopy.splice(dragOverContact.current, 0, draggedItemContent);
        dragContact.current = dragOverContact.current;
        dragOverContact.current = null;
        setCallQueue(queueCopy);
    };

    const handleTransferCall = () => {
        if (window.confirm('Are you sure you want to transfer this call to a human agent?')) {
            stopCall(true); // Stop call and clear the queue
            setTransferMessage('Connecting you to a human agent. Please hold...');

            // Simulate transfer delay and then reset the UI
            setTimeout(() => {
                setTransferMessage(null);
            }, 4000);
        }
    };

    const error = callError || localError;

    const renderPreCallScreen = () => (
        <div className="grid lg:grid-cols-2 gap-6 h-full">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
                <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">Contact Management</h2>
                    <div className="flex border-b border-gray-700 mb-4">
                        <button onClick={() => setActiveTab('manual')} className={`px-4 py-2 font-semibold ${activeTab === 'manual' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400'}`}>Manual Entry</button>
                        <button onClick={() => setActiveTab('csv')} className={`px-4 py-2 font-semibold ${activeTab === 'csv' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400'}`}>Import CSV</button>
                    </div>
                    {activeTab === 'manual' && (
                        <div className="space-y-4">
                            <input type="text" value={manualName} onChange={e => setManualName(e.target.value)} placeholder="Contact Name" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <div className="flex gap-2">
                                <select value={selectedCountryCode} onChange={e => setSelectedCountryCode(e.target.value)} className="p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    {countryCodes.map(c => <option key={c.name} value={c.code}>{c.name} ({c.code})</option>)}
                                </select>
                                <input type="tel" value={manualPhone} onChange={e => setManualPhone(e.target.value)} placeholder="Phone Number" className="flex-grow p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <button onClick={handleAddContact} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors">Add Contact</button>
                        </div>
                    )}
                    {activeTab === 'csv' && (
                        <div>
                            <p className="text-sm text-gray-400 mb-2">Upload a CSV file with two columns: name, phone.</p>
                            <input type="file" accept=".csv" onChange={handleCsvImport} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                        </div>
                    )}
                </div>

                <div className="flex-grow bg-gray-800/50 rounded-lg p-6 overflow-y-auto shadow-lg flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Contact List</h3>
                        <div className="flex gap-2">
                            <button onClick={handleClearContacts} disabled={contacts.length === 0} className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                Clear List
                            </button>
                            <button onClick={handleAddToQueue} disabled={selectedContactIds.size === 0} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                                Add to Queue ({selectedContactIds.size})
                            </button>
                        </div>
                    </div>
                    <div className="space-y-3 overflow-y-auto">
                        {contacts.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">No contacts added yet.</p>
                        ) : (
                            contacts.map(contact => (
                                <div key={contact.id} className="flex items-center bg-gray-700 p-3 rounded-lg group">
                                    <input type="checkbox" checked={selectedContactIds.has(contact.id)} onChange={() => handleContactSelection(contact.id)} className="w-5 h-5 rounded text-indigo-500 bg-gray-600 border-gray-500 focus:ring-indigo-600 mr-4" />
                                    <div className="flex-grow">
                                        <p className="font-semibold">{contact.name}</p>
                                        <p className="text-sm text-gray-400">{contact.phone}</p>
                                    </div>
                                    <button onClick={() => handleDeleteContact(contact.id)} className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2" title="Delete Contact">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
                <div className="flex-grow bg-gray-800/50 rounded-lg p-6 overflow-y-auto shadow-lg flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Call Queue</h3>
                        <button onClick={() => setCallQueue([])} disabled={callQueue.length === 0} className="text-sm text-gray-400 hover:text-white disabled:opacity-50">Clear Queue</button>
                    </div>
                    <div className="space-y-3 flex-grow overflow-y-auto">
                        {callQueue.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">Select contacts and add them to the queue to start calling.</p>
                        ) : (
                            callQueue.map((contact, index) => (
                                <div
                                    key={contact.id}
                                    className={`flex items-center p-3 rounded-lg cursor-grab transition-opacity ${draggingIndex === index ? 'opacity-50 bg-indigo-700' : 'bg-gray-700'
                                        }`}
                                    draggable
                                    onDragStart={() => {
                                        dragContact.current = index;
                                        setDraggingIndex(index);
                                    }}
                                    onDragEnter={() => {
                                        dragOverContact.current = index;
                                        handleDragAndDrop();
                                    }}
                                    onDragEnd={() => {
                                        dragContact.current = null;
                                        setDraggingIndex(null);
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <div className="text-gray-500 mr-3">⠿</div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{contact.name}</p>
                                        <p className="text-sm text-gray-400">{contact.phone}</p>
                                    </div>
                                    <button onClick={() => setCallQueue(q => q.filter(c => c.id !== contact.id))} className="text-gray-400 hover:text-red-400 p-1">
                                        &times;
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">Call Settings</h2>
                    <div className="space-y-4">
                        {/* Call Mode Selector */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                                </svg>
                                Call Mode
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCallMode('web')}
                                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${callMode === 'web'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                >
                                    🌐 Web Call
                                </button>
                                <button
                                    onClick={() => setCallMode('phone')}
                                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${callMode === 'phone'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                >
                                    📞 Real Phone
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                {callMode === 'web' ? 'Browser-based AI voice chat' : 'Real phone call via JioCX'}
                            </p>
                        </div>

                        {/* Phone Number Input (only for phone mode) */}
                        {callMode === 'phone' && (
                            <div>
                                <label htmlFor="your-phone" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path d="M8 16.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z" />
                                        <path fillRule="evenodd" d="M4 4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4Zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75V2.5h1A1.5 1.5 0 0 1 14.5 4v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 16V4A1.5 1.5 0 0 1 7 2.5h1Z" clipRule="evenodd" />
                                    </svg>
                                    Your Phone Number
                                </label>
                                <input
                                    id="your-phone"
                                    type="tel"
                                    value={yourPhoneNumber}
                                    onChange={e => setYourPhoneNumber(e.target.value)}
                                    placeholder="+91 9876543210"
                                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    You'll receive the call first, then be connected to the contact
                                </p>
                            </div>
                        )}

                        {/* Voice Selector (only for web mode) */}
                        {callMode === 'web' && (
                            <div>
                                <label htmlFor="voice-select" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4ZM5.25 8.5A.75.75 0 0 0 4.5 9.25v.5a5.5 5.5 0 0 0 11 0v-.5a.75.75 0 0 0-1.5 0v.5a4 4 0 0 1-8 0v-.5a.75.75 0 0 0-.75-.75Z" /></svg>
                                    AI Assistant Voice
                                </label>
                                <select
                                    id="voice-select"
                                    value={selectedVoice}
                                    onChange={e => setSelectedVoice(e.target.value)}
                                    className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {availableVoices.map(voice => (
                                        <option key={voice.apiName} value={voice.apiName}>{voice.displayName}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <button onClick={handleStartQueue} disabled={callQueue.length === 0} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.279-.087.431l4.108 7.552a.75.75 0 0 0 .918.44l1.259-.63a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82v1.372a3 3 0 0 1-3 3h-1.372c-5.086 0-9.618-3.382-11.59-8.197C2.28 12.872 1.5 7.426 1.5 4.5Z" /></svg>
                            Start Queue ({callQueue.length})
                        </button>
                    </div>
                </div>
            </div>
            {jiocxCallStatus && (
                <div className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-green-500/50 text-green-100 p-3 rounded-lg shadow-lg z-20 flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {jiocxCallStatus}
                </div>
            )}
            {error && <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-500/50 text-red-200 p-3 rounded-lg shadow-lg z-20">{error}</div>}
        </div>
    );

    const renderActiveCallScreen = () => (
        <div className="flex flex-col h-full max-w-4xl mx-auto relative">
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`absolute top-6 right-6 w-48 rounded-lg shadow-lg transition-opacity duration-300 z-10 ${isVideoEnabled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex-shrink-0 p-4 bg-gray-800/50 rounded-lg mb-4 text-center">
                {currentQueueIndex !== null && (
                    <p className="text-sm font-semibold text-indigo-300 mb-1">
                        Calling {currentQueueIndex + 1} of {callQueue.length}
                    </p>
                )}
                <h3 className="font-semibold text-lg">On call with {activeContact?.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{activeContact?.phone}</p>
                <div className="flex items-center justify-center gap-2 text-lg text-indigo-300 font-mono tracking-wider">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span>{formatDuration(callDuration)}</span>
                </div>
            </div>
            <div className="flex-grow bg-gray-800/50 rounded-lg p-6 overflow-y-auto mb-6 shadow-lg">
                <div className="space-y-4">
                    {isCalling && transcriptionHistory.length === 0 && (
                        <div className="text-center text-gray-400 py-16 animate-pulse">
                            <p className="text-lg">Connecting and listening...</p>
                        </div>
                    )}
                    {transcriptionHistory.map((turn) => (
                        <div key={turn.id} className={`flex flex-col ${turn.speaker === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`flex items-start gap-3 w-full ${turn.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {turn.speaker === 'model' && (
                                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center font-bold text-sm">AI</div>
                                )}
                                <div className={`p-4 rounded-lg max-w-lg ${turn.speaker === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                    <p className="text-white">{turn.text}</p>
                                    <p className="text-xs text-gray-400 mt-1 text-right">{turn.timestamp}</p>
                                </div>
                                {turn.speaker === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center font-bold text-sm">YOU</div>
                                )}
                            </div>
                            {turn.speaker === 'model' && (
                                <div className="mt-2 flex items-center gap-2 ml-11">
                                    <button
                                        onClick={() => handleRateAnswer(turn.id, 'good')}
                                        title="Good Answer"
                                        className={`p-1.5 rounded-full transition-colors ${turn.rating === 'good' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-green-600'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM18.5 9.5V8.25a2.25 2.25 0 0 0-2.25-2.25h-5.024l.65-2.898a.75.75 0 0 0-.21-1.28L9.5 1.257_a.75.75 0 0 0-1.01.233L4.25 8.25v7.5a2.25 2.25 0 0 0 2.25 2.25h9.333a2.25 2.25 0 0 0 2.22-2.024l.287-2.437a2.25 2.25 0 0 0-2.09-2.529H15.5Z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => handleRateAnswer(turn.id, 'bad')}
                                        title="Bad Answer"
                                        className={`p-1.5 rounded-full transition-colors ${turn.rating === 'bad' ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-red-600'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M19 11.75a1.25 1.25 0 1 1-2.5 0v-7.5a1.25 1.25 0 1 1 2.5 0v7.5ZM1.5 10.5v1.25a2.25 2.25 0 0 0 2.25 2.25h5.024l-.65 2.898a.75.75 0 0 0 .21 1.28l2.164.54a.75.75 0 0 0 1.01-.233l4.234-6.757v-7.5a2.25 2.25 0 0 0-2.25-2.25H4.667a2.25 2.25 0 0 0-2.22 2.024l-.287 2.437A2.25 2.25 0 0 0 4.25 10.5h2.25Z" /></svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center mb-4">{error}</div>}
            <div className="flex-shrink-0 flex flex-col justify-center items-center">
                <div className="w-full flex flex-col items-center">
                    <div className="flex items-center justify-center space-x-4 p-2 bg-gray-800/60 rounded-full shadow-lg">
                        <button onClick={handleToggleMute} title={isMuted ? 'Unmute' : 'Mute'} className={`p-3 rounded-full transition-colors duration-200 ${isMuted ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                            {isMuted ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.66 1.905H6.44l4.5 4.5c.945.945 2.56.276 2.56-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.94 12l-2.22 2.22a.75.75 0 1 0 1.06 1.06L20 13.06l2.22 2.22a.75.75 0 1 0 1.06-1.06L21.06 12l2.22-2.22a.75.75 0 1 0-1.06-1.06L20 10.94l-2.22-2.22Z" /></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" /><path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.75 6.75 0 1 1-13.5 0v-1.5A.75.75 0 0 1 6 10.5Z" /></svg>
                            }
                        </button>
                        <button onClick={handleToggleVideo} title={isVideoEnabled ? 'Stop Video' : 'Start Video'} className={`p-3 rounded-full transition-colors duration-200 ${isVideoEnabled ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                            {isVideoEnabled ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-15Z" /></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M15.75 2.25c.39 0 .75.31.75.75v4.5a.75.75 0 0 1-1.5 0V4.41L7.22 11.47a.75.75 0 0 1-1.06-1.06l7.06-7.06h-2.25a.75.75 0 0 1 0-1.5h4.5Z" /><path d="M4.5 6.75A2.25 2.25 0 0 0 2.25 9v10.5A2.25 2.25 0 0 0 4.5 21.75h10.5A2.25 2.25 0 0 0 17.25 19.5V9A2.25 2.25 0 0 0 15 6.75H4.5Z" /></svg>
                            }
                        </button>
                        <button onClick={handleTransferCall} title="Transfer Call" className="p-3 rounded-full transition-colors duration-200 bg-indigo-600 text-white hover:bg-indigo-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v6.54l1.9-1.9a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L8.2 8.6a.75.75 0 1 1 1.06-1.06l1.9 1.9V3a.75.75 0 0 1 .75-.75Zm-3.75 9a.75.75 0 0 1 0 1.5h7.5a.75.75 0 0 1 0-1.5h-7.5Z" clipRule="evenodd" /><path d="M3 13.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 3.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" /></svg>
                        </button>
                        {currentQueueIndex !== null ? (
                            <button onClick={() => stopCall(true)} className="px-4 py-3 rounded-full text-md font-semibold transition-colors duration-300 flex items-center gap-2 shadow-lg bg-yellow-600 hover:bg-yellow-700">
                                Stop Queue
                            </button>
                        ) : null}
                        <button onClick={() => stopCall(false)} className="px-6 py-3 rounded-full text-md font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg bg-red-600 hover:bg-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-15Z" /></svg>
                            {currentQueueIndex !== null ? 'End & Next' : 'End Call'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (transferMessage) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-2xl font-semibold text-indigo-300">{transferMessage}</h2>
            </div>
        );
    }

    return isCalling ? renderActiveCallScreen() : renderPreCallScreen();
};

export default LiveCall;