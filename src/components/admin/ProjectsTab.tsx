import React, { useState } from 'react';
import { Project } from '@/lib/types';
import MediaUploader from './MediaUploader';
import { Plus, Edit2, Trash2, Check, X, Eye, EyeOff, Film, Sparkles } from 'lucide-react';

interface ProjectsTabProps {
  projects: Project[];
  onRefresh: () => void;
}

export default function ProjectsTab({ projects, onRefresh }: ProjectsTabProps) {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');

  const openNewModal = () => {
    setEditingProject({
      title: '',
      subtitle: '',
      category: 'Drone & Hava Çekimi',
      coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1600&auto=format&fit=crop',
      videoUrl: '',
      year: new Date().getFullYear().toString(),
      client: '',
      description: '',
      fullDescription: '',
      deliverables: ['4K Sinematik Tanıtım Filmi', 'Sosyal Medya Versiyonları (9:16)'],
      gallery: [],
      isFeatured: true,
      order: projects.length + 1,
      status: 'published',
      isDemo: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    setSaving(true);
    try {
      const isEdit = !!editingProject.id;
      const url = isEdit ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      if (!res.ok) throw new Error('Kaydedilemedi');
      setIsModalOpen(false);
      setEditingProject(null);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Silinemedi');
      setDeleteConfirmId(null);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Silme hatası');
    }
  };

  const addGalleryItem = () => {
    if (!newGalleryUrl.trim()) return;
    const current = editingProject?.gallery || [];
    setEditingProject({ ...editingProject, gallery: [...current, newGalleryUrl.trim()] });
    setNewGalleryUrl('');
  };

  const removeGalleryItem = (index: number) => {
    const current = editingProject?.gallery || [];
    setEditingProject({
      ...editingProject,
      gallery: current.filter((_, i) => i !== index),
    });
  };

  const addDeliverable = () => {
    if (!newDeliverable.trim()) return;
    const current = editingProject?.deliverables || [];
    setEditingProject({ ...editingProject, deliverables: [...current, newDeliverable.trim()] });
    setNewDeliverable('');
  };

  const removeDeliverable = (index: number) => {
    const current = editingProject?.deliverables || [];
    setEditingProject({
      ...editingProject,
      deliverables: current.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
            Portfolyo & Proje Yönetimi
          </h2>
          <p className="text-xs text-white/50 font-mono mt-0.5">
            Toplam {projects.length} adet proje kayıtlı.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-white/90 flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Proje Ekle</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl bg-[#121215] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] text-white/50 border-b border-white/5 font-mono uppercase">
              <tr>
                <th className="py-3 px-4">Kapak</th>
                <th className="py-3 px-4">Proje Başlığı</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Yıl</th>
                <th className="py-3 px-4">Durum</th>
                <th className="py-3 px-4">Ana Sayfa</th>
                <th className="py-3 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="w-14 h-10 rounded-md overflow-hidden bg-black/50 border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{p.title}</div>
                    <div className="text-[10px] text-white/40 font-mono">{p.slug}</div>
                    {p.isDemo && (
                      <span className="inline-block px-1.5 py-0.2 rounded bg-amber-500/20 text-[9px] text-amber-300 font-mono mt-1">
                        DEMO KONSEPT
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-white/70">{p.category}</td>
                  <td className="py-3 px-4 font-mono text-white/50">{p.year}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        p.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {p.status === 'published' ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {p.isFeatured ? (
                      <span className="text-emerald-400 font-mono">Evet</span>
                    ) : (
                      <span className="text-white/30 font-mono">Gizli</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                        title="Düzenle"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white font-display">Projeyi Sil</h3>
            <p className="text-xs text-white/60">
              Bu projeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
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

      {/* Edit / Add Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl bg-[#141418] border border-white/10 shadow-2xl space-y-6 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
                {editingProject.id ? 'Projeyi Düzenle' : 'Yeni Proje Oluştur'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Proje Başlığı *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="Örn: Ege Kıyı Oteli Tanıtımı"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Kategori</label>
                  <select
                    value={editingProject.category || 'Drone & Hava Çekimi'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#141418] border border-white/10 text-white text-xs"
                  >
                    <option value="Drone & Hava Çekimi">Drone & Hava Çekimi</option>
                    <option value="Sinematik Tanıtım">Sinematik Tanıtım</option>
                    <option value="Mimari & Gayrimenkul">Mimari & Gayrimenkul</option>
                    <option value="Gastronomi & Mekân">Gastronomi & Mekân</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Alt Başlık</label>
                <input
                  type="text"
                  value={editingProject.subtitle || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  placeholder="Kısa çarpıcı slogan"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <MediaUploader
                label="Kapak Görseli *"
                value={editingProject.coverImage || ''}
                onChange={(url) => setEditingProject({ ...editingProject, coverImage: url })}
                accept="image"
                description="Dosya yükleyin veya görsel bağlantısı yapıştırın"
              />

              <MediaUploader
                label="Sinematik Video (Opsiyonel)"
                value={editingProject.videoUrl || ''}
                onChange={(url) => setEditingProject({ ...editingProject, videoUrl: url })}
                accept="video"
                placeholder="https://... mp4 bağlantısı"
                description="Doğrudan MP4 bağlantısı veya yüklenmiş video"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Yıl</label>
                  <input
                    type="text"
                    value={editingProject.year || '2025'}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Müşteri / Kapsam</label>
                  <input
                    type="text"
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    placeholder="Örn: Butik Otel Çekimi"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Kısa Açıklama</label>
                <textarea
                  rows={2}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Detaylı Anlatım</label>
                <textarea
                  rows={3}
                  value={editingProject.fullDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              {/* Gallery Manager */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <label className="block text-xs font-mono text-white/80">Proje Fotoğraf Galerisi</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="Görsel URL yapıştırın..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs shrink-0"
                  >
                    Fotoğraf Ekle
                  </button>
                </div>

                {editingProject.gallery && editingProject.gallery.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
                    {editingProject.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-video rounded-md overflow-hidden group/thumb border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="Galeri" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryItem(i)}
                          className="absolute inset-0 bg-red-950/80 text-red-200 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity text-xs"
                        >
                          Sil
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Deliverables Manager */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <label className="block text-xs font-mono text-white/80">Teslim Edilen Çıktılar</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    placeholder="Örn: 4K 60fps Master Film"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={addDeliverable}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs shrink-0"
                  >
                    Çıktı Ekle
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {editingProject.deliverables?.map((del, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80"
                    >
                      {del}
                      <button
                        type="button"
                        onClick={() => removeDeliverable(i)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-white/80">
                  <input
                    type="checkbox"
                    checked={editingProject.isFeatured ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                    className="rounded bg-white/10 border-white/20"
                  />
                  <span>Ana Sayfada Göster (Seçili Çalışmalar)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-white/80">
                  <input
                    type="checkbox"
                    checked={editingProject.status === 'published'}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.checked ? 'published' : 'draft',
                      })
                    }
                    className="rounded bg-white/10 border-white/20"
                  />
                  <span>Yayında</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-amber-300">
                  <input
                    type="checkbox"
                    checked={editingProject.isDemo ?? false}
                    onChange={(e) => setEditingProject({ ...editingProject, isDemo: e.target.checked })}
                    className="rounded bg-white/10 border-white/20"
                  />
                  <span>Demo Konsept Çekim Olarak İşaretle</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white/90 disabled:opacity-50"
                >
                  {saving ? 'Kaydediliyor...' : 'Projeyi Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
