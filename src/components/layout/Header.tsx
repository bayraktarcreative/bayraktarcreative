import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ArrowUpRight, Camera } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

interface HeaderProps {
  logoUrl?: string;
  siteName?: string;
}

export default function Header({ logoUrl, siteName = 'BAYRAKTAR CREATIVE' }: HeaderProps) {
  const router = useRouter();
  const { openQuoteModal } = useQuoteModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);

  const navLinks = [
    { label: 'Hizmetler', href: '/hizmetler' },
    { label: 'Projeler', href: '/projeler' },
    { label: 'Reels', href: '/reels' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'İletişim', href: '/iletisim' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'py-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={siteName}
                className="h-8 sm:h-9 w-auto object-contain filter invert-0"
              />
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <Camera className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-base sm:text-lg tracking-wider text-white">
                    BAYRAKTAR
                  </span>
                  <span className="text-[9px] tracking-widestx text-white/50 uppercase font-mono -mt-1 group-hover:text-white/80 transition-colors">
                    CREATIVE STUDIO
                  </span>
                </div>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-white/70">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-white ${
                    isActive ? 'text-white font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white rounded-full animate-fadeIn" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => openQuoteModal()}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-black bg-white hover:bg-white/90 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Teklif Al</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => openQuoteModal()}
              className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-semibold"
            >
              Teklif
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Menüyü Aç"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-2xl flex flex-col pt-28 px-6 pb-10 justify-between animate-fadeIn">
          <div className="flex flex-col space-y-6">
            <span className="text-[10px] tracking-widestx text-white/40 uppercase font-mono">
              Menü Navigasyonu
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-bold tracking-tight text-white hover:text-white/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-sm font-mono tracking-widest text-white/40 hover:text-white pt-2"
            >
              → /admin Yönetim Paneli
            </Link>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Projen İçin Teklif Al</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-white/40 font-mono">
              Bayraktar Creative // Every Frame Tells a Story.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
