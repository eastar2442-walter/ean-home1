/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SiteConfiguration } from '../types';
import { 
  Cpu, Shield, HardHat, Camera, Cable, Radio, Server, CheckCircle2, 
  Settings, AlertCircle, FileSpreadsheet, Eye, Activity, ShieldCheck 
} from 'lucide-react';

interface ServicesViewProps {
  config: SiteConfiguration;
}

export default function ServicesView({ config }: ServicesViewProps) {
  return (
    <div className="font-sans bg-white py-12 space-y-20">
      
      {/* HEADER SECTION */}
      <section className="relative py-16 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">
              사업 분야
            </h1>
            <p className="mt-4 text-base text-gray-600 font-light leading-relaxed">
              (주)이안정보통신은 정보통신 엔지니어링 면허 등록 기업으로서, 완벽한 품질의 설계·시공과 빈틈없는 스마트 유지관리 솔루션을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE 1: CCTV / NETWORKS / PARKING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-custom-accent uppercase tracking-wider" style={{ color: config.accentColor }}>01. 시공 및 인프라 구축</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">정보통신공사 / CCTV·네트워크 시공</h2>
              <p className="text-sm text-gray-400">최상의 디지털 보안과 초고속 통신망을 구축하는 이안의 원스톱 시공 솔루션</p>
              <div className="w-12 h-1 bg-custom-accent rounded-full mt-4" style={{ backgroundColor: config.accentColor }}></div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed font-light">
              (주)이안정보통신은 다년간의 대단지 아파트 및 군부대, 지식산업센터, 글로벌 물류센터 시공 역량을 보유하고 있습니다. 설계 구도에 입각한 카메라 화각 배치, 간섭 없는 전송 광선로 포설, 장애 극복 능력을 가동하는 광대역 통합 네트워크를 가설하여 가장 신뢰도 높은 물리보안 인프라를 구축해 드립니다.
            </p>

            {/* Core Tech Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-custom-accent shrink-0 mt-0.5" style={{ color: config.accentColor }}><Camera className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">지능형 4K CCTV 카메라</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal font-light">AI 객체 인식, 안개/야간 저조도 보정, 지능형 선별 감시 및 월패드 연동</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-custom-accent shrink-0 mt-0.5" style={{ color: config.accentColor }}><Cable className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">초고속 통신망 광케이블 시공</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal font-light">광케이블 코어 융착 접합 측정, 10G 백본 고속 백본 구성, 지연율 극대 개선</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-custom-accent shrink-0 mt-0.5" style={{ color: config.accentColor }}><Radio className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">스마트 주차관제 & LPR</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal font-light">차량 번호판 번개 인식 카메라, 주차 유도 LED 차단기, 정기/방문 입출 연동</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-custom-accent shrink-0 mt-0.5" style={{ color: config.accentColor }}><Server className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">종합 방재 및 통신실 인프라</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal font-light">NVR/VMS 서버 랙 빌드, 항온항습 전원 이중화, 비상벨 연동 시스템 구축</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="lg:col-span-5 aspect-square relative rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600" 
              alt="CCTV construction"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <span className="px-2.5 py-0.5 bg-custom-accent text-[10px] font-bold rounded" style={{ backgroundColor: config.accentColor }}>시공 엔지니어링</span>
              <p className="text-sm font-semibold mt-1">대단지 주차장 지능형 LPR 카메라 및 CCTV 전선 포설 공정</p>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICE 2: MAINTENANCE & PERFORMANCE INSPECTION */}
      <section className="bg-gray-50 py-20 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Grid */}
            <div className="lg:col-span-5 aspect-square relative rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-lg order-last lg:order-first group">
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600" 
                alt="System Inspection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <span className="px-2.5 py-0.5 bg-custom-accent text-[10px] font-bold rounded" style={{ backgroundColor: config.accentColor }}>성능점검</span>
                <p className="text-sm font-semibold mt-1">전문 정밀 계측기를 가동한 구내 광 전송 손실 감쇄량 측정 공정</p>
              </div>
            </div>

            {/* Right detailed explanation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black text-custom-accent uppercase tracking-wider" style={{ color: config.accentColor }}>02. 법정 의무 점검 및 유지관리</span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">정보통신설비 유지관리 및 성능점검</h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 text-xs font-bold text-custom-accent rounded-full" style={{ color: config.accentColor, backgroundColor: `${config.accentColor}08`, borderColor: `${config.accentColor}20` }}>
                  <AlertCircle className="w-4 h-4" />
                  <span>정보통신공사업법 제61조 고시 의무 준수</span>
                </div>
                <div className="w-12 h-1 bg-custom-accent rounded-full mt-4" style={{ backgroundColor: config.accentColor }}></div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed font-light">
                개정 시행된 정부 법안에 따라 공동주택 및 대형 일반 건축물은 연 1회 반드시 정보통신설비 자격을 갖춘 점검 등록 기업으로부터 공식 성능점검을 위탁하여 보고서를 관할 지자체에 신고해야 합니다. 미이행 시 고액의 과태료 처분을 받으실 수 있으므로, 당사 점검팀의 무상 사전 지도를 통해 신속하게 대비하세요.
              </p>

              {/* Steps for performance inspection */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">성능점검 고시 필수 계측기 전원 완비</h4>
                    <p className="text-xs text-gray-500 font-light">OTDR(광선로측정기), LAN 케이블 테스터, 전계강도 측정기, 접지저항계 등 첨단 장비 가동</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">11개 법정 설비 영역 전수 계측</h4>
                    <p className="text-xs text-gray-500 font-light">공동 수신 안테나, 홈네트워크 월패드, 로비폰, 원격검침, 방범용 CCTV, 차량 출입 주차 등 종합 측정</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">신뢰성 높은 결과서 지자체 신고 대행</h4>
                    <p className="text-xs text-gray-500 font-light">현장 보수 필요 부분 정비안 제시 및 정보통신 기술사 검인이 날인된 정식 제출 결과서 신속 발행</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICE 3: DESIGN & SUPERVISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-custom-accent uppercase tracking-wider" style={{ color: config.accentColor }}>03. 엔지니어링 설계 및 감리</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">공동주택 정보통신설비 설계 및 감리</h2>
              <p className="text-sm text-gray-400">명품 주거 단지의 첫 단추, 완벽한 엔지니어링 설계 검토와 책임 감리</p>
              <div className="w-12 h-1 bg-custom-accent rounded-full mt-4" style={{ backgroundColor: config.accentColor }}></div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed font-light">
              (주)이안정보통신은 착공 전 협의 단계의 초고속 정보통신건물 예비인증 심사 대행부터 골조 포설 감리, 준공 전 전송속도/감쇄 측정, 준공 협의 보고서 발행에 이르기까지 정밀한 기술 검토와 철저한 현장 관리를 보장합니다. 건설사와 주택조합의 법적 준공 하자를 사전에 완벽히 소거합니다.
            </p>

            {/* Sub details with bullet cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-custom-accent" style={{ color: config.accentColor }} />
                  <h4 className="font-bold text-gray-900 text-sm">착공 전 기술 검토</h4>
                </div>
                <p className="text-xs text-gray-500 leading-normal font-light">통신 배관 및 배선 계통도 매뉴얼 부합성 판단, 오작동 우려 설계 수정 조치 및 등급 자문</p>
              </div>

              <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-custom-accent" style={{ color: config.accentColor }} />
                  <h4 className="font-bold text-gray-900 text-sm">시공 단계 밀착 감리</h4>
                </div>
                <p className="text-xs text-gray-500 leading-normal font-light">통신 맨홀 및 EPS실 입상 상태 육안 정밀 검사, 이격 거리 충족 검사, 불량 시공 방지</p>
              </div>

              <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-custom-accent" style={{ color: config.accentColor }} />
                  <h4 className="font-bold text-gray-900 text-sm">준공 정밀 측정 감리</h4>
                </div>
                <p className="text-xs text-gray-500 leading-normal font-light">광케이블 손실값(dB) 검증, 세대 LAN 카테고리 기가속도 한계 측정, 무선 보조국 수신 조도 측정</p>
              </div>

              <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-custom-accent" style={{ color: config.accentColor }} />
                  <h4 className="font-bold text-gray-900 text-sm">하자 제로 준공 서류</h4>
                </div>
                <p className="text-xs text-gray-500 leading-normal font-light">도서 대조 조서 작성, 시공 품질 승인서 교부, 지자체 사용 승인 협조 업무 대행</p>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="lg:col-span-5 aspect-square relative rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600" 
              alt="Design inspection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <span className="px-2.5 py-0.5 bg-custom-accent text-[10px] font-bold rounded" style={{ backgroundColor: config.accentColor }}>설계 감리</span>
              <p className="text-sm font-semibold mt-1">대규모 오피스 빌딩 신축 도면 광케이블 성단 검사 공정</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
