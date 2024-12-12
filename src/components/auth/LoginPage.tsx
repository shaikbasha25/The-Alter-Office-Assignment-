import React from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import LoginButton from './LoginButton';
import LoginError from './LoginError';

export default function LoginPage() {
  const { error, loading, handleGoogleSignIn, clearError } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Camera className="w-12 h-12 text-purple-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">VibeSnap</h1>
          <p className="text-gray-600">Share your moments with the world</p>
        </div>

        {error && <LoginError message={error} onDismiss={clearError} />}

        <LoginButton onClick={handleGoogleSignIn} disabled={loading} />
      </div>
    </div>
  );
}