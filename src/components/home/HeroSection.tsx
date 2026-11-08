import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, ArrowDown, ArrowUpRight } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

interface HeroProps {
  videoUrl?: string;
  posterImage?: string;
  title?: string;
  subtitle?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
}

export default function HeroSection({
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41559-large.mp4',
  posterImage = 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2000&auto=format&fit=crop',
  title = 'HİKÂYENİZİ\nSİNEMATİK PERSPEKTİFTEN\nANLATIYORUZ.',
  subtitle = 'Markalar, mekânlar ve deneyimler için sıradan görüntülerin ötesinde görsel hikâyeler üretiyoruz.',
  ctaPrimaryText = 'Projeleri Keşfet',
  ctaSecondaryText = 'Teklif Al',
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
        setIsPlaying(false);
      });
    }
  }, [videoUrl]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const scrollToExplore = () => {
    const el = document.getElementById('studio-intro');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleLines = title.split('\n');

  return (
    <section className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-black select-none">
      {/* Background Showreel Video */}
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterImage}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-70 scale-100' : 'opacity-40 scale-105'
          }`}
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${posterImage})` }}
        />
      )}

      {/* Cinematic Overlays: Top, Vignette, Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 animate-fadeIn">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] tracking-widestx text-white/80 uppercase font-mono">
            Kreatif Prodüksiyon & Sinematik Görüntüleme
          </span>
        </div>

        {/* Cinematic Staggered Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white uppercase font-display leading-[1.08] drop-shadow-2xl">
          {titleLines.map((line, idx) => (
            <span key={idx} className="block overflow-hidden">
              <span className="block animate-fadeIn" style={{ animationDelay: `${idx * 150}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-white/75 max-w-2xl font-light leading-relaxed drop-shadow">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#secili-projeler"
            className="group px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.45)] hover:bg-white/90 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2"
          >
            <span>{ctaPrimaryText}</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>

          <button
            onClick={() => openQuoteModal()}
            className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2"
          >
            <span>{ctaSecondaryText}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Video Controls in Hero */}
      {videoUrl && (
        <div className="absolute bottom-8 right-6 sm:right-10 z-20 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white border border-white/15 backdrop-blur-md transition-colors"
            title={isPlaying ? 'Durdur' : 'Oynat'}
            aria-label={isPlaying ? 'Videoyu duraklat' : 'Videoyu oynat'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white border border-white/15 backdrop-blur-md transition-colors"
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            aria-label={isMuted ? 'Sesi aç' : 'Sesi kapat'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Scroll to Explore Indicator */}
      <button
        onClick={scrollToExplore}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer"
        aria-label="Aşağı kaydır"
      >
        <span className="text-[10px] tracking-widestx uppercase font-mono">
          Scroll to Explore
        </span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
          <span className="w-1 h-2 rounded-full bg-white animate-bounce" />
        </div>
      </button>
    </section>
  );
}
