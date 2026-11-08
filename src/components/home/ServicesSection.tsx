import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '@/lib/types';
import { useQuoteModal } from '@/lib/QuoteContext';

interface ServicesSectionProps {
  services: ServiceItem[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section id="hizmetler-alani" className="py-24 sm:py-32 px-6 sm:px-8 bg-[#0D0D0F] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-white/40" />
              <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase">
                Hizmet Alanları // 02
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-display">
              UZMANLIK ALANLARIMIZ.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/60 max-w-md font-light leading-relaxed">
            Hava çekiminden renk kurgusuna, dikey sosyal medya anlatımlarından sanal turlara kadar entegre prodüksiyon disiplini.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-2xl bg-[#141418] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Image Container with Reveal & Zoom Effect */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30 pointer-events-none" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/80">
                    {service.number} // {service.category}
                  </span>
                </div>
              </div>

              {/* Service Info Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors font-display">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-white/65 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  {service.features && service.features.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-white/50">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white/70 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Bottom CTA */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => openQuoteModal(service.title)}
                    className="text-xs font-semibold text-white/80 hover:text-white group/btn flex items-center gap-1.5 transition-colors"
                  >
                    <span>Bu Hizmet İçin Teklif Al</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                  <span className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
                    PRODÜKSİYON
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
