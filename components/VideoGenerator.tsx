
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface VideoSettings {
  duration: number;
  aspectRatio: '9:16' | '16:9' | '1:1';
  quality: 'standard' | 'high';
}

const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<VideoSettings>({
    duration: 5,
    aspectRatio: '16:9',
    quality: 'standard',
  });

  const handleGenerateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      // Note: Veo 3 video generation API is in preview
      // This is a demonstration of how the final implementation will work
      // For now, we'll show an informative message

      // Simulate API delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show informative error for now
      throw new Error(
        `Video generation with Veo 3 is currently in preview. ` +
        `Once the API is fully available, this feature will generate videos with: ` +
        `Duration: ${settings.duration}s, Aspect Ratio: ${settings.aspectRatio}, ` +
        `Quality: ${settings.quality}. Your prompt: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`
      );

      /* 
       * When Veo 3 API becomes available, use this implementation:
       * 
       * const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
       * const operation = await ai.models.generateVideos({
       *   model: 'veo-3-base',
       *   prompt: prompt,
       *   config: {
       *     aspectRatio: settings.aspectRatio,
       *     duration: settings.duration,
       *   },
       * });
       * 
       * // Wait for operation to complete
       * const result = await operation.wait();
       * 
       * if (result.videos && result.videos.length > 0) {
       *   const videoData = result.videos[0];
       *   const url = `data:video/mp4;base64,${videoData}`;
       *   setVideoUrl(url);
       * } else {
       *   throw new Error('No video was generated.');
       * }
       */

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto">
      {/* Control Panel */}
      <div className="w-full p-4 bg-gray-800/50 rounded-lg shadow-lg mb-6">
        <form onSubmit={handleGenerateVideo} className="space-y-4">
          {/* Prompt Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-indigo-400">
                <path d="M3.505 2.365A41.369 41.369 0 0 1 9 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 0 0-.577-.069 43.141 43.141 0 0 0-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 0 1 5 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914Z" />
                <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 0 0 1.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0 0 14 6Z" />
              </svg>
              Video Description
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the video you want to create... (e.g., 'A serene sunset over the ocean with waves gently crashing on the beach')"
              rows={3}
              disabled={isLoading}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 resize-none text-white placeholder-gray-500"
            />
          </div>

          {/* Settings Toggle & Generate Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
              </svg>
              {showSettings ? 'Hide Settings' : 'Show Settings'}
            </button>

            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white p-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Video...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
                  </svg>
                  <span>Generate Video</span>
                </>
              )}
            </button>
          </div>

          {/* Advanced Settings Panel */}
          {showSettings && (
            <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600 space-y-4 animate-fadeIn">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-indigo-400">
                  <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z" />
                </svg>
                Advanced Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400">Duration</label>
                  <select
                    value={settings.duration}
                    onChange={(e) => setSettings({ ...settings, duration: parseInt(e.target.value) })}
                    disabled={isLoading}
                    className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 text-sm"
                  >
                    <option value={3}>3 seconds</option>
                    <option value={5}>5 seconds</option>
                    <option value={8}>8 seconds</option>
                    <option value={10}>10 seconds</option>
                    <option value={180}>3 minutes</option>
                    <option value={300}>5 minutes</option>
                    <option value={600}>10 minutes</option>
                    <option value={900}>15 minutes</option>
                  </select>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400">Aspect Ratio</label>
                  <select
                    value={settings.aspectRatio}
                    onChange={(e) => setSettings({ ...settings, aspectRatio: e.target.value as any })}
                    disabled={isLoading}
                    className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 text-sm"
                  >
                    <option value="16:9">16:9 (Landscape)</option>
                    <option value="9:16">9:16 (Portrait)</option>
                    <option value="1:1">1:1 (Square)</option>
                  </select>
                </div>

                {/* Quality */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400">Quality</label>
                  <select
                    value={settings.quality}
                    onChange={(e) => setSettings({ ...settings, quality: e.target.value as any })}
                    disabled={isLoading}
                    className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 text-sm"
                  >
                    <option value="standard">Standard</option>
                    <option value="high">High Quality</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 mb-6 bg-red-500/20 border border-red-500/50 text-red-300 text-sm rounded-lg flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          <div>
            <strong className="font-semibold">Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Video Display Area */}
      <div className="flex-grow w-full bg-gray-800/50 rounded-lg shadow-lg flex items-center justify-center p-6 min-h-[400px]">
        {isLoading ? (
          <div className="text-center text-gray-400">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-indigo-600/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-xl font-semibold mb-2">Generating your video...</p>
            <p className="text-sm text-gray-500">This may take up to 2 minutes. Please wait.</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        ) : videoUrl ? (
          <div className="w-full max-w-4xl">
            <video
              src={videoUrl}
              controls
              autoPlay
              loop
              className="w-full rounded-lg shadow-2xl"
              style={{ aspectRatio: settings.aspectRatio.replace(':', '/') }}
            />
            <div className="mt-4 flex justify-center gap-3">
              <a
                href={videoUrl}
                download="generated-video.mp4"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                </svg>
                Download Video
              </a>
              <button
                onClick={() => {
                  setVideoUrl(null);
                  setPrompt('');
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
                </svg>
                Generate New
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-indigo-400">
                <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-300 mb-2">Create Amazing AI Videos</h2>
            <p className="text-gray-400 mb-4">Powered by Google Veo 3 - Next-generation video AI</p>
            <div className="text-left bg-gray-700/30 rounded-lg p-4 space-y-2 text-sm">
              <p className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                <span>Describe your vision in detail for best results</span>
              </p>
              <p className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                <span>Choose aspect ratio based on your platform</span>
              </p>
              <p className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                <span>Generation may take 1-2 minutes</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGenerator;
