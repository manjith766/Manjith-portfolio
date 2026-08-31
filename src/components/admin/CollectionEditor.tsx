import { useEffect, useState } from 'react';
import { Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import { CollectionName, addItem, deleteItem, updateItem } from '../../lib/firestoreApi';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';

export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'string-list';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  hint?: string;
}

interface Props {
  title: string;
  description: string;
  collectionName: CollectionName;
  fields: FieldConfig[];
  emptyItem: Record<string, unknown>;
  /** Field(s) used to build a readable row label in the list, e.g. ['name'] or ['title']. */
  titleFields: string[];
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

export default function CollectionEditor({ title, description, collectionName, fields, emptyItem, titleFields }: Props) {
  const { data, loading, error } = useFirestoreCollection<{ id: string } & Record<string, unknown>>(collectionName);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Draft>({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (editingId) {
      const item = data.find((d) => d.id === editingId);
      if (item) setDraft(toDraft(item, fields));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingId]);

  function startCreate() {
    setCreating(true);
    setEditingId(null);
    setDraft(toDraft({ ...emptyItem, displayOrder: data.length + 1 }, fields));
    setFormError(null);
  }

  function startEdit(id: string) {
    setEditingId(id);
    setCreating(false);
    setFormError(null);
  }

  function cancel() {
    setEditingId(null);
    setCreating(false);
    setFormError(null);
  }

  async function save() {
    setSaving(true);
    setFormError(null);
    try {
      const payload = fromDraft(draft, fields);
      if (creating) {
        await addItem(collectionName, payload);
      } else if (editingId) {
        await updateItem(collectionName, editingId, payload);
      }
      cancel();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not save this item.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    try {
      await deleteItem(collectionName, id);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not delete this item.');
    }
  }

  const isFormOpen = creating || editingId !== null;

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        {!isFormOpen && (
          <button onClick={startCreate} className="btn-primary !py-2 text-sm shrink-0">
            <Plus size={16} /> Add
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
      {loading && data.length === 0 && <p className="text-sm text-slate-400 mt-4">Loading…</p>}

      {isFormOpen && (
        <div className="glass-card p-6 my-5 space-y-4">
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

          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="btn-primary !py-2 text-sm disabled:opacity-60">
              <Save size={15} /> {saving ? 'Saving…' : 'Save'}
            </button>
            <button onClick={cancel} className="btn-ghost !py-2 text-sm">
              <X size={15} /> Cancel
            </button>
          </div>
        </div>
      )}

      {!isFormOpen && data.length === 0 && !loading && (
        <p className="text-sm text-slate-400 mt-4">Nothing here yet — click Add to create the first entry.</p>
      )}

      {!isFormOpen && data.length > 0 && (
        <ul className="divide-y divide-slate-200 dark:divide-white/10 mt-4">
          {data.map((item) => {
            const label = titleFields.map((k) => item[k]).filter(Boolean).join(' — ') || item.id;
            return (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                <span className="text-sm text-slate-700 dark:text-slate-200 truncate">{String(label)}</span>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(item.id)} className="btn-ghost !py-1.5 !px-3 text-xs">
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="btn-ghost !py-1.5 !px-3 text-xs !border-red-300 dark:!border-red-500/30 text-red-500 hover:!border-red-400"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
