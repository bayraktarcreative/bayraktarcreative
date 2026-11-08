import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getDatabase } from '@/lib/db';
import { DatabaseSchema, Project } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoModal from '@/components/shared/VideoModal';
import { Play, ArrowLeft, ArrowUpRight, CheckCircle2, Calendar, Folder, Tag, X } from 'lucide-react';
import { useQuoteModal } from '@/lib/QuoteContext';

interface ProjectDetailProps {
  project: Project | null;
  settings: DatabaseSchema['settings'];
  relatedProjects: Project[];
}

export default function ProjectDetail({ project, settings, relatedProjects }: ProjectDetailProps) {
  const { openQuoteModal } = useQuoteModal();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold font-display">Proje Bulunamadı</h1>
        <p className="text-sm text-white/50 mt-2">Aradığınız proje yayından kaldırılmış veya taşınmış olabilir.</p>
        <Link href="/projeler" className="mt-6 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs">
          Projelere Geri Dön
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${project.title} — BAYRAKTAR CREATIVE`}</title>
        <meta name="description" content={project.description || project.subtitle} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.coverImage} />
      </Head>

      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex flex-col">
        <Header logoUrl={settings.logoUrl} siteName={settings.siteName} />

        {/* Cinematic Project Header Hero */}
        <section className="relative pt-36 pb-20 px-6 sm:px-8 bg-gradient-to-b from-[#141418] via-[#0A0A0A] to-[#0A0A0A] border-b border-white/5">
          <div className="max-w-6xl mx-auto">
            {/* Back link */}
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tüm Projelere Dön</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white">
                {project.category}
              </span>
              {project.isDemo && (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-xs font-mono text-amber-300">
                  DEMO KONSEPT ÇALIŞMA
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-display tracking-tight text-white leading-[1.1]">
              {project.title}
            </h1>

            {project.subtitle && (
              <p className="mt-4 text-base sm:text-xl text-white/70 max-w-3xl font-light">
                {project.subtitle}
              </p>
            )}

            {/* Meta Row */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-8 text-xs text-white/60 font-mono">
              <div>
                <span className="block text-white/30 uppercase text-[10px]">Yıl</span>
                <span className="text-white font-medium">{project.year || '2025'}</span>
              </div>
              <div>
                <span className="block text-white/30 uppercase text-[10px]">Müşteri / Kapsam</span>
                <span className="text-white font-medium">{project.client || 'Stüdyo Prodüksiyonu'}</span>
              </div>
              <div>
                <span className="block text-white/30 uppercase text-[10px]">Kategori</span>
                <span className="text-white font-medium">{project.category}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Visual or Video Showcase */}
        <section className="px-6 sm:px-8 max-w-6xl mx-auto w-full -mt-4 mb-16">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {project.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2.5 shadow-2xl hover:scale-110 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Sinematik Filmi Başlat</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* In-depth Project Narrative & Deliverables */}
        <section className="px-6 sm:px-8 max-w-6xl mx-auto w-full pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase block">
                Proje Yaklaşımı
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white">
                GÖRSEL KURGU VE ÇEKİM DİSİPLİNİ
              </h2>
              <div className="text-sm sm:text-base text-white/70 space-y-4 font-light leading-relaxed">
                <p>{project.fullDescription || project.description}</p>
                {project.isDemo && (
                  <p className="text-xs text-amber-300/80 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                    * Not: Bu içerik, stüdyonun görsel kalitesini ve tasarım dilini göstermek amacıyla konsept demo olarak hazırlanmıştır. Kendi gerçek çekimlerinizi yönetim panelinden tek tıkla yükleyebilirsiniz.
                  </p>
                )}
              </div>
            </div>

            {/* Right Deliverables Box */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold font-display uppercase text-white tracking-wider">
                  Teslim Edilen Çıktılar
                </h3>

                {project.deliverables && project.deliverables.length > 0 ? (
                  <div className="space-y-2.5 pt-2">
                    {project.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-white/50">4K Master Film, Fotoğraf Serisi ve Renk Profili.</p>
                )}

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => openQuoteModal(project.category)}
                    className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Benzer Bir Proje İçin Teklif Al</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery Grid */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-20 px-6 sm:px-8 bg-[#0D0D10] border-t border-b border-white/5">
            <div className="max-w-6xl mx-auto">
              <div className="mb-10">
                <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase block mb-1">
                  Galeri
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-white">
                  PROJE GÖRSEL ARŞİVİ
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxImage(img)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-black/50 border border-white/10 hover:border-white/30 cursor-pointer shadow-lg"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${project.title} Kare ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-mono text-white">
                      Büyütmek İçin Tıklayın
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Video Modal */}
        {project.videoUrl && (
          <VideoModal
            isOpen={isVideoModalOpen}
            videoUrl={project.videoUrl}
            title={project.title}
            category={project.category}
            aspectRatio="16/9"
            onClose={() => setIsVideoModalOpen(false)}
          />
        )}

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage}
              alt="Büyütülmüş Görsel"
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        )}

        <Footer settings={settings} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const db = getDatabase();
  const slug = params?.slug as string;
  const project = db.projects.find((p) => p.slug === slug || p.id === slug) || null;
  const relatedProjects = db.projects.filter((p) => p.slug !== slug).slice(0, 3);

  return {
    props: {
      project,
      settings: db.settings,
      relatedProjects,
    },
  };
};
