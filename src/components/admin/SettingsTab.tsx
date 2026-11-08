import React, { useState } from 'react';
import { SiteSettings } from '@/lib/types';
import MediaUploader from './MediaUploader';
import { Save, Check, Loader2 } from 'lucide-react';

interface SettingsTabProps {
  settings: SiteSettings;
  onRefresh: () => void;
}

export default function SettingsTab({ settings: initialSettings, onRefresh }: SettingsTabProps) {
  const [formData, setFormData] = useState<SiteSettings>({ ...initialSettings });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Ayarlar kaydedilemedi');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Save Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between p-4 rounded-2xl bg-[#141418]/90 backdrop-blur-md border border-white/10 shadow-2xl">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-display uppercase tracking-wide text-white">
            Genel Site Ayarları & İletişim
          </h2>
          <p className="text-[11px] text-white/50 font-mono">
            Logo, WhatsApp, SEO ve iletişim bilgilerini yönetin.
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
              <Save className="w-4 h-4" /> Ayarları Kaydet
            </>
          )}
        </button>
      </div>

      {/* Brand & Logo */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-6">
        <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider pb-3 border-b border-white/10">
          Marka & Logo Yönetimi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaUploader
            label="Özel Logo Görseli (Şeffaf PNG / SVG)"
            value={formData.logoUrl || ''}
            onChange={(url) => setFormData({ ...formData, logoUrl: url })}
            accept="image"
            description="Yüklenmezse stüdyonun modern tipografik logosu görüntülenir"
          />

          <MediaUploader
            label="Favicon (Site İkonu)"
            value={formData.faviconUrl || ''}
            onChange={(url) => setFormData({ ...formData, faviconUrl: url })}
            accept="image"
            description="Tarayıcı sekmesinde görünen ikon"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Marka Adı</label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Slogan (Tagline)</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
        </div>
      </div>

      {/* WhatsApp & Contact */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-6">
        <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider pb-3 border-b border-white/10">
          WhatsApp & İletişim Kanalları
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">
              WhatsApp Numarası (Ülke koduyla: +905XXXXXXXXX)
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              placeholder="+905550000000"
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
            />
            <span className="text-[10px] text-white/40 block mt-1">
              Boş bırakılırsa WhatsApp butonu doğrudan teklif formunu açar.
            </span>
          </div>

          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">
              Varsayılan WhatsApp Mesajı
            </label>
            <input
              type="text"
              value={formData.whatsappDefaultMessage}
              onChange={(e) => setFormData({ ...formData, whatsappDefaultMessage: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">E-posta</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Telefon</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Lokasyon / Şehir</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1">Stüdyo Adresi</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-6">
        <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider pb-3 border-b border-white/10">
          Sosyal Medya Bağlantıları
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Instagram URL</label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">YouTube URL</label>
            <input
              type="text"
              value={formData.youtube}
              onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Vimeo URL</label>
            <input
              type="text"
              value={formData.vimeo}
              onChange={(e) => setFormData({ ...formData, vimeo: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
            />
          </div>
        </div>
      </div>

      {/* SEO & Meta */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-6">
        <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider pb-3 border-b border-white/10">
          Arama Motoru Optimizasyonu (SEO) & Telif
        </h3>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1">SEO Title (Başlık)</label>
          <input
            type="text"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1">SEO Meta Açıklaması</label>
          <textarea
            rows={2}
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-white/70 mb-1">Footer Telif Metni</label>
          <input
            type="text"
            value={formData.footerText}
            onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
          />
        </div>
      </div>
    </form>
  );
}
