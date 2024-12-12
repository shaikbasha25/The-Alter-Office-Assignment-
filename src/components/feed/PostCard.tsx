import React from 'react';
import { Share } from 'lucide-react';
import { useVideoPlayback } from '../../hooks/useVideoPlayback';
import type { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { videoRef, containerRef } = useVideoPlayback();

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Post by ${post.author.name}`,
        text: post.content,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={post.author.photoURL}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-semibold">{post.author.name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="text-gray-800 mb-4">{post.content}</p>

        <div className="grid gap-2">
          {post.media.map((item, index) => (
            <div key={index} ref={item.type === 'video' ? containerRef : undefined}>
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={item.url}
                  className="w-full h-auto rounded-lg"
                  controls
                  loop
                  muted
                  playsInline
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 px-4 py-3">
        <button
          onClick={handleShare}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <Share className="w-5 h-5 mr-2" />
          Share
        </button>
      </div>
    </div>
  );
}