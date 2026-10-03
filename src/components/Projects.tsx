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
      <p className="section-subtitle">Real production systems &amp; full-stack applications.</p>

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
                <div className="flex items-center gap-2">
                  {project.isFeatured && (
                    <span className="chip !border-transparent text-white bg-gradient-to-r from-emerald-500 to-teal-500">
                      Featured
                    </span>
                  )}
                  {project.liveDemoUrl && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Project
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="text-slate-400 hover:text-primary transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github size={19} />
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} Live Demo`}
                      className="text-emerald-500 hover:text-emerald-600 transition-colors"
                      title="Open Live Application"
                    >
                      <ExternalLink size={19} />
                    </a>
                  )}
                </div>
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

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-white/5">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 shadow-md shadow-emerald-500/20 transition-all"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost !py-2 text-sm">
                    <Github size={15} /> Code
                  </a>
                )}
                {!project.githubUrl && !project.liveDemoUrl && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 italic py-2">
                    Proprietary company project. Source code not public.
                  </span>
                )}
                <a href="#contact" className="btn-ghost !py-2 text-sm ml-auto">
                  Discuss <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
