import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { firebaseEnabled } from '../lib/firebase';
import { COLLECTIONS } from '../lib/firestoreApi';
import { skillsSeed } from '../data/seed';
import type { FsSkill } from '../types/firestore';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { useInView } from '../hooks/useInView';
import { SectionError, SectionLoading } from './SectionState';

interface SkillGroup {
  id: string;
  label: string;
  skills: { name: string; level: number }[];
}

export default function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { data: live, loading, error } = useFirestoreCollection<FsSkill>(COLLECTIONS.skills);
  const [active, setActive] = useState<string | null>(null);

  const skills = firebaseEnabled && live.length > 0 ? live : (skillsSeed as FsSkill[]);

  const groups: SkillGroup[] = useMemo(() => {
    const byCategory = new Map<string, SkillGroup>();
    for (const skill of skills) {
      const key = skill.categorySlug || 'other';
      if (!byCategory.has(key)) {
        byCategory.set(key, { id: key, label: skill.categoryName || 'Other', skills: [] });
      }
      byCategory.get(key)!.skills.push({ name: skill.name, level: skill.proficiencyPct ?? 0 });
    }
    return Array.from(byCategory.values());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills]);

  const activeId = active ?? groups[0]?.id ?? null;
  const category = groups.find((g) => g.id === activeId);
  const showLoading = firebaseEnabled && loading && live.length === 0;

  return (
    <section id="skills" className="section" ref={ref}>
      <p className="section-eyebrow">Skills</p>
      <h2 className="section-title">Technical toolbox</h2>
      <p className="section-subtitle">
        Grouped the way a request actually moves through the systems I build — interface, gateway,
        application, data, and infrastructure.
      </p>

      {showLoading && <SectionLoading label="Loading skills…" />}
      {firebaseEnabled && error && <SectionError message={error} />}

      {!showLoading && category && (
        <>
          <div className="flex flex-wrap gap-2 mb-10">
            {groups.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeId === cat.id
                    ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-glow'
                    : 'glass border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-primary/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass-card p-8"
          >
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
              {category.skills.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700 dark:text-slate-200">{skill.name}</span>
                    <span className="font-mono text-xs text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 0.9, delay: i * 0.05, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {!showLoading && groups.length === 0 && <p className="text-sm text-slate-400">No skills published yet.</p>}
    </section>
  );
}
