import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const PLACEHOLDER_SLOTS = [1, 2, 3];

export default function Testimonials() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="testimonials" className="section" ref={ref}>
      <p className="section-eyebrow">Testimonials</p>
      <h2 className="section-title">What clients &amp; teammates say</h2>
      <p className="section-subtitle">
        No testimonials on file yet — these are empty, clearly-marked slots. Drop in real
        quotes from managers, clients, or teammates in{' '}
        <code className="chip">src/data/profile.ts</code> and this section fills itself in.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {PLACEHOLDER_SLOTS.map((slot, i) => (
          <motion.div
            key={slot}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card p-7 border-dashed"
          >
            <Quote size={22} className="text-primary/50 mb-4" />
            <p className="text-slate-400 dark:text-slate-500 italic mb-6">
              Add a real testimonial here — a sentence or two on the outcome you delivered.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/15" />
              <div>
                <div className="text-sm font-medium text-slate-400">Reviewer name</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">Role, Company</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
