import React, { useState } from 'react';
import { HomepageMedia, ServiceItem } from '@/lib/types';
import MediaUploader from './MediaUploader';
import { Save, Check, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface MediaTabProps {
  media: HomepageMedia;
  onRefresh: () => void;
}

export default function MediaTab({ media: initialMedia, onRefresh }: MediaTabProps) {
  const [formData, setFormData] = useState<HomepageMedia>({ ...initialMedia });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Medya ayarları güncellenemedi');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const updateServiceField = (index: number, field: keyof ServiceItem, value: any) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setFormData({ ...formData, services: updatedServices });
  };

  return (
    <form onSubmit={handleSave} className="space-y-10">
      {/* Sticky Save Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between p-4 rounded-2xl bg-[#141418]/90 backdrop-blur-md border border-white/10 shadow-2xl">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-display uppercase tracking-wide text-white">
            Ana Sayfa & Medya Yönetimi
          </h2>
          <p className="text-[11px] text-white/50 font-mono">
            Tüm arka plan videolarını, posterleri ve görselleri kodsuz yönetin.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white/90 flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all hover:scale-105"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor...
            </>
          ) : savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" /> Kaydedildi!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Değişiklikleri Kaydet
            </>
          )}
        </button>
      </div>

      {/* 1. HERO SECTION MEDIA */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
          <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">
            1. Full-Screen Cinematic Hero Medyası
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaUploader
            label="Hero Arka Plan Showreel Videosu"
            value={formData.hero.videoUrl}
            onChange={(url) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero, videoUrl: url },
              })
            }
            accept="video"
            placeholder="https://... mp4 bağlantısı veya dosya"
            description="Otomatik oynayan, sessiz showreel video"
          />

          <MediaUploader
            label="Hero Poster Görseli (Video Yüklenene Kadar / Mobilde)"
            value={formData.hero.posterImage}
            onChange={(url) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero, posterImage: url },
              })
            }
            accept="image"
            description="Video öncesi ve arama motorları için afiş görseli"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-white/5">
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">
              Hero Başlığı (Satır atlamak için Enter kullanın)
            </label>
            <textarea
              rows={3}
              value={formData.hero.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, title: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-display text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Hero Alt Metni</label>
            <input
              type="text"
              value={formData.hero.subtitle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, subtitle: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">1. Buton Yazısı</label>
              <input
                type="text"
                value={formData.hero.ctaPrimaryText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, ctaPrimaryText: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">2. Buton Yazısı</label>
              <input
                type="text"
                value={formData.hero.ctaSecondaryText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, ctaSecondaryText: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. STUDIO INTRO & PARALLAX */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
          <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">
            2. Stüdyo Giriş & Paralaks Arka Planı
          </h3>
        </div>

        <MediaUploader
          label="Paralaks Derinlik Görseli (Background)"
          value={formData.parallaxBg}
          onChange={(url) => setFormData({ ...formData, parallaxBg: url })}
          accept="image"
          description="Kaydırma sırasında hafifçe hareket eden sinematik arka plan"
        />

        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Bölüm Başlığı</label>
            <input
              type="text"
              value={formData.intro.headline}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  intro: { ...formData.intro, headline: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-display"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Açıklama Metni</label>
            <textarea
              rows={2}
              value={formData.intro.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  intro: { ...formData.intro, description: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
        </div>
      </div>

      {/* 3. EXPERTISE / SERVICE CARDS */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
          <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">
            3. Dört Ana Hizmet Kartı Görselleri ve Bilgileri
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.services.map((service, idx) => (
            <div
              key={service.id}
              className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">{service.number} // Hizmet Kartı</span>
                <span className="text-xs font-semibold text-white">{service.category}</span>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Hizmet Başlığı</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateServiceField(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <MediaUploader
                label="Hizmet Kartı Kapak Görseli"
                value={service.image}
                onChange={(url) => updateServiceField(idx, 'image', url)}
                accept="image"
              />

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Kısa Açıklama</label>
                <textarea
                  rows={2}
                  value={service.description}
                  onChange={(e) => updateServiceField(idx, 'description', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ABOUT & 360 & CTA MEDIA */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
          <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">
            4. Hakkımızda, 360° ve Son CTA Görselleri
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MediaUploader
            label="Hakkımızda Bölüm Görseli"
            value={formData.aboutImage}
            onChange={(url) => setFormData({ ...formData, aboutImage: url })}
            accept="image"
          />

          <MediaUploader
            label="360° Sanal Tur Bölüm Arka Planı"
            value={formData.virtualTourBg}
            onChange={(url) => setFormData({ ...formData, virtualTourBg: url })}
            accept="image"
          />

          <MediaUploader
            label="Final CTA Bölüm Arka Planı"
            value={formData.ctaBg}
            onChange={(url) => setFormData({ ...formData, ctaBg: url })}
            accept="image"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Final CTA Başlığı</label>
            <input
              type="text"
              value={formData.ctaTitle}
              onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-display"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Final CTA Buton Metni</label>
            <input
              type="text"
              value={formData.ctaButtonText}
              onChange={(e) => setFormData({ ...formData, ctaButtonText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
