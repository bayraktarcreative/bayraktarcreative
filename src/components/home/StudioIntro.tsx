import React from 'react';
import { Compass, Film, Award, Layers } from 'lucide-react';

interface StudioIntroProps {
  headline?: string;
  description?: string;
  subtext?: string;
  parallaxBg?: string;
}

export default function StudioIntro({
  headline = 'SADECE GÖRÜNTÜ DEĞİL. ETKİ BIRAKAN HİKÂYELER.',
  description = 'Her mekânın, her markanın ve her projenin kendine has bir ritmi vardır. Biz bu ritmi hava perspektifi, sinematik kamera hareketleri ve kusursuz renk tonlarıyla kalıcı bir görsel hafızaya dönüştürüyoruz.',
  subtext = 'Titizlikle kurgulanmış çekim planları, profesyonel ekipmanlar ve yüksek editoryal disiplin ile her sahneye anlam katıyoruz.',
  parallaxBg,
}: StudioIntroProps) {
  return (
    <section
      id="studio-intro"
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[#0A0A0A] overflow-hidden border-b border-white/5"
    >
      {/* Subtle background ambient */}
      {parallaxBg && (
        <div
          className="absolute inset-0 opacity-10 bg-fixed bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${parallaxBg})` }}
        />
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-white/40" />
          <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase">
            Stüdyo Felsefesi // 01
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.15] max-w-4xl">
          {headline}
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <p className="md:col-span-7 text-base sm:text-lg text-white/80 font-light leading-relaxed">
            {description}
          </p>
          <div className="md:col-span-5 space-y-4 pt-1 border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-mono">
              {subtext}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <Compass className="w-4 h-4 text-white/60 mb-1" />
                <span className="block text-xs font-semibold text-white">SHGM Lisanslı</span>
                <span className="text-[10px] text-white/40 font-mono">Hava Sahası Operasyonu</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <Film className="w-4 h-4 text-white/60 mb-1" />
                <span className="block text-xs font-semibold text-white">10-Bit Log / RAW</span>
                <span className="text-[10px] text-white/40 font-mono">Sinema Derecelendirmesi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
