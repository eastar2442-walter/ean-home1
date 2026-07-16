/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ActiveTab, SiteConfiguration } from '../types';
import { Shield, MapPin, Phone, Mail, Award, Clock } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  config: SiteConfiguration;
}

export default function Footer({ setActiveTab, config }: FooterProps) {
  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-400 font-sans border-t-4 border-custom-accent transition-colors duration-300" style={{ borderTopColor: config.accentColor }}>
      {/* Top Value Bar */}
      <div className="border-b border-gray-800 bg-gray-950/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-gray-800 text-custom-accent" style={{ color: config.accentColor }}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">100% 면허 보유 전문공사업체</h4>
              <p className="text-xs text-gray-500 mt-0.5">정보통신공사업 및 성능점검업 정식 등록</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-gray-800 text-custom-accent" style={{ color: config.accentColor }}>
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">ISO 9001 국제품질 인증 기업</h4>
              <p className="text-xs text-gray-500 mt-0.5">글로벌 규격에 맞춘 꼼꼼하고 완벽한 품질 관리</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-gray-800 text-custom-accent" style={{ color: config.accentColor }}>
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white">신속한 365일 비상 응대 대응</h4>
              <p className="text-xs text-gray-500 mt-0.5">유지보수 계약 단지 정기 검사 및 실시간 접수</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Company Logo / Pitch */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-custom-accent flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: config.accentColor }}>
                I
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {config.companyName}
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              정보통신 시공부터 법정 성능점검, 공동주택 설계 및 감리까지, 고도의 전문 기술 인력과 최신 첨단 장비로 가장 안전하고 견고한 디지털 스마트 세상을 만듭니다.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <span className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 font-medium transition-colors">CCTV보안</span>
              <span className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 font-medium transition-colors">네트워크시공</span>
              <span className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 font-medium transition-colors">법정성능점검</span>
              <span className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 font-medium transition-colors">통신설계감리</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">주요 메뉴</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleTabClick('home')} className="hover:text-white transition-colors">홈 화면</button>
              </li>
              <li>
                <button onClick={() => handleTabClick('intro')} className="hover:text-white transition-colors">회사소개 (인사말/Philosopy)</button>
              </li>
              <li>
                <button onClick={() => handleTabClick('services')} className="hover:text-white transition-colors">사업분야 (시공/유지관리/설계)</button>
              </li>
              <li>
                <button onClick={() => handleTabClick('portfolio')} className="hover:text-white transition-colors">시공실적 (포트폴리오)</button>
              </li>
              <li>
                <button onClick={() => handleTabClick('customer')} className="hover:text-white transition-colors">고객지원 (공지 및 Q&A)</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info Summary */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">고객지원센터</h3>
            <div className="space-y-3 text-sm">
              <a href={`tel:${config.phone}`} className="flex items-center gap-2 group text-white font-semibold text-lg hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>
                <Phone className="w-5 h-5 text-custom-accent" style={{ color: config.accentColor }} />
                <span>{config.phone}</span>
              </a>
              <p className="text-xs text-gray-500 leading-tight">
                평일: 09:00 ~ 18:00 (토/일요일, 공휴일 휴무)<br />
                긴급 장애 수리 접수는 365일 연중무휴 가동
              </p>
              <div className="pt-2 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>이메일: {config.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-bold">팩스:</span>
                  <span>FAX: {config.fax}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Meta Grid */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-xs text-gray-500 space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              <div>상호명: {config.companyName}</div>
              <div>대표이사: {config.ceoName}</div>
              <div>사업자등록번호: {config.registrationNumber}</div>
              <div className="sm:col-span-2 lg:col-span-3 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-600" />
                <span>주소: {config.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <button onClick={() => handleTabClick('admin')} className="hover:text-custom-accent transition-colors font-semibold" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>관리자 시스템 로그인</button>
              <span>|</span>
              <span className="text-gray-600 text-[10px]">VER 2.0 (SPA Realtime)</span>
            </div>
          </div>
          
          {/* Copyright block */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 text-[11px] text-gray-600 border-t border-gray-800/50 pt-4">
            <p>© {new Date().getFullYear()} {config.companyName}. All Rights Reserved.</p>
            <p className="font-mono">Designed with architectural honesty and modern engineering.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
