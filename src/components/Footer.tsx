import { Github, Linkedin, Mail } from 'lucide-react';
import { useProfile, useSocialLinks } from '../hooks/useSiteData';

const QUICK_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const { profile } = useProfile();
  const { find } = useSocialLinks();
  const resumeHref = profile.resumeUrl || '#';

  return (
    <footer className="border-t border-slate-200 dark:border-white/10">
      <div className="section !py-12 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="font-display font-bold text-lg gradient-text mb-2">
            {profile.name}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {profile.role} · {profile.location}
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-200">
            Quick links
          </div>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-primary transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={resumeHref} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                Download résumé
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-200">
            Elsewhere
          </div>
          <div className="flex gap-3">
            {[
              { icon: Github, href: find('github', profile.github) },
              { icon: Linkedin, href: find('linkedin', profile.linkedin) },
              { icon: Mail, href: `mailto:${profile.email}` },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full glass hover:text-primary hover:-translate-y-1 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 dark:text-slate-500 pb-8 space-y-1">
        <div>
          &copy; {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind
          CSS &amp; Framer Motion.
        </div>
        <div>
          <a href="/admin" className="hover:text-primary transition-colors">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
