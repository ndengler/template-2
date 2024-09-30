import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signOut = () => auth.signOut();

  return { user, signInWithGoogle, signOut };
}