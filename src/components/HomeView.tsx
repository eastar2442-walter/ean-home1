/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, BoardPost, SiteConfiguration } from '../types';
import { ShieldCheck, Cpu, HardHat, FileText, ChevronRight, Phone, Clock, Send, Sparkles } from 'lucide-react';

const heroBg = '/src/assets/images/telecom_hero_bg_1784174844775.jpg';

interface HomeViewProps {
  config: SiteConfiguration;
  posts: BoardPost[];
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedPostId: (id: string | null) => void;
  onAddPost: (post: Omit<BoardPost, 'id' | 'createdAt' | 'views'>) => void;
}

export default function HomeView({ config, posts, setActiveTab, setSelectedPostId, onAddPost }: HomeViewProps) {
  // Quick inquiry state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: '',
    subject: '',
    content: '',
    agreePrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const latestPosts = posts
    .filter(p => p.category === '공지사항' || p.category === '뉴스')
    .slice(0, 3);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setActiveTab('customer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreePrivacy) {
      alert('개인정보 수집 및 이용동의에 체크해 주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      onAddPost({
        title: `[견적/시공문의] ${formData.subject || `${formData.organization || formData.name}에서 문의드립니다.`}`,
        content: `기관/단지명: ${formData.organization || '없음'}
담당자명: ${formData.name}
전화번호: ${formData.phone}
이메일: ${formData.email}

[문의 상세 내용]
${formData.content}`,
        author: formData.name,
        category: '문의사항',
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        organization: '',
        subject: '',
        content: '',
        agreePrivacy: false,
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="font-sans leading-relaxed text-gray-800">
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative min-h-[600px] flex items-center bg-gray-900 overflow-hidden"
        id="home-hero"
      >
        {/* Professional telecommunications network background */}
        <div className="absolute inset-0 opacity-30">
          <img 
            src={heroBg} 
            alt="Telecommunications and Network Infrastructure"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/85 to-transparent"></div>
        </div>

        {/* Hero Content Grid */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>대한민국 정보통신 엔지니어링 표준</span>
            </div>
            
            <h1 
              id="hero-main-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
            >
              {config.heroTitle}
            </h1>
            
            <p 
              id="hero-subtitle"
              className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-light"
            >
              {config.heroSubtitle}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('quick-inquiry-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-xl text-white font-extrabold text-base bg-custom-accent hover:brightness-115 active:scale-95 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: config.accentColor }}
              >
                {config.heroCtaText}
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('intro');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-xl text-gray-300 hover:text-white font-bold text-base bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                회사 소개 자세히 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SUMMARY */}
      <section className="py-20 bg-white" id="home-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-extrabold text-custom-accent tracking-widest uppercase" style={{ color: config.accentColor }}>BUSINESS AREAS</h2>
            <p className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">이안정보통신의 3대 핵심 핵심 역량</p>
            <div className="w-12 h-1 bg-custom-accent mx-auto rounded-full" style={{ backgroundColor: config.accentColor }}></div>
            <p className="text-sm text-gray-500">정보통신 전문 원스톱 서비스를 통해 가장 완벽하고 이상적인 인프라를 구축합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            
            {/* Service 1 */}
            <div className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-red-100 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-xl bg-red-50 text-custom-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ color: config.accentColor, backgroundColor: `${config.accentColor}10` }}>
                  <Cpu className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>정보통신공사 / CCTV·네트워크 시공</h3>
                  <p className="text-xs text-gray-400 mt-1">최첨단 보안 및 스마트 제어 시스템</p>
                  <p className="text-sm text-gray-500 mt-4 leading-relaxed font-light">
                    4K 초고화질 지능형 AI CCTV 솔루션, 기가급 고성능 네트워크 전송망, 스마트 지능형 주차관제 시스템 시공까지 안전과 효율을 정밀 시공합니다.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-custom-accent group-hover:gap-2 transition-all"
                style={{ color: config.accentColor }}
              >
                <span>자세히 보기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Service 2 */}
            <div className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-red-100 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-xl bg-red-50 text-custom-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ color: config.accentColor, backgroundColor: `${config.accentColor}10` }}>
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>정보통신설비 유지관리 및 성능점검</h3>
                  <p className="text-xs text-gray-400 mt-1">법정 필수 정밀 측정 및 예방 보수</p>
                  <p className="text-sm text-gray-500 mt-4 leading-relaxed font-light">
                    법정 고시 장비를 완비한 특급 점검팀 가동. 노후 설비 예방 진단, 아파트 법정 의무 성능점검 수행 및 체계적인 보고서 신고 대행 서비스를 수행합니다.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-custom-accent group-hover:gap-2 transition-all"
                style={{ color: config.accentColor }}
              >
                <span>자세히 보기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Service 3 */}
            <div className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-red-100 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-xl bg-red-50 text-custom-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ color: config.accentColor, backgroundColor: `${config.accentColor}10` }}>
                  <HardHat className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>공동주택 정보통신설비 설계 및 감리</h3>
                  <p className="text-xs text-gray-400 mt-1">건축물의 정보통신 엔지니어링 표준</p>
                  <p className="text-sm text-gray-500 mt-4 leading-relaxed font-light">
                    신축 및 개보수 대단지 정보통신 설계 도서 검토, 배선 측정, 준공 도서 교차 감리 검토서 발행 등 전문 기술사 입회 하의 수준 높은 감리를 진행합니다.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { setActiveTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-custom-accent group-hover:gap-2 transition-all"
                style={{ color: config.accentColor }}
              >
                <span>자세히 보기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. LATEST NEWS / NOTICE WIDGET */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-100" id="home-news">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
            <div className="space-y-2">
              <h2 className="text-xs font-extrabold text-custom-accent tracking-widest uppercase" style={{ color: config.accentColor }}>NOTICE & NEWS</h2>
              <p className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">이안정보통신 최근 소식</p>
            </div>
            <button
              onClick={() => { setActiveTab('customer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-custom-accent transition-colors"
              style={{ '--hover-color': config.accentColor } as React.CSSProperties}
            >
              <span>전체 게시판 보기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <div 
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="p-6 rounded-xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-600 group-hover:bg-red-50 group-hover:text-custom-accent transition-colors" style={{ '--hover-bg': `${config.accentColor}10`, '--hover-color': config.accentColor } as React.CSSProperties}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">{post.createdAt}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3 font-light">
                    {post.content}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400 group-hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>
                  <span>작성자: {post.author}</span>
                  <span className="inline-flex items-center gap-0.5 font-bold">읽기 <ChevronRight className="w-3.5 h-3.5" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUICK CONTACT FORM SUMMARY */}
      <section className="py-20 bg-white" id="quick-inquiry-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Box: Office contact summary */}
            <div className="lg:col-span-5 space-y-8 lg:pr-6">
              <div className="space-y-3">
                <h2 className="text-xs font-extrabold text-custom-accent tracking-widest uppercase" style={{ color: config.accentColor }}>CONTACT US</h2>
                <p className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">견적 및 설계 컨설팅 상담을 신청해 주십시오</p>
                <div className="w-12 h-1 bg-custom-accent rounded-full animate-pulse" style={{ backgroundColor: config.accentColor }}></div>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                설계 및 공정 분석 전문가, 성능점검 전문 기술진이 정밀하고 과학적인 컨설팅을 즉시 지원해 드립니다. 궁금한 사항이 있으시면 아래 대표 전화나 견적 의뢰서를 작성해 주세요.
              </p>

              {/* Contact direct indicators */}
              <div className="space-y-4">
                <a 
                  href={`tel:${config.phone}`} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-red-100 hover:bg-red-50/10 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-full bg-red-100 text-custom-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ color: config.accentColor, backgroundColor: `${config.accentColor}15` }}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">대표전화 (상담 및 접수)</p>
                    <p className="text-lg font-extrabold text-gray-900 group-hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>{config.phone}</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-11 h-11 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">근무 및 상담 시간</p>
                    <p className="text-sm font-bold text-gray-800">평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Form container */}
            <div className="lg:col-span-7 bg-gray-50 rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-xl shadow-gray-200/40">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-custom-accent" style={{ color: config.accentColor }} />
                온라인 견적 및 설계 자문 신청서
              </h3>

              {submitSuccess ? (
                <div className="p-8 bg-green-50 text-green-800 rounded-xl text-center space-y-4 border border-green-200 animate-in fade-in duration-300">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h4 className="font-extrabold text-lg">견적 상담 신청이 정상 접수되었습니다!</h4>
                  <p className="text-sm text-green-700 leading-relaxed font-light">
                    남겨주신 이안정보통신 고객지원센터 게시판에 등록 및 안전한 보안 서버에 전송 완료되었습니다. 담당 전담 엔지니어가 면밀히 검토 후 기재해 주신 연락처로 유선 피드백을 신속히 올리겠습니다. 감사합니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">신청자명 *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-custom-accent focus:ring-1 focus:ring-custom-accent"
                        style={{ '--focus-color': config.accentColor } as React.CSSProperties}
                        placeholder="성함을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">기관/단지명 (선택)</label>
                      <input 
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData(p => ({ ...p, organization: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-custom-accent focus:ring-1 focus:ring-custom-accent"
                        placeholder="예: OO아파트 입대위, OO물류센터"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">연락처 *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-custom-accent focus:ring-1 focus:ring-custom-accent"
                        placeholder="예: 010-1234-5678"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">이메일 *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-custom-accent focus:ring-1 focus:ring-custom-accent"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">문의 제목 *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-custom-accent focus:ring-1 focus:ring-custom-accent"
                      placeholder="예: 아파트 CCTV 교체 및 통신성능점검 견적 요청"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">문의 상세 내용 *</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.content}
                      onChange={(e) => setFormData(p => ({ ...p, content: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-custom-accent focus:ring-1 focus:ring-custom-accent resize-none"
                      placeholder="상세 규격이나 세대수, 현 노후 현황 등을 자세하게 기재해 주실수록 완성도 높은 견적 피드백이 가능합니다."
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1.5">
                    <input 
                      type="checkbox"
                      id="agreePrivacy"
                      checked={formData.agreePrivacy}
                      onChange={(e) => setFormData(p => ({ ...p, agreePrivacy: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 rounded text-custom-accent focus:ring-custom-accent cursor-pointer"
                    />
                    <label htmlFor="agreePrivacy" className="text-xs text-gray-500 leading-tight cursor-pointer">
                      <strong>개인정보 수집 및 이용 동의 (필수)</strong><br />
                      회신 및 상담 목적 외 다른 어떠한 제3자 전송이나 마케팅 용도로 수집하지 않습니다.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3.5 bg-custom-accent text-white font-bold text-sm rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-500/10"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>간편 견적 상담 등록하기</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
