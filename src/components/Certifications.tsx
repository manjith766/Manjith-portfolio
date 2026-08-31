import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { firebaseEnabled } from '../lib/firebase';
import { COLLECTIONS } from '../lib/firestoreApi';
import { certificationsSeed } from '../data/seed';
import type { FsCertification } from '../types/firestore';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { useInView } from '../hooks/useInView';
import { SectionError, SectionLoading } from './SectionState';

export default function Certifications() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { data: live, loading, error } = useFirestoreCollection<FsCertification>(COLLECTIONS.certifications);
  const certifications = firebaseEnabled && live.length > 0 ? live : (certificationsSeed as FsCertification[]);
  const showLoading = firebaseEnabled && loading && live.length === 0;

  return (
    <section id="certifications" className="section" ref={ref}>
      <p className="section-eyebrow">Certifications</p>
      <h2 className="section-title">Credentials</h2>
      <p className="section-subtitle">Issued certificates, editable from /admin.</p>

      {showLoading && <SectionLoading label="Loading certifications…" />}
      {firebaseEnabled && error && <SectionError message={error} />}

      {!showLoading && certifications.length === 0 && (
        <p className="text-sm text-slate-400 dark:text-slate-500">
          None listed yet — add certifications from /admin to have them appear here.
        </p>
      )}

      {!showLoading && certifications.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => {
            const card = (
              <>
                <div className="h-14 w-14 rounded-2xl grid place-items-center bg-gradient-to-br from-primary/10 to-accent/10 mb-4 overflow-hidden">
                  {cert.imageUrl ? (
                    <img src={cert.imageUrl} alt={cert.title} className="h-full w-full object-cover" />
                  ) : (
                    <Award size={24} className="text-primary/60" />
                  )}
                </div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{cert.title}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">
                  {cert.issuer} &middot; {new Date(cert.issueDate).getFullYear()}
                </div>
              </>
            );

            return (
              <motion.div
                key={`${cert.title}-${cert.issuer}`}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 flex flex-col items-center text-center"
              >
                {cert.credentialUrl ? (
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
