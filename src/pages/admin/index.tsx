import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { DatabaseSchema } from '@/lib/types';
import ProjectsTab from '@/components/admin/ProjectsTab';
import ReelsTab from '@/components/admin/ReelsTab';
import MediaTab from '@/components/admin/MediaTab';
import SettingsTab from '@/components/admin/SettingsTab';
import QuotesTab from '@/components/admin/QuotesTab';
import {
  Camera,
  LayoutDashboard,
  FolderKanban,
  Smartphone,
  SlidersHorizontal,
  MailQuestion,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
  TrendingUp,
  Inbox,
  Video,
} from 'lucide-react';

interface AdminDashboardProps {
  initialDb: DatabaseSchema;
}

export default function AdminDashboard({ initialDb }: AdminDashboardProps) {
  const router = useRouter();
  const [db, setDb] = useState<DatabaseSchema>(initialDb);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'reels' | 'media' | 'quotes' | 'settings'
  >('overview');

  const refreshData = async () => {
    try {
      const [projRes, reelsRes, mediaRes, settingsRes, quotesRes] = await Promise.all([
        fetch('/api/projects').then((r) => r.json()),
        fetch('/api/reels').then((r) => r.json()),
        fetch('/api/media').then((r) => r.json()),
        fetch('/api/settings').then((r) => r.json()),
        fetch('/api/quotes').then((r) => r.json()),
      ]);

      setDb({
        projects: Array.isArray(projRes) ? projRes : db.projects,
        reels: Array.isArray(reelsRes) ? reelsRes : db.reels,
        media: mediaRes || db.media,
        settings: settingsRes || db.settings,
        quotes: Array.isArray(quotesRes) ? quotesRes : db.quotes,
      });
    } catch (e) {
      console.error('Refresh error:', e);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const newQuotesCount = db.quotes.filter((q) => q.status === 'new').length;

  return (
    <>
      <Head>
        <title>Yönetim Merkezi — BAYRAKTAR CREATIVE</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[#09090B] text-white flex flex-col md:flex-row font-body">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#0D0D10] border-r border-white/10 flex flex-col justify-between shrink-0">
          <div>
            {/* Brand Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <Link href="/" target="_blank" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-sm tracking-wider text-white block">
                    BAYRAKTAR
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block">
                    Kreatif Stüdyo Panel
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation items */}
            <nav className="p-4 space-y-1.5 text-xs font-medium">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Genel Bakış</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'projects'
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-4 h-4" />
                  <span>Projeler</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10">
                  {db.projects.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('reels')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'reels'
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4" />
                  <span>Dikey Reels</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10">
                  {db.reels.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'media'
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Ana Sayfa & Medya</span>
              </button>

              <button
                onClick={() => setActiveTab('quotes')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'quotes'
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MailQuestion className="w-4 h-4" />
                  <span>Teklif Talepleri</span>
                </div>
                {newQuotesCount > 0 ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500 text-black font-bold animate-pulse">
                    {newQuotesCount} Yeni
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10">
                    {db.quotes.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Site Ayarları & SEO</span>
              </button>
            </nav>
          </div>

          {/* Footer of Sidebar */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-mono flex items-center justify-between transition-colors"
            >
              <span>Canlı Siteyi Gör</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 rounded-xl text-red-400 hover:bg-red-950/40 text-xs font-mono flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Güvenli Çıkış</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="pb-6 border-b border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                  Kontrol Paneli
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display tracking-tight text-white mt-1">
                  HOŞ GELDİNİZ, BAYRAKTAR CREATIVE.
                </h1>
                <p className="text-xs text-white/60 mt-1">
                  Stüdyonuzun portfolyosunu, showreel videolarını, teklif taleplerini ve site ayarlarını buradan yönetebilirsiniz.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('quotes')}
                  className="p-5 rounded-2xl bg-[#121215] border border-white/10 hover:border-white/30 cursor-pointer transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50 font-mono">Teklif Talepleri</span>
                    <Inbox className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-display text-white">
                    {db.quotes.length}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 block">
                    {newQuotesCount} yeni yanıt bekliyor
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('projects')}
                  className="p-5 rounded-2xl bg-[#121215] border border-white/10 hover:border-white/30 cursor-pointer transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50 font-mono">Kayıtlı Projeler</span>
                    <FolderKanban className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-display text-white">
                    {db.projects.length}
                  </div>
                  <span className="text-[10px] font-mono text-white/40 block">
                    {db.projects.filter((p) => p.status === 'published').length} yayında
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('reels')}
                  className="p-5 rounded-2xl bg-[#121215] border border-white/10 hover:border-white/30 cursor-pointer transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50 font-mono">Dikey Reels</span>
                    <Smartphone className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-display text-white">
                    {db.reels.length}
                  </div>
                  <span className="text-[10px] font-mono text-white/40 block">
                    9:16 video vitrini
                  </span>
                </div>

                <div
                  onClick={() => setActiveTab('media')}
                  className="p-5 rounded-2xl bg-[#121215] border border-white/10 hover:border-white/30 cursor-pointer transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50 font-mono">Arka Plan Showreel</span>
                    <Video className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-sm font-bold text-white line-clamp-1 pt-1">
                    Aktif Hero Medyası
                  </div>
                  <span className="text-[10px] font-mono text-white/40 block">
                    Değiştirmek için tıklayın
                  </span>
                </div>
              </div>

              {/* Quick Actions & Recent Quotes */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Inbound Quotes */}
                <div className="lg:col-span-8 p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white">
                      Son Gelen Teklif Talepleri
                    </h3>
                    <button
                      onClick={() => setActiveTab('quotes')}
                      className="text-xs text-white/50 hover:text-white font-mono"
                    >
                      Tümünü Gör →
                    </button>
                  </div>

                  {db.quotes.length === 0 ? (
                    <p className="text-xs text-white/40 py-6 text-center">Henüz başvuru bulunmuyor.</p>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {db.quotes.slice(0, 3).map((q) => (
                        <div key={q.id} className="py-3 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-white block">{q.fullName}</span>
                            <span className="text-[11px] text-white/50 font-mono">
                              {q.serviceType} • {q.sector}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                              q.status === 'new'
                                ? 'bg-amber-500/10 text-amber-300'
                                : 'bg-emerald-500/10 text-emerald-300'
                            }`}
                          >
                            {q.status === 'new' ? 'Yeni' : 'Görüşülüyor'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Shortcuts */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-3">
                  <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white pb-3 border-b border-white/10">
                    Hızlı İşlemler
                  </h3>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold text-left transition-colors flex items-center justify-between"
                  >
                    <span>+ Yeni Proje Ekle</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('reels')}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold text-left transition-colors flex items-center justify-between"
                  >
                    <span>+ Yeni 9:16 Reel Yükle</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('media')}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold text-left transition-colors flex items-center justify-between"
                  >
                    <span>Hero Arka Plan Videosunu Değiştir</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold text-left transition-colors flex items-center justify-between"
                  >
                    <span>WhatsApp Numarasını Düzenle</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <ProjectsTab projects={db.projects} onRefresh={refreshData} />
          )}

          {activeTab === 'reels' && (
            <ReelsTab reels={db.reels} onRefresh={refreshData} />
          )}

          {activeTab === 'media' && (
            <MediaTab media={db.media} onRefresh={refreshData} />
          )}

          {activeTab === 'quotes' && (
            <QuotesTab quotes={db.quotes} onRefresh={refreshData} />
          )}

          {activeTab === 'settings' && (
            <SettingsTab settings={db.settings} onRefresh={refreshData} />
          )}
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!isAuthenticated(req as any)) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  const db = getDatabase();
  return {
    props: {
      initialDb: db,
    },
  };
};
