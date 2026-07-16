/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BoardPost, PortfolioItem, SiteConfiguration } from '../types';
import { 
  Settings, FileText, Briefcase, RefreshCw, Trash2, 
  Plus, Save, Edit2, MessageSquare, Paintbrush, ShieldCheck, CheckCircle2, Send 
} from 'lucide-react';

interface AdminDashboardProps {
  config: SiteConfiguration;
  setConfig: (config: SiteConfiguration) => void;
  posts: BoardPost[];
  setPosts: (posts: BoardPost[]) => void;
  portfolio: PortfolioItem[];
  setPortfolio: (portfolio: PortfolioItem[]) => void;
}

type AdminSubTab = 'settings' | 'posts' | 'portfolio';

export default function AdminDashboard({
  config, setConfig, posts, setPosts, portfolio, setPortfolio
}: AdminDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<AdminSubTab>('settings');
  
  // Temporary config state for instant edits
  const [tempConfig, setTempConfig] = useState<SiteConfiguration>({ ...config });
  
  // New reply state
  const [replyPostId, setReplyPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // New portfolio item form state
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortItem, setNewPortItem] = useState<Omit<PortfolioItem, 'id'>>({
    title: '',
    category: 'CCTV/네트워크',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    date: new Date().toISOString().slice(0, 7),
    client: ''
  });

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(tempConfig);
    alert('사이트 기초 설정 및 브랜드 테마가 성공적으로 실시간 갱신되었습니다! 웹사이트의 모든 영역에서 즉시 확인 가능합니다.');
  };

  const handleResetConfig = () => {
    if (confirm('모든 디자인 및 텍스트 설정을 초기화하시겠습니까?')) {
      const { DEFAULT_CONFIGURATION } = require('../data'); // load default
      setTempConfig({ ...DEFAULT_CONFIGURATION });
      setConfig({ ...DEFAULT_CONFIGURATION });
    }
  };

  // Delete board post
  const handleDeletePost = (id: string) => {
    if (confirm('정말로 이 게시글을 영구 삭제하시겠습니까?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  // Submit official reply to post
  const handleAddReply = (postId: string) => {
    if (!replyText.trim()) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, reply: replyText };
      }
      return p;
    }));
    setReplyPostId(null);
    setReplyText('');
    alert('공식 답변이 게시글에 성공적으로 전송 완료되었습니다.');
  };

  // Delete portfolio item
  const handleDeletePortfolio = (id: string) => {
    if (confirm('이 시공 실적 포트폴리오를 영구 삭제하시겠습니까?')) {
      setPortfolio(portfolio.filter(p => p.id !== id));
    }
  };

  // Create new portfolio item
  const handleAddPortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortItem.title.trim() || !newPortItem.content.trim() || !newPortItem.client.trim()) {
      alert('필수 입력 항목을 채워주십시오.');
      return;
    }

    const newItem: PortfolioItem = {
      id: `p-${Date.now()}`,
      ...newPortItem
    };

    setPortfolio([newItem, ...portfolio]);
    setShowAddPortfolio(false);
    setNewPortItem({
      title: '',
      category: 'CCTV/네트워크',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
      date: new Date().toISOString().slice(0, 7),
      client: ''
    });
    alert('새로운 시공 실적 포트폴리오가 정상 등록되었습니다.');
  };

  return (
    <div className="font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-950 text-white p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">Administrator Mode</span>
          <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
            (주)이안정보통신 실시간 통합 관리 시스템
          </h1>
          <p className="text-xs text-gray-400">웹사이트 내용 수정, 테마 컬러 스와프, 문의글 댓글 수납을 실시간 이행합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-green-400 font-mono font-bold">Local Sync Online</span>
        </div>
      </div>

      {/* ADMIN SUB TABS */}
      <div className="flex gap-1.5 border-b border-gray-100 pb-3">
        <button
          onClick={() => setActiveSubTab('settings')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'settings' 
              ? 'bg-gray-900 text-white shadow-md' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Paintbrush className="w-4 h-4" />
          사이트 기초설정 & 테마
        </button>
        <button
          onClick={() => setActiveSubTab('posts')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'posts' 
              ? 'bg-gray-900 text-white shadow-md' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          게시판 및 고객문의 관리
        </button>
        <button
          onClick={() => setActiveSubTab('portfolio')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'portfolio' 
              ? 'bg-gray-900 text-white shadow-md' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          포트폴리오 관리
        </button>
      </div>

      {/* TAB CONTENT 1: CMS & COLOR THEME CONFIG */}
      {activeSubTab === 'settings' && (
        <form onSubmit={handleSaveConfig} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form settings */}
          <div className="lg:col-span-8 space-y-6 bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm">
            <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">사이트 기본 문자 정보 편집</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">회사 상호명 *</label>
                <input 
                  type="text"
                  required
                  value={tempConfig.companyName}
                  onChange={(e) => setTempConfig(p => ({ ...p, companyName: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">대표이사명 *</label>
                <input 
                  type="text"
                  required
                  value={tempConfig.ceoName}
                  onChange={(e) => setTempConfig(p => ({ ...p, ceoName: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">대표 연락처 *</label>
                <input 
                  type="text"
                  required
                  value={tempConfig.phone}
                  onChange={(e) => setTempConfig(p => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">대표 팩스번호</label>
                <input 
                  type="text"
                  value={tempConfig.fax}
                  onChange={(e) => setTempConfig(p => ({ ...p, fax: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">공식 이메일 *</label>
                <input 
                  type="email"
                  required
                  value={tempConfig.email}
                  onChange={(e) => setTempConfig(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">회사 소재 주소지 *</label>
                <input 
                  type="text"
                  required
                  value={tempConfig.address}
                  onChange={(e) => setTempConfig(p => ({ ...p, address: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">사업자등록번호 *</label>
                <input 
                  type="text"
                  required
                  value={tempConfig.registrationNumber}
                  onChange={(e) => setTempConfig(p => ({ ...p, registrationNumber: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3 pt-4">메인 홈화면 문구 기획</h3>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">메인 헤드라인 슬로건 *</label>
              <input 
                type="text"
                required
                value={tempConfig.heroTitle}
                onChange={(e) => setTempConfig(p => ({ ...p, heroTitle: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">메인 서브 슬로건 내용 *</label>
              <textarea 
                rows={3}
                required
                value={tempConfig.heroSubtitle}
                onChange={(e) => setTempConfig(p => ({ ...p, heroSubtitle: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs leading-relaxed resize-none"
              />
            </div>

            <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3 pt-4">CEO 인사말 및 경영이념 개서</h3>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">대표이사 인사말 본문 *</label>
              <textarea 
                rows={8}
                required
                value={tempConfig.ceoGreeting}
                onChange={(e) => setTempConfig(p => ({ ...p, ceoGreeting: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs leading-relaxed resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">경영 슬로건 / 철학 사명 *</label>
              <textarea 
                rows={2}
                required
                value={tempConfig.ceoPhilosophy}
                onChange={(e) => setTempConfig(p => ({ ...p, ceoPhilosophy: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs leading-relaxed resize-none"
              />
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button
                type="button"
                onClick={handleResetConfig}
                className="px-6 py-3 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>초기 설정값 복구</span>
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>기초 정보 및 내용 저장하기</span>
              </button>
            </div>

          </div>

          {/* Theme Color Settings Sidepanel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live customizer settings */}
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-6">
              <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3 flex items-center gap-1.5">
                <Paintbrush className="w-4 h-4 text-red-500" />
                실시간 디자인 테마 설정
              </h3>

              {/* Accent Color picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-600">브랜드 강조색 (Point Red) *</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color"
                    value={tempConfig.accentColor}
                    onChange={(e) => setTempConfig(p => ({ ...p, accentColor: e.target.value }))}
                    className="w-10 h-10 border border-gray-200 rounded-lg cursor-pointer"
                  />
                  <div>
                    <span className="font-mono text-xs font-bold uppercase">{tempConfig.accentColor}</span>
                    <p className="text-[10px] text-gray-400">버튼 및 하이라이트 색상에 매치</p>
                  </div>
                </div>
              </div>

              {/* Font selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-600">웹폰트 정렬Dropdown *</label>
                <select 
                  value={tempConfig.fontFamily}
                  onChange={(e) => setTempConfig(p => ({ ...p, fontFamily: e.target.value as SiteConfiguration['fontFamily'] }))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium cursor-pointer"
                >
                  <option value="Noto Sans KR">Noto Sans KR (대표 한글)</option>
                  <option value="Pretendard">Pretendard (현대적 산세리프)</option>
                  <option value="Inter">Inter (영문 특화)</option>
                  <option value="System-UI">System-UI (시스템 기본)</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-gray-700">💡 테마 변경 가이드:</span>
                <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                  원하는 색상의 단추를 누르고 테마 및 문구 저장을 이행하면, 웹사이트 상단 및 하단 메뉴 등 모든 요소가 변경된 색상으로 자동 드로잉됩니다.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-500/10 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>디자인 변경사항 라이브 적용</span>
              </button>
            </div>

            {/* Customizer Demo preview indicator */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold text-white uppercase bg-gray-800">
                Live Preview Status
              </span>
              <p className="text-xs font-bold text-gray-700">테마 설정이 동적 동화됩니다</p>
              <div className="w-12 h-1 bg-custom-accent mx-auto rounded" style={{ backgroundColor: tempConfig.accentColor }}></div>
            </div>

          </div>

        </form>
      )}

      {/* TAB CONTENT 2: BOARD POSTS & INQUIRIES LIST MANAGEMENT */}
      {activeSubTab === 'posts' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-base">게시판 관리 및 견적·문의 댓글 수납</h3>
            <span className="text-xs text-gray-400 font-mono">총 {posts.length}개 데이터</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-500 border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 border-b border-gray-100 text-center">
                  <th className="py-3 px-4 text-left">구분</th>
                  <th className="py-3 px-4 text-left">게시물 제목</th>
                  <th className="py-3 px-4">작성자</th>
                  <th className="py-3 px-4">등록일</th>
                  <th className="py-3 px-4">조회</th>
                  <th className="py-3 px-4">답변 상태</th>
                  <th className="py-3 px-4">관리 명령</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50">
                    <td className="py-4 px-4 font-bold text-gray-600">
                      {post.category}
                    </td>
                    <td className="py-4 px-4 text-gray-800 font-semibold text-left max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="py-4 px-4 text-center font-medium">{post.author}</td>
                    <td className="py-4 px-4 text-center font-mono text-gray-400">{post.createdAt}</td>
                    <td className="py-4 px-4 text-center font-mono">{post.views}</td>
                    <td className="py-4 px-4 text-center">
                      {post.category !== '문의사항' ? (
                        <span className="text-[10px] text-gray-400">대상 아님</span>
                      ) : post.reply ? (
                        <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-black border border-green-100 text-[10px]">답변 완료</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-black border border-amber-100 text-[10px]">답변 대기</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {post.category === '문의사항' && !post.reply && (
                          <button
                            onClick={() => {
                              setReplyPostId(post.id);
                              setReplyText('');
                            }}
                            className="p-1 px-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                          >
                            <MessageSquare className="w-3 h-3" />
                            답변
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                          title="영구 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reply dialogue modal */}
          {replyPostId && (
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-4 animate-in slide-in-from-top-4 duration-300">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-xs text-gray-800 flex items-center gap-1">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span>선택된 문의글에 공식 기술 답변 등록 기안</span>
                </h4>
                <button onClick={() => setReplyPostId(null)} className="text-xs text-gray-400 font-bold">취소</button>
              </div>

              <div className="p-3 bg-white border border-gray-100 rounded-lg text-xs leading-relaxed max-h-24 overflow-y-auto">
                <strong>원문 제목:</strong> {posts.find(p => p.id === replyPostId)?.title}<br />
                <strong>원문 내용:</strong> {posts.find(p => p.id === replyPostId)?.content}
              </div>

              <textarea 
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="공식 기술 답변을 기입하십시오. 예산 조절 및 방문 실사 일정 조율, 기술 규격 등 상세히 적어주세요..."
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs resize-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReplyPostId(null)}
                  className="px-4 py-2 border border-gray-200 hover:bg-white text-gray-600 rounded-lg text-xs font-bold"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={() => handleAddReply(replyPostId)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>공식 답변 작성 완료</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB CONTENT 3: PORTFOLIO LIST MANAGEMENT */}
      {activeSubTab === 'portfolio' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-base">시공 및 설계실적 포트폴리오 관리</h3>
            <button
              onClick={() => setShowAddPortfolio(!showAddPortfolio)}
              className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-1 cursor-pointer shadow"
            >
              <Plus className="w-4 h-4" />
              <span>신규 시공실적 등록</span>
            </button>
          </div>

          {/* Add Portfolio Form Panel */}
          {showAddPortfolio && (
            <form onSubmit={handleAddPortfolioItem} className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-4 animate-in slide-in-from-top-4 duration-300">
              <h4 className="font-bold text-xs text-gray-800">새로운 포트폴리오 등록 폼</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-600 mb-1">시공실적명 *</label>
                  <input 
                    type="text"
                    required
                    value={newPortItem.title}
                    onChange={(e) => setNewPortItem(p => ({ ...p, title: e.target.value }))}
                    placeholder="예: 서울 구로 푸르지오 스마트 홈네트워크 포설 공사"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-1">인프라 대역 영역 *</label>
                  <select 
                    value={newPortItem.category}
                    onChange={(e) => setNewPortItem(p => ({ ...p, category: e.target.value as PortfolioItem['category'] }))}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs cursor-pointer"
                  >
                    <option value="CCTV/네트워크">CCTV/네트워크</option>
                    <option value="유지관리">유지관리</option>
                    <option value="설계/감리">설계/감리</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-1">발주 고객사 / 아파트 단지명 *</label>
                  <input 
                    type="text"
                    required
                    value={newPortItem.client}
                    onChange={(e) => setNewPortItem(p => ({ ...p, client: e.target.value }))}
                    placeholder="예: 구로 푸르지오 관리사무소"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-1">준공 완료월 *</label>
                  <input 
                    type="month"
                    required
                    value={newPortItem.date}
                    onChange={(e) => setNewPortItem(p => ({ ...p, date: e.target.value }))}
                    className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-1">증빙 대표 이미지 주소 (URL) *</label>
                  <input 
                    type="text"
                    required
                    value={newPortItem.imageUrl}
                    onChange={(e) => setNewPortItem(p => ({ ...p, imageUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-600 mb-1">시공 개요 및 측정 내역 세부사항 *</label>
                <textarea 
                  rows={4}
                  required
                  value={newPortItem.content}
                  onChange={(e) => setNewPortItem(p => ({ ...p, content: e.target.value }))}
                  placeholder="공사 공정 범위, 투입 계측 장비, 하자이행 보증 범위 등을 상세히 기록하세요..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPortfolio(false)}
                  className="px-4 py-2 border border-gray-200 hover:bg-white text-gray-600 rounded-lg text-xs font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>실적 포트폴리오 등록</span>
                </button>
              </div>
            </form>
          )}

          {/* Portfolio grid summary for management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.map((item) => (
              <div 
                key={item.id}
                className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow flex gap-4 items-start"
              >
                <div className="w-20 h-20 rounded-lg bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[9px] font-black">{item.category}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xs truncate">{item.title}</h4>
                  <p className="text-[11px] text-gray-400 truncate font-light">발주처: {item.client}</p>
                  
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleDeletePortfolio(item.id)}
                      className="text-red-500 hover:bg-red-50 p-1 rounded text-[11px] font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
