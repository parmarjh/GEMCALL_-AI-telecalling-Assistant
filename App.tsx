

import React, { useState, useRef, useEffect } from 'react';
import { FEATURES, Feature } from './constants';
import HomePage from './components/HomePage';
import LiveCall from './components/LiveCall';
import Chatbot from './components/Chatbot';
import ImageGenerator from './components/ImageGenerator';
import VideoGenerator from './components/VideoGenerator';
import TextToSpeech from './components/TextToSpeech';
import GroundedSearch from './components/GroundedSearch';
import FastResponse from './components/FastResponse';
import LeadGeneration from './components/LeadGeneration';
import Auth from './components/Auth';
import KnowledgeBase from './components/KnowledgeBase';

interface User {
  name: string;
  email: string;
}

const AUTH_STORAGE_KEY = 'gemcall_auth_user';

const App: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>(FEATURES);
  const [activeFeature, setActiveFeature] = useState<Feature>(features[0]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Load user from localStorage on app initialization
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error('Failed to load user from localStorage', err);
      // Clear corrupted data
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    // Persist user to localStorage
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
    } catch (err) {
      console.error('Failed to save user to localStorage', err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    // Remove user from localStorage
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.error('Failed to remove user from localStorage', err);
    }
    // Set back to the default feature on logout
    setActiveFeature(features[0]);
  };

  const handleFeatureDragSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const featuresCopy = [...features];
    const draggedItemContent = featuresCopy.splice(dragItem.current, 1)[0];
    featuresCopy.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setFeatures(featuresCopy);
  };

  // Show loading spinner while checking authentication
  if (isLoadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderActiveFeature = () => {
    switch (activeFeature.id) {
      case 'home':
        return <HomePage onNavigate={(featureId) => {
          const feature = features.find(f => f.id === featureId);
          if (feature) setActiveFeature(feature);
        }} />;
      case 'live_call':
        return <LiveCall />;
      case 'chatbot':
        return <Chatbot />;
      case 'image_gen':
        return <ImageGenerator />;
      case 'video_gen':
        return <VideoGenerator />;
      case 'tts':
        return <TextToSpeech />;
      case 'grounded_search':
        return <GroundedSearch />;
      case 'fast_response':
        return <FastResponse />;
      case 'lead_gen':
        return <LeadGeneration />;
      case 'knowledge_base':
        return <KnowledgeBase />;
      default:
        return <HomePage onNavigate={(featureId) => {
          const feature = features.find(f => f.id === featureId);
          if (feature) setActiveFeature(feature);
        }} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <nav className="w-20 bg-gray-950 p-4 flex flex-col items-center space-y-6 border-r border-gray-800">
        <div className="text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9.32l9-5.25V7.93ZM2.25 7.93v9.32l9 5.25v-9.32l-9-5.25Z" />
          </svg>
        </div>
        <div className="flex flex-col items-center space-y-4 flex-grow">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature)}
              className={`p-3 rounded-lg transition-all duration-200 cursor-grab ${activeFeature.id === feature.id
                ? 'bg-indigo-600 text-white scale-110'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }
              ${dragItem.current === index ? 'opacity-50' : ''}
              `}
              title={feature.title}
              draggable
              onDragStart={() => dragItem.current = index}
              onDragEnter={() => dragOverItem.current = index}
              onDragEnd={handleFeatureDragSort}
              onDragOver={(e) => e.preventDefault()}
            >
              {feature.icon}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full border-t border-gray-700 my-2"></div>
          <p className="text-xs text-gray-400 w-full text-center truncate">{user.name}</p>
          <button
            onClick={handleLogout}
            className="p-3 rounded-lg transition-colors duration-200 text-gray-400 hover:bg-red-800/50 hover:text-white"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>
          </button>
        </div>
      </nav>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <h1 className="text-2xl font-bold tracking-wider flex items-center gap-3">
            {activeFeature.icon}
            {activeFeature.title}
          </h1>
          <p className="text-gray-400 text-sm mt-1">{activeFeature.description}</p>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderActiveFeature()}
        </div>
      </main>
    </div>
  );
};

export default App;