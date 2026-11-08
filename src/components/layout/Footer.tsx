import React from 'react';
import Link from 'next/link';
import { Camera, ArrowUpRight, Instagram, Youtube, Video, Lock } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

interface FooterProps {
  settings?: {
    siteName?: string;
    tagline?: string;
    email?: string;
    phone?: string;
    city?: string;
    address?: string;
    instagram?: string;
    youtube?: string;
    vimeo?: string;
    footerText?: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const { openQuoteModal } = useQuoteModal();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#070708] border-t border-white/10 text-white overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                <Camera className="w-4 h-4" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-wider text-white">
                {settings?.siteName || 'BAYRAKTAR CREATIVE'}
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Drone ve hava çekimleri, sinematik tanıtım filmleri, mimari ve gastronomi prodüksiyonu. Her karede hikâye anlatımı ve editoryal vizyon.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[11px] font-mono tracking-wider">
                {settings?.tagline || 'Every Frame Tells a Story.'}
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">
              Navigasyon
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/hizmetler" className="hover:text-white transition-colors">Hizmetlerimiz</Link>
              </li>
              <li>
                <Link href="/projeler" className="hover:text-white transition-colors">Seçili Çalışmalar</Link>
              </li>
              <li>
                <Link href="/reels" className="hover:text-white transition-colors">Dikey Format (Reels)</Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="hover:text-white transition-colors">Stüdyo Yaklaşımı</Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-white transition-colors">İletişim & Lokasyon</Link>
              </li>
            </ul>
          </div>

          {/* Expertise */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">
              Uzmanlıklar
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>Drone & Hava Çekimi</li>
              <li>Mimari & Otel Prodüksiyonu</li>
              <li>Gastronomi & Mekân Çekimi</li>
              <li>Kurgu & Davinci Renk</li>
              <li>İnteraktif 360° Deneyim</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">
              İletişim & Stüdyo
            </h4>
            <p className="text-xs text-white/60">
              {settings?.address || 'Kreatif Prodüksiyon Stüdyosu — İstanbul'}
            </p>
            <p className="text-xs text-white/80 font-mono">
              {settings?.phone || '+90 (212) 000 00 00'}
            </p>
            <p className="text-xs text-white/80 font-mono">
              {settings?.email || 'info@bayraktarcreative.com'}
            </p>
            <div className="pt-2 flex items-center gap-3">
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings?.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {settings?.vimeo && (
                <a
                  href={settings.vimeo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
                  aria-label="Vimeo"
                >
                  <Video className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>{settings?.footerText || `© ${currentYear} BAYRAKTAR CREATIVE. Tüm hakları saklıdır.`}</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => openQuoteModal()}
              className="text-white/60 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Hızlı Teklif Talebi</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <Link
              href="/admin"
              className="text-white/30 hover:text-white/70 flex items-center gap-1 font-mono transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>/admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
