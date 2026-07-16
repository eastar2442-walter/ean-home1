/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, ArrowUp, Phone, ChevronRight, Send, HelpCircle, X } from 'lucide-react';
import { SiteConfiguration } from '../types';

interface FloatingQuickMenuProps {
  config: SiteConfiguration;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export default function FloatingQuickMenu({ config }: FloatingQuickMenuProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: '안녕하세요! (주)이안정보통신 스마트 기술지원 봇입니다. 🤖',
      time: '방금 전'
    },
    {
      id: 'm2',
      sender: 'bot',
      text: '정보통신공사, CCTV 시공, 아파트 법정 성능점검 및 유지관리, 설계/감리에 대해 궁금하신 사항을 선택하시거나 자유롭게 질문해 주세요.',
      time: '방금 전'
    }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Simulated Bot Responses
    setTimeout(() => {
      let replyText = '상세한 견적서와 전문 자격을 갖춘 엔지니어 상담을 위해 연락처를 남겨주시면, 당사 영업 담당자가 1시간 이내로 전화를 드리겠습니다. (고객센터: 02-861-5511)';
      
      const lowercaseText = text.toLowerCase();
      if (lowercaseText.includes('성능점검') || lowercaseText.includes('유지관리') || lowercaseText.includes('점검')) {
        replyText = '💡 정보통신 성능점검 안내:\n공동주택 및 일정 기준 빌딩은 연 1회 법정 성능점검이 의무화되었습니다. 당사는 성능점검 정식 등록 면허 및 필수 정밀 계측기를 갖춘 최고 자격 업체입니다. 아파트 세대수나 시설 규모를 알려주시면 상세 견적 및 가이드를 메일로 즉시 발송해 드리겠습니다.';
      } else if (lowercaseText.includes('cctv') || lowercaseText.includes('카메라') || lowercaseText.includes('보안')) {
        replyText = '🎥 CCTV 및 보안공사 안내:\n(주)이안정보통신은 대단지 아파트 및 물류센터 AI CCTV 인프라 전문 기업입니다. 4K 고화질 카메라 시공, 노후 선로 광케이블 전면 개보수, 지능형 모니터링 연동 특허 공법을 제공합니다.';
      } else if (lowercaseText.includes('주차') || lowercaseText.includes('관제') || lowercaseText.includes('차량')) {
        replyText = '🚗 스마트 주차관제 안내:\n차량 번호 인식 LPR 카메라, LED 전광판 차단기 시공 및 세대 월패드 연동 솔루션을 구축합니다. 오인식률을 제로화하는 고해상도 지능형 센서를 적용합니다.';
      } else if (lowercaseText.includes('설계') || lowercaseText.includes('감리')) {
        replyText = '📐 설계 및 감리 엔지니어링 안내:\n초고속 정보통신건물 특등급/1등급 설계 검토, 준공 도서 대조, 공동주택 착공 전 협의 및 현장 감리 업무를 전문 기술사 배치 기준으로 완벽하게 수행합니다.';
      } else if (lowercaseText.includes('안녕') || lowercaseText.includes('하이')) {
        replyText = '반갑습니다! (주)이안정보통신입니다. 문의 사항을 클릭하시거나 남겨주시면 전문 상담사가 신속히 답변해 드립니다.';
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const quickQuestions = [
    '아파트 성능점검 단가 및 절차는?',
    'CCTV 시공 및 광선로 개보수 문의',
    '설계 및 준공 감리 상담 신청',
    '주차관제 시스템 도입 견적'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      
      {/* KakaoTalk-styled Live Chat Simulator Dialog */}
      {isChatOpen && (
        <div className="w-[360px] sm:w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
          {/* Header */}
          <div className="bg-[#FEE500] text-gray-900 px-4 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-lg text-yellow-500 shadow-sm">
                💬
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">(주)이안정보통신 기술톡</h3>
                <p className="text-[10px] text-gray-600">실시간 스마트 자가 진단 및 상담</p>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="p-1 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 bg-[#bac1cb] p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-1`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs shadow-sm shrink-0 mr-1.5 self-start">
                    이안
                  </div>
                )}
                
                <div className="flex flex-col max-w-[70%]">
                  <div 
                    className={`px-3 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm whitespace-pre-wrap ${
                      msg.sender === 'user' 
                        ? 'bg-[#FEE500] text-gray-900 rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
                <span className="text-[9px] text-gray-600 mb-1">{msg.time}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick FAQ Selectors */}
          <div className="p-2 bg-gray-50 border-t border-gray-100 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 bg-white hover:bg-yellow-50 border border-gray-200 hover:border-[#FEE500] rounded-full text-[11px] text-gray-600 font-medium transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 bg-white border-t border-gray-100 flex gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="문의 사항을 기재해 주십시오..."
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FEE500] focus:bg-white"
            />
            <button
              type="submit"
              className="p-2 bg-[#FEE500] hover:bg-[#ebd200] text-gray-900 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Buttons Stack */}
      <div className="flex flex-col gap-2.5">
        
        {/* Direct Call Floating button */}
        <a
          href={`tel:${config.phone}`}
          className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
          title="간편 전화 상담 연결"
        >
          <Phone className="w-5 h-5 group-hover:animate-bounce" />
        </a>

        {/* KakaoTalk Simulation Trigger */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ${
            isChatOpen ? 'bg-gray-800 text-[#FEE500]' : 'bg-[#FEE500] text-gray-900'
          }`}
          title="카카오톡 실시간 상담"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* To Top Assistant Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 border border-gray-100 text-gray-600 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            title="맨 위로 가기"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
