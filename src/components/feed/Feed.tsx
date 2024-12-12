import React from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import PostCard from './PostCard';

export default function Feed() {
  const { posts, loading, hasMore, loadMoreRef } = useInfiniteScroll();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
        </div>
      )}
      
      {hasMore && <div ref={loadMoreRef} className="h-10" />}
      
      {!hasMore && posts.length > 0 && (
        <p className="text-center text-gray-500 py-4">
          No more posts to load
        </p>
      )}
    </div>
  );
}