import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useProfile, useSocialLinks } from '../hooks/useSiteData';

const TYPING_STATEMENTS = [
  'Building secure REST APIs and event-driven microservices with Spring Boot.',
  'Designing transactional order workflows with PostgreSQL.',
  'Implementing asynchronous messaging with Apache Kafka.',
  'Building React + TypeScript dashboards for real products.',
];

const HERO_CHIPS = [
  { label: 'Java', style: 'top-[12%] left-[6%]', delay: 0 },
  { label: 'Spring Boot', style: 'top-[22%] right-[8%]', delay: 0.2 },
  { label: 'Microservices', style: 'top-[60%] left-[3%]', delay: 0.4 },
  { label: 'Kafka', style: 'bottom-[12%] right-[10%]', delay: 0.6 },
  { label: 'PostgreSQL', style: 'bottom-[18%] left-[16%]', delay: 0.8 },
  { label: 'React', style: 'top-[6%] left-[42%]', delay: 1.0 },
  { label: 'TypeScript', style: 'top-[45%] right-[4%]', delay: 1.2 },
  { label: 'Docker', style: 'bottom-[6%] left-[48%]', delay: 1.4 },
];

function useTypingEffect(words: string[], typingSpeed = 50, pause = 1600) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const list = words.length > 0 ? words : [''];
    const current = list[wordIndex % list.length];
    let timeout: number;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = window.setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? typingSpeed / 2 : typingSpeed
      );
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, pause]);

  return text;
}

export default function Hero() {
  const { profile } = useProfile();
  const typed = useTypingEffect(TYPING_STATEMENTS);
  const { find } = useSocialLinks();
  const resumeHref = profile.resumeUrl || '#';

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden bg-grid-light dark:bg-grid-dark bg-[length:44px_44px]"
    >
      <div className="absolute inset-0 bg-hero-gradient-light dark:bg-hero-gradient-dark" />

      <div
        aria-hidden
        className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-blob"
      />
      <div
        aria-hidden
        className="absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-blob"
        style={{ animationDelay: '3s' }}
      />

      {HERO_CHIPS.map((chip) => (
        <motion.span
          key={chip.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: chip.delay, duration: 0.6 }}
          className={`hidden lg:block absolute ${chip.style} chip animate-float shadow-sm`}
          style={{ animationDelay: `${chip.delay}s` }}
        >
          {chip.label}
        </motion.span>
      ))}

      <div className="relative section !py-32 grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="section-eyebrow !mb-0">SOFTWARE ENGINEER</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Full-Time Java Full Stack &amp; Backend Roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5"
          >
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="min-h-[3rem] mb-6 font-mono text-base sm:text-lg text-primary dark:text-primary-light"
          >
            {typed}
            <span className="animate-pulse">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl mb-9"
          >
            I build secure REST APIs, microservices, and event-driven backends with Spring Boot, Hibernate, and Kafka, paired with clean, responsive React + TypeScript frontends.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a href="#contact" className="btn-primary">
              <Mail size={17} /> Hire me
            </a>
            <a href={resumeHref} target="_blank" rel="noreferrer" className="btn-ghost">
              <Download size={17} /> Download resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            {[
              { icon: Github, href: find('github', profile.github), label: 'GitHub' },
              { icon: Linkedin, href: find('linkedin', profile.linkedin), label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
              { icon: MessageCircle, href: find('whatsapp', profile.whatsapp), label: 'WhatsApp' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full glass hover:text-primary hover:-translate-y-1 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Quick Tech Highlights Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-8 space-y-6"
        >
          <div className="font-display font-semibold text-lg border-b border-slate-200 dark:border-white/10 pb-4">
            Tech Core
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">BACKEND &amp; MICROSERVICES</div>
              <div className="font-medium text-slate-700 dark:text-slate-200">
                Java 17 · Spring Boot 3 · Spring Security · OpenFeign · Eureka
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">MESSAGING &amp; PERSISTENCE</div>
              <div className="font-medium text-slate-700 dark:text-slate-200">
                Apache Kafka · PostgreSQL · PostGIS · Redis · Hibernate/JPA
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">FRONTEND &amp; UI</div>
              <div className="font-medium text-slate-700 dark:text-slate-200">
                React 18 · TypeScript · Redux Toolkit · Tailwind CSS
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">TESTING &amp; DEVOPS</div>
              <div className="font-medium text-slate-700 dark:text-slate-200">
                JUnit · Mockito · Postman · Docker · AWS SES
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
