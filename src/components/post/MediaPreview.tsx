import React from 'react';
import { X } from 'lucide-react';
import { MediaItem } from '../../types';

interface MediaPreviewProps {
  media: MediaItem[];
  onRemove: (index: number) => void;
}

export default function MediaPreview({ media, onRemove }: MediaPreviewProps) {
  if (!media.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {media.map((item, index) => (
        <div key={index} className="relative">
          {item.type === 'image' ? (
            <img 
              src={item.url} 
              alt="" 
              className="w-full h-32 object-cover rounded-lg" 
            />
          ) : (
            <video 
              src={item.url} 
              className="w-full h-32 object-cover rounded-lg" 
            />
          )}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}