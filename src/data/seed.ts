/**
 * Seed data — the initial content pushed into Firestore the first time you
 * click "Import starter content" in /admin, and also the fallback rendered
 * on the public site if Firestore has nothing yet (or Firebase isn't
 * configured), so the site never shows up blank.
 *
 * After seeding, THIS FILE IS NO LONGER THE SOURCE OF TRUTH — Firestore is.
 * Edit content going forward from /admin, not here. Re-running the seed
 * always ADDS new rows to the list collections (skills, projects, etc.),
 * so only do it once per collection or you'll get duplicates.
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
  { name: 'Java', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 95, yearsExperience: '2.0', displayOrder: 1 },
  { name: 'Spring Boot', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 92, yearsExperience: '2.0', displayOrder: 2 },
  { name: 'Spring Security', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 88, yearsExperience: '1.5', displayOrder: 3 },
  { name: 'Hibernate', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 88, yearsExperience: '2.0', displayOrder: 4 },
  { name: 'JPA', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 88, yearsExperience: '2.0', displayOrder: 5 },
  { name: 'REST APIs', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 92, yearsExperience: '2.0', displayOrder: 6 },
  { name: 'Microservices', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 82, yearsExperience: '1.5', displayOrder: 7 },
  { name: 'JWT', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 85, yearsExperience: '1.5', displayOrder: 8 },
  { name: 'RBAC', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 82, yearsExperience: '1.5', displayOrder: 9 },
  { name: 'Collections Framework', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 85, yearsExperience: '2.0', displayOrder: 10 },
  { name: 'Data Structures', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 78, yearsExperience: '2.0', displayOrder: 11 },
  { name: 'Exception Handling', categoryName: 'Backend', categorySlug: 'backend', proficiencyPct: 88, yearsExperience: '2.0', displayOrder: 12 },
  // Frontend
  { name: 'HTML', categoryName: 'Frontend', categorySlug: 'frontend', proficiencyPct: 78, yearsExperience: '1.5', displayOrder: 13 },
  { name: 'CSS', categoryName: 'Frontend', categorySlug: 'frontend', proficiencyPct: 75, yearsExperience: '1.5', displayOrder: 14 },
  { name: 'JavaScript', categoryName: 'Frontend', categorySlug: 'frontend', proficiencyPct: 72, yearsExperience: '1.5', displayOrder: 15 },
  // Database
  { name: 'SQL', categoryName: 'Database', categorySlug: 'database', proficiencyPct: 88, yearsExperience: '2.0', displayOrder: 16 },
  { name: 'MySQL', categoryName: 'Database', categorySlug: 'database', proficiencyPct: 88, yearsExperience: '2.0', displayOrder: 17 },
  // DevOps & Cloud
  { name: 'Docker', categoryName: 'DevOps & Cloud', categorySlug: 'devops-cloud', proficiencyPct: 75, yearsExperience: '1.0', displayOrder: 18 },
  // Tools & Practices
  { name: 'JUnit', categoryName: 'Tools & Practices', categorySlug: 'tools-practices', proficiencyPct: 78, yearsExperience: '1.5', displayOrder: 19 },
  { name: 'SOLID', categoryName: 'Tools & Practices', categorySlug: 'tools-practices', proficiencyPct: 85, yearsExperience: '2.0', displayOrder: 20 },
  { name: 'Clean Architecture', categoryName: 'Tools & Practices', categorySlug: 'tools-practices', proficiencyPct: 85, yearsExperience: '1.5', displayOrder: 21 },
];

const projectSkillNames = [
  'Java', 'Spring Boot', 'Spring Security', 'Hibernate', 'JPA', 'REST APIs',
  'Microservices', 'JWT', 'RBAC', 'SQL', 'MySQL', 'Docker', 'JUnit', 'SOLID',
  'Clean Architecture',
];

export const projectsSeed: Omit<FsProject, 'id'>[] = [
  {
    title: 'Multi-Vendor E-Commerce Platform',
    slug: 'multi-vendor-e-commerce-platform',
    description:
      'A production-grade multi-vendor e-commerce platform designed and shipped with secure backend architecture, role-based access control, transactional order processing, coupon management, and encrypted image moderation.',
    shortDescription:
      'Production-grade multi-vendor e-commerce platform with RBAC, transactional cart-to-order workflow, coupon engine, and secure image moderation.',
    categoryName: 'Full Stack',
    githubUrl: '',
    liveDemoUrl: '',
    isFeatured: true,
    displayOrder: 1,
    features: [
      '20+ production-grade REST APIs',
      'Customer, Seller, and Admin role-based access control',
      'Complete cart-to-order workflow',
      'Transactional consistency during order processing',
      'Coupon engine with real-world edge-case handling',
      'AES-encrypted image moderation system',
      'Method-level security',
      'Clean layered architecture following SOLID principles',
    ],
    skillNames: projectSkillNames,
  },
];

const jippyMartSkills = [
  'Java', 'Spring Boot', 'Spring Security', 'JPA', 'Hibernate', 'REST APIs',
  'Microservices', 'JWT', 'RBAC', 'SQL', 'Docker', 'JUnit', 'SOLID', 'Clean Architecture',
];
const neotericSkills = ['Java', 'Spring Boot', 'REST APIs', 'JPA', 'Hibernate', 'MySQL', 'SQL'];

export const experienceSeed: Omit<FsExperience, 'id'>[] = [
  {
    companyName: 'Jippy Mart',
    role: 'Java Full Stack Developer',
    location: 'Hyderabad',
    startDate: '2026-04-01',
    endDate: '',
    isCurrent: true,
    description:
      'Java Full Stack Developer building secure and scalable backend systems using Java, Spring Boot, Spring Security, REST APIs, and related enterprise technologies.',
    displayOrder: 1,
    responsibilities: [
      'Designed and shipped a multi-vendor e-commerce platform from scratch.',
      'Developed 20+ production-grade REST APIs.',
      'Implemented Customer, Seller, and Admin role-based access control.',
      'Implemented the complete cart-to-order workflow with transactional consistency.',
      'Developed a coupon engine handling real-world edge cases.',
      'Implemented an AES-encrypted image moderation system with method-level security.',
      'Followed clean layered architecture and SOLID principles.',
    ],
    skillNames: jippyMartSkills,
  },
  {
    companyName: 'Neoteric Methods',
    role: 'Java Backend Developer – Training & Projects',
    location: 'Hyderabad',
    startDate: '2025-01-01',
    endDate: '2025-11-30',
    isCurrent: false,
    description:
      'Java Backend Development Trainee working on Spring Boot based backend applications and project-based development.',
    displayOrder: 2,
    responsibilities: [
      'Developed REST APIs using Spring Boot following Controller-Service-Repository architecture.',
      'Implemented database operations using JPA/Hibernate with MySQL.',
      'Designed backend modules for scalable applications.',
      'Practiced API testing and debugging.',
      'Built backend features for project-based applications.',
    ],
    skillNames: neotericSkills,
  },
];

export const educationSeed: Omit<FsEducation, 'id'>[] = [
  {
    degree: 'Master of Computer Applications',
    institution: 'Prakasam Engineering College',
    location: 'Andhra Pradesh, India',
    startDate: '2023-05-01',
    endDate: '2025-05-31',
    cgpa: '',
    description: 'Computer Programming, Specific Applications',
    displayOrder: 1,
  },
  {
    degree: 'Bachelor of Computer Science',
    institution: 'Jagarlamudi Kuppuswamy Choudary College (JKC College)',
    location: 'Andhra Pradesh, India',
    startDate: '2020-05-01',
    endDate: '2023-04-30',
    cgpa: '',
    description: 'Mathematics and Computer Science',
    displayOrder: 2,
  },
  {
    degree: 'Intermediate',
    institution: 'Sri Pratibha Junior College',
    location: 'Andhra Pradesh, India',
    startDate: '2018-01-01',
    endDate: '2020-12-31',
    cgpa: '',
    description: '',
    displayOrder: 3,
  },
  {
    degree: 'High School Diploma',
    institution: 'Siddardha High School',
    location: 'Andhra Pradesh, India',
    startDate: '2017-01-01',
    endDate: '2018-12-31',
    cgpa: '',
    description: '',
    displayOrder: 4,
  },
];

export const certificationsSeed: Omit<FsCertification, 'id'>[] = [
  { title: 'Introduction to Programming Using Java', issuer: 'Infosys Springboard', issueDate: '2026-04-01', credentialUrl: '', imageUrl: '', displayOrder: 1 },
  { title: 'AWS For Beginners', issuer: 'Great Learning', issueDate: '2026-03-01', credentialUrl: '', imageUrl: '', displayOrder: 2 },
  { title: 'JPMorganChase - Software Engineering Job Simulation', issuer: 'Forage', issueDate: '2025-12-01', credentialUrl: '', imageUrl: '', displayOrder: 3 },
  { title: 'AWS - Solutions Architecture Job Simulation', issuer: 'Forage', issueDate: '2025-11-01', credentialUrl: '', imageUrl: '', displayOrder: 4 },
  { title: 'Structured Query Language (SQL)', issuer: 'Parishkar Technologies', issueDate: '2024-09-01', credentialUrl: '', imageUrl: '', displayOrder: 5 },
  { title: 'Salesforce Developer Virtual Internship', issuer: 'Sales Partners', issueDate: '2022-08-01', credentialUrl: '', imageUrl: '', displayOrder: 6 },
];

export const socialLinksSeed: Omit<FsSocialLink, 'id'>[] = [
  { platform: 'GITHUB', url: 'https://github.com/manjith766', icon: 'github', displayOrder: 1 },
  { platform: 'LINKEDIN', url: 'https://www.linkedin.com/in/manjithnagineni', icon: 'linkedin', displayOrder: 2 },
  { platform: 'EMAIL', url: 'mailto:manjith9989@gmail.com', icon: 'mail', displayOrder: 3 },
  { platform: 'PHONE', url: 'tel:+919398303933', icon: 'phone', displayOrder: 4 },
  { platform: 'WHATSAPP', url: 'https://wa.me/919398303933', icon: 'message-circle', displayOrder: 5 },
];

export const statsSeed: Omit<FsStat, 'id'>[] = [
  { label: 'Years of experience', value: 3, suffix: '+', displayOrder: 1 },
  { label: 'Production REST APIs shipped', value: 20, suffix: '+', displayOrder: 2 },
  { label: 'Platforms built end-to-end', value: 2, suffix: '', displayOrder: 3 },
  { label: 'Independent services designed', value: 7, suffix: '+', displayOrder: 4 },
];

export const profileSeed: FsProfile = {
  name: 'Manjith Nagineni',
  role: 'Java Full Stack Developer',
  taglines: [
    'Java Full Stack Developer',
    'Backend Architecture Specialist',
    'Security-First Engineer',
    'AI Integration Enthusiast',
  ],
  location: 'Hyderabad, India',
  summary:
    'Java Full Stack Developer with 3+ years of hands-on experience building backend systems, secure REST APIs, and event-driven microservices. Comfortable owning a feature end-to-end — from database schema through API design to deployment — with a strong, consistent focus on clean, layered architecture and security.',
  objective:
    'Looking for a full-time backend or full-stack role (3+ YOE) where I can own production systems end-to-end, or backend architecture consulting work for teams that need REST APIs and microservices built right the first time.',
  email: 'manjith9989@gmail.com',
  whatsapp: 'https://wa.me/919398303933',
  github: 'https://github.com/manjith766',
  linkedin: 'https://www.linkedin.com/in/manjith-nagineni',
  leetcode: 'https://leetcode.com/u/manjith766/',
  resumeUrl: '#',
  strengths: [
    'Ownership from schema design to deployment',
    'Security-first mindset on every endpoint (JWT, RBAC, AES)',
    'SOLID principles & clean architecture in real production code',
    'Comfortable across the stack — DB, API, and UI layers',
  ],
};

export const settingsSeed: FsSettings = {
  title: 'Manjith Nagineni | Java Full Stack Developer',
  tagline: 'Java Full Stack Developer · Spring Boot · Microservices',
  availabilityStatus: 'AVAILABLE',
  yearsExperience: 2,
  location: 'Hyderabad, Telangana, India',
};
