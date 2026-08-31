import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { firebaseEnabled } from '../lib/firebase';
import { COLLECTIONS } from '../lib/firestoreApi';
import { educationSeed } from '../data/seed';
import type { FsEducation } from '../types/firestore';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { useInView } from '../hooks/useInView';
import { SectionError, SectionLoading } from './SectionState';

function formatPeriod(startDate: string, endDate: string): string {
  const start = new Date(startDate).getFullYear();
  if (!endDate) return `${start}`;
  const end = new Date(endDate).getFullYear();
  return start === end ? `${start}` : `${start} — ${end}`;
}

export default function Education() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { data: live, loading, error } = useFirestoreCollection<FsEducation>(COLLECTIONS.education);
  const education = firebaseEnabled && live.length > 0 ? live : (educationSeed as FsEducation[]);
  const showLoading = firebaseEnabled && loading && live.length === 0;

  return (
    <section id="education" className="section" ref={ref}>
      <p className="section-eyebrow">Education</p>
      <h2 className="section-title">Academic background</h2>
      <p className="section-subtitle">Degrees and coursework, most recent first.</p>

      {showLoading && <SectionLoading label="Loading education…" />}
      {firebaseEnabled && error && <SectionError message={error} />}
      {!showLoading && education.length === 0 && (
        <p className="text-sm text-slate-400">No education entries published yet.</p>
      )}

      {!showLoading && education.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-6">
          {education.map((item, i) => (
            <motion.div
              key={`${item.degree}-${item.institution}`}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                  <GraduationCap size={18} />
                </span>
                <div>
                  <div className="font-mono text-xs text-primary dark:text-primary-light mb-1">
                    {formatPeriod(item.startDate, item.endDate)}
                    {item.cgpa ? ` · CGPA ${item.cgpa}` : ''}
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1">{item.degree}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                    {item.institution}
                    {item.location ? ` · ${item.location}` : ''}
                  </p>
                  {item.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
