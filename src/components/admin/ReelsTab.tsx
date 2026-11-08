import React, { useState } from 'react';
import { Reel } from '@/lib/types';
import MediaUploader from './MediaUploader';
import { Plus, Edit2, Trash2, X, Play } from 'lucide-react';

interface ReelsTabProps {
  reels: Reel[];
  onRefresh: () => void;
}

export default function ReelsTab({ reels, onRefresh }: ReelsTabProps) {
  const [editingReel, setEditingReel] = useState<Partial<Reel> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const openNewModal = () => {
    setEditingReel({
      title: '',
      category: 'Drone Reel',
      videoUrl: '',
      coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
      description: '',
      duration: '0:15',
      order: reels.length + 1,
      published: true,
      isDemo: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (r: Reel) => {
    setEditingReel({ ...r });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReel?.title || !editingReel?.videoUrl) {
      alert('Lütfen başlık ve video bağlantısını doldurunuz.');
      return;
    }

    setSaving(true);
    try {
      const isEdit = !!editingReel.id;
      const url = isEdit ? `/api/reels/${editingReel.id}` : '/api/reels';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingReel),
      });

      if (!res.ok) throw new Error('Kaydedilemedi');
      setIsModalOpen(false);
      setEditingReel(null);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/reels/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Silinemedi');
      setDeleteConfirmId(null);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Silme hatası');
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
            9:16 Dikey Format (Reels) Yönetimi
          </h2>
          <p className="text-xs text-white/50 font-mono mt-0.5">
            Toplam {reels.length} adet dikey video kaydı.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-white/90 flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Reel Ekle</span>
        </button>
      </div>

      {/* Reels Grid Preview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="group relative rounded-xl bg-[#121215] border border-white/10 overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[9/16] overflow-hidden bg-black/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={reel.coverImage}
                alt={reel.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono text-white/80">
                  {reel.category}
                </span>
                {reel.isDemo && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[8px] font-mono text-amber-300">
                    DEMO
                  </span>
                )}
              </div>

              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-xs font-bold text-white line-clamp-1">{reel.title}</div>
                <div className="text-[10px] text-white/40 font-mono mt-0.5">
                  {reel.duration} • {reel.published ? 'Yayında' : 'Gizli'}
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => openEditModal(reel)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Düzenle"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeleteConfirmId(reel.id)}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white font-display">Reel Videosunu Sil</h3>
            <p className="text-xs text-white/60">
              Bu dikey videoyu silmek istediğinize emin misiniz?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-full bg-white/10 text-white text-xs"
              >
                İptal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold text-xs"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && editingReel && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-2xl bg-[#141418] border border-white/10 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
                {editingReel.id ? 'Reel Videosunu Düzenle' : 'Yeni Reel Ekle'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Reel Başlığı *</label>
                <input
                  type="text"
                  required
                  value={editingReel.title || ''}
                  onChange={(e) => setEditingReel({ ...editingReel, title: e.target.value })}
                  placeholder="Örn: Akdeniz Sahil Uçuşu"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Kategori</label>
                  <select
                    value={editingReel.category || 'Drone Reel'}
                    onChange={(e) => setEditingReel({ ...editingReel, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141418] border border-white/10 text-white text-xs"
                  >
                    <option value="Drone Reel">Drone Reel</option>
                    <option value="Mekân & Atmosfer">Mekân & Atmosfer</option>
                    <option value="Gastronomi">Gastronomi</option>
                    <option value="Mimari">Mimari</option>
                    <option value="Otel & Turizm">Otel & Turizm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Video Süresi</label>
                  <input
                    type="text"
                    value={editingReel.duration || '0:15'}
                    onChange={(e) => setEditingReel({ ...editingReel, duration: e.target.value })}
                    placeholder="0:15"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <MediaUploader
                label="9:16 Video Dosyası veya Bağlantısı *"
                value={editingReel.videoUrl || ''}
                onChange={(url) => setEditingReel({ ...editingReel, videoUrl: url })}
                accept="video"
                placeholder="https://... direct mp4 url"
                description="MP4 formatında dikey video yükleyin veya URL girin"
              />

              <MediaUploader
                label="Kapak Görseli (Poster) *"
                value={editingReel.coverImage || ''}
                onChange={(url) => setEditingReel({ ...editingReel, coverImage: url })}
                accept="image"
                description="9:16 oranında önizleme kapağı"
              />

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Açıklama</label>
                <textarea
                  rows={2}
                  value={editingReel.description || ''}
                  onChange={(e) => setEditingReel({ ...editingReel, description: e.target.value })}
                  placeholder="Kısa içerik bilgisi..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-white/80">
                  <input
                    type="checkbox"
                    checked={editingReel.published ?? true}
                    onChange={(e) => setEditingReel({ ...editingReel, published: e.target.checked })}
                    className="rounded bg-white/10 border-white/20"
                  />
                  <span>Yayında Göster</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-amber-300">
                  <input
                    type="checkbox"
                    checked={editingReel.isDemo ?? false}
                    onChange={(e) => setEditingReel({ ...editingReel, isDemo: e.target.checked })}
                    className="rounded bg-white/10 border-white/20"
                  />
                  <span>Demo Olarak İşaretle</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-full bg-white/10 text-white text-xs font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white/90 disabled:opacity-50"
                >
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
