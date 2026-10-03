import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Code2,
  Database,
  GraduationCap,
  Layers,
  Lock,
  MapPin,
  Server,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { useProfile } from '../hooks/useSiteData';
import { useInView } from '../hooks/useInView';

const PILLARS = [
  {
    icon: Server,
    title: 'Backend Engineering',
    desc: 'Java, Spring Boot 3, Controller-Service-Repository architecture, REST APIs.',
  },
  {
    icon: Layers,
    title: 'System Architecture',
    desc: 'Spring Boot microservices communicating through OpenFeign and Apache Kafka events.',
  },
  {
    icon: Lock,
    title: 'Security & Access Control',
    desc: 'Spring Security, stateless JWT, role-based access control, AWS SES email OTP, KYC verification.',
  },
  {
    icon: Database,
    title: 'Database & Persistence',
    desc: 'PostgreSQL, MySQL, Spring Data JPA/Hibernate, transactional boundaries, Redis caching.',
  },
  {
    icon: Code2,
    title: 'Modern Frontend',
    desc: 'React, TypeScript, and JavaScript for a merchant dashboard and a multi-role e-commerce app.',
  },
  {
    icon: ShieldCheck,
    title: 'Engineering Rigor',
    desc: 'SOLID principles, JUnit and Mockito, Postman, Swagger/OpenAPI, Docker.',
  },
];

const CORE_STRENGTHS = [
  'Secure backend architecture with Spring Security, JWT, and RBAC.',
  'REST API development and microservices design.',
  'Event-driven order processing with Apache Kafka.',
  'Full-stack delivery with React + TypeScript on Spring Boot APIs.',
];

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { profile } = useProfile();

  return (
    <section id="about" className="section" ref={ref}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="section-eyebrow"
      >
        Core Philosophy
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="section-title"
      >
        Full Stack Java Developer, Backend-First
      </motion.h2>

      <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            {profile.summary}
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {profile.objective}
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-primary" /> Hyderabad, Telangana, India · Open to relocate across India
            </span>
            <span className="inline-flex items-center gap-2">
              <GraduationCap size={16} className="text-primary" /> Education &amp; certifications below
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8"
        >
          <div className="flex items-center gap-2 mb-6 font-display font-semibold text-lg">
            <Target size={19} className="text-primary" /> Core Strengths
          </div>
          <ul className="space-y-4">
            {CORE_STRENGTHS.map((s) => (
              <li key={s} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <CheckCircle2 size={18} className="text-secondary shrink-0 mt-0.5" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Six Pillars */}
      <div className="mt-14">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
          Architectural Pillars
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              className="glass-card p-6"
            >
              <div className="h-10 w-10 rounded-xl grid place-items-center bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-4">
                <pillar.icon size={20} />
              </div>
              <h4 className="font-display font-semibold text-base mb-2">{pillar.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
