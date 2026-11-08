import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

const SERVICE_OPTIONS = [
  { id: 'drone', label: 'Drone & Hava Çekimi', desc: 'Lisanslı 4K hava perspektifi ve haritalama' },
  { id: 'film', label: 'Sinematik Tanıtım Filmi', desc: 'Editoryal anlatımlı kurumsal & marka filmleri' },
  { id: 'photo', label: 'Profesyonel Fotoğraf Çekimi', desc: 'Mimari, otel, gastronomi ve ürün çekimleri' },
  { id: 'reels', label: 'Sosyal Medya Reels & Dikey Video', desc: '9:16 formatında yüksek tempolu içerik serileri' },
  { id: 'social_mgmt', label: 'Sosyal Medya Prodüksiyon Yönetimi', desc: 'Aylık planlı video/fotoğraf üretimi & strateji' },
  { id: 'full_package', label: 'Kapsamlı Prodüksiyon Paketi', desc: 'Hava, yer, kurgu, renk ve dikey içerikler dahil hepsi bir arada' },
];

const SECTOR_OPTIONS = [
  'Otel, Turizm & Konaklama',
  'Gayrimenkul & Mimari',
  'Restoran, Kafe & Gastronomi',
  'İnşaat & Taahhüt',
  'E-Ticaret & Ürün Markası',
  'Etkinlik & Organizasyon',
  'Diğer Ticari İşletmeler',
];

export default function QuoteModal() {
  const { isOpen, preselectedService, closeQuoteModal } = useQuoteModal();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    serviceType: '',
    sector: '',
    description: '',
    location: '',
    targetDate: '',
    fullName: '',
    phone: '',
    email: '',
    kvkkConsent: false,
    honeypot: '',
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSuccess(false);
      setErrorMsg('');
      if (preselectedService) {
        setFormData((prev) => ({ ...prev, serviceType: preselectedService }));
      }
    }
  }, [isOpen, preselectedService]);

  if (!isOpen) return null;

  const handleNext = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.serviceType) {
        setErrorMsg('Lütfen projeniz için ilgilendiğiniz hizmeti seçiniz.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.sector) {
        setErrorMsg('Lütfen projenizin ait olduğu sektörü seçiniz.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Lütfen Ad Soyad ve Telefon numarası alanlarını doldurunuz.');
      return;
    }

    if (!formData.kvkkConsent) {
      setErrorMsg('Lütfen aydınlatma metnini onaylayınız.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Teklif talebi gönderilemedi.');
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Bir hata oluştu, lütfen tekrar deneyiniz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#121215] border border-white/10 shadow-2xl p-6 sm:p-8 text-white my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div>
            <span className="text-[10px] tracking-widestx text-white/50 uppercase font-mono">
              Bayraktar Creative // Teklif Sistemi
            </span>
            <h3 id="modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Projeniz İçin Teklif Alın
            </h3>
          </div>
          <button
            onClick={closeQuoteModal}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Bar */}
        {!success && (
          <div className="py-4">
            <div className="flex items-center justify-between text-xs text-white/50 font-medium mb-2">
              <span className={step >= 1 ? 'text-white font-semibold' : ''}>1. Hizmet Seçimi</span>
              <span className={step >= 2 ? 'text-white font-semibold' : ''}>2. Proje Detayı</span>
              <span className={step >= 3 ? 'text-white font-semibold' : ''}>3. İletişim</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300"
                style={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%' }}
              />
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="my-3 p-3 rounded-lg bg-red-950/60 border border-red-500/30 text-red-200 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Success View */}
        {success ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-white">Talebiniz Alındı</h4>
            <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
              Teklif talebiniz stüdyo ekibimize iletilmiştir. Proje gereksinimlerinizi inceleyerek en kısa sürede telefon veya e-posta yoluyla dönüş yapacağız.
            </p>
            <div className="pt-4">
              <button
                onClick={closeQuoteModal}
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all"
              >
                Pencereyi Kapat
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 space-y-5">
            {/* Honeypot field for bot protection */}
            <input
              type="text"
              name="website_url_check"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* STEP 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-3">
                <p className="text-xs text-white/60">
                  İhtiyacınız olan ana prodüksiyon veya görüntüleme kategorisini seçiniz:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {SERVICE_OPTIONS.map((item) => {
                    const isSelected = formData.serviceType === item.label;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setFormData({ ...formData, serviceType: item.label })}
                        className={`text-left p-3.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-white/15 border-white text-white shadow-lg'
                            : 'bg-white/5 border-white/5 hover:border-white/20 text-white/80 hover:text-white'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-semibold text-sm">{item.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />}
                        </div>
                        <p className="text-xs text-white/50 mt-1 line-clamp-2">{item.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: Project Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Sektör / İş Alanı <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-white/40"
                  >
                    <option value="" className="bg-[#121215]">Sektör Seçiniz...</option>
                    {SECTOR_OPTIONS.map((sec) => (
                      <option key={sec} value={sec} className="bg-[#121215] text-white">
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Çekim Lokasyonu (Şehir / İlçe)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: İstanbul / Beşiktaş veya Bodrum"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Tercih Edilen Tarih Aralığı
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 2026 Mayıs Başı veya Acil"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Proje Özeti & Beklentileriniz
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mekân büyüklüğü, hedeflenen video süresi, özel çekim istekleri..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Contact & KVKK */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Ad Soyad <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Adınız ve Soyadınız"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Telefon Numarası <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+90 5XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    E-posta Adresi
                  </label>
                  <input
                    type="email"
                    placeholder="ornek@sirketiniz.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.kvkkConsent}
                      onChange={(e) => setFormData({ ...formData, kvkkConsent: e.target.checked })}
                      className="mt-1 rounded bg-white/10 border-white/20 text-white focus:ring-0"
                    />
                    <span className="text-[11px] text-white/60 leading-snug">
                      Teklif talebimin değerlendirilmesi ve tarafımla iletişime geçilmesi amacıyla kişisel verilerimin işlenmesine ilişkin aydınlatma metnini okudum ve kabul ediyorum.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 text-xs font-medium transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Geri
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all ml-auto"
                >
                  Devam Et <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-white/90 transition-all disabled:opacity-50 ml-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> İletiliyor...
                    </>
                  ) : (
                    <>
                      Teklifi Gönder <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
