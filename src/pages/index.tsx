import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getDatabase } from '@/lib/db';
import { DatabaseSchema } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import StudioIntro from '@/components/home/StudioIntro';
import ServicesSection from '@/components/home/ServicesSection';
import SelectedWorks from '@/components/home/SelectedWorks';
import ReelsSection from '@/components/home/ReelsSection';
import VirtualTourSection from '@/components/home/VirtualTourSection';
import AboutSection from '@/components/home/AboutSection';
import FinalCTA from '@/components/home/FinalCTA';

interface HomeProps {
  db: DatabaseSchema;
}

export default function Home({ db }: HomeProps) {
  const { media, projects, reels, settings } = db;

  return (
    <>
      <Head>
        <title>{settings.metaTitle || 'BAYRAKTAR CREATIVE — Sinematik Prodüksiyon & Görüntüleme Stüdyosu'}</title>
        <meta
          name="description"
          content={
            settings.metaDescription ||
            'Drone ve hava çekimleri, sinematik tanıtım filmleri, mimari ve gastronomi prodüksiyonu. Every Frame Tells a Story.'
          }
        />
        <meta property="og:title" content={settings.metaTitle} />
        <meta property="og:description" content={settings.metaDescription} />
        <meta property="og:image" content={media.hero.posterImage} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {settings.faviconUrl && <link rel="icon" href={settings.faviconUrl} />}
      </Head>

      <div className="relative min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex flex-col">
        {/* Dynamic Header */}
        <Header logoUrl={settings.logoUrl} siteName={settings.siteName} />

        {/* 1. Full-Screen Cinematic Hero */}
        <HeroSection
          videoUrl={media.hero.videoUrl}
          posterImage={media.hero.posterImage}
          title={media.hero.title}
          subtitle={media.hero.subtitle}
          ctaPrimaryText={media.hero.ctaPrimaryText}
          ctaSecondaryText={media.hero.ctaSecondaryText}
        />

        {/* 2. Studio Introduction */}
        <StudioIntro
          headline={media.intro.headline}
          description={media.intro.description}
          subtext={media.intro.subtext}
          parallaxBg={media.parallaxBg}
        />

        {/* 3. Services / Expertise */}
        <ServicesSection services={media.services} />

        {/* 4. Selected Works — Asymmetrical Editorial Portfolio */}
        <SelectedWorks projects={projects} />

        {/* 5. Vertical Stories — Reels Showcase */}
        <ReelsSection reels={reels} />

        {/* 6. Immersive 360° / Virtual Tour Infrastructure */}
        <VirtualTourSection bgImage={media.virtualTourBg} />

        {/* 7. About / Philosophy */}
        <AboutSection
          image={media.aboutImage}
          headline={media.aboutHeadline}
          text={media.aboutText}
        />

        {/* 8. Final CTA */}
        <FinalCTA
          title={media.ctaTitle}
          buttonText={media.ctaButtonText}
          bgImage={media.ctaBg}
        />

        {/* Footer */}
        <Footer settings={settings} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const db = getDatabase();
  return {
    props: {
      db,
    },
  };
};
