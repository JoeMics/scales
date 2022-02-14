import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function useFirestore() {
  const updateUser = async (uid, email) => {
    try {
      await addDoc(collection(db, 'users'), {
        email: email,
        id: uid,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const addNewSnake = async (name, email) => {
    try {
      await addDoc(collection(db, 'snakes'), {
        user_email: email,
        name,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return {
    updateUser,
    addNewSnake,
  };
}
