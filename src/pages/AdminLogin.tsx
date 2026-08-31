import { FormEvent, useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { firebaseEnabled } from '../lib/firebase';

export default function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-6 bg-slate-50 dark:bg-slate-950">
      <div className="glass-card w-full max-w-sm p-8">
        <h1 className="font-display text-xl font-semibold mb-1">Admin sign in</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Sign in with the admin account you created in Firebase Console → Authentication.
        </p>

        {!firebaseEnabled && (
          <p className="text-sm text-amber-500 mb-4">
            Firebase isn&apos;t configured yet — add your project keys to <code className="chip">.env.local</code>{' '}
            first (see .env.example).
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 outline-none focus:border-primary transition-colors"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button type="submit" disabled={submitting || !firebaseEnabled} className="btn-primary w-full disabled:opacity-60">
            <LogIn size={16} /> {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <a href="/" className="block text-center text-xs text-slate-400 hover:text-primary mt-6">
          ← Back to site
        </a>
      </div>
    </div>
  );
}
