import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Post } from '../types';

const POSTS_PER_PAGE = 20;

export function useInfiniteScroll() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);
  
  const { ref, inView } = useInView();

  const loadPosts = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const postsQuery = lastDoc
        ? query(
            collection(db, 'posts'),
            orderBy('createdAt', 'desc'),
            startAfter(lastDoc),
            limit(POSTS_PER_PAGE)
          )
        : query(
            collection(db, 'posts'),
            orderBy('createdAt', 'desc'),
            limit(POSTS_PER_PAGE)
          );

      const snapshot = await getDocs(postsQuery);
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];

      setPosts(prev => [...prev, ...newPosts]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadPosts();
    }
  }, [inView]);

  return { posts, loading, hasMore, loadMoreRef: ref };
}