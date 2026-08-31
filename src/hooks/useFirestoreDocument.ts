import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, firebaseEnabled } from '../lib/firebase';

interface DocState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/** Live-subscribes to a single Firestore document (e.g. settings/profile). */
export function useFirestoreDocument<T>(collectionName: string, docId: string): DocState<T> {
  const [state, setState] = useState<DocState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    if (!firebaseEnabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const ref = doc(db, collectionName, docId);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        setState({ data: snap.exists() ? (snap.data() as T) : null, loading: false, error: null });
      },
      (err) => {
        setState({ data: null, loading: false, error: err.message });
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return state;
}
