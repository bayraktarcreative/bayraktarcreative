import React, { useState } from 'react';
import { Compass, Sparkles, Eye, Layers, Maximize } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

interface VirtualTourProps {
  bgImage?: string;
}

export default function VirtualTourSection({
  bgImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
}: VirtualTourProps) {
  const { openQuoteModal } = useQuoteModal();
  const [showArchitectureInfo, setShowArchitectureInfo] = useState(false);

  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#09090B] border-b border-white/5 overflow-hidden">
      {/* Background with subtle 360 simulation effect */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[1px] transform scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/70 to-[#09090B]" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-white/80" />
          <span className="text-[10px] tracking-widestx text-white uppercase font-mono">
            360° Sanal Tur & İnteraktif Deneyim // Çok Yakında
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase font-display max-w-3xl leading-[1.12]">
          YENİ BİR PERSPEKTİFE HAZIR OLUN.
        </h2>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
          Mekânları ekran başında değil, sanki içindeymiş gibi hissettiren yüksek çözünürlüklü 360° panoramik sanal tur altyapımızı stüdyo hizmetlerimize dahil ediyoruz.
        </p>

        {/* Modular Tech Infrastructure Box */}
        <div className="mt-10 w-full max-w-3xl p-6 sm:p-8 rounded-2xl bg-[#121216]/90 border border-white/10 backdrop-blur-xl shadow-2xl text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 gap-4">
            <div>
              <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">
                Stüdyo Entegrasyon Altyapısı
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white font-display mt-0.5">
                360° WebGL & Panoramik Görüntüleme Modülü
              </h4>
            </div>

            <span className="self-start sm:self-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              ● Entegrasyon Aşamasında
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-white/70">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-semibold">Matterport & Kuula</span>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                İnteraktif kat planı ve 3D derinlik haritalama desteği.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-white/70">
                <Eye className="w-4 h-4" />
                <span className="text-xs font-semibold">Pannellum Motoru</span>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Her web sitesine doğrudan gömülebilir sıfır bağımlılıklı 360 oynatıcı.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-white/70">
                <Maximize className="w-4 h-4" />
                <span className="text-xs font-semibold">Tam Ekran & Gyro</span>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Mobil jiroskop ve dokunmatik hareket kontrolleri.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50 text-center sm:text-left">
              Otel, villa ve ticari gayrimenkuller için 360° çekim ön talepleri kabul edilmektedir.
            </p>
            <button
              onClick={() => openQuoteModal('İnteraktif 360° Sanal Tur')}
              className="px-5 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Ön Talep Oluştur
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
