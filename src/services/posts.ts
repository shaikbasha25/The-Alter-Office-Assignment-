import { collection, addDoc, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Post } from '../types';
import { COLLECTIONS, POSTS_PER_PAGE } from '../utils/constants';

export async function createPost(post: Omit<Post, 'id'>) {
  return addDoc(collection(db, COLLECTIONS.POSTS), post);
}

export async function fetchPosts(lastDoc?: any) {
  const postsQuery = lastDoc
    ? query(
        collection(db, COLLECTIONS.POSTS),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(POSTS_PER_PAGE)
      )
    : query(
        collection(db, COLLECTIONS.POSTS),
        orderBy('createdAt', 'desc'),
        limit(POSTS_PER_PAGE)
      );

  const snapshot = await getDocs(postsQuery);
  
  return {
    posts: snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[],
    lastDoc: snapshot.docs[snapshot.docs.length - 1],
    hasMore: snapshot.docs.length === POSTS_PER_PAGE,
  };
}