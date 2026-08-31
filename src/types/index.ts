// Skill/project/experience/stat shapes now live in src/types/firestore.ts —
// content is stored in Firestore (see src/data/seed.ts for initial values,
// /admin to edit). src/types/api.ts is unused, kept only as a reference to
// the old Spring Boot DTO shapes this project migrated away from.

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
}
