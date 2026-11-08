import React from 'react';
import Link from 'next/link';
import { Camera, Sliders, Film, ArrowUpRight } from 'lucide-react';

interface AboutProps {
  image?: string;
  headline?: string;
  text?: string;
}

export default function AboutSection({
  image = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop',
  headline = 'Her mekânın, her markanın ve her projenin anlatılmayı bekleyen bir hikâyesi vardır.',
  text = 'Bayraktar Creative olarak, teknik mükemmeliyetçiliği sanatsal bir bakış açısıyla harmanlıyoruz. Çekim planlamasından renk düzenlemesine, hava koordinasyonundan son ses miksajına kadar sürecin tüm adımlarını bizzat yönetiyoruz. Amacımız sadece güzel görüntüler yakalamak değil; hedef kitlenizin zihninde kalıcı bir iz bırakmaktır.',
}: AboutProps) {
  return (
    <section className="py-24 sm:py-36 px-6 sm:px-8 bg-[#0A0A0A] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Bayraktar Creative Prodüksiyon Süreci"
                className="w-full h-full object-cover opacity-85"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />

              {/* Minimalist Watermark Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase block">
                  Prodüksiyon Standartları
                </span>
                <span className="text-xs font-semibold text-white mt-1 block">
                  Sinema Kameraları • 10-Bit Renk • Lisanslı Uçuş
                </span>
              </div>
            </div>
          </div>

          {/* Text & Philosophy Side */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/40" />
              <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase">
                Stüdyo Yaklaşımı // 05
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.15]">
              {headline}
            </h2>

            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              {text}
            </p>

            {/* Approach Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                <Camera className="w-4 h-4 text-white/70" />
                <h4 className="text-xs font-bold text-white font-display">Hassas Kadraj</h4>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Işığın ve mimari çizgilerin en doğru anını yakalamak için planlı keşifler.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                <Film className="w-4 h-4 text-white/70" />
                <h4 className="text-xs font-bold text-white font-display">Akıcı Ritim</h4>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  İzleyicinin dikkatini baştan sona diri tutan müzik ve tempo kurgusu.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                <Sliders className="w-4 h-4 text-white/70" />
                <h4 className="text-xs font-bold text-white font-display">Renk & Doku</h4>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Markanın kimliğine özel tasarlanan sinematik renk derecelendirmesi.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/hakkimizda"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white hover:text-white/70 transition-colors"
              >
                <span>Hakkımızda Detaylı Bilgi</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
