import { addItem, COLLECTIONS, setSingletonDoc, SINGLETON_DOCS } from './firestoreApi';
import {
  certificationsSeed,
  educationSeed,
  experienceSeed,
  profileSeed,
  projectsSeed,
  settingsSeed,
  skillsSeed,
  socialLinksSeed,
  statsSeed,
} from '../data/seed';

/**
 * Pushes the bundled seed data (src/data/seed.ts) into Firestore. Safe to
 * run more than once for the list collections (skills, projects, etc.) —
 * it always ADDS new documents rather than checking for existing ones, so
 * re-running after you've already seeded will create duplicates. The two
 * singleton docs (settings/profile, settings/site) are fully overwritten
 * each time instead.
 */
export async function seedDatabase() {
  await Promise.all([
    ...skillsSeed.map((s) => addItem(COLLECTIONS.skills, s)),
    ...projectsSeed.map((p) => addItem(COLLECTIONS.projects, p)),
    ...experienceSeed.map((e) => addItem(COLLECTIONS.experience, e)),
    ...educationSeed.map((e) => addItem(COLLECTIONS.education, e)),
    ...certificationsSeed.map((c) => addItem(COLLECTIONS.certifications, c)),
    ...socialLinksSeed.map((s) => addItem(COLLECTIONS.socialLinks, s)),
    ...statsSeed.map((s) => addItem(COLLECTIONS.stats, s)),
    setSingletonDoc(SINGLETON_DOCS.profile, profileSeed as unknown as Record<string, unknown>),
    setSingletonDoc(SINGLETON_DOCS.settings, settingsSeed as unknown as Record<string, unknown>),
  ]);
}
