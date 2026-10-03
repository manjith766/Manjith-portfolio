import { ArchitectureEdge, ArchitectureNode } from '../types';

/**
 * Architecture diagram layout matching the microservices request flow in JippyFood & Mart.
 */
export const architectureNodes: ArchitectureNode[] = [
  { id: 'client', label: 'Client', sublabel: 'Web / Mobile', x: 50, y: 6 },
  { id: 'gateway', label: 'API Gateway', sublabel: 'Spring Cloud Gateway', x: 50, y: 22 },
  { id: 'auth', label: 'Auth Service', sublabel: 'JWT · RBAC', x: 18, y: 40 },
  { id: 'discovery', label: 'Eureka', sublabel: 'Service Discovery', x: 82, y: 40 },
  { id: 'order', label: 'Order Service', sublabel: 'Cart → Order', x: 30, y: 58 },
  { id: 'product', label: 'Product Service', sublabel: 'Inventory', x: 70, y: 58 },
  { id: 'kafka', label: 'Kafka', sublabel: 'Event Bus', x: 50, y: 74 },
  { id: 'notification', label: 'Notification', sublabel: 'Email · SMS · Push', x: 18, y: 90 },
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
