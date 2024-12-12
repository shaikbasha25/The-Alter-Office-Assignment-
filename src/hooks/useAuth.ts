import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AuthError } from '../types';

export function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      const authError = err as AuthError;
      switch (authError.code) {
        case 'auth/popup-blocked':
          setError('Please allow popups for this site to sign in with Google');
          break;
        case 'auth/cancelled-popup-request':
          // User closed the popup, no need to show error
          break;
        case 'auth/popup-closed-by-user':
          setError('Sign-in was cancelled. Please try again.');
          break;
        default:
          setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [signInWithGoogle, navigate]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    loading,
    handleGoogleSignIn,
    clearError
  };
}