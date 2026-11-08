import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

interface FinalCTAProps {
  title?: string;
  buttonText?: string;
  bgImage?: string;
}

export default function FinalCTA({
  title = 'BİRLİKTE ETKİLEYİCİ BİR ŞEY ÜRETELİM.',
  buttonText = 'PROJENİ ANLAT / TEKLİF AL',
  bgImage = 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop',
}: FinalCTAProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="relative py-32 sm:py-44 px-6 sm:px-8 bg-black overflow-hidden flex items-center justify-center text-center">
      {/* Background with cinematic depth */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/90 pointer-events-none" />

      {/* Decorative center spotlight */}
      <div className="absolute w-[600px] h-[300px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase mb-4">
          Bayraktar Creative // Yeni Bir Başlangıç
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.08] drop-shadow-2xl">
          {title}
        </h2>

        <p className="mt-6 text-sm sm:text-base text-white/70 max-w-xl font-light leading-relaxed">
          Oteller, mimari projeler, gastronomi işletmeleri ve iddialı markalar için sinematik prodüksiyon teklifinizi 3 adımda hazırlayalım.
        </p>

        <div className="mt-10">
          <button
            onClick={() => openQuoteModal()}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>{buttonText}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
