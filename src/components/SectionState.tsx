import { AlertCircle, Loader2 } from 'lucide-react';

export function SectionLoading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="glass-card flex items-center justify-center gap-3 p-10 text-slate-500 dark:text-slate-400">
      <Loader2 size={18} className="animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function SectionError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="glass-card flex flex-col items-center gap-3 p-10 text-center">
      <AlertCircle size={22} className="text-red-400" />
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-ghost !py-2 text-sm">
          Try again
        </button>
      )}
    </div>
  );
}
