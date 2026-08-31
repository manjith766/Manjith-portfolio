import { profileSeed } from '../data/seed';
import { useFirestoreDocument } from './useFirestoreDocument';
import type { FsProfile } from '../types/firestore';

/**
 * Reads the single "settings/profile" document from Firestore and merges
 * it over the bundled seed data (src/data/seed.ts). Until you've saved
 * anything in the admin panel, the site shows the seed values (nothing
 * looks broken); the moment you save the Profile section in /admin, those
 * fields take over live for every visitor.
 */
export function useProfile(): { profile: FsProfile; loading: boolean } {
  const { data, loading } = useFirestoreDocument<FsProfile>('settings', 'profile');
  return { profile: { ...profileSeed, ...(data ?? {}) }, loading };
}
