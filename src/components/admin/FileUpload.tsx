import { ChangeEvent, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, ExternalLink } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firebaseEnabled } from '../../lib/firebase';

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
  label?: string;
}

export default function FileUpload({
  value,
  onChange,
  folder = 'uploads',
  accept = 'image/*',
  label = 'Upload image or file',
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!firebaseEnabled) {
      setError('Firebase is not configured yet. Check your .env file.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const storageRef = ref(storage, `${folder}/${Date.now()}_${cleanFileName}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      onChange(downloadUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not upload file to Firebase Storage.');
    } finally {
      setUploading(false);
    }
  }

  function handleClear() {
    onChange('');
    setError(null);
  }

  const isImage = value && (value.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) || value.includes('firebasestorage') || value.includes('images'));

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or upload a file"
          className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm outline-none focus:border-primary transition-colors"
        />

        <label
          className={`cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-white/10 glass hover:border-primary/40 text-slate-700 dark:text-slate-200 shrink-0 transition-colors ${
            uploading ? 'opacity-50 pointer-events-none' : ''
          }`}
          title={label}
        >
          {uploading ? <Loader2 size={14} className="animate-spin text-primary" /> : <Upload size={14} />}
          <span>{uploading ? 'Uploading…' : 'Upload'}</span>
          <input
            type="file"
            accept={accept}
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="px-2.5 py-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-500/10 border border-transparent transition-colors"
            title="Clear / Delete URL"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {value && (
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
          {isImage ? (
            <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-200 dark:bg-white/10 shrink-0">
              <img src={value} alt="Preview" className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-lg grid place-items-center bg-slate-200 dark:bg-white/10 text-slate-500 shrink-0">
              <ImageIcon size={18} />
            </div>
          )}
          <div className="flex-1 min-w-0 truncate">
            <span className="text-slate-500 dark:text-slate-400 block truncate">{value}</span>
          </div>
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline flex items-center gap-1 shrink-0 px-2 py-1"
          >
            <ExternalLink size={12} /> View
          </a>
        </div>
      )}
    </div>
  );
}
