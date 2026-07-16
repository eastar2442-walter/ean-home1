/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, BoardPost, PortfolioItem, SiteConfiguration } from './types';
import { 
  DEFAULT_CONFIGURATION, 
  INITIAL_POSTS, 
  INITIAL_PORTFOLIO 
} from './data';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingQuickMenu from './components/FloatingQuickMenu';

// Views
import HomeView from './components/HomeView';
import IntroView from './components/IntroView';
import ServicesView from './components/ServicesView';
import PortfolioView from './components/PortfolioView';
import CustomerCenterView from './components/CustomerCenterView';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // 1. STATE INITIALIZATION (with localStorage persistence)
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const [config, setConfig] = useState<SiteConfiguration>(() => {
    try {
      const saved = localStorage.getItem('ean_site_config');
      return saved ? JSON.parse(saved) : DEFAULT_CONFIGURATION;
    } catch {
      return DEFAULT_CONFIGURATION;
    }
  });

  const [posts, setPosts] = useState<BoardPost[]>(() => {
    try {
      const saved = localStorage.getItem('ean_board_posts');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('ean_portfolio');
      return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
    } catch {
      return INITIAL_PORTFOLIO;
    }
  });

  // 2. SYNCHRONIZE DATA TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('ean_site_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('ean_board_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('ean_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  // 3. SEED INITIAL POST INCREMENT VIEWS HANDLER
  const handleIncrementViews = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, views: post.views + 1 };
      }
      return post;
    }));
  };

  // Add a new post from any form (Quick Consultation / customer write post)
  const handleAddPost = (newPostData: Omit<BoardPost, 'id' | 'createdAt' | 'views'>) => {
    const newPostItem: BoardPost = {
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
      views: 0,
      ...newPostData,
    };
    setPosts(prev => [newPostItem, ...prev]);
  };

  // 4. ACTION TRIGGERS
  const handleContactClick = () => {
    setActiveTab('home');
    setSelectedPostId(null);
    // Scroll smoothly to quick inquiry section
    setTimeout(() => {
      const el = document.getElementById('quick-inquiry-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 5. DYNAMIC COLOR AND FONT WEB CUSTOMIZATION
  const fontValue = config.fontFamily === 'Pretendard' 
    ? 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
    : config.fontFamily === 'Noto Sans KR'
    ? '"Noto Sans KR", sans-serif'
    : config.fontFamily === 'Inter'
    ? 'Inter, sans-serif'
    : 'system-ui, sans-serif';

  const dynamicStyles = `
    :root {
      --accent-color: ${config.accentColor};
      --bg-color: ${config.bgColor};
      --primary-color: ${config.primaryColor};
      --font-sans: ${fontValue};
    }
    body {
      font-family: var(--font-sans);
      background-color: var(--bg-color);
      color: var(--primary-color);
    }
  `;

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between overflow-x-hidden selection:bg-red-500 selection:text-white" style={{ fontFamily: fontValue }}>
      {/* Inject real-time customized CSS overrides */}
      <style>{dynamicStyles}</style>

      {/* STICKY HEADER */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        config={config} 
        onContactClick={handleContactClick}
      />

      {/* CORE VIEWS WITH ANIMATED TRANSITIONS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' && (
              <HomeView 
                config={config} 
                posts={posts} 
                setActiveTab={setActiveTab} 
                setSelectedPostId={setSelectedPostId} 
                onAddPost={handleAddPost}
              />
            )}
            
            {activeTab === 'intro' && (
              <IntroView config={config} />
            )}
            
            {activeTab === 'services' && (
              <ServicesView config={config} />
            )}
            
            {activeTab === 'portfolio' && (
              <PortfolioView 
                portfolio={portfolio} 
                config={config} 
              />
            )}
            
            {activeTab === 'customer' && (
              <CustomerCenterView 
                posts={posts} 
                config={config} 
                onAddPost={handleAddPost}
                onIncrementViews={handleIncrementViews}
                selectedPostId={selectedPostId}
                setSelectedPostId={setSelectedPostId}
              />
            )}

            {activeTab === 'admin' && (
              <AdminDashboard 
                config={config}
                setConfig={setConfig}
                posts={posts}
                setPosts={setPosts}
                portfolio={portfolio}
                setPortfolio={setPortfolio}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* PROFESSIONAL DARK FOOTER */}
      <Footer setActiveTab={setActiveTab} config={config} />

      {/* INTERACTIVE FLOATING SIDE MENU & KAKAO CHAT SIMULATOR */}
      <FloatingQuickMenu config={config} />
    </div>
  );
}
