import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getDatabase } from '@/lib/db';
import { DatabaseSchema, Project } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoModal from '@/components/shared/VideoModal';
import { Play, ArrowUpRight, Filter } from 'lucide-react';

interface ProjelerProps {
  db: DatabaseSchema;
}

export default function Projeler({ db }: ProjelerProps) {
  const { projects, settings } = db;
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; cat?: string } | null>(null);

  const categories = [
    'Tümü',
    'Drone & Hava Çekimi',
    'Sinematik Tanıtım',
    'Mimari & Gayrimenkul',
    'Gastronomi & Mekân',
  ];

  const filteredProjects = projects.filter((p) => {
    if (p.status === 'draft') return false;
    if (selectedCategory === 'Tümü') return true;
    return p.category === selectedCategory;
  });

  return (
    <>
      <Head>
        <title>Projeler & Portfolyo — BAYRAKTAR CREATIVE</title>
        <meta
          name="description"
          content="Bayraktar Creative sinematik tanıtım filmleri, drone çekimleri ve mimari prodüksiyon portfolyosu."
        />
      </Head>

      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex flex-col">
        <Header logoUrl={settings.logoUrl} siteName={settings.siteName} />

        {/* Page Hero */}
        <section className="pt-36 pb-16 px-6 sm:px-8 bg-gradient-to-b from-[#141418] to-[#0A0A0A] border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <span className="text-[11px] font-mono tracking-widestx text-white/50 uppercase block mb-3">
              Portfolyo // Arşiv
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-white leading-tight">
              TÜM PROJELER.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl font-light">
              Farklı sektör ve mekânlar için hazırlanan sinematik çalışmalar, hava görüntüleri ve prodüksiyon kayıtları.
            </p>

            {/* Category Filter Pills */}
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

        {/* Projects Grid */}
        <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto w-full flex-1">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center text-white/50 text-sm">
              Bu kategoride henüz yayınlanmış bir proje bulunmamaktadır.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-2xl bg-[#121215] border border-white/10 hover:border-white/30 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
                >
                  <div
                    className="relative aspect-[16/10] overflow-hidden bg-black/60 cursor-pointer"
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

                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-black/30 pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/80">
                        {project.category}
                      </span>
                      {project.isDemo && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[9px] font-mono text-amber-300 border border-amber-500/30">
                          DEMO KONSEPT
                        </span>
                      )}
                    </div>

                    {project.videoUrl && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveVideo({
                            url: project.videoUrl!,
                            title: project.title,
                            cat: project.category,
                          });
                        }}
                        className="absolute bottom-3.5 right-3.5 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/30 transition-all hover:scale-110"
                        title="Videoyu İzle"
                      >
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </button>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-2">
                        <span>{project.year || '2025'}</span>
                        {project.client && <span>{project.client}</span>}
                      </div>

                      <Link href={`/projeler/${project.slug}`}>
                        <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors font-display line-clamp-1">
                          {project.title}
                        </h3>
                      </Link>

                      <p className="mt-2 text-xs text-white/60 line-clamp-2 leading-relaxed">
                        {project.subtitle || project.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <Link
                        href={`/projeler/${project.slug}`}
                        className="font-semibold text-white/70 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>Detayları Gör</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.gallery && project.gallery.length > 0 && (
                        <span className="text-[10px] text-white/40 font-mono">
                          {project.gallery.length} Fotoğraf
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

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

        <Footer settings={settings} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const db = getDatabase();
  return { props: { db } };
};
