import React, { useState } from 'react';
import { Upload, Check, Loader2, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: 'image' | 'video' | 'all';
  placeholder?: string;
  description?: string;
}

export default function MediaUploader({
  label,
  value,
  onChange,
  accept = 'image',
  placeholder = 'https://...',
  description,
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            base64Data,
            contentType: file.type,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Dosya yüklenemedi');
        onChange(data.url);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message || 'Yükleme başarısız');
    } finally {
      setUploading(false);
    }
  };

  const isVideo =
    value?.endsWith('.mp4') ||
    value?.endsWith('.webm') ||
    value?.includes('mixkit') ||
    value?.includes('video');

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-white/80 font-mono">
          {label}
        </label>
        {description && (
          <span className="text-[10px] text-white/40">{description}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-white/40 font-mono"
        />

        <label className="relative cursor-pointer shrink-0">
          <input
            type="file"
            onChange={handleFileUpload}
            accept={
              accept === 'image'
                ? 'image/*'
                : accept === 'video'
                ? 'video/mp4,video/webm'
                : 'image/*,video/*'
            }
            className="hidden"
            disabled={uploading}
          />
          <div className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors">
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span>{uploading ? 'Yükleniyor...' : 'Dosya Seç'}</span>
          </div>
        </label>
      </div>

      {error && <span className="text-[10px] text-red-400 block">{error}</span>}

      {/* Tiny Preview */}
      {value && (
        <div className="mt-2 relative w-32 h-20 rounded-lg overflow-hidden bg-black/60 border border-white/10">
          {isVideo ? (
            <video src={value} className="w-full h-full object-cover" muted />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Önizleme" className="w-full h-full object-cover" />
          )}
        </div>
      )}
    </div>
  );
}
