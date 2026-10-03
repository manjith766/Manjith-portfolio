/**
 * Seed data — initial content pushed into Firestore when importing starter
 * content in /admin, and fallback rendered on the public site if Firestore
 * has nothing yet (or Firebase isn't configured).
 *
 * After seeding, THIS FILE IS NO LONGER THE SOURCE OF TRUTH — Firestore is.
 * Edit content going forward from /admin.
 */
import type {
  FsCertification,
  FsEducation,
  FsExperience,
  FsProfile,
  FsProject,
  FsSettings,
  FsSkill,
  FsSocialLink,
  FsStat,
} from '../types/firestore';

export const skillsSeed: Omit<FsSkill, 'id'>[] = [
  // Backend
  { name: 'Java', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 80, yearsExperience: '1.5', displayOrder: 1 },
  { name: 'Spring Boot', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 80, yearsExperience: '1.5', displayOrder: 2 },
  { name: 'Spring Security', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 70, yearsExperience: '1.0', displayOrder: 3 },
  { name: 'Hibernate & JPA', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 75, yearsExperience: '1.5', displayOrder: 4 },
  { name: 'REST APIs', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 80, yearsExperience: '1.5', displayOrder: 5 },
  { name: 'Microservices', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 70, yearsExperience: '1.0', displayOrder: 6 },
  { name: 'JWT & RBAC', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 70, yearsExperience: '1.0', displayOrder: 7 },
  // Frontend
  { name: 'React', categoryName: 'Frontend', categorySlug: 'frontend', proficiencyPct: 70, yearsExperience: '1.0', displayOrder: 8 },
  { name: 'TypeScript', categoryName: 'Frontend', categorySlug: 'frontend', proficiencyPct: 65, yearsExperience: '1.0', displayOrder: 9 },
  { name: 'JavaScript', categoryName: 'Frontend', categorySlug: 'frontend', proficiencyPct: 70, yearsExperience: '1.5', displayOrder: 10 },
  { name: 'HTML & CSS', categoryName: 'Frontend', categorySlug: 'frontend', proficiencyPct: 75, yearsExperience: '1.5', displayOrder: 11 },
  // Database
  { name: 'PostgreSQL', categoryName: 'Database', categorySlug: 'database', proficiencyPct: 70, yearsExperience: '1.0', displayOrder: 12 },
  { name: 'MySQL', categoryName: 'Database', categorySlug: 'database', proficiencyPct: 70, yearsExperience: '1.5', displayOrder: 13 },
  { name: 'SQL', categoryName: 'Database', categorySlug: 'database', proficiencyPct: 75, yearsExperience: '1.5', displayOrder: 14 },
  { name: 'Redis', categoryName: 'Database', categorySlug: 'database', proficiencyPct: 55, yearsExperience: '0.5', displayOrder: 15 },
  // Messaging & Event Streaming
  { name: 'Apache Kafka', categoryName: 'Messaging', categorySlug: 'messaging', proficiencyPct: 65, yearsExperience: '1.0', displayOrder: 16 },
  // Tools & Practices
  { name: 'Docker', categoryName: 'Tools & Practices', categorySlug: 'tools', proficiencyPct: 60, yearsExperience: '1.0', displayOrder: 17 },
  { name: 'AWS (fundamentals)', categoryName: 'Tools & Practices', categorySlug: 'tools', proficiencyPct: 50, yearsExperience: '0.5', displayOrder: 18 },
  { name: 'JUnit & Mockito', categoryName: 'Tools & Practices', categorySlug: 'tools', proficiencyPct: 65, yearsExperience: '1.0', displayOrder: 19 },
  { name: 'Git, GitHub & Postman', categoryName: 'Tools & Practices', categorySlug: 'tools', proficiencyPct: 75, yearsExperience: '1.5', displayOrder: 20 },
  { name: 'SOLID & Clean Architecture', categoryName: 'Tools & Practices', categorySlug: 'tools', proficiencyPct: 75, yearsExperience: '1.5', displayOrder: 21 },
];

export const projectsSeed: Omit<FsProject, 'id'>[] = [
  {
    title: 'Jippy: Food Delivery & Quick-Commerce Platform',
    slug: 'jippy-food-delivery-quick-commerce-platform',
    shortDescription:
      'Hyper-local food delivery & quick-commerce platform built on Spring Boot microservices with Kafka, Redis, and React + TypeScript Merchant Dashboard.',
    description:
      'A hyper-local food delivery platform built as Spring Boot microservices. I built the Merchant Dashboard (React + TypeScript) and backend services for checkout and pricing, event-driven order processing, merchant onboarding with KYC, catalog management, and settlements.\n\nHighlights: Architecture: Spring Boot Microservices | Messaging: Apache Kafka | Data: PostgreSQL + Redis | Frontend: React + TypeScript\n\nArchitecture tabs:\n- Client tier: React + TypeScript Merchant Dashboard calling REST APIs through the gateway.\n- Service tier: Spring Boot services for customers/orders, merchants/catalog, delivery pricing, and notifications, behind an API gateway with Eureka discovery.\n- Data and messaging tier: PostgreSQL, Redis caching, Apache Kafka for order events.\n\nEngineering decisions:\n- Kafka for order events, so a slow downstream service does not block checkout.\n- Checkout calls the delivery service through OpenFeign for distance-based fees and separates food GST from delivery GST.\n- A scheduler generates weekly merchant settlement windows ahead of time, so payout periods are predictable.',
    categoryName: 'Full Stack',
    githubUrl: '',
    liveDemoUrl: '',
    isFeatured: true,
    displayOrder: 1,
    features: [
      'Merchant Dashboard web app with React and TypeScript, integrated with Spring Boot REST APIs; screens: [FILL: e.g. orders / catalog / settlements / sales reports]',
      'Checkout and pricing engine (item totals, platform fee, tips, distance-based delivery charge, food and delivery GST)',
      'Event-driven order pipeline with Apache Kafka',
      'Scheduled and recurring orders; 1-click reorder with availability and price re-validation',
      'Automated weekly merchant settlement scheduler',
      'Merchant onboarding with AWS SES email OTP, JWT security, and KYC (FSSAI and GST)',
      'Multi-variant product catalog with outlet-level price overrides',
      'Merchant sales reports (daily, weekly, monthly) using JPA projections',
    ],
    skillNames: [
      'React', 'TypeScript', 'Java 17', 'Spring Boot 3', 'Spring Security', 'JWT',
      'JPA/Hibernate', 'OpenFeign', 'Spring Cloud Gateway', 'Eureka', 'Kafka',
      'Redis', 'PostgreSQL', 'PostGIS', 'AWS SES', 'Docker', 'Maven',
      'Swagger/OpenAPI', 'JUnit', 'Mockito',
    ],
  },
  {
    title: 'Multi-Vendor E-Commerce Platform',
    slug: 'multi-vendor-e-commerce-platform',
    shortDescription:
      'Full-stack marketplace with Customer, Seller, and Admin portals. React + TypeScript frontend with a secure Spring Boot REST API, PostgreSQL, and Redux Toolkit.',
    description:
      'A full-stack multi-vendor marketplace with separate Customer, Seller, and Admin experiences. React + TypeScript frontend with a secure Spring Boot REST API and PostgreSQL.\n\nHighlights: Roles: Customer / Seller / Admin | Access Control: RBAC + JWT | APIs: 20+ REST endpoints | Frontend: React + TypeScript + Redux Toolkit\n\nArchitecture tabs:\n- Frontend: React 18 + TypeScript, Redux Toolkit slices per role, protected routes, Formik + Yup validation.\n- Controller tier: REST contracts, DTO validation, method-level security.\n- Business and data tier: cart and coupon logic, transactional order flow, Spring Data JPA/Hibernate on PostgreSQL.\n\nEngineering decisions:\n- Stateless JWT with separate permission boundaries for Customer, Seller, and Admin.\n- @Transactional cart-to-order flow so order creation, inventory, and coupon use succeed or roll back together.\n- Layered Controller-Service-Repository structure with DTOs and global exception handling.',
    categoryName: 'Full Stack',
    githubUrl: 'https://github.com/manjith766',
    liveDemoUrl: 'https://e-commerce-frontend-chi-seven.vercel.app/',
    isFeatured: true,
    displayOrder: 2,
    features: [
      'Customer: browsing, search, cart, wishlist, address checkout, payment, reviews',
      'Seller: inventory, orders, payouts, revenue charts, OTP-based account verification',
      'Admin: coupon, deal, and seller management',
      '20+ REST APIs with JWT and Spring Security',
      'Transactional cart-to-order workflow',
    ],
    skillNames: [
      'React 18', 'TypeScript', 'Redux Toolkit', 'React Router', 'Material UI',
      'Tailwind CSS', 'Axios', 'Formik', 'Yup', 'Recharts', 'Java', 'Spring Boot',
      'Spring Security', 'JWT', 'JPA/Hibernate', 'PostgreSQL', 'Git', 'Postman',
    ],
  },
  {
    title: 'Encrypted Image Content Moderation System',
    slug: 'encrypted-image-content-moderation-system',
    shortDescription:
      'A privacy-preserving system that detects harmful content in encrypted cloud-stored images without exposing user data.',
    description:
      'A privacy-preserving academic system that detects harmful content in encrypted cloud-stored images without exposing user data.',
    categoryName: 'Academic',
    githubUrl: '',
    liveDemoUrl: '',
    isFeatured: false,
    displayOrder: 3,
    features: [
      'Privacy-preserving architecture for cloud-stored assets',
      'Content moderation on encrypted image payloads without exposing user data',
      'AES encryption with Spring Security integration',
    ],
    skillNames: ['Java', 'Spring Boot', 'Spring Security', 'AES Encryption'],
  },
];

export const experienceSeed: Omit<FsExperience, 'id'>[] = [
  {
    companyName: 'Jippymart Services Private Limited',
    role: 'Software Developer (Java Full Stack)',
    location: '',
    startDate: '2025-10-01',
    endDate: '2026-09-30',
    isCurrent: false,
    description:
      'Worked on Jippy, a food delivery and quick-commerce platform built on Spring Boot microservices, building the Merchant Dashboard and backend services. [FILL: if true, add "Started as an intern in Oct 2025; moved to a Software Developer role in Apr 2026."]',
    displayOrder: 1,
    responsibilities: [
      'Built the Merchant Dashboard web app with React and TypeScript, integrated with Spring Boot REST APIs.',
      'Built the checkout and pricing engine, with distance-based delivery fees via OpenFeign and separate food and delivery GST.',
      'Implemented an event-driven order pipeline with Apache Kafka, decoupling checkout from notifications and dispatch.',
      'Built scheduled and recurring orders and a 1-click reorder API that re-validates availability and prices.',
      'Built an automated weekly merchant settlement scheduler for payout cycles.',
      'Implemented merchant onboarding with AWS SES email OTP, JWT security, and KYC (FSSAI and GST).',
      'Built a multi-variant product catalog and merchant sales reports using JPA projections.',
    ],
    skillNames: ['Java', 'Spring Boot', 'Microservices', 'Apache Kafka', 'PostgreSQL', 'Redis', 'React', 'TypeScript'],
  },
  {
    companyName: 'Neoteric Methods',
    role: 'Java Backend Developer (Training & Internship)',
    location: 'Hyderabad, Telangana, India',
    startDate: '2025-03-01',
    endDate: '2025-08-31',
    isCurrent: false,
    description:
      'Completed hands-on Java backend training followed by an internship, building Spring Boot applications and project-based software.',
    displayOrder: 2,
    responsibilities: [
      'Completed structured training in Java, Spring Boot, JPA/Hibernate, and MySQL.',
      'Built REST APIs in Spring Boot using Controller-Service-Repository architecture.',
      'Implemented database operations with JPA/Hibernate and MySQL.',
      'Designed backend modules for scalable applications.',
      'Tested and debugged APIs with Postman.',
    ],
    skillNames: ['Java', 'Spring Boot', 'REST APIs', 'JPA', 'Hibernate', 'MySQL'],
  },
];

export const educationSeed: Omit<FsEducation, 'id'>[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Prakasam Engineering College',
    location: 'Andhra Pradesh, India',
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    cgpa: '70%',
    description:
      'Computer Programming, Specific Applications. Backend development groups and workshops on Java, Spring Boot, and databases. Project: Encrypted Image Content Moderation System.',
    displayOrder: 1,
  },
  {
    degree: 'Bachelor of Computer Science (Mathematics and Computer Science)',
    institution: 'Jagarlamudi Kuppuswamy Choudary College (JKC College)',
    location: 'Andhra Pradesh, India',
    startDate: '2020-01-01',
    endDate: '2023-12-31',
    cgpa: '70%',
    description: 'Mathematics and Computer Science',
    displayOrder: 2,
  },
];

export const certificationsSeed: Omit<FsCertification, 'id'>[] = [
  {
    title: 'Introduction to Programming Using Java',
    issuer: 'Infosys Springboard',
    issueDate: '2026-04-01',
    credentialUrl: '',
    imageUrl: '',
    displayOrder: 1,
  },
  {
    title: 'AWS For Beginners',
    issuer: 'Great Learning',
    issueDate: '2026-03-01',
    credentialUrl: '',
    imageUrl: '',
    displayOrder: 2,
  },
  {
    title: 'JPMorgan Chase Software Engineering Job Simulation',
    issuer: 'Forage',
    issueDate: '2025-12-01',
    credentialUrl: '',
    imageUrl: '',
    displayOrder: 3,
  },
  {
    title: 'AWS Solutions Architecture Job Simulation',
    issuer: 'Forage',
    issueDate: '2025-11-01',
    credentialUrl: '',
    imageUrl: '',
    displayOrder: 4,
  },
];

export const socialLinksSeed: Omit<FsSocialLink, 'id'>[] = [
  { platform: 'GITHUB', url: 'https://github.com/manjith766', icon: 'github', displayOrder: 1 },
  { platform: 'LINKEDIN', url: 'https://www.linkedin.com/in/manjith-nagineni', icon: 'linkedin', displayOrder: 2 },
  { platform: 'EMAIL', url: 'mailto:manjith9989@gmail.com', icon: 'mail', displayOrder: 3 },
  { platform: 'LEETCODE', url: 'https://leetcode.com/u/manjith766/', icon: 'code', displayOrder: 4 },
  { platform: 'WHATSAPP', url: 'https://wa.me/919398303933', icon: 'message-circle', displayOrder: 5 },
];

export const statsSeed: Omit<FsStat, 'id'>[] = [
  { label: 'Years of experience (incl. internship)', value: 1.5, suffix: '', displayOrder: 1 },
  { label: 'REST APIs built', value: 20, suffix: '+', displayOrder: 2 },
  { label: 'Full-stack projects', value: 2, suffix: '', displayOrder: 3 },
  { label: 'Certifications', value: 4, suffix: '', displayOrder: 4 },
];

export const profileSeed: FsProfile = {
  name: 'Manjith Nagineni',
  role: 'Java Full Stack Developer',
  taglines: [
    'Java Full Stack Developer',
    'Spring Boot & Microservices',
    'React + TypeScript + Spring Boot',
    '1.5 Years of Hands-on Experience',
    'Open to Work | Hyderabad & Relocation',
  ],
  location: 'Hyderabad, Telangana, India (open to relocate across India)',
  summary:
    'Java Full Stack Developer with 1.5 years of experience (including training and an internship), building web applications with Java, Spring Boot, Spring Security, JWT, Hibernate/JPA, PostgreSQL, React, and TypeScript. At Jippymart I built a Merchant Dashboard and backend services for a microservices-based food delivery platform using Apache Kafka and OpenFeign. I also built a multi-vendor e-commerce platform with Customer, Seller, and Admin portals as a personal project. I follow clean layered architecture and SOLID principles.',
  objective:
    'Seeking a Java Full Stack or Backend Developer role in an Agile product team where I can own features end to end, write clean, maintainable code, and keep growing in microservices and backend architecture. Open to relocating across India.',
  email: 'manjith9989@gmail.com',
  whatsapp: 'https://wa.me/919398303933',
  github: 'https://github.com/manjith766',
  linkedin: 'https://www.linkedin.com/in/manjith-nagineni',
  leetcode: 'https://leetcode.com/u/manjith766/',
  resumeUrl: '',
  strengths: [
    'Full-stack development with Java, Spring Boot, React, and TypeScript',
    'Secure REST APIs with Spring Security, JWT, and role-based access',
    'Microservices with Spring Boot, OpenFeign, and Apache Kafka',
    'Hibernate / JPA with PostgreSQL and MySQL',
    'Clean layered architecture and SOLID principles',
    'API testing and unit testing with Postman, JUnit, and Mockito',
  ],
};

export const settingsSeed: FsSettings = {
  title: 'Manjith Nagineni | Java Full Stack Developer',
  tagline: 'Java Full Stack Developer | Spring Boot, Kafka, Microservices | React + TypeScript',
  availabilityStatus: 'AVAILABLE',
  yearsExperience: 1.5,
  location: 'Hyderabad, Telangana, India (open to relocate across India)',
};
