import { ArchitectureEdge, ArchitectureNode } from '../types';

/**
 * Static content that isn't part of the editable Firestore data — just the
 * architecture diagram layout (a fixed illustration, not something you'd
 * add/remove rows from). Everything else (bio, stats, skills, projects,
 * experience, education, certifications, social links) now lives in
 * Firestore — see src/data/seed.ts for the initial values and /admin to
 * edit them going forward.
 */

// Request flow through a typical layered/microservices request in Manjith's projects.
export const architectureNodes: ArchitectureNode[] = [
  { id: 'client', label: 'Client', sublabel: 'Web / Mobile', x: 50, y: 6 },
  { id: 'gateway', label: 'API Gateway', sublabel: 'Spring Cloud Gateway', x: 50, y: 22 },
  { id: 'auth', label: 'Auth Service', sublabel: 'JWT \u00b7 RBAC', x: 18, y: 40 },
  { id: 'discovery', label: 'Eureka', sublabel: 'Service Discovery', x: 82, y: 40 },
  { id: 'order', label: 'Order Service', sublabel: 'Cart \u2192 Order', x: 30, y: 58 },
  { id: 'product', label: 'Product Service', sublabel: 'Inventory', x: 70, y: 58 },
  { id: 'kafka', label: 'Kafka', sublabel: 'Event Bus', x: 50, y: 74 },
  { id: 'notification', label: 'Notification', sublabel: 'Email \u00b7 SMS \u00b7 Push', x: 18, y: 90 },
  { id: 'db', label: 'MySQL / PostgreSQL', sublabel: 'Per-service DB', x: 82, y: 90 },
];

export const architectureEdges: ArchitectureEdge[] = [
  { from: 'client', to: 'gateway' },
  { from: 'gateway', to: 'auth' },
  { from: 'gateway', to: 'discovery' },
  { from: 'auth', to: 'order' },
  { from: 'discovery', to: 'product' },
  { from: 'order', to: 'kafka' },
  { from: 'product', to: 'kafka' },
  { from: 'kafka', to: 'notification' },
  { from: 'kafka', to: 'db' },
];
