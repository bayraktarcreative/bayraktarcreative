import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getDatabase } from '@/lib/db';
import { DatabaseSchema, ServiceItem } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckCircle2, ArrowUpRight, ShieldCheck, Film, Compass, Smartphone, Sliders, Sparkles } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

interface HizmetlerProps {
  db: DatabaseSchema;
}

export default function Hizmetler({ db }: HizmetlerProps) {
  const { media, settings } = db;
  const { openQuoteModal } = useQuoteModal();

  const workflowSteps = [
    {
      num: '01',
      title: 'Keşif & Konsept',
      desc: 'Mekânın ışık yönleri, mimari hatları ve markanızın temel mesajı incelenerek çekim senaryosu oluşturulur.',
    },
    {
      num: '02',
      title: 'Hava İzinleri & Planlama',
      desc: 'Drone operasyonları için SHGM uçuş izinleri ve güvenlik koordinasyonu eksiksiz tamamlanır.',
    },
    {
      num: '03',
      title: 'Prodüksiyon',
      desc: 'Sinema kameraları, gimbal ve profesyonel hava platformları ile planlanan sahneler kaydedilir.',
    },
    {
      num: '04',
      title: 'Post-Prodüksiyon',
      desc: 'Davinci Resolve üzerinde renk derecelendirme, dinamik kurgu ve özgün ses miksajı uygulanır.',
    },
    {
      num: '05',
      title: 'Çoklu Format Teslimat',
      desc: 'Ana tanıtım filmi, sosyal medya dikey versiyonları (9:16) ve yüksek çözünürlüklü fotoğraflar teslim edilir.',
    },
  ];

  return (
    <>
      <Head>
        <title>Hizmetlerimiz — BAYRAKTAR CREATIVE | Prodüksiyon & Görüntüleme</title>
        <meta
          name="description"
          content="Drone çekimi, sinematik tanıtım filmleri, Reels prodüksiyonu ve 360 sanal tur çözümleri."
        />
      </Head>

      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex flex-col">
        <Header logoUrl={settings.logoUrl} siteName={settings.siteName} />

        {/* Hero Header */}
        <section className="pt-36 pb-20 px-6 sm:px-8 bg-gradient-to-b from-[#141418] to-[#0A0A0A] border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase block mb-3">
              Uzmanlık & Çözümler
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-white leading-tight">
              KUSURSUZ GÖRSEL DİL. <br />
              <span className="text-white/60">YÜKSEK PRODÜKSİYON STANDARDI.</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
              Her markanın ihtiyacı farklıdır. İster geniş ölçekli bir mimari tanıtım filmi, ister sosyal medyada dikkat çeken dinamik dikey videolar; her projeye sinematik özenle yaklaşıyoruz.
            </p>
          </div>
        </section>

        {/* Services In-Depth List */}
        <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto w-full space-y-24">
          {media.services.map((service, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual */}
                <div className={`lg:col-span-6 relative ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white">
                        {service.number} // {service.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-white/40">{service.number}</span>
                    <span className="w-8 h-[1px] bg-white/30" />
                    <span className="text-xs font-mono text-white/60 tracking-wider uppercase">
                      {service.category}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
                    {service.title}
                  </h2>

                  <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Pills */}
                  {service.features && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {service.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-white/80"
                        >
                          <CheckCircle2 className="w-4 h-4 text-white/70 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      onClick={() => openQuoteModal(service.title)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-white/90 transition-all hover:scale-105"
                    >
                      <span>Bu Hizmet İçin Teklif Al</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Studio Production Workflow */}
        <section className="py-24 px-6 sm:px-8 bg-[#0E0E12] border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase block mb-2">
                Nasıl Çalışıyoruz?
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-display tracking-tight text-white">
                5 AŞAMALI PRODÜKSİYON SÜRECİ
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-white/60 font-light">
                Her projede sürprizlere yer bırakmayan, şeffaf ve metodik bir üretim disiplini uygularız.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {workflowSteps.map((step) => (
                <div
                  key={step.num}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl font-extrabold font-mono text-white/30 block mb-3">
                      {step.num}
                    </span>
                    <h3 className="text-base font-bold text-white font-display mb-2">{step.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
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
