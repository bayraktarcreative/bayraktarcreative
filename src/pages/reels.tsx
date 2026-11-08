import React, { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getDatabase } from '@/lib/db';
import { DatabaseSchema, Reel } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoModal from '@/components/shared/VideoModal';
import { Play, Sparkles } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

interface ReelsPageProps {
  db: DatabaseSchema;
}

export default function ReelsPage({ db }: ReelsPageProps) {
  const { reels, settings } = db;
  const { openQuoteModal } = useQuoteModal();
  const [activeReel, setActiveReel] = useState<Reel | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const categories = ['Tümü', 'Drone Reel', 'Mekân & Atmosfer', 'Gastronomi', 'Mimari', 'Otel & Turizm'];

  const filteredReels = reels.filter((r) => {
    if (!r.published) return false;
    if (selectedCategory === 'Tümü') return true;
    return r.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <>
      <Head>
        <title>Dikey Format (Reels & Shorts) — BAYRAKTAR CREATIVE</title>
        <meta
          name="description"
          content="Instagram Reels, TikTok ve YouTube Shorts için 9:16 sinematik dikey video prodüksiyonu."
        />
      </Head>

      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex flex-col">
        <Header logoUrl={settings.logoUrl} siteName={settings.siteName} />

        {/* Page Hero */}
        <section className="pt-36 pb-16 px-6 sm:px-8 bg-gradient-to-b from-[#141418] to-[#0A0A0A] border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase block mb-3">
              9:16 Sosyal Medya Prodüksiyonu
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-white leading-tight">
              DİKEY HİKÂYELER. <br />
              <span className="text-white/60">YÜKSEK DÖNÜŞÜMLÜ İÇERİK.</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl font-light">
              Mobil ekranlarda ilk saniyelerde dikkat çeken ritmik kurgular, hava görüntüleri ve mekân atmosferleri.
            </p>

            {/* Category Filter */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                      isActive
                        ? 'bg-white text-black shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Reels 9:16 Grid */}
        <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto w-full flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
            {filteredReels.map((reel) => (
              <div
                key={reel.id}
                onClick={() => setActiveReel(reel)}
                className="group relative aspect-[9/16] rounded-2xl bg-[#141418] border border-white/10 hover:border-white/40 overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Cover Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={reel.coverImage}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono text-white/90">
                    {reel.category}
                  </span>
                  {reel.isDemo && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[8px] font-mono text-amber-300">
                      DEMO
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-black border border-white/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xl">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                  <h4 className="text-xs font-bold text-white tracking-tight line-clamp-1 drop-shadow font-display">
                    {reel.title}
                  </h4>
                  <div className="flex items-center justify-between text-[9px] font-mono text-white/40 mt-1">
                    <span>9:16 Video</span>
                    <span>{reel.duration || '0:15'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Package CTA */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#141418] to-[#1a1a20] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                Aylık İçerik Paketleri
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-white">
                DÜZENLİ REELS VE VİDEO ÜRETİMİ İSTİYOR MUSUNUZ?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-xl font-light">
                İşletmeniz veya markanız için her ay planlı çekimler, senaryolaştırma ve montaj dahil anahtar teslim dikey prodüksiyon.
              </p>
            </div>
            <button
              onClick={() => openQuoteModal('Sosyal Medya Reels Paketi')}
              className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-white/90 transition-all hover:scale-105 shrink-0"
            >
              Reels Paketi İçin Teklif Al
            </button>
          </div>
        </section>

        {activeReel && (
          <VideoModal
            isOpen={true}
            videoUrl={activeReel.videoUrl}
            title={activeReel.title}
            category={activeReel.category}
            aspectRatio="9/16"
            onClose={() => setActiveReel(null)}
          />
        )}

        <Footer settings={settings} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const db = getDatabase();
  return { props: { db } };
};
