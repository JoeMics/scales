import { db } from '../services/firebase';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { useState } from 'react';
import useFirebaseAuth from './useFirebaseAuth';

// TODO: Move firestore logic to api folder
export default function useFirestore() {
  const [loading, setLoading] = useState(false);
  const { authUser } = useFirebaseAuth();

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

      const snakeDoc = await addDoc(collection(db, 'snakes'), {
        user_uid,
        name,
      });

      const docSnap = await getDoc(snakeDoc);
      return { id: docSnap.id, ...docSnap.data() };
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
        return { id: docSnap.id, ...docSnap.data() };
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
        return { id: doc.id, ...doc.data() };
      });
    } catch (e) {
      console.error('Error fetching document', e);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (snakeId, { type, date, weight, notes }) => {
    /* If date is hyphenated, the Date object will return a date 1 day behind
     * This hack replaces hyphens with slashes
     * https://stackoverflow.com/a/31732581 - "Another Strange One"
     */
    const formattedDate = date.replace('-', '/');

    try {
      setLoading(true);
      if (weight) {
        return await addDoc(collection(db, 'snakes', snakeId, 'events'), {
          type,
          notes,
          weight,
          date: Timestamp.fromDate(new Date(formattedDate)),
        });
      }
      return await addDoc(collection(db, 'snakes', snakeId, 'events'), {
        type,
        notes,
        date: Timestamp.fromDate(new Date(formattedDate)),
      });
    } catch (e) {
      console.error('Error creating document', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async (snakeId) => {
    try {
      setLoading(true);
      const query = collection(db, 'snakes', snakeId, 'events');
      const querySnapshot = await getDocs(query);

      setLoading(false);

      if (querySnapshot) {
        return querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
      }
    } catch (e) {
      console.error('Error creating document', e);
    }
  };

  return {
    updateUser,
    addNewSnake,
    fetchSnakeById,
    fetchAllSnakes,
    createEvent,
    fetchEvents,
    loading,
  };
}
