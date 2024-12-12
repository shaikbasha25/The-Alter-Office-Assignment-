import { create } from 'zustand';
import { auth, googleProvider } from '../lib/firebase';
import { 
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  signInWithGoogle: async () => {
    set({ loading: true });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user });
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    set({ loading: true });
    try {
      await firebaseSignOut(auth);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  }
}));

// Initialize auth state listener
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ 
    user, 
    loading: false,
    initialized: true
  });
});