import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

// Interface for a grounding chunk
// FIX: Made uri and title optional to match the SDK's GroundingChunk type.
interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
  maps?: {
    uri?: string;
    title?: string;
  };
}

const GroundedSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [useGoogleSearch, setUseGoogleSearch] = useState(true);
  const [useGoogleMaps, setUseGoogleMaps] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Get user location if Google Maps is enabled
  useEffect(() => {
    if (useGoogleMaps && !location) {
      setLocationError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLocationError(`Could not get location: ${err.message}. Maps grounding will be less accurate.`);
        }
      );
    }
  }, [useGoogleMaps, location]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading || (!useGoogleSearch && !useGoogleMaps)) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);
    setSources([]);

    try {
      const tools: any[] = [];
      if (useGoogleSearch) tools.push({ googleSearch: {} });
      if (useGoogleMaps) tools.push({ googleMaps: {} });

      if (tools.length === 0) {
        throw new Error("Please select at least one grounding source (Google Search or Google Maps).");
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      const config: any = { tools };
      if (useGoogleMaps && location) {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          },
        };
      }

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
        config: config,
      });

      setResponse(result.text);
      setSources(result.candidates?.[0]?.groundingMetadata?.groundingChunks || []);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(err);
      setError(`Failed to get response. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Form Section */}
      <div className="w-full p-6 bg-gray-800/50 rounded-lg shadow-lg mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about recent events or places..."
            rows={3}
            disabled={isLoading}
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 resize-y"
          />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useGoogleSearch}
                  onChange={(e) => setUseGoogleSearch(e.target.checked)}
                  disabled={isLoading}
                  className="w-5 h-5 rounded text-indigo-500 bg-gray-700 border-gray-600 focus:ring-indigo-600"
                />
                Google Search
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useGoogleMaps}
                  onChange={(e) => setUseGoogleMaps(e.target.checked)}
                  disabled={isLoading}
                  className="w-5 h-5 rounded text-indigo-500 bg-gray-700 border-gray-600 focus:ring-indigo-600"
                />
                Google Maps
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim() || (!useGoogleSearch && !useGoogleMaps)}
              className="bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors flex items-center justify-center w-full sm:w-32 h-12"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : 'Search'}
            </button>
          </div>
        </form>
      </div>

       {error && (
            <div className="p-4 mb-6 bg-red-500/20 text-red-300 text-sm rounded-lg text-center">
                <strong>Error:</strong> {error}
            </div>
        )}
        {locationError && (
             <div className="p-4 mb-6 bg-yellow-500/20 text-yellow-300 text-sm rounded-lg text-center">
                <strong>Location Warning:</strong> {locationError}
            </div>
        )}

      {/* Results Section */}
      <div className="flex-grow w-full bg-gray-800/50 rounded-lg shadow-lg flex flex-col p-6 min-h-[300px] overflow-y-auto">
        {isLoading ? (
          <div className="m-auto text-center text-gray-400">
             <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Searching for grounded answers...</p>
          </div>
        ) : !response ? (
            <div className="m-auto text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 p-3 rounded-2xl bg-gray-700/50 text-gray-400">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.928 2.5a.75.75 0 0 1 .752.653l.323 1.518c.99.19 1.94.522 2.827.973l1.437-.493a.75.75 0 0 1 .91.569l.916 3.128a.75.75 0 0 1-.37 1.01l-1.28.84c.051.488.078.984.078 1.487s-.027 1-.078 1.487l1.28.84a.75.75 0 0 1 .37 1.01l-.916 3.128a.75.75 0 0 1-.91.569l-1.437-.493c-.887.45-1.837.784-2.827.973l-.323 1.518a.75.75 0 0 1-.752.653h-1.856a.75.75 0 0 1-.752-.653l-.323-1.518a9.351 9.351 0 0 1-2.827-.973l-1.437.493a.75.75 0 0 1-.91-.569L2.25 15.54a.75.75 0 0 1 .37-1.01l1.28-.84a8.498 8.498 0 0 1-.078-1.487c0-.503.027-.999.078-1.487l-1.28-.84a.75.75 0 0 1-.37-1.01l.916-3.128a.75.75 0 0 1 .91-.569l1.437.493c.887-.451 1.837-.784 2.827-.973l.323-1.518A.75.75 0 0 1 10.072 2.5h1.856Zm-1.04 6.33a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Z" /></svg>
                </div>
                <h2 className="text-xl font-semibold">Grounded Search Results</h2>
                <p>Your search results will appear here.</p>
            </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-300">Response</h3>
            <p className="whitespace-pre-wrap prose prose-invert max-w-none">{response}</p>
            
            {sources.length > 0 && (
              <>
                <hr className="my-6 border-gray-700" />
                <h3 className="text-xl font-bold mb-4 text-indigo-300">Sources</h3>
                <ul className="space-y-2 list-disc list-inside">
                  {sources.map((chunk, index) => {
                    const source = chunk.web || chunk.maps;
                    // FIX: Added a check for source.uri to ensure a valid link is rendered.
                    if (!source || !source.uri) return null;
                    return (
                       <li key={index}>
                         <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline hover:text-blue-300">
                           {source.title || source.uri}
                         </a>
                       </li>
                    )
                  })}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroundedSearch;