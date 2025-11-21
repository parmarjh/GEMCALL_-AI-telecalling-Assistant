import React, { useState } from 'react';

interface AuthProps {
  onLogin: (user: { name: string; email: string }) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuthAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && !name.trim()) {
        setError('Name is required for sign up.');
        return;
    }
    if (!email.trim() || !password.trim()) {
        setError('Email and password cannot be empty.');
        return;
    }
    // Mock authentication
    setError('');
    onLogin({ name: isSignUp ? name : 'Demo User', email });
  };
  
  const handleSocialLogin = (provider: string) => {
    // Mock social login
    setError('');
    onLogin({ name: `${provider} User`, email: `user@${provider.toLowerCase()}.com` });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
                {isSignUp ? 'Create an Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-400 mt-2">
                {isSignUp ? 'Join the platform to access all features.' : 'Sign in to continue.'}
            </p>
        </div>

        <div className="flex border-b border-gray-700 mb-6">
            <button 
                onClick={() => setIsSignUp(false)}
                className={`w-1/2 py-3 font-semibold text-center transition-colors ${!isSignUp ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
                Sign In
            </button>
            <button 
                onClick={() => setIsSignUp(true)}
                className={`w-1/2 py-3 font-semibold text-center transition-colors ${isSignUp ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
                Sign Up
            </button>
        </div>

        <form onSubmit={handleAuthAction} className="space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
          
           {error && <p className="text-red-400 text-sm text-center">{error}</p>}
           
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>
        
        <div className="space-y-4">
             <button onClick={() => handleSocialLogin('Google')} className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 36.218 44 30.561 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                Continue with Google
            </button>
            <button onClick={() => handleSocialLogin('Facebook')} className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"></path></svg>
                Continue with Facebook
            </button>
            <button onClick={() => handleSocialLogin('LinkedIn')} className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24"><path d="M22 22h-4v-7c0-1.66-0.03-3.79-2.31-3.79C13.38 11.21 13 13.1 13 15v7h-4V10h3.85v1.78h.05c.54-1.02 1.86-2.08 3.8-2.08c4.07 0 4.82 2.68 4.82 6.16V22zM3.5 8h4V2h-4V8zM5.5 0C4.12 0 3 1.12 3 2.5S4.12 5 5.5 5 8 3.88 8 2.5 6.88 0 5.5 0zM2 22h4V10H2V22z"></path></svg>
                Continue with LinkedIn
            </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
