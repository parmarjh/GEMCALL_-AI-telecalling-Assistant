
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage } from '../types';

const CHAT_HISTORY_KEY = 'gemini-chat-history';

const Chatbot: React.FC = () => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
      if (savedHistory) {
        const parsedHistory: ChatMessage[] = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory);
        }
      }
    } catch (err) {
      console.error("Failed to load chat history from localStorage", err);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      if (history.length > 0) {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
      } else {
        // If history is empty (e.g., after clearing), remove it from storage
        localStorage.removeItem(CHAT_HISTORY_KEY);
      }
    } catch (err) {
      console.error("Failed to save chat history to localStorage", err);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);


  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
        setHistory([]);
        chatRef.current = null; // Reset the chat session
        setError(null);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: userInput }] };
    setHistory(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      if (!chatRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
        });
      }

      const stream = await chatRef.current.sendMessageStream({ message: userInput });
      
      let modelResponse = '';
      setHistory(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        // Update the last message in the history (which is the model's response)
        setHistory(prev => {
            const newHistory = [...prev];
            if (newHistory.length > 0 && newHistory[newHistory.length - 1].role === 'model') {
                 newHistory[newHistory.length - 1].parts[0].text = modelResponse;
            }
            return newHistory;
        });
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(err);
      setError(`Failed to get response. ${errorMessage}`);
      // Remove the empty model message placeholder on error
       setHistory(prev => prev.filter(msg => msg.parts[0].text !== '' || msg.role !== 'model'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {history.length === 0 && (
             <div className="text-center text-gray-400 py-16">
                <div className="w-16 h-16 mx-auto mb-4 p-3 rounded-2xl bg-indigo-600/20 text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 1 4.5 21.75a6.75 6.75 0 0 1-6.75-6.75 6.75 6.75 0 0 1 6.75-6.75H9.75a.75.75 0 0 1 0 1.5H4.5a5.25 5.25 0 0 0 0 10.5v.005c.165-.01.33-.023.496-.042a6.706 6.706 0 0 1 4.308-4.308c.02-.016.038-.033.056-.05.003-.002.005-.005.007-.007a.75.75 0 1 1 1.054 1.062c-.002.002-.005.005-.007.007l-.002.002-.002.002a6.742 6.742 0 0 1-4.787 4.787ZM22.25 13.5a6.75 6.75 0 0 1-6.75 6.75h-5.25a.75.75 0 0 1 0-1.5h5.25a5.25 5.25 0 1 0 0-10.5H12a.75.75 0 0 1 0-1.5h3.5a6.75 6.75 0 0 1 6.75 6.75Z" clipRule="evenodd" /></svg>
                </div>
                <h2 className="text-2xl font-semibold">Gemini Chatbot</h2>
                <p>Start a conversation by typing below.</p>
            </div>
        )}
        {history.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
               <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center font-bold text-sm">AI</div>
            )}
             <div className={`p-4 rounded-lg max-w-lg prose prose-invert whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
                {msg.parts[0].text}
            </div>
             {msg.role === 'user' && (
               <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center font-bold text-sm">YOU</div>
            )}
          </div>
        ))}
        {isLoading && history[history.length -1]?.role === 'user' && (
           <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center font-bold text-sm">AI</div>
                <div className="p-4 rounded-lg bg-gray-800 text-gray-300">
                    <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

       {error && (
            <div className="p-4 bg-red-500/20 text-red-300 text-sm">
                <strong>Error:</strong> {error}
            </div>
        )}

      <div className="p-4 bg-gray-800/50 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask Gemini anything..."
            disabled={isLoading}
            className="flex-1 p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />
           <button
            type="button"
            onClick={handleClearChat}
            disabled={isLoading || history.length === 0}
            className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors"
            title="Clear Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75V4.5h8V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4.5A1.25 1.25 0 0 0 8.75 3.25h2.5A1.25 1.25 0 0 0 10 4.5ZM5.5 5.25a.75.75 0 0 0-1.5 0v10.5a3.25 3.25 0 0 0 3.25 3.25h6.5a3.25 3.25 0 0 0 3.25-3.25V5.25a.75.75 0 0 0-1.5 0v10.5a1.75 1.75 0 0 1-1.75 1.75h-6.5a1.75 1.75 0 0 1-1.75-1.75V5.25ZM8.25 7a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Zm3.5 0a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            className="bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors flex items-center justify-center w-24"
          >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
