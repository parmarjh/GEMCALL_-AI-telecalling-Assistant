import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

interface Lead {
  companyName: string;
  reason: string;
  outreachEmail: string;
}

const LeadGeneration: React.FC = () => {
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.trim() || !audience.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setLeads([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      const prompt = `
        You are an expert lead generation assistant. 
        Given the following product/service and target audience, generate a list of 5 potential lead profiles.
        For each profile, invent a fictional but realistic company name, provide a brief description of why they are a good fit, and write a sample cold outreach email tailored to them.

        Product/Service: ${product}
        Target Audience: ${audience}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              leads: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    companyName: {
                      type: Type.STRING,
                      description: 'A fictional but realistic name for the potential lead company.'
                    },
                    reason: {
                      type: Type.STRING,
                      description: 'A brief explanation of why this company is a good potential lead.'
                    },
                    outreachEmail: {
                      type: Type.STRING,
                      description: 'A sample cold outreach email to this company.'
                    }
                  },
                  required: ['companyName', 'reason', 'outreachEmail'],
                },
              },
            },
            required: ['leads'],
          },
        },
      });

      const jsonStr = response.text.trim();
      const result = JSON.parse(jsonStr);

      if (result.leads && Array.isArray(result.leads)) {
        setLeads(result.leads);
      } else {
        throw new Error('Invalid response format from the API.');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(err);
      setError(`Failed to generate leads. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Form Section */}
      <div className="w-full p-6 bg-gray-800/50 rounded-lg shadow-lg mb-6">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label htmlFor="product-desc" className="block text-sm font-medium text-gray-300 mb-2">Product/Service Description</label>
            <textarea
              id="product-desc"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g., An AI-powered tool that automates social media content creation for small businesses."
              rows={3}
              disabled={isLoading}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 resize-y"
            />
          </div>
          <div>
            <label htmlFor="audience-desc" className="block text-sm font-medium text-gray-300 mb-2">Target Audience</label>
            <textarea
              id="audience-desc"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., Marketing agencies, freelance social media managers, and startups with small marketing teams."
              rows={3}
              disabled={isLoading}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 resize-y"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !product.trim() || !audience.trim()}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors flex items-center justify-center h-14"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : 'Generate Leads'}
          </button>
        </form>
      </div>

      {error && (
          <div className="p-4 mb-6 bg-red-500/20 text-red-300 text-sm rounded-lg text-center">
              <strong>Error:</strong> {error}
          </div>
      )}

      {/* Results Section */}
      <div className="flex-grow w-full bg-gray-800/50 rounded-lg shadow-lg flex flex-col p-6 min-h-[300px] overflow-y-auto">
          {isLoading ? (
              <div className="m-auto text-center text-gray-400">
                  <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg">Generating lead profiles...</p>
              </div>
          ) : leads.length === 0 ? (
              <div className="m-auto text-center text-gray-500">
                   <div className="w-16 h-16 mx-auto mb-4 p-3 rounded-2xl bg-gray-700/50 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M9.75 2.25A.75.75 0 0 1 10.5 3v1.5a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 9.75 2.25Zm2.25.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0V3Zm1.5.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM4.5 9.75A.75.75 0 0 1 5.25 9h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /><path d="M1.5 7.5A3 3 0 0 1 4.5 4.5h15A3 3 0 0 1 22.5 7.5v9A3 3 0 0 1 19.5 19.5h-15A3 3 0 0 1 1.5 16.5v-9ZM4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 19.5 6h-15Z" /></svg>
                   </div>
                  <h2 className="text-xl font-semibold">Your generated leads will appear here.</h2>
                  <p>Fill out the form above to get started.</p>
              </div>
          ) : (
            <div className="space-y-6">
              {leads.map((lead, index) => (
                <div key={index} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-bold text-indigo-300">{lead.companyName}</h3>
                  <p className="text-sm text-gray-400 mt-1 mb-3">{lead.reason}</p>
                  <details>
                    <summary className="cursor-pointer text-indigo-400 hover:underline">View Sample Email</summary>
                    <pre className="mt-2 p-3 bg-gray-800 rounded-md text-sm whitespace-pre-wrap font-sans">
                      {lead.outreachEmail}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default LeadGeneration;
