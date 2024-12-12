export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  bio?: string;
}

export interface Post {
  id: string;
  userId: string;
  author: {
    name: string;
    photoURL: string;
  };
  content: string;
  media: MediaItem[];
  createdAt: number;
  likes: number;
}

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}