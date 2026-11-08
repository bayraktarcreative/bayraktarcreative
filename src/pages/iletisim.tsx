import React, { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getDatabase } from '@/lib/db';
import { DatabaseSchema } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, ArrowLeft, Check, Loader2, Sparkles } from 'lucide-react';

interface IletisimProps {
  db: DatabaseSchema;
}

const SERVICE_OPTIONS = [
  { id: 'drone', label: 'Drone & Hava Çekimi', desc: 'Lisanslı 4K hava perspektifi ve haritalama' },
  { id: 'film', label: 'Sinematik Tanıtım Filmi', desc: 'Editoryal kurumsal & otel filmleri' },
  { id: 'photo', label: 'Profesyonel Fotoğraf Çekimi', desc: 'Mimari, otel, gastronomi ve ürün çekimleri' },
  { id: 'reels', label: 'Sosyal Medya Reels & Dikey Video', desc: '9:16 yüksek tempolu içerik serileri' },
  { id: 'social_mgmt', label: 'Sosyal Medya Prodüksiyon Yönetimi', desc: 'Aylık planlı video/fotoğraf üretimi' },
  { id: 'full_package', label: 'Kapsamlı Prodüksiyon Paketi', desc: 'Hava, yer, kurgu, renk ve dikey içerikler' },
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

export default function Iletisim({ db }: IletisimProps) {
  const { settings } = db;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleNext = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.serviceType) {
        setErrorMsg('Lütfen bir hizmet seçiniz.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.sector) {
        setErrorMsg('Lütfen projenizin sektörünü seçiniz.');
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
      if (!res.ok) throw new Error(data.error || 'Teklif talebi iletilemedi.');
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Bir hata oluştu, lütfen tekrar deneyiniz.');
    } finally {
      setLoading(false);
    }
  };

  const cleanWaNumber = (settings.whatsappNumber || '').replace(/[^0-9]/g, '');

  return (
    <>
      <Head>
        <title>İletişim & Teklif Al — BAYRAKTAR CREATIVE</title>
        <meta
          name="description"
          content="Bayraktar Creative ile iletişime geçin, projeniz için 3 adımda prodüksiyon teklifi alın."
        />
      </Head>

      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex flex-col">
        <Header logoUrl={settings.logoUrl} siteName={settings.siteName} />

        {/* Page Hero */}
        <section className="pt-36 pb-16 px-6 sm:px-8 bg-gradient-to-b from-[#141418] to-[#0A0A0A] border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase block mb-3">
              İletişim // Teklif Formu
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-white leading-tight">
              BİZE ULAŞIN. <br />
              <span className="text-white/60">PROJENİZİ ANLATIN.</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl font-light">
              Yeni bir prodüksiyon planlamak, drone çekimi organize etmek veya stüdyomuz hakkında detaylı bilgi almak için aşağıdaki formu doldurabilir ya da doğrudan ulaşabilirsiniz.
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto w-full flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Direct Contact Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-6">
                <h3 className="text-lg font-bold font-display uppercase tracking-wide text-white">
                  Stüdyo Bilgileri
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-white font-medium">Lokasyon</span>
                      <span className="text-white/60 text-xs">{settings.address || 'İstanbul, Türkiye'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-white font-medium">Telefon</span>
                      <a href={`tel:${settings.phone}`} className="text-white/60 hover:text-white text-xs font-mono">
                        {settings.phone || '+90 (212) 000 00 00'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-white font-medium">E-posta</span>
                      <a href={`mailto:${settings.email}`} className="text-white/60 hover:text-white text-xs font-mono">
                        {settings.email || 'info@bayraktarcreative.com'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Action */}
                {cleanWaNumber && (
                  <div className="pt-4 border-t border-white/10">
                    <a
                      href={`https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
                        settings.whatsappDefaultMessage || 'Merhaba, teklif almak istiyorum.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950/40"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp İle Hızlı Mesaj Gönder</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Working Hours / Response Promise */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                  Yanıt Süresi
                </span>
                <p className="text-xs text-white/70 leading-relaxed">
                  Gönderilen teklif talepleri prodüksiyon takvimimiz doğrultusunda incelenir ve 24 saat içerisinde tarafınıza kapsam ve bütçe aralığıyla dönüş sağlanır.
                </p>
              </div>
            </div>

            {/* Embedded 3-Step Wizard Form Column */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-[#121215] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="pb-6 border-b border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                    3 Aşamalı Başvuru
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white mt-1">
                    PROJE DETAYLARINIZI BİZE İLETİN
                  </h3>
                </div>

                {/* Progress bar */}
                {!success && (
                  <div className="py-5">
                    <div className="flex items-center justify-between text-xs text-white/50 font-medium mb-2">
                      <span className={step >= 1 ? 'text-white font-semibold' : ''}>1. Hizmet</span>
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

                {errorMsg && (
                  <div className="my-4 p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-200 text-xs">
                    {errorMsg}
                  </div>
                )}

                {success ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-white font-display">Talebiniz Kaydedildi</h4>
                    <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                      Proje bilgileriniz stüdyo koordinatörümüze iletilmiştir. İnceleme sonrası en kısa sürede sizinle iletişime geçilecektir.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSuccess(false);
                          setStep(1);
                          setFormData({
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
                        }}
                        className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider"
                      >
                        Yeni Teklif Formu Doldur
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="site_url_trap"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {step === 1 && (
                      <div className="space-y-3">
                        <p className="text-xs text-white/60">İlgilendiğiniz ana hizmeti seçiniz:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                <span className="font-semibold text-xs sm:text-sm block">{item.label}</span>
                                <span className="text-[11px] text-white/50 mt-1 block">{item.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-white/70 mb-1.5">
                            Sektör / Faaliyet Alanı <span className="text-red-400">*</span>
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
                              Çekim Lokasyonu
                            </label>
                            <input
                              type="text"
                              placeholder="Örn: İstanbul / Boğaz veya Antalya"
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-white/70 mb-1.5">
                              Hedef Tarih Aralığı
                            </label>
                            <input
                              type="text"
                              placeholder="Örn: 2026 İlkbahar / Yaz"
                              value={formData.targetDate}
                              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-white/70 mb-1.5">
                            Proje Notları ve Beklentileriniz
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Mekân büyüklüğü, hedeflenen video sayısı, özel istekler..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40"
                          />
                        </div>
                      </div>
                    )}

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
                              placeholder="Adınız Soyadınız"
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
                            placeholder="eposta@sirketiniz.com"
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
                              Teklif talebimin değerlendirilmesi amacıyla kişisel verilerimin işlenmesine ilişkin KVKK aydınlatma metnini onaylıyorum.
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

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
          </div>
        </section>

        <Footer settings={settings} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const db = getDatabase();
  return { props: { db } };
};
