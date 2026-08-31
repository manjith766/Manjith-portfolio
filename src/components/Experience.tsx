import { motion } from 'framer-motion';
import { firebaseEnabled } from '../lib/firebase';
import { COLLECTIONS } from '../lib/firestoreApi';
import { experienceSeed } from '../data/seed';
import type { FsExperience } from '../types/firestore';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { useInView } from '../hooks/useInView';
import { SectionError, SectionLoading } from './SectionState';

function formatPeriod(startDate: string, endDate: string, isCurrent: boolean): string {
  const start = new Date(startDate).getFullYear();
  if (isCurrent || !endDate) return `${start} — Present`;
  const end = new Date(endDate).getFullYear();
  return start === end ? `${start}` : `${start} — ${end}`;
}

export default function Experience() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { data: live, loading, error } = useFirestoreCollection<FsExperience>(COLLECTIONS.experience);
  const experience = firebaseEnabled && live.length > 0 ? live : (experienceSeed as FsExperience[]);
  const showLoading = firebaseEnabled && loading && live.length === 0;

  return (
    <section id="experience" className="section" ref={ref}>
      <p className="section-eyebrow">Journey</p>
      <h2 className="section-title">Experience &amp; timeline</h2>
      <p className="section-subtitle">
        From professional Spring Boot work to the systems I build on my own time.
      </p>

      {showLoading && <SectionLoading label="Loading experience…" />}
      {firebaseEnabled && error && <SectionError message={error} />}
      {!showLoading && experience.length === 0 && (
        <p className="text-sm text-slate-400">No experience entries published yet.</p>
      )}

      {!showLoading && experience.length > 0 && (
        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-secondary" />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <motion.div
                key={`${item.companyName}-${item.role}`}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <span className="absolute -left-8 sm:-left-10 top-1.5 h-4 w-4 rounded-full bg-gradient-to-br from-primary to-accent ring-4 ring-white dark:ring-slate-950" />
                <div className="glass-card p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-primary dark:text-primary-light">
                      {formatPeriod(item.startDate, item.endDate, item.isCurrent)}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">/</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {item.companyName}
                      {item.location ? ` · ${item.location}` : ''}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.role}</h3>
                  {item.description && (
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{item.description}</p>
                  )}
                  {item.responsibilities.length > 0 && (
                    <ul className="space-y-1.5 mb-4 text-sm text-slate-600 dark:text-slate-300">
                      {item.responsibilities.map((r) => (
                        <li key={r} className="flex gap-2">
                          <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {item.skillNames.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
