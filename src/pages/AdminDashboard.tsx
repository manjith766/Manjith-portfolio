import { useState } from 'react';
import {
  Award,
  Briefcase,
  Database,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings as SettingsIcon,
  Share2,
  User,
  Wrench,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { firebaseEnabled } from '../lib/firebase';
import { COLLECTIONS, SINGLETON_DOCS } from '../lib/firestoreApi';
import { seedDatabase } from '../lib/seedDatabase';
import { profileSeed, settingsSeed } from '../data/seed';
import CollectionEditor, { FieldConfig } from '../components/admin/CollectionEditor';
import DocumentEditor from '../components/admin/DocumentEditor';

const SECTIONS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'stats', label: 'Stats', icon: LayoutDashboard },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: Database },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'socialLinks', label: 'Social links', icon: Share2 },
  { id: 'settings', label: 'Site settings', icon: SettingsIcon },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

const skillFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'Java' },
  { key: 'categoryName', label: 'Category name', type: 'text', placeholder: 'Backend' },
  { key: 'categorySlug', label: 'Category slug', type: 'text', placeholder: 'backend', hint: 'lowercase, used to group skills' },
  { key: 'proficiencyPct', label: 'Proficiency %', type: 'number', placeholder: '90' },
  { key: 'yearsExperience', label: 'Years experience', type: 'text', placeholder: '2.0' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
];

const projectFields: FieldConfig[] = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'slug', label: 'Slug', type: 'text', hint: 'lowercase-with-dashes, used in links' },
  { key: 'shortDescription', label: 'Short description', type: 'textarea', hint: 'Shown on the project card' },
  { key: 'description', label: 'Full description', type: 'textarea' },
  { key: 'categoryName', label: 'Category', type: 'text', placeholder: 'Full Stack' },
  { key: 'githubUrl', label: 'GitHub URL', type: 'text' },
  { key: 'liveDemoUrl', label: 'Live demo URL', type: 'text' },
  { key: 'isFeatured', label: 'Featured', type: 'boolean' },
  { key: 'features', label: 'Features', type: 'string-list', hint: 'One per line' },
  { key: 'skillNames', label: 'Skill tags', type: 'string-list', hint: 'One per line' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
];

const experienceFields: FieldConfig[] = [
  { key: 'companyName', label: 'Company', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'startDate', label: 'Start date', type: 'text', placeholder: 'YYYY-MM-DD' },
  { key: 'endDate', label: 'End date', type: 'text', placeholder: 'YYYY-MM-DD, leave blank if current' },
  { key: 'isCurrent', label: 'Current role', type: 'boolean' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'responsibilities', label: 'Responsibilities', type: 'string-list', hint: 'One per line' },
  { key: 'skillNames', label: 'Skill tags', type: 'string-list', hint: 'One per line' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
];

const educationFields: FieldConfig[] = [
  { key: 'degree', label: 'Degree', type: 'text' },
  { key: 'institution', label: 'Institution', type: 'text' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'startDate', label: 'Start date', type: 'text', placeholder: 'YYYY-MM-DD' },
  { key: 'endDate', label: 'End date', type: 'text', placeholder: 'YYYY-MM-DD' },
  { key: 'cgpa', label: 'CGPA / grade', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
];

const certificationFields: FieldConfig[] = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'issuer', label: 'Issuer', type: 'text' },
  { key: 'issueDate', label: 'Issue date', type: 'text', placeholder: 'YYYY-MM-DD' },
  { key: 'credentialUrl', label: 'Credential URL', type: 'text' },
  { key: 'imageUrl', label: 'Image URL', type: 'text' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
];

const socialLinkFields: FieldConfig[] = [
  { key: 'platform', label: 'Platform', type: 'text', placeholder: 'GITHUB, LINKEDIN, EMAIL, PHONE, WHATSAPP' },
  { key: 'url', label: 'URL', type: 'text' },
  { key: 'icon', label: 'Icon name', type: 'text', hint: 'lucide-react icon name, e.g. github' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
];

const statFields: FieldConfig[] = [
  { key: 'label', label: 'Label', type: 'text', placeholder: 'Years of experience' },
  { key: 'value', label: 'Value', type: 'number', placeholder: '3' },
  { key: 'suffix', label: 'Suffix', type: 'text', placeholder: '+' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
];

const profileFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'taglines', label: 'Taglines', type: 'string-list', hint: 'One per line — cycles in the hero typing effect' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'summary', label: 'Summary', type: 'textarea' },
  { key: 'objective', label: 'Objective', type: 'textarea' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'whatsapp', label: 'WhatsApp link', type: 'text' },
  { key: 'github', label: 'GitHub URL', type: 'text' },
  { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
  { key: 'leetcode', label: 'LeetCode URL', type: 'text' },
  { key: 'resumeUrl', label: 'Resume URL', type: 'text', hint: 'Link to a hosted PDF' },
  { key: 'strengths', label: 'Strengths', type: 'string-list', hint: 'One per line' },
];

const settingsFields: FieldConfig[] = [
  { key: 'title', label: 'Site title', type: 'text' },
  { key: 'tagline', label: 'Tagline', type: 'text' },
  { key: 'availabilityStatus', label: 'Availability', type: 'text', hint: 'AVAILABLE, OPEN_TO_OFFERS, or UNAVAILABLE' },
  { key: 'yearsExperience', label: 'Years experience', type: 'number' },
  { key: 'location', label: 'Location', type: 'text' },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [section, setSection] = useState<SectionId>('profile');
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  async function handleSeed() {
    if (!confirm('Import starter content into Firestore? Safe on an empty project — running it again on a project you\u2019ve already edited will create duplicate rows in the list collections.')) {
      return;
    }
    setSeeding(true);
    setSeedMessage(null);
    try {
      await seedDatabase();
      setSeedMessage('Starter content imported.');
    } catch (err) {
      setSeedMessage(err instanceof Error ? err.message : 'Could not import starter content.');
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 dark:border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display font-semibold text-lg">Admin</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manjith Nagineni — Portfolio</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="btn-ghost !py-2 text-sm">
            View site
          </a>
          <button onClick={() => logout()} className="btn-ghost !py-2 text-sm">
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </header>

      {!firebaseEnabled && (
        <div className="px-6 py-3 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
          Firebase isn&apos;t configured yet — changes here won&apos;t save until you add your project keys to{' '}
          <code className="chip">.env.local</code>.
        </div>
      )}

      <div className="grid lg:grid-cols-[220px_1fr]">
        <aside className="border-r border-slate-200 dark:border-white/10 p-4 space-y-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-left transition-colors ${
                section === s.id
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <s.icon size={16} /> {s.label}
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10">
            <button onClick={handleSeed} disabled={seeding} className="btn-ghost w-full !py-2 text-xs disabled:opacity-60">
              {seeding ? 'Importing…' : 'Import starter content'}
            </button>
            {seedMessage && <p className="text-xs text-slate-400 mt-2 px-1">{seedMessage}</p>}
          </div>
        </aside>

        <main className="p-6 sm:p-10 max-w-3xl">
          {section === 'profile' && (
            <DocumentEditor
              title="Profile"
              description="Your bio, taglines, and contact links — shown across the Hero, About, Footer, and Contact sections."
              target={SINGLETON_DOCS.profile}
              fields={profileFields}
              seedFallback={profileSeed as unknown as Record<string, unknown>}
            />
          )}
          {section === 'stats' && (
            <CollectionEditor
              title="Stats"
              description="The animated counters near the top of the site (years of experience, APIs shipped, etc.)."
              collectionName={COLLECTIONS.stats}
              fields={statFields}
              emptyItem={{ label: '', value: 0, suffix: '', displayOrder: 0 }}
              titleFields={['label']}
            />
          )}
          {section === 'skills' && (
            <CollectionEditor
              title="Skills"
              description="Grouped by category on the Skills section."
              collectionName={COLLECTIONS.skills}
              fields={skillFields}
              emptyItem={{ name: '', categoryName: '', categorySlug: '', proficiencyPct: 80, yearsExperience: '1.0', displayOrder: 0 }}
              titleFields={['name', 'categoryName']}
            />
          )}
          {section === 'projects' && (
            <CollectionEditor
              title="Projects"
              description="Featured work shown as cards on the Projects section."
              collectionName={COLLECTIONS.projects}
              fields={projectFields}
              emptyItem={{
                title: '',
                slug: '',
                shortDescription: '',
                description: '',
                categoryName: '',
                githubUrl: '',
                liveDemoUrl: '',
                isFeatured: false,
                features: [],
                skillNames: [],
                displayOrder: 0,
              }}
              titleFields={['title']}
            />
          )}
          {section === 'experience' && (
            <CollectionEditor
              title="Experience"
              description="Your work history timeline."
              collectionName={COLLECTIONS.experience}
              fields={experienceFields}
              emptyItem={{
                companyName: '',
                role: '',
                location: '',
                startDate: '',
                endDate: '',
                isCurrent: false,
                description: '',
                responsibilities: [],
                skillNames: [],
                displayOrder: 0,
              }}
              titleFields={['companyName', 'role']}
            />
          )}
          {section === 'education' && (
            <CollectionEditor
              title="Education"
              description="Degrees and coursework."
              collectionName={COLLECTIONS.education}
              fields={educationFields}
              emptyItem={{ degree: '', institution: '', location: '', startDate: '', endDate: '', cgpa: '', description: '', displayOrder: 0 }}
              titleFields={['degree', 'institution']}
            />
          )}
          {section === 'certifications' && (
            <CollectionEditor
              title="Certifications"
              description="Issued certificates and credentials."
              collectionName={COLLECTIONS.certifications}
              fields={certificationFields}
              emptyItem={{ title: '', issuer: '', issueDate: '', credentialUrl: '', imageUrl: '', displayOrder: 0 }}
              titleFields={['title', 'issuer']}
            />
          )}
          {section === 'socialLinks' && (
            <CollectionEditor
              title="Social links"
              description="Used across the Hero, Footer, and Contact sections."
              collectionName={COLLECTIONS.socialLinks}
              fields={socialLinkFields}
              emptyItem={{ platform: '', url: '', icon: '', displayOrder: 0 }}
              titleFields={['platform']}
            />
          )}
          {section === 'settings' && (
            <DocumentEditor
              title="Site settings"
              description="Page title, tagline, and availability status."
              target={SINGLETON_DOCS.settings}
              fields={settingsFields}
              seedFallback={settingsSeed as unknown as Record<string, unknown>}
            />
          )}
        </main>
      </div>
    </div>
  );
}
