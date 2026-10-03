import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogIn, Menu, Moon, ShieldCheck, Sun, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-[0_2px_20px_rgba(15,23,42,0.06)]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-10 lg:px-16 h-16">
        <a href="#top" className="font-display font-bold text-lg tracking-tight">
          <span className="gradient-text">MN</span>
          <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-mono text-sm ml-2">
            /manjith
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-primary dark:hover:text-primary-light transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full glass hover:border-primary/40 transition-colors"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Login / Admin Action Button */}
          {user ? (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 shadow-sm transition-all"
              title="Open Admin Dashboard to Edit, Update & Delete"
            >
              <ShieldCheck size={14} />
              <span className="hidden sm:inline">Admin Panel</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium glass border border-slate-200 dark:border-white/10 hover:border-primary/40 text-slate-700 dark:text-slate-200 hover:text-primary transition-all"
              title="Admin Login to Edit, Update & Delete"
            >
              <LogIn size={14} />
              <span>Login</span>
            </Link>
          )}

          <a href="#contact" className="hidden sm:inline-flex btn-primary !px-5 !py-2.5 text-sm">
            Hire me
          </a>

          <button
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full glass"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass border-t border-slate-200 dark:border-white/10"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-slate-600 dark:text-slate-300 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 border-t border-slate-200 dark:border-white/10 mt-2">
                <Link
                  to={user ? '/admin' : '/admin/login'}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-medium text-primary"
                >
                  {user ? <ShieldCheck size={16} /> : <LogIn size={16} />}
                  <span>{user ? 'Admin Dashboard (Edit/Update/Delete)' : 'Admin Login (Edit/Update/Delete)'}</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
