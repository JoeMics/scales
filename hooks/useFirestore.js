import { db } from '../services/firebase';
import { collection, addDoc, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';

export default function useFirestore() {
  const [loading, setLoading] = useState(false);

  const updateUser = async (uid, email) => {
    try {
      setLoading(true);

      await setDoc(doc(db, 'users', uid), {
        email: email,
        id: uid,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      setLoading(false);
    }
  };

  const addNewSnake = async (name, user_uid) => {
    try {
      setLoading(true);

      await addDoc(collection(db, 'snakes'), {
        user_uid,
        name,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchSnakeById = async (id) => {
    try {
      setLoading(true);

      const docRef = doc(db, 'snakes', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoading(false);
        return docSnap.data();
      }
    } catch (e) {
      console.error('Error fetching document', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSnakes = async (userId) => {
    try {
      setLoading(true);

      const q = query(collection(db, 'snakes'), where('user_uid', '==', userId));
      const querySnapshot = await getDocs(q);

      setLoading(false);
      return querySnapshot.docs.map((doc) => {
        // doc.data() is never undefined for query doc snapshots
        return doc.data();
      });
    } catch (e) {
      console.error('Error fetching document', e);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUser,
    addNewSnake,
    fetchSnakeById,
    fetchAllSnakes,
    loading,
  };
}
