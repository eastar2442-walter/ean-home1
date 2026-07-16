/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SiteConfiguration } from '../types';
import { CERTIFICATIONS } from '../data';
import { Award, CheckCircle2, Star, Target, Users } from 'lucide-react';

interface IntroViewProps {
  config: SiteConfiguration;
}

export default function IntroView({ config }: IntroViewProps) {
  const coreValues = [
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: '정직과 신뢰 (Trust)',
      desc: '모든 공사와 점검의 기본은 무결한 양심과 안전에 근거한다는 신조 아래 정량적이고 객관적인 데이터만을 제공합니다.'
    },
    {
      icon: <Target className="w-6 h-6 text-red-500" />,
      title: '완벽한 품질 (Quality)',
      desc: '타협 없는 고정밀 광대역 계측 장비 가동과 특급 등급의 검정 기술 인력만을 매칭하여 사후 고장을 원천 차단합니다.'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: '고객 우선주의 (Customer)',
      desc: '시공이나 검사가 끝난 후에도 24시간 실시간 유지관리 응대를 지속해, 아파트 단지 및 입주민 대표님들과 평생의 신뢰를 구축합니다.'
    }
  ];

  return (
    <div className="font-sans py-12 space-y-20 bg-white">
      
      {/* SECTION 1: HERO SUB HEADER */}
      <section className="relative py-16 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">
              회사 소개
            </h1>
            <p className="mt-4 text-base text-gray-600 font-light leading-relaxed">
              (주)이안정보통신은 앞선 정보통신 네트워크 인프라 기술과 체계적인 감리 및 엄격한 법정 성능점검을 수행하여 최상의 고객 경험을 이룩합니다.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: CEO GREETING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* CEO Picture Overlay / Signature Box */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="aspect-[4/5] w-full rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden shadow-xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" 
                alt="Representative Portrait"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <p className="text-xs text-red-400 font-mono tracking-widest uppercase">REPRESENTATIVE CEO</p>
                <h3 className="text-xl font-bold tracking-tight">{config.companyName} 대표이사</h3>
                <p className="text-2xl font-black font-sans mt-1">이 종 인 <span className="text-xs text-gray-300 font-light">(Lee Jong In)</span></p>
              </div>
            </div>

            <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100/50">
              <h4 className="font-bold text-gray-900 text-sm">회사 사명 (Mission)</h4>
              <p id="philosophy-text" className="text-xs text-gray-600 mt-2 leading-relaxed whitespace-pre-wrap font-light">
                {config.ceoPhilosophy}
              </p>
            </div>
          </div>

          {/* CEO Greeting Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-custom-accent uppercase tracking-wider" style={{ color: config.accentColor }}>CEO GREETINGS</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                신뢰와 완벽 시공을 기반으로<br />
                스마트 주거 환경의 중심이 되겠습니다.
              </h2>
              <div className="w-12 h-1 bg-custom-accent rounded-full mt-4" style={{ backgroundColor: config.accentColor }}></div>
            </div>

            <p id="greeting-text" className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed font-light">
              {config.ceoGreeting}
            </p>

            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Ean Information Communication Co., Ltd.</p>
                <p className="text-sm font-bold text-gray-800">주식회사 이안정보통신 대표이사 및 임직원 배상</p>
              </div>
              <div className="font-mono text-2xl font-black tracking-widest text-gray-300 italic select-none">
                Lee JongIn
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: BUSINESS PHILOSOPHY */}
      <section className="bg-gray-50 py-20 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-extrabold text-custom-accent tracking-widest uppercase" style={{ color: config.accentColor }}>CORE VALUES</h2>
            <p className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">이안정보통신의 세 가지 신념</p>
            <div className="w-12 h-1 bg-custom-accent mx-auto rounded-full" style={{ backgroundColor: config.accentColor }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {coreValues.map((val, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-50 transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900">{val.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: LICENSES & CERTIFICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-custom-accent uppercase tracking-wider" style={{ color: config.accentColor }}>LICENSES & CERTIFICATES</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">정부 공인 면허 및 특허 보유</h2>
              <div className="w-12 h-1 bg-custom-accent rounded-full mt-4" style={{ backgroundColor: config.accentColor }}></div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              (주)이안정보통신은 정식 정보통신공사업 허가는 물론, 기술점검 자격을 입증하는 법정 성능점검 등록 면허와 국제 규격 품질관리 ISO 9001, 지능형 특허 등록까지 완료하였습니다. 신뢰할 수 있는 공식 파트너의 능력을 증명해 보입니다.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-center">
                <span className="block text-xl font-bold text-custom-accent" style={{ color: config.accentColor }}>99.9%</span>
                <span className="text-[10px] text-gray-400">품질 만족 지표</span>
              </div>
              <div className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-center">
                <span className="block text-xl font-bold text-gray-900">100+</span>
                <span className="text-[10px] text-gray-400">아파트 실적 보유</span>
              </div>
            </div>
          </div>

          {/* Licenses Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div 
                key={idx}
                className="p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow group relative"
              >
                <div className="absolute top-6 right-6 text-gray-200 group-hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-custom-accent transition-colors" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>{cert.title}</h4>
                <p className="text-[10px] text-red-500 font-mono tracking-wider mt-1 uppercase">{cert.authority}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-50 border border-gray-100 text-[10px] text-gray-500 font-semibold font-mono">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span>등록번호: {cert.code}</span>
                </div>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed font-light">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
