/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, PhoneCall, Settings } from 'lucide-react';
import { ActiveTab, SiteConfiguration } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  config: SiteConfiguration;
  onContactClick: () => void;
}

export default function Navbar({ activeTab, setActiveTab, config, onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: '홈' },
    { id: 'intro', label: '회사소개' },
    { id: 'services', label: '사업분야' },
    { id: 'portfolio', label: '시공실적' },
    { id: 'customer', label: '고객지원' },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div 
            onClick={() => handleTabClick('home')} 
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="w-10 h-10 rounded-lg bg-custom-accent flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform duration-300">
              I
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-xl text-gray-900 tracking-tight leading-none">
                <span className="text-custom-accent">이안</span>정보통신
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider mt-1">
                EAN INFO & COMM
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                    isActive 
                      ? 'text-custom-accent bg-red-50/50' 
                      : 'text-gray-600 hover:text-custom-accent hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span 
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-custom-accent rounded-full"
                      style={{ backgroundColor: config.accentColor }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions Menu */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-admin-btn"
              onClick={() => handleTabClick('admin')}
              className={`p-2 rounded-lg text-gray-500 hover:text-custom-accent hover:bg-gray-100 transition-colors duration-300 ${
                activeTab === 'admin' ? 'text-custom-accent bg-red-50/50' : ''
              }`}
              title="관리자 설정"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <button
              id="nav-contact-btn"
              onClick={onContactClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium text-sm bg-custom-accent hover:brightness-110 active:scale-95 shadow-lg shadow-red-500/10 transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: config.accentColor }}
            >
              <PhoneCall className="w-4 h-4" />
              문의하기
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleTabClick('admin')}
              className={`p-2 rounded-lg text-gray-500 hover:text-custom-accent hover:bg-gray-50 ${
                activeTab === 'admin' ? 'text-custom-accent bg-red-50/50' : ''
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                    isActive 
                      ? 'text-custom-accent bg-red-50' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-custom-accent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 px-4">
              <button
                id="mobile-contact-btn"
                onClick={() => {
                  setIsOpen(false);
                  onContactClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-bold bg-custom-accent shadow-md shadow-red-500/10 hover:brightness-110 active:scale-95 transition-all"
                style={{ backgroundColor: config.accentColor }}
              >
                <PhoneCall className="w-5 h-5" />
                문의하기 (전화상담)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
