/**
 * Shapes of documents stored in Firestore. Every collection document gets
 * an `id` (the Firestore doc ID) merged in by useFirestoreCollection — you
 * never set `id` yourself when writing (addItem/updateItem in
 * src/lib/firestoreApi.ts handle that). List collections are ordered by
 * `displayOrder` (ascending).
 */

export interface FsSkill {
  name: string;
  categoryName: string;
  categorySlug: string;
  proficiencyPct: number;
  yearsExperience: string;
  displayOrder: number;
}

export interface FsProject {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  categoryName: string;
  githubUrl: string;
  liveDemoUrl: string;
  isFeatured: boolean;
  features: string[];
  skillNames: string[];
  displayOrder: number;
}

export interface FsExperience {
  companyName: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  skillNames: string[];
  displayOrder: number;
}

export interface FsEducation {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  cgpa: string;
  description: string;
  displayOrder: number;
}

export interface FsCertification {
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  imageUrl: string;
  displayOrder: number;
}

export interface FsSocialLink {
  platform: string;
  url: string;
  icon: string;
  displayOrder: number;
}

export interface FsStat {
  label: string;
  value: number;
  suffix: string;
  displayOrder: number;
}

export interface FsTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  displayOrder: number;
}

/** Singleton doc: settings/profile */
export interface FsProfile {
  name: string;
  role: string;
  taglines: string[];
  location: string;
  summary: string;
  objective: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  leetcode: string;
  resumeUrl: string;
  strengths: string[];
}

/** Singleton doc: settings/site */
export interface FsSettings {
  title: string;
  tagline: string;
  availabilityStatus: 'AVAILABLE' | 'OPEN_TO_OFFERS' | 'UNAVAILABLE';
  yearsExperience: number;
  location: string;
}

export type WithId<T> = T & { id: string };
