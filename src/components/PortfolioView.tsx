/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PortfolioItem, SiteConfiguration } from '../types';
import { Calendar, User, ShieldCheck, Tag, X, ExternalLink } from 'lucide-react';

interface PortfolioViewProps {
  portfolio: PortfolioItem[];
  config: SiteConfiguration;
}

type FilterCategory = '전체' | 'CCTV/네트워크' | '유지관리' | '설계/감리';

export default function PortfolioView({ portfolio, config }: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('전체');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories: FilterCategory[] = ['전체', 'CCTV/네트워크', '유지관리', '설계/감리'];

  const filteredPortfolio = selectedCategory === '전체'
    ? portfolio
    : portfolio.filter(item => item.category === selectedCategory);

  return (
    <div className="font-sans bg-white py-12 space-y-12">
      
      {/* HEADER SECTION */}
      <section className="relative py-16 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">
              시공 실적
            </h1>
            <p className="mt-4 text-base text-gray-600 font-light leading-relaxed">
              전국의 대단지 공동주택과 인프라 주요 현장에서 (주)이안정보통신이 달성한 완벽한 완공 실적과 감리, 법정 성능점검 목록입니다.
            </p>
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID & FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-sm font-bold rounded-full border transition-all cursor-pointer ${
                  isActive 
                    ? 'text-white border-custom-accent shadow-md shadow-red-500/10' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-white'
                }`}
                style={{ 
                  backgroundColor: isActive ? config.accentColor : undefined,
                  borderColor: isActive ? config.accentColor : undefined,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Wrap */}
                <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
                      style={{ backgroundColor: config.accentColor }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content Wrap */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{item.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{item.client}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 leading-snug text-base line-clamp-1 group-hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3 font-light leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="px-6 pb-6 pt-3 mt-auto border-t border-gray-50 flex justify-between items-center text-xs text-gray-400 group-hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>
                <span>구분: {item.category}</span>
                <span className="font-bold inline-flex items-center gap-1">시공 백서 보기 <ExternalLink className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          ))}
        </div>

        {filteredPortfolio.length === 0 && (
          <div className="py-20 text-center text-gray-400 space-y-2 border border-dashed border-gray-200 rounded-2xl">
            <ShieldCheck className="w-10 h-10 mx-auto text-gray-300" />
            <p className="font-semibold text-sm">해당 분류에 등록된 시공 실적이 존재하지 않습니다.</p>
            <p className="text-xs text-gray-400">관리자 페이지에서 시공 실적 포트폴리오를 신규 등록할 수 있습니다.</p>
          </div>
        )}

      </section>

      {/* PORTFOLIO DETAIL DIALOG MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-8 duration-300">
            
            {/* Modal Image */}
            <div className="relative aspect-video w-full bg-gray-100 shrink-0">
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent"></div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black tracking-wider uppercase bg-red-600">
                  {selectedProject.category}
                </span>
                <h3 className="text-lg font-bold sm:text-xl">{selectedProject.title}</h3>
              </div>
            </div>

            {/* Modal Content body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Construction Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl text-xs">
                <div className="space-y-1">
                  <span className="block text-gray-400 font-bold">발주 고객사 / 단지명</span>
                  <span className="font-bold text-gray-800 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    {selectedProject.client}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block text-gray-400 font-bold">공사 완료년월</span>
                  <span className="font-bold text-gray-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {selectedProject.date}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block text-gray-400 font-bold">인프라 영역</span>
                  <span className="font-bold text-gray-800 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 text-sm border-l-4 border-custom-accent pl-2" style={{ borderLeftColor: config.accentColor }}>시공 개요 및 엔지니어링 세부 내역</h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap font-light">
                  {selectedProject.content}
                </p>
              </div>

              {/* Verification Stamp info */}
              <div className="p-4 bg-red-50/20 border border-red-100/50 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-custom-accent shrink-0 mt-0.5" style={{ color: config.accentColor }} />
                <div className="space-y-1">
                  <h5 className="font-bold text-xs text-gray-800">품질 승인 및 하자이행보증서 발행 완료</h5>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                    본 현장은 (주)이안정보통신의 공인 정보통신 기술자가 전과정 감리 입회 하에 법정 기준에 맞춰 정밀 시공 및 계측 완료한 시설물입니다. 준공 품질 승인과 함께 서울보증보험 하자보증서(기한 2년) 발행을 마쳤습니다.
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 bg-gray-800 hover:bg-gray-950 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                상세 닫기
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
