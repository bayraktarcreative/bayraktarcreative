import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getDatabase } from '@/lib/db';
import { DatabaseSchema } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Camera, Film, Sliders, ShieldCheck, Compass, ArrowUpRight } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

interface HakkimizdaProps {
  db: DatabaseSchema;
}

export default function Hakkimizda({ db }: HakkimizdaProps) {
  const { media, settings } = db;
  const { openQuoteModal } = useQuoteModal();

  return (
    <>
      <Head>
        <title>Hakkımızda & Yaklaşımımız — BAYRAKTAR CREATIVE</title>
        <meta
          name="description"
          content="Bayraktar Creative prodüksiyon felsefesi, sinematik vizyonu ve teknik standartları."
        />
      </Head>

      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex flex-col">
        <Header logoUrl={settings.logoUrl} siteName={settings.siteName} />

        {/* Hero */}
        <section className="pt-36 pb-20 px-6 sm:px-8 bg-gradient-to-b from-[#141418] to-[#0A0A0A] border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase block mb-3">
              Stüdyo Manifestosu // Yaklaşım
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-white leading-tight">
              EVERY FRAME <br />
              <span className="text-white/60">TELLS A STORY.</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
              Teknik hassasiyet ve estetik kompozisyonun buluştuğu noktada; mekânları, markaları ve insan hikâyelerini sinematik bir hafızaya dönüştürüyoruz.
            </p>
          </div>
        </section>

        {/* Detailed Narrative */}
        <section className="py-24 px-6 sm:px-8 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase font-display text-white tracking-tight leading-snug">
                SADECE KAYIT ALMIYORUZ. HİSSİYATI KURGULUYORUZ.
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                Bir tanıtım filminin veya hava çekiminin değeri, sadece kullanılan kameranın megapikselinde değil; ışığın ne zaman karşılandığında, kameranın hangi hızla hareket ettiğinde ve o sahneye hangi sesin eşlik ettiğindedir.
              </p>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                Bayraktar Creative olarak, her çekimi bir film sahnesi ciddiyetiyle ele alıyoruz. Ön hazırlıktan SHGM hava sahası koordinasyonuna, setteki aydınlatmadan Davinci Resolve renk derecelendirmesine kadar tüm basamakları titizlikle yürütüyoruz.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media.aboutImage}
                  alt="Bayraktar Creative Stüdyo Çekim Süreci"
                  className="w-full h-full object-cover opacity-85"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-4">
              <Compass className="w-6 h-6 text-white/80" />
              <h3 className="text-lg font-bold text-white font-display">Lisanslı Hava Operasyonları</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Tüm drone uçuşlarımız Sivil Havacılık Genel Müdürlüğü (SHGM) mevzuatlarına uygun lisanslı pilotlarca ve güvenlik protokolleriyle icra edilir.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-4">
              <Film className="w-6 h-6 text-white/80" />
              <h3 className="text-lg font-bold text-white font-display">10-Bit Sinema Rengi (Log)</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Geniş dinamik aralıklı (HDR) ham çekimler Davinci Resolve üzerinde renk profilleriyle işlenerek sinematik tonlama elde edilir.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-4">
              <Sliders className="w-6 h-6 text-white/80" />
              <h3 className="text-lg font-bold text-white font-display">Bütünleşik Post-Prodüksiyon</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Kurgu, ses tasarımı, foley efektleri ve ritmik müzik senkronizasyonu stüdyo bünyesinde eksiksiz tamamlanır.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-20 text-center">
            <button
              onClick={() => openQuoteModal()}
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-white/90 transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Bizimle Projenizi Konuşun</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
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
