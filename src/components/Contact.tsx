import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Github, Linkedin, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useProfile, useSocialLinks } from '../hooks/useSiteData';

type Status = 'idle' | 'sent';

export default function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { profile } = useProfile();
  const { find } = useSocialLinks();
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const githubHref = find('github', profile.github);
  const linkedinHref = find('linkedin', profile.linkedin);
  const whatsappHref = find('whatsapp', profile.whatsapp);

  // No backend to POST to — this is a fully static site. Submitting builds a
  // mailto: link from the form fields and hands off to the visitor's own
  // email client, which is the standard pattern for contact forms on
  // static/no-backend sites.
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const subject = form.subject || 'Portfolio inquiry';
    const bodyLines = [
      form.message,
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
    ].filter(Boolean);

    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join('\n')
    )}`;

    window.location.href = mailto;
    setStatus('sent');
  }

  return (
    <section id="contact" className="section" ref={ref}>
      <p className="section-eyebrow">Contact</p>
      <h2 className="section-title">Let&apos;s build something reliable</h2>
      <p className="section-subtitle">
        Open to full-time Java backend roles and backend architecture consulting. The fastest way
        to reach me is email or LinkedIn.
      </p>

      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {[
            { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
            { icon: Linkedin, label: 'LinkedIn — Manjith Nagineni', href: linkedinHref },
            { icon: Github, label: 'GitHub — manjith766', href: githubHref },
            { icon: MessageCircle, label: 'WhatsApp', href: whatsappHref },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="glass-card flex items-center gap-4 p-5 hover:border-primary/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                <item.icon size={18} />
              </span>
              <span className="text-slate-700 dark:text-slate-200 font-medium">{item.label}</span>
            </a>
          ))}

          <div className="glass-card flex items-center gap-4 p-5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
              <MapPin size={18} />
            </span>
            <span className="text-slate-700 dark:text-slate-200 font-medium">
              {profile.location} — open to remote &amp; hybrid
            </span>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 outline-none focus:border-primary transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 outline-none focus:border-primary transition-colors"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="phone">
                Phone <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 outline-none focus:border-primary transition-colors"
                placeholder="+91 ..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 outline-none focus:border-primary transition-colors"
                placeholder="Role, project, or opportunity"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 outline-none focus:border-primary transition-colors resize-none"
              placeholder="Tell me a bit about the role or project"
            />
          </div>

          <button type="submit" className="btn-primary w-full sm:w-auto">
            {status === 'sent' ? <CheckCircle2 size={17} /> : <Send size={17} />}
            {status === 'sent' ? 'Email client opened' : 'Send message'}
          </button>

          {status === 'sent' && (
            <p className="text-xs text-emerald-500">
              Your email client should have opened with the message pre-filled — just hit send there.
            </p>
          )}
          {status === 'idle' && (
            <p className="text-xs text-slate-400">
              This opens your email client with the message pre-filled — no server involved.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
