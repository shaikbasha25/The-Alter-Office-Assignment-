import React from 'react';
import { Camera, Video } from 'lucide-react';

interface MediaUploadButtonsProps {
  onUploadClick: () => void;
  disabled?: boolean;
}

export default function MediaUploadButtons({ onUploadClick, disabled }: MediaUploadButtonsProps) {
  return (
    <div className="flex space-x-2">
      <button
        type="button"
        onClick={onUploadClick}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
        disabled={disabled}
      >
        <Camera className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={onUploadClick}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
        disabled={disabled}
      >
        <Video className="w-5 h-5" />
      </button>
    </div>
  );
}