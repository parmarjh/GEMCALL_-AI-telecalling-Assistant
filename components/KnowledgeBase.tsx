import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Document {
  id: string;
  title: string;
  content: string;
}

interface SearchResult {
    document: Document;
    reason: string;
}

const KnowledgeBase: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocContent, setNewDocContent] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleAddDocument = () => {
    if (!newDocTitle.trim() || !newDocContent.trim()) {
      setError('Document title and content cannot be empty.');
      return;
    }
    const newDoc: Document = {
      id: Date.now().toString(),
      title: newDocTitle.trim(),
      content: newDocContent.trim(),
    };
    setDocuments(prev => [...prev, newDoc]);
    setNewDocTitle('');
    setNewDocContent('');
    setError(null);
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading || documents.length === 0) return;

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      const context = documents.map(doc => `--- Document: ${doc.title} ---\n${doc.content}`).join('\n\n');
      const prompt = `
        You are an advanced semantic search engine that functions like a vector database.
        Analyze the following knowledge base of documents and the user's query.
        Identify the top 3 most relevant documents from the knowledge base that answer the query.
        For each relevant document, provide a brief explanation for why it is a match.
        Return ONLY a JSON object with a key "results" which is an array of objects. Each object should have two keys: "id" (the ID of the matching document) and "reason" (your explanation).

        --- KNOWLEDGE BASE START ---
        ${context}
        --- KNOWLEDGE BASE END ---

        --- USER QUERY ---
        ${query}
        --- END QUERY ---

        JSON Response:
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro', 
        contents: prompt,
      });

      // Clean and parse the JSON response
      let jsonString = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const searchResults = JSON.parse(jsonString);

      if (searchResults.results && Array.isArray(searchResults.results)) {
        const foundDocs: SearchResult[] = searchResults.results
          .map((result: any) => {
            const doc = documents.find(d => d.title === result.id || d.id === result.id); // Allow matching by title or ID for robustness
            if (doc) {
              return { document: doc, reason: result.reason };
            }
            return null;
          })
          .filter((item: SearchResult | null): item is SearchResult => item !== null);
        
        setResults(foundDocs);
        if(foundDocs.length === 0) {
            setError("AI completed the search but found no relevant documents in the knowledge base for your query.")
        }

      } else {
        throw new Error('Invalid response format from the API.');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(err);
      setError(`Failed to perform search. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-full">
      {/* Left Column: Document Management */}
      <div className="flex flex-col gap-6">
        <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Add to Knowledge Base</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={newDocTitle}
              onChange={e => setNewDocTitle(e.target.value)}
              placeholder="Document Title"
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              value={newDocContent}
              onChange={e => setNewDocContent(e.target.value)}
              placeholder="Document Content..."
              rows={4}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            />
            <button onClick={handleAddDocument} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Add Document
            </button>
          </div>
        </div>
        <div className="flex-grow bg-gray-800/50 rounded-lg p-6 overflow-y-auto shadow-lg flex flex-col">
          <h3 className="text-lg font-bold mb-4">Stored Documents ({documents.length})</h3>
          <div className="space-y-3 overflow-y-auto">
            {documents.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Your knowledge base is empty.</p>
            ) : (
              documents.map(doc => (
                <div key={doc.id} className="bg-gray-700 p-3 rounded-lg">
                  <p className="font-semibold truncate">{doc.title}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Search and Results */}
      <div className="flex flex-col gap-6">
        <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Semantic Search</h2>
          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading || documents.length === 0}
              className="flex-1 p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim() || documents.length === 0}
              className="bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors w-28"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 mx-auto border-white border-t-transparent rounded-full animate-spin"></div>
              ) : 'Search'}
            </button>
          </form>
        </div>
        
        {error && (
            <div className="p-4 bg-red-500/20 text-red-300 text-sm rounded-lg text-center">
                <strong>Error:</strong> {error}
            </div>
        )}

        <div className="flex-grow bg-gray-800/50 rounded-lg p-6 overflow-y-auto shadow-lg flex flex-col">
          <h3 className="text-lg font-bold mb-4">Search Results</h3>
           {isLoading ? (
              <div className="m-auto text-center text-gray-400">
                  <div className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Performing semantic search...</p>
              </div>
          ) : results.length === 0 ? (
            <p className="text-gray-400 text-center my-auto">
              {documents.length > 0 ? 'Search results will appear here.' : 'Add documents to the knowledge base to begin searching.'}
            </p>
          ) : (
            <div className="space-y-4">
                {results.map((result) => (
                    <div key={result.document.id} className="bg-gray-700/70 p-4 rounded-lg border border-gray-600">
                        <h4 className="font-bold text-indigo-300">{result.document.title}</h4>
                        <p className="text-sm text-gray-400 mt-1 italic">Relevance: {result.reason}</p>
                        <details className="mt-2">
                             <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300">Show content</summary>
                             <p className="mt-2 p-3 bg-gray-800 rounded text-sm whitespace-pre-wrap">{result.document.content}</p>
                        </details>
                    </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;