import { motion } from 'framer-motion';
import { architectureEdges, architectureNodes } from '../data/profile';
import { useInView } from '../hooks/useInView';

function nodeById(id: string) {
  return architectureNodes.find((n) => n.id === id)!;
}

export default function Architecture() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="architecture" className="section" ref={ref}>
      <p className="section-eyebrow">System design</p>
      <h2 className="section-title">How a request actually moves</h2>
      <p className="section-subtitle">
        The microservice layout behind the JippyFood &amp; Mart platform — the same shape I reach
        for whenever a system needs to scale service by service instead of all at once.
      </p>

      <div className="glass-card p-6 sm:p-10">
        <div className="relative w-full aspect-[16/13] sm:aspect-[16/10]">
          {/* Edges */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            {architectureEdges.map((edge, i) => {
              const from = nodeById(edge.from);
              const to = nodeById(edge.to);
              return (
                <line
                  key={i}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  className="stroke-slate-300 dark:stroke-white/10"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                />
              );
            })}
          </svg>

          {/* Traveling pulses along each edge */}
          {inView &&
            architectureEdges.map((edge, i) => {
              const from = nodeById(edge.from);
              const to = nodeById(edge.to);
              return (
                <motion.span
                  key={`pulse-${i}`}
                  className="absolute h-2 w-2 -ml-1 -mt-1 rounded-full bg-secondary shadow-[0_0_10px_2px_rgba(6,182,212,0.6)]"
                  animate={{
                    left: [`${from.x}%`, `${to.x}%`],
                    top: [`${from.y}%`, `${to.y}%`],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.35,
                    repeat: Infinity,
                    repeatDelay: architectureEdges.length * 0.35,
                    ease: 'easeInOut',
                  }}
                />
              );
            })}

          {/* Nodes */}
          {architectureNodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 glass-card px-3 py-2 sm:px-4 sm:py-2.5 text-center min-w-[92px] sm:min-w-[120px]"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="text-[11px] sm:text-xs font-semibold">{node.label}</div>
              <div className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                {node.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
