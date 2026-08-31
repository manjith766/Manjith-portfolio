import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
  Unsubscribe,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';

/** Names of the top-level "list" collections editable from the admin panel. */
export const COLLECTIONS = {
  skills: 'skills',
  projects: 'projects',
  experience: 'experience',
  education: 'education',
  certifications: 'certifications',
  socialLinks: 'socialLinks',
  stats: 'stats',
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

/** Singleton documents (one record per site, not a list). Both live under
 * the "settings" collection so a single Firestore security rule covers
 * both. */
export const SINGLETON_DOCS = {
  profile: { collection: 'settings', id: 'profile' },
  settings: { collection: 'settings', id: 'site' },
} as const;

/**
 * Subscribes to a collection ordered by `displayOrder`, calling `onData`
 * with the live list every time anything changes (add/edit/delete —
 * including edits made from another tab or the Firebase console). Returns
 * the unsubscribe function; call it in a useEffect cleanup.
 */
export function subscribeToCollection<T extends { id: string }>(
  name: CollectionName,
  onData: (items: T[]) => void,
  onError: (message: string) => void
): Unsubscribe {
  const q = query(collection(db, name), orderBy('displayOrder', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) })) as T[];
      onData(items);
    },
    (err) => onError(err.message)
  );
}

/** Subscribes to one of the singleton docs (settings/profile, settings/site). */
export function subscribeToDoc<T>(
  target: { collection: string; id: string },
  onData: (data: T | null) => void,
  onError: (message: string) => void
): Unsubscribe {
  const ref = doc(db, target.collection, target.id);
  return onSnapshot(
    ref,
    (snap) => onData(snap.exists() ? (snap.data() as T) : null),
    (err) => onError(err.message)
  );
}

/** Creates a new document in `name` with the given fields. */
export async function addItem(name: CollectionName, data: Record<string, unknown>) {
  await addDoc(collection(db, name), data);
}

/** Overwrites the given fields on an existing document. */
export async function updateItem(name: CollectionName, id: string, data: Record<string, unknown>) {
  await updateDoc(doc(db, name, id), data);
}

/** Deletes a document by id. */
export async function deleteItem(name: CollectionName, id: string) {
  await deleteDoc(doc(db, name, id));
}

/** Reads a singleton doc once. */
export async function getDocOnce<T>(target: { collection: string; id: string }): Promise<T | null> {
  const snap = await getDoc(doc(db, target.collection, target.id));
  return snap.exists() ? (snap.data() as T) : null;
}

/** Creates or fully overwrites a singleton doc (settings/profile, settings/site). */
export async function setSingletonDoc(target: { collection: string; id: string }, data: Record<string, unknown>) {
  await setDoc(doc(db, target.collection, target.id), data);
}
