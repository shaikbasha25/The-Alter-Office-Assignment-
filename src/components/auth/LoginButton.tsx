import React from 'react';

interface LoginButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function LoginButton({ onClick, disabled }: LoginButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-white border border-gray-300 rounded-lg px-6 py-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <img 
        src="https://www.google.com/favicon.ico" 
        alt="Google" 
        className="w-5 h-5" 
      />
      <span className="text-gray-700 font-medium">
        {disabled ? 'Signing in...' : 'Continue with Google'}
      </span>
    </button>
  );
}