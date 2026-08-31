import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { COLLECTIONS } from '../lib/firestoreApi';
import { statsSeed } from '../data/seed';
import type { FsStat } from '../types/firestore';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { useInView } from '../hooks/useInView';

function Counter({ value, inView, suffix }: { value: number; inView: boolean; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { data: live } = useFirestoreCollection<FsStat>(COLLECTIONS.stats);
  const stats = live.length > 0 ? live : (statsSeed as FsStat[]);

  return (
    <section className="section !py-16" ref={ref}>
      <div className="glass-card p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-1">
              <Counter value={stat.value} inView={inView} suffix={stat.suffix} />
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
