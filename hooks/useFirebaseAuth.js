import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const formatAuthUser = (user) => ({
  uid: user.id,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInEmail = (auth, email, password) => signInWithEmailAndPassword(auth, email, password);

  const createEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const handleSignOut = () => signOut(auth);

  // listens for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInEmail,
    createEmail,
    handleSignOut,
  };
}
