import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, ChevronLeft, ChevronRight, ArrowUpRight, Smartphone } from 'lucide-react';
import { Reel } from '@/lib/types';
import VideoModal from '@/components/shared/VideoModal';

interface ReelsSectionProps {
  reels: Reel[];
}

export default function ReelsSection({ reels }: ReelsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeReel, setActiveReel] = useState<Reel | null>(null);
  const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const publishedReels = reels.filter((r) => r.published);

  return (
    <section id="dikey-hikayeler" className="py-24 sm:py-36 px-6 sm:px-8 bg-[#0D0D10] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-white/40" />
              <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase">
                9:16 Dikey Format // 04
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-display">
              DİKEY FORMAT. SINIRSIZ HİKÂYE.
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4">
            <Link
              href="/reels"
              className="text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Tüm Reels Serisi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-colors"
                aria-label="Sola Kaydır"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-colors"
                aria-label="Sağa Kaydır"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 9:16 Horizontal Scrolling Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {publishedReels.map((reel) => {
            const isHovered = hoveredReelId === reel.id;

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReel(reel)}
                onMouseEnter={() => setHoveredReelId(reel.id)}
                onMouseLeave={() => setHoveredReelId(null)}
                data-cursor="OYNAT"
                className="group relative flex-none w-[220px] sm:w-[260px] aspect-[9/16] rounded-2xl bg-[#141418] border border-white/10 hover:border-white/40 overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.02] snap-start"
              >
                {/* Background Image / Hover Video Preview */}
                {isHovered && reel.videoUrl ? (
                  <video
                    src={reel.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={reel.coverImage}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                    loading="lazy"
                  />
                )}

                {/* Dark Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/90">
                    {reel.category}
                  </span>
                  {reel.isDemo && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[8px] font-mono text-amber-300 border border-amber-500/30">
                      DEMO
                    </span>
                  )}
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-black border border-white/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xl">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Title & Description */}
                <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                  <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1 drop-shadow font-display">
                    {reel.title}
                  </h4>
                  {reel.description && (
                    <p className="text-[11px] text-white/70 line-clamp-2 mt-1 leading-snug">
                      {reel.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mt-2">
                    <span>9:16 Video</span>
                    <span>{reel.duration || '0:15'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal with 9:16 orientation */}
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
    </section>
  );
}
