import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function Header() {
  const { user, signOut } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/feed" className="flex items-center space-x-2">
          <Camera className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-bold text-gray-800">VibeSnap</span>
        </Link>

        {user && (
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6 text-gray-600" />
            </Link>
            <button
              onClick={signOut}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <LogOut className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}