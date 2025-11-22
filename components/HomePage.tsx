import React from 'react';

interface HomePageProps {
    onNavigate: (featureId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-full bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900">
            {/* Hero Section */}
            <section className="relative overflow-hidden px-6 py-20 md:py-32">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                </div>

                <div className="relative max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-sm text-indigo-300 font-medium">Powered by Google Gemini AI & JioCX</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                        GEMCALL
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
                        AI-Powered Telecalling Assistant
                    </p>

                    <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                        Transform your communication workflow with intelligent voice AI, real phone calls,
                        and automated lead generation - all in one powerful platform.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => onNavigate('live_call')}
                            className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                            <span className="flex items-center gap-2">
                                Start Live Call
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </button>

                        <button
                            onClick={() => onNavigate('chatbot')}
                            className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300"
                        >
                            Try AI Chatbot
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
                        {[
                            { label: "AI Features", value: "9+" },
                            { label: "Real-time Voice", value: "100%" },
                            { label: "Phone Integration", value: "JioCX" },
                            { label: "Response Time", value: "<1s" }
                        ].map((stat, index) => (
                            <div key={index} className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm">
                                <div className="text-3xl font-bold text-indigo-400 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="px-6 py-20 bg-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-gray-400">
                            Everything you need for modern AI-powered communication
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1: Live Call */}
                        <div
                            onClick={() => onNavigate('live_call')}
                            className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 hover:border-indigo-500/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Live AI Calls</h3>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Make real-time voice calls powered by Gemini AI. Choose between web-based calls or real phone calls via JioCX API.
                            </p>
                            <div className="flex items-center text-indigo-400 font-medium group-hover:gap-2 transition-all">
                                Learn More
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        {/* Feature 2: AI Chatbot */}
                        <div
                            onClick={() => onNavigate('chatbot')}
                            className="group p-8 rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/20 hover:border-blue-500/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                                    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">AI Chatbot</h3>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Intelligent text-based conversations with Gemini AI. Perfect for customer support, FAQs, and general inquiries.
                            </p>
                            <div className="flex items-center text-blue-400 font-medium group-hover:gap-2 transition-all">
                                Learn More
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        {/* Feature 3: Lead Generation */}
                        <div
                            onClick={() => onNavigate('lead_gen')}
                            className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/20 hover:border-emerald-500/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                                    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Lead Generation</h3>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Automatically collect and qualify leads. Manage contacts, track interactions, and build your customer pipeline.
                            </p>
                            <div className="flex items-center text-emerald-400 font-medium group-hover:gap-2 transition-all">
                                Learn More
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        {/* Feature 4: Image Generation */}
                        <div
                            onClick={() => onNavigate('image_gen')}
                            className="group p-8 rounded-2xl bg-gradient-to-br from-pink-900/30 to-rose-900/30 border border-pink-500/20 hover:border-pink-500/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Image Generation</h3>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Create stunning images from text descriptions using Gemini's advanced AI models. Perfect for marketing materials.
                            </p>
                            <div className="flex items-center text-pink-400 font-medium group-hover:gap-2 transition-all">
                                Learn More
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        {/* Feature 5: Video Generation */}
                        <div
                            onClick={() => onNavigate('video_gen')}
                            className="group p-8 rounded-2xl bg-gradient-to-br from-violet-900/30 to-fuchsia-900/30 border border-violet-500/20 hover:border-violet-500/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                                    <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Video Generation</h3>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Generate video content from text prompts. Create engaging visual content for your campaigns effortlessly.
                            </p>
                            <div className="flex items-center text-violet-400 font-medium group-hover:gap-2 transition-all">
                                Learn More
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        {/* Feature 6: Knowledge Base */}
                        <div
                            onClick={() => onNavigate('knowledge_base')}
                            className="group p-8 rounded-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/20 hover:border-amber-500/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                                    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Knowledge Base</h3>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Build a smart knowledge base with RAG (Retrieval-Augmented Generation) for accurate, context-aware responses.
                            </p>
                            <div className="flex items-center text-amber-400 font-medium group-hover:gap-2 transition-all">
                                Learn More
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-400">
                            Get started in three simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="relative">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-indigo-500/50">
                                    1
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Setup API Keys</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Configure your Gemini API key and optional JioCX credentials in the environment settings.
                                </p>
                            </div>
                            <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent"></div>
                        </div>

                        <div className="relative">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-purple-500/50">
                                    2
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Choose Your Mode</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Select between web-based AI calls or real phone calls. Add contacts and configure your preferences.
                                </p>
                            </div>
                            <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-pink-500/50">
                                3
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Start Calling</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Begin your AI-powered conversations. Track results, manage leads, and scale your operations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="px-6 py-20 bg-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Powered by Cutting-Edge Technology
                        </h2>
                        <p className="text-xl text-gray-400">
                            Built with the latest AI and web technologies
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                        <path d="M16.5 7.5h-9v9h9v-9Z" />
                                        <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 0 1 9 3v.75h2.25V3a.75.75 0 0 1 1.5 0v.75H15V3a.75.75 0 0 1 1.5 0v.75h.75a3 3 0 0 1 3 3v.75H21A.75.75 0 0 1 21 9h-.75v2.25H21a.75.75 0 0 1 0 1.5h-.75V15H21a.75.75 0 0 1 0 1.5h-.75v.75a3 3 0 0 1-3 3h-.75V21a.75.75 0 0 1-1.5 0v-.75h-2.25V21a.75.75 0 0 1-1.5 0v-.75H9V21a.75.75 0 0 1-1.5 0v-.75h-.75a3 3 0 0 1-3-3v-.75H3A.75.75 0 0 1 3 15h.75v-2.25H3a.75.75 0 0 1 0-1.5h.75V9H3a.75.75 0 0 1 0-1.5h.75v-.75a3 3 0 0 1 3-3h.75V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white">Google Gemini AI</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Powered by Google's most advanced AI model for natural conversations, real-time audio processing,
                                and multimodal content generation.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white">JioCX Voice API</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Enterprise-grade telephony integration for real phone calls over PSTN networks with
                                Click-to-Call functionality and call management.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                                    R
                                </div>
                                <h3 className="text-2xl font-bold text-white">React & TypeScript</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Modern frontend built with React 19 and TypeScript 5.8 for type-safe, maintainable code and
                                exceptional user experience.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                                    V
                                </div>
                                <h3 className="text-2xl font-bold text-white">Vite Build System</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Lightning-fast development server and optimized production builds with Vite,
                                ensuring top performance and developer experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Documentation Links */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Documentation & Resources
                        </h2>
                        <p className="text-xl text-gray-400">
                            Everything you need to get started
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <a
                            href="./JIOCX_SETUP_GUIDE.md"
                            target="_blank"
                            className="group p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-indigo-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">JioCX Setup Guide</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">
                                    <path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-gray-400">Complete guide to setting up JioCX Voice API integration</p>
                        </a>

                        <a
                            href="./JIOCX_INTEGRATION_SUMMARY.md"
                            target="_blank"
                            className="group p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-indigo-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Integration Summary</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">
                                    <path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-gray-400">Overview of the JioCX integration architecture and features</p>
                        </a>

                        <a
                            href="./VERCEL_DEPLOYMENT_GUIDE.md"
                            target="_blank"
                            className="group p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-indigo-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Deployment Guide</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">
                                    <path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-gray-400">Step-by-step guide to deploy GEMCALL on Vercel</p>
                        </a>

                        <a
                            href="https://ai.google.dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-indigo-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Gemini AI Docs</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">
                                    <path fillRule="evenodd" d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-gray-400">Official Google Gemini AI documentation and API reference</p>
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20 bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Ready to Transform Your Communication?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Start making AI-powered calls in minutes. No credit card required.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => onNavigate('live_call')}
                            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                            Get Started Now
                        </button>
                        <a
                            href="./readme.md"
                            target="_blank"
                            className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300"
                        >
                            View Full Documentation
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-gray-800 bg-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h4 className="text-lg font-bold mb-4 text-white">GEMCALL</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                AI-powered telecalling assistant combining Google Gemini AI with JioCX Voice API.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
                            <div className="space-y-2">
                                <a href="./readme.md" target="_blank" className="block text-gray-400 hover:text-indigo-400 text-sm transition-colors">Documentation</a>
                                <a href="https://github.com/parmarjh/GEMCALL_-AI-telecalling-Assistant" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-indigo-400 text-sm transition-colors">GitHub Repository</a>
                                <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-indigo-400 text-sm transition-colors">Gemini AI</a>
                                <a href="https://developer.jiocx.com/" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-indigo-400 text-sm transition-colors">JioCX API</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4 text-white">Support</h4>
                            <div className="space-y-2 text-sm text-gray-400">
                                <p>JioCX: support@jiocx.com</p>
                                <p>Gemini: <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">ai.google.dev</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
                        <p>© 2025 GEMCALL. MIT License. Built with ❤️ using Google Gemini AI & JioCX.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
