import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useProfile, useSocialLinks } from '../hooks/useSiteData';

const FLOATING_TAGS = [
  { label: 'Java', style: 'top-[12%] left-[6%]', delay: 0 },
  { label: 'Spring Boot', style: 'top-[22%] right-[8%]', delay: 0.6 },
  { label: 'Microservices', style: 'top-[62%] left-[3%]', delay: 1.1 },
  { label: 'Docker', style: 'bottom-[10%] right-[10%]', delay: 0.3 },
  { label: 'Kafka', style: 'bottom-[18%] left-[16%]', delay: 1.5 },
  { label: 'MySQL', style: 'top-[6%] left-[42%]', delay: 0.9 },
];

function useTypingEffect(words: string[], typingSpeed = 65, pause = 1400) {
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
  const typed = useTypingEffect(profile.taglines);
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

      {FLOATING_TAGS.map((tag) => (
        <motion.span
          key={tag.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: tag.delay, duration: 0.6 }}
          className={`hidden lg:block absolute ${tag.style} chip animate-float shadow-sm`}
          style={{ animationDelay: `${tag.delay}s` }}
        >
          {tag.label}
        </motion.span>
      ))}

      <div className="relative section !py-32 grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-eyebrow"
          >
            Available for full-time roles &amp; consulting
          </motion.p>

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
            className="h-9 mb-6 font-mono text-lg sm:text-xl text-primary dark:text-primary-light"
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
            {profile.summary}
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
                className="grid h-11 w-11 place-items-center rounded-full glass hover:text-primary hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-[2rem] glass-card grid place-items-center animate-float-slow">
            <div className="h-full w-full rounded-[2rem] bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 grid place-items-center">
              <span className="font-display text-6xl font-bold gradient-text">MN</span>
            </div>
            {/* Replace this block with an <img> of your photo when ready */}
          </div>
          <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3 text-sm font-mono">
            3+ yrs {'\u00b7'} Java / Spring Boot
          </div>
        </motion.div>
      </div>
    </section>
  );
}
