import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  // FIX: Replaced `JSX.Element` with `React.ReactElement` to resolve JSX namespace issue.
  icon: React.ReactElement;
}

const iconClasses = "w-6 h-6";

export const FEATURES: Feature[] = [
  {
    id: 'live_call',
    title: 'Live Tele-Calling Assistant',
    description: 'Engage in a real-time voice conversation with Gemini. Includes live transcription.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}><path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h.75a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-.75Z" /></svg>,
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot',
    description: 'Have a text-based conversation with Gemini.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}><path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 1 4.5 21.75a6.75 6.75 0 0 1-6.75-6.75 6.75 6.75 0 0 1 6.75-6.75H9.75a.75.75 0 0 1 0 1.5H4.5a5.25 5.25 0 0 0 0 10.5v.005c.165-.01.33-.023.496-.042a6.706 6.706 0 0 1 4.308-4.308c.02-.016.038-.033.056-.05.003-.002.005-.005.007-.007a.75.75 0 1 1 1.054 1.062c-.002.002-.005.005-.007.007l-.002.002-.002.002a6.742 6.742 0 0 1-4.787 4.787ZM22.25 13.5a6.75 6.75 0 0 1-6.75 6.75h-5.25a.75.75 0 0 1 0-1.5h5.25a5.25 5.25 0 1 0 0-10.5H12a.75.75 0 0 1 0-1.5h3.5a6.75 6.75 0 0 1 6.75 6.75Z" clipRule="evenodd" /></svg>,
  },
  {
    id: 'image_gen',
    title: 'Image Generation',
    description: 'Create high-quality images from a text prompt using Imagen.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06l2.755-2.755a.75.75 0 0 1 1.06 0l3.72 3.72a.75.75 0 0 0 1.06 0l3.53-3.53a.75.75 0 0 1 1.06 0l2.122 2.122v-6.31L15.28 9.22a.75.75 0 0 0-1.06 0l-3.53 3.53a.75.75 0 0 1-1.06 0L6.22 9.28a.75.75 0 0 0-1.06 0L3 11.44v4.62Z" clipRule="evenodd" /></svg>,
  },
  {
    id: 'video_gen',
    title: 'Video Generation',
    description: 'Generate short videos from a text prompt using Veo.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}><path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-15Zm-1.5 3a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5-1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-9Z" /></svg>,
  },
  {
    id: 'tts',
    title: 'Text to Speech',
    description: 'Convert text into natural-sounding speech.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}><path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" /><path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.75 6.75 0 1 1-13.5 0v-1.5A.75.75 0 0 1 6 10.5Z" /></svg>,
  },
  {
    id: 'grounded_search',
    title: 'Grounded Search',
    description: 'Get up-to-date answers grounded in Google Search and Maps data.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}><path d="M11.928 2.5a.75.75 0 0 1 .752.653l.323 1.518c.99.19 1.94.522 2.827.973l1.437-.493a.75.75 0 0 1 .91.569l.916 3.128a.75.75 0 0 1-.37 1.01l-1.28.84c.051.488.078.984.078 1.487s-.027 1-.078 1.487l1.28.84a.75.75 0 0 1 .37 1.01l-.916 3.128a.75.75 0 0 1-.91.569l-1.437-.493c-.887.45-1.837.784-2.827.973l-.323 1.518a.75.75 0 0 1-.752.653h-1.856a.75.75 0 0 1-.752-.653l-.323-1.518a9.351 9.351 0 0 1-2.827-.973l-1.437.493a.75.75 0 0 1-.91-.569L2.25 15.54a.75.75 0 0 1 .37-1.01l1.28-.84a8.498 8.498 0 0 1-.078-1.487c0-.503.027-.999.078-1.487l-1.28-.84a.75.75 0 0 1-.37-1.01l.916-3.128a.75.75 0 0 1 .91-.569l1.437.493c.887-.451 1.837-.784 2.827-.973l.323-1.518A.75.75 0 0 1 10.072 2.5h1.856Zm-1.04 6.33a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Z" /></svg>,
  },
   {
    id: 'knowledge_base',
    title: 'Knowledge Base Search',
    description: 'Use semantic search to find information in your private documents.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}><path d="M12 1.5a.75.75 0 0 1 .75.75V3a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM18.75 6a.75.75 0 0 0 0-1.5h-2.063a.75.75 0 0 0 0 1.5h2.063ZM19.904 8.596a.75.75 0 0 0-1.06-1.06l-1.459 1.459a.75.75 0 0 0 1.06 1.06l1.459-1.459ZM21.75 12a.75.75 0 0 0-1.5 0v2.063a.75.75 0 0 0 1.5 0V12Zm-1.846 4.404a.75.75 0 0 0-1.06-1.06l-1.459 1.459a.75.75 0 0 0 1.06 1.06l1.459-1.459ZM12 18a.75.75 0 0 0 0 1.5h2.063a.75.75 0 0 0 0-1.5H12Zm-5.303-1.404a.75.75 0 0 0 1.06-1.06l-1.459-1.459a.75.75 0 0 0-1.06 1.06l1.459 1.459ZM7.5 12a.75.75 0 0 0-1.5 0v2.063a.75.75 0 0 0 1.5 0V12Zm-1.404-5.303a.75.75 0 0 0-1.06 1.06l1.459 1.459a.75.75 0 0 0 1.06-1.06L6.096 7.596ZM12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM10.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" /><path d="M3 9.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 3 9.75Zm.75 3a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z" /></svg>,
  },
  {
    id: 'fast_response',
    title: 'Fast Response',
    description: 'Get low-latency answers for simple queries.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}><path fillRule="evenodd" d="M10.5 3.75a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.06l-4.72 4.72a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06l4.72-4.72h-1.56a.75.75 0 0 1 0-1.5h4.5Zm3.75 3.75a.75.75 0 0 1 .75.75v10.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a.75.75 0 0 0 .75.75h9a.75.75 0 0 0 .75-.75V8.25a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" /></svg>,
  },
  {
    id: 'lead_gen',
    title: 'AI Lead Generation',
    description: 'Generate targeted lead profiles and outreach emails for your business.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}><path fillRule="evenodd" d="M9.75 2.25A.75.75 0 0 1 10.5 3v1.5a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 9.75 2.25Zm2.25.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0V3Zm1.5.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM4.5 9.75A.75.75 0 0 1 5.25 9h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /><path d="M1.5 7.5A3 3 0 0 1 4.5 4.5h15A3 3 0 0 1 22.5 7.5v9A3 3 0 0 1 19.5 19.5h-15A3 3 0 0 1 1.5 16.5v-9ZM4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 19.5 6h-15Z" /></svg>,
  },
   {
    id: 'account',
    title: 'Account',
    description: 'Manage your account and settings.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses}><path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" /></svg>,
  },
];