import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play, Eye } from 'lucide-react';
import { Project } from '@/lib/types';
import VideoModal from '@/components/shared/VideoModal';

interface SelectedWorksProps {
  projects: Project[];
}

export default function SelectedWorks({ projects }: SelectedWorksProps) {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; cat?: string } | null>(null);

  // Take first 4 projects for editorial composition
  const displayProjects = projects.filter((p) => p.status === 'published').slice(0, 4);

  return (
    <section id="secili-projeler" className="py-24 sm:py-36 px-6 sm:px-8 bg-[#0A0A0A] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-white/40" />
              <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase">
                Portfolyo Vitrini // 03
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase font-display">
              SEÇİLİ ÇALIŞMALAR.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-white/60 max-w-xs font-light">
              Mekânın ruhunu ve markanın vizyonunu sinematik dille anlatan seçkin prodüksiyonlar.
            </p>
            <Link
              href="/projeler"
              className="px-5 py-2.5 rounded-full border border-white/20 hover:border-white/50 text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 shrink-0"
            >
              <span>Tüm Projeler</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Asymmetrical Editorial Portfolio Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {displayProjects.map((project, idx) => {
            // First item large (8 cols), second item tall (4 cols), third item (5 cols), fourth item (7 cols)
            const colSpan =
              idx === 0
                ? 'lg:col-span-8'
                : idx === 1
                ? 'lg:col-span-4'
                : idx === 2
                ? 'lg:col-span-5'
                : 'lg:col-span-7';

            const aspectClass =
              idx === 0 ? 'aspect-[16/9]' : idx === 1 ? 'aspect-[4/5]' : 'aspect-[16/10]';

            return (
              <div
                key={project.id}
                className={`group relative rounded-2xl bg-[#121215] border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-500 flex flex-col justify-between ${colSpan}`}
              >
                {/* Visual Cover with Cursor Action */}
                <div
                  className={`relative w-full ${aspectClass} overflow-hidden bg-black/60 cursor-pointer`}
                  data-cursor="İNCELE"
                >
                  <Link href={`/projeler/${project.slug}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                      loading="lazy"
                    />
                  </Link>

                  {/* Dark gradient & overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-black/30 pointer-events-none" />

                  {/* Badges: Category & Demo Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider uppercase text-white/80">
                      {project.category}
                    </span>

                    {project.isDemo && (
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-[9px] font-mono tracking-wider text-amber-300">
                        DEMO KONSEPT
                      </span>
                    )}
                  </div>

                  {/* Quick Video Trigger Button if has video */}
                  {project.videoUrl && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveVideo({
                          url: project.videoUrl!,
                          title: project.title,
                          cat: project.category,
                        });
                      }}
                      className="absolute bottom-4 right-4 z-20 p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
                      data-cursor="OYNAT"
                      title="Videoyu İzle"
                      aria-label="Videoyu İzle"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  )}
                </div>

                {/* Info Text */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-2">
                      <span>{project.year || '2025'}</span>
                      {project.client && <span>{project.client}</span>}
                    </div>

                    <Link href={`/projeler/${project.slug}`}>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors font-display">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-xs sm:text-sm text-white/60 line-clamp-2 leading-relaxed">
                      {project.subtitle || project.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <Link
                      href={`/projeler/${project.slug}`}
                      className="font-semibold text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>Projeyi İncele</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {project.gallery && project.gallery.length > 0 && (
                      <span className="text-[10px] text-white/40 font-mono">
                        {project.gallery.length} Kare Galeri
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal if clicked */}
      {activeVideo && (
        <VideoModal
          isOpen={true}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          category={activeVideo.cat}
          aspectRatio="16/9"
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
