import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { firebaseEnabled } from '../lib/firebase';
import { COLLECTIONS } from '../lib/firestoreApi';
import { projectsSeed } from '../data/seed';
import type { FsProject } from '../types/firestore';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { useInView } from '../hooks/useInView';
import { SectionError, SectionLoading } from './SectionState';

export default function Projects() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { data: live, loading, error } = useFirestoreCollection<FsProject>(COLLECTIONS.projects);
  const projects = firebaseEnabled && live.length > 0 ? live : (projectsSeed as FsProject[]);
  const showLoading = firebaseEnabled && loading && live.length === 0;

  return (
    <section id="projects" className="section" ref={ref}>
      <p className="section-eyebrow">Projects</p>
      <h2 className="section-title">Featured work</h2>
      <p className="section-subtitle">Real systems, not tutorials.</p>

      {showLoading && <SectionLoading label="Loading projects…" />}
      {firebaseEnabled && error && <SectionError message={error} />}
      {!showLoading && projects.length === 0 && <p className="text-sm text-slate-400">No projects published yet.</p>}

      {!showLoading && projects.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass-card p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                {project.isFeatured && (
                  <span className="chip !border-transparent text-white bg-gradient-to-r from-emerald-500 to-teal-500">
                    Featured
                  </span>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    className="text-slate-400 hover:text-primary transition-colors ml-auto"
                  >
                    <Github size={20} />
                  </a>
                )}
              </div>

              <h3 className="font-display text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-5">{project.shortDescription}</p>

              {project.features.length > 0 && (
                <ul className="space-y-2 mb-6 text-sm text-slate-600 dark:text-slate-300">
                  {project.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {project.skillNames.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex gap-3">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost !py-2 text-sm">
                    <Github size={16} /> Code
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="btn-ghost !py-2 text-sm">
                    <ExternalLink size={16} /> Live
                  </a>
                )}
                <a href="#contact" className="btn-primary !py-2 text-sm">
                  Discuss this <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
