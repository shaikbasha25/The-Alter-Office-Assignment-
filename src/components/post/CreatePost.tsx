import React, { useState, useRef } from 'react';
import { Camera, Video, X } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { useAuthStore } from '../../store/authStore';
import type { MediaItem } from '../../types';

export default function CreatePost() {
  const { user } = useAuthStore();
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const mediaItems = await Promise.all(
        files.map(async (file) => {
          const isVideo = file.type.startsWith('video/');
          const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);

          return {
            type: isVideo ? 'video' : 'image',
            url,
          } as MediaItem;
        })
      );

      setMedia([...media, ...mediaItems]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !media.length) return;

    try {
      await addDoc(collection(db, 'posts'), {
        userId: user?.uid,
        author: {
          name: user?.displayName,
          photoURL: user?.photoURL,
        },
        content,
        media,
        createdAt: Date.now(),
        likes: 0,
      });

      setContent('');
      setMedia([]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows={3}
      />

      {media.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {media.map((item, index) => (
            <div key={index} className="relative">
              {item.type === 'image' ? (
                <img src={item.url} alt="" className="w-full h-32 object-cover rounded-lg" />
              ) : (
                <video src={item.url} className="w-full h-32 object-cover rounded-lg" />
              )}
              <button
                type="button"
                onClick={() => setMedia(media.filter((_, i) => i !== index))}
                className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            disabled={uploading}
          >
            <Camera className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            disabled={uploading}
          >
            <Video className="w-5 h-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
          disabled={uploading || (!content.trim() && !media.length)}
        >
          {uploading ? 'Uploading...' : 'Post'}
        </button>
      </div>
    </form>
  );
}