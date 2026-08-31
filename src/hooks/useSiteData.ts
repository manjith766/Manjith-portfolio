import { socialLinksSeed } from '../data/seed';
import { useFirestoreCollection } from './useFirestoreCollection';
import { COLLECTIONS } from '../lib/firestoreApi';
import type { FsSocialLink } from '../types/firestore';

export { useProfile } from './useProfile';

/**
 * `find(keyword, fallbackUrl)` looks up a social link by a case-insensitive
 * substring match on its `platform` field (e.g. "GitHub", "LinkedIn",
 * "WhatsApp"). Reads live from the Firestore "socialLinks" collection;
 * until you've added any there via /admin, it falls back to the bundled
 * seed list (src/data/seed.ts) so links never go dead.
 */
export function useSocialLinks() {
  const { data } = useFirestoreCollection<FsSocialLink>(COLLECTIONS.socialLinks);
  const socialLinks = data.length > 0 ? data : socialLinksSeed;

  const find = (keyword: string, fallbackUrl: string) => {
    const match = socialLinks.find((link) => link.platform.toLowerCase().includes(keyword.toLowerCase()));
    return match?.url ?? fallbackUrl;
  };
  return { socialLinks, find };
}
