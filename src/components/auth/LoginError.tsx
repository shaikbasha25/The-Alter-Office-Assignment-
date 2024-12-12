import React from 'react';
import { X } from 'lucide-react';

interface LoginErrorProps {
  message: string;
  onDismiss: () => void;
}

export default function LoginError({ message, onDismiss }: LoginErrorProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 relative">
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600"
      >
        <X className="w-4 h-4" />
      </button>
      <p className="text-red-700 text-sm">{message}</p>
    </div>
  );
}