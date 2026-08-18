import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScrollStorySection from './components/ScrollStorySection';
import AboutSection from './components/AboutSection';
import CoursesSection from './components/CoursesSection';
import ServicesSection from './components/ServicesSection';
import YouTubeVideosSection from './components/YouTubeVideosSection';
import AiMcpSection from './components/AiMcpSection';
import StatsSection from './components/StatsSection';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import RoadmapModal from './components/RoadmapModal';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D2229] text-white selection:bg-[#BFFF00] selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar 
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenRoadmap={() => setRoadmapModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <HeroSection 
          onOpenRoadmap={() => setRoadmapModalOpen(true)} 
        />

        <ScrollStorySection />

        <AboutSection />

        <CoursesSection />

        <ServicesSection />

        <YouTubeVideosSection />

        <AiMcpSection />

        <StatsSection />

        <CommunitySection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenRoadmap={() => setRoadmapModalOpen(true)} 
      />

      {/* Modals & Dialogs */}
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)}
        onOpenRoadmap={() => setRoadmapModalOpen(true)}
      />

      <RoadmapModal 
        isOpen={roadmapModalOpen} 
        onClose={() => setRoadmapModalOpen(false)} 
      />
    </div>
  );
}
