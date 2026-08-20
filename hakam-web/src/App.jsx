import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScrollStorySection from './components/ScrollStorySection';
import AboutSection from './components/AboutSection';
import CoursesSection from './components/CoursesSection';
import ServicesSection from './components/ServicesSection';
import YouTubeVideosSection from './components/YouTubeVideosSection';
import AiMcpSection from './components/AiMcpSection';
import WeeklyUpdatesTeaser from './components/WeeklyUpdatesTeaser';
import StatsSection from './components/StatsSection';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import RoadmapModal from './components/RoadmapModal';
import WeeklyArchivePage from './pages/WeeklyArchivePage';
import WeeklyArticlePage from './pages/WeeklyArticlePage';
import SEO from './components/SEO';
import { SITE_URL } from './config/site';

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hakam Data Studio',
  url: `${SITE_URL}/`,
  founder: { '@type': 'Person', name: 'Hakam Abushanab' },
  sameAs: [
    'https://www.youtube.com/@HakamDataStudio',
    'https://www.linkedin.com/in/hakam-abushanab-a99523b6',
    'https://www.instagram.com/hakam_data_studio',
    'https://github.com/Hakam94',
    'https://www.tiktok.com/@hakam.datastudio',
    'https://www.facebook.com/share/1CJ2skgmAW/'
  ]
};

function HomePage({ onOpenRoadmap }) {
  return (
    <main>
      <SEO
        description="Learn Data Analytics, Power BI, SQL, Snowflake, AI, Microsoft Fabric, and Data Engineering with Hakam Abushanab. Weekly tool updates, real project tutorials, and 1:1 services."
        path="/"
        jsonLd={ORGANIZATION_JSON_LD}
      />
      <HeroSection onOpenRoadmap={onOpenRoadmap} />
      <ScrollStorySection />
      <AboutSection />
      <CoursesSection />
      <ServicesSection />
      <YouTubeVideosSection />
      <AiMcpSection />
      <WeeklyUpdatesTeaser />
      <StatsSection />
      <CommunitySection />
    </main>
  );
}

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const openRoadmap = () => setRoadmapModalOpen(true);

  // GH Pages builds set BASE_URL to "/Power-BI-2/"; BrowserRouter's basename
  // wants no trailing slash. Vercel/root deploys use "/" -> basename "".
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <BrowserRouter basename={basename}>
      <div className="min-h-screen bg-[#0D2229] text-white selection:bg-[#BFFF00] selection:text-black font-sans antialiased overflow-x-hidden">
        {/* Top Navbar */}
        <Navbar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenRoadmap={openRoadmap}
        />

        {/* Routed Content */}
        <Routes>
          <Route path="/" element={<HomePage onOpenRoadmap={openRoadmap} />} />
          <Route path="/weekly" element={<WeeklyArchivePage />} />
          <Route path="/weekly/:slug" element={<WeeklyArticlePage />} />
        </Routes>

        {/* Footer */}
        <Footer onOpenRoadmap={openRoadmap} />

        {/* Modals & Dialogs */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenRoadmap={openRoadmap}
        />

        <RoadmapModal
          isOpen={roadmapModalOpen}
          onClose={() => setRoadmapModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}
