import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { setSingletonDoc } from '../../lib/firestoreApi';
import { useFirestoreDocument } from '../../hooks/useFirestoreDocument';
import type { FieldConfig } from './CollectionEditor';

interface Props {
  title: string;
  description: string;
  target: { collection: string; id: string };
  fields: FieldConfig[];
  seedFallback: Record<string, unknown>;
}

type Draft = Record<string, unknown>;

function toDraft(item: Record<string, unknown>, fields: FieldConfig[]): Draft {
  const draft: Draft = {};
  for (const f of fields) {
    const value = item[f.key];
    draft[f.key] = f.type === 'string-list' && Array.isArray(value) ? (value as string[]).join('\n') : value;
  }
  return draft;
}

function fromDraft(draft: Draft, fields: FieldConfig[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const raw = draft[f.key];
    if (f.type === 'string-list') {
      out[f.key] = String(raw ?? '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (f.type === 'number') {
      out[f.key] = Number(raw) || 0;
    } else if (f.type === 'boolean') {
      out[f.key] = Boolean(raw);
    } else {
      out[f.key] = raw ?? '';
    }
  }
  return out;
}

export default function DocumentEditor({ title, description, target, fields, seedFallback }: Props) {
  const { data, loading, error } = useFirestoreDocument<Record<string, unknown>>(target.collection, target.id);
  const [draft, setDraft] = useState<Draft>({});
  const [initialized, setInitialized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !initialized) {
      setDraft(toDraft(data ?? seedFallback, fields));
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

  async function save() {
    setSaving(true);
    setFormError(null);
    setSaved(false);
    try {
      await setSingletonDoc(target, fromDraft(draft, fields));
      setSaved(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not save.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2 className="font-display text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">{description}</p>

      {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
      {!initialized ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : (
        <div className="glass-card p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1.5">{f.label}</label>
              {f.hint && <p className="text-xs text-slate-400 mb-1.5">{f.hint}</p>}
              {f.type === 'textarea' || f.type === 'string-list' ? (
                <textarea
                  rows={f.type === 'string-list' ? 4 : 3}
                  value={String(draft[f.key] ?? '')}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 outline-none focus:border-primary transition-colors resize-none text-sm"
                />
              ) : f.type === 'boolean' ? (
                <input
                  type="checkbox"
                  checked={Boolean(draft[f.key])}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.checked }))}
                  className="h-5 w-5"
                />
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={draft[f.key] === undefined ? '' : String(draft[f.key])}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 outline-none focus:border-primary transition-colors text-sm"
                />
              )}
            </div>
          ))}

          {formError && <p className="text-xs text-red-400">{formError}</p>}
          {saved && <p className="text-xs text-emerald-500">Saved.</p>}

          <button onClick={save} disabled={saving} className="btn-primary !py-2 text-sm disabled:opacity-60">
            <Save size={15} /> {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      )}
    </div>
  );
}
