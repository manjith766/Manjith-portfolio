import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, firebaseEnabled } from '../lib/firebase';
import type { WithId } from '../types/firestore';

interface CollectionState<T> {
  data: WithId<T>[];
  loading: boolean;
  error: string | null;
}

/**
 * Live-subscribes to a Firestore collection, ordered by `orderField`
 * ascending (defaults to "displayOrder"). Updates automatically whenever a
 * document is added/edited/deleted from the admin panel or the Firebase
 * Console — no page refresh needed.
 *
 * `data` is always an array (never null), even on the very first render
 * before Firestore responds — callers can safely do `data.length` /
 * `data.map(...)` without a null check.
 */
export function useFirestoreCollection<T>(
  collectionName: string,
  orderField = 'displayOrder'
): CollectionState<T> {
  const [state, setState] = useState<CollectionState<T>>({ data: [], loading: true, error: null });

  useEffect(() => {
    if (!firebaseEnabled) {
      setState({
        data: [],
        loading: false,
        error: 'Firebase isn\u2019t configured yet — add your project keys to .env.local.',
      });
      return;
    }

    const q = query(collection(db, collectionName), orderBy(orderField, 'asc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }));
        setState({ data, loading: false, error: null });
      },
      (err) => {
        setState((s) => ({ data: s.data, loading: false, error: err.message }));
      }
    );

    return () => unsubscribe();
  }, [collectionName, orderField]);

  return state;
}
