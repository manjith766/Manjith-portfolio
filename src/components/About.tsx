import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap, MapPin, Target } from 'lucide-react';
import { useProfile } from '../hooks/useSiteData';
import { useInView } from '../hooks/useInView';

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
        About
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="section-title"
      >
        Backend-first, full stack when it counts
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
              <MapPin size={16} className="text-primary" /> {profile.location}
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
            <Target size={19} className="text-primary" /> What I bring
          </div>
          <ul className="space-y-4">
            {profile.strengths.map((s) => (
              <li key={s} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <CheckCircle2 size={18} className="text-secondary shrink-0 mt-0.5" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
