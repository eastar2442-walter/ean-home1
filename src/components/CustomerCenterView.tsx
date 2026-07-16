/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BoardPost, SiteConfiguration } from '../types';
import { 
  Search, FileText, ChevronRight, HelpCircle, Eye, 
  Calendar, User, PlusCircle, ArrowLeft, Send, CheckCircle2 
} from 'lucide-react';

interface CustomerCenterViewProps {
  posts: BoardPost[];
  config: SiteConfiguration;
  onAddPost: (post: Omit<BoardPost, 'id' | 'createdAt' | 'views'>) => void;
  onIncrementViews: (postId: string) => void;
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
}

export default function CustomerCenterView({ 
  posts, config, onAddPost, onIncrementViews, selectedPostId, setSelectedPostId 
}: CustomerCenterViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'전체' | '공지사항' | '문의사항' | '뉴스'>('전체');
  const [isWriting, setIsWriting] = useState(false);

  // New post form state
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: '',
    category: '문의사항' as '공지사항' | '문의사항',
    isSecret: false
  });

  // Handle viewing a post
  const handlePostClick = (postId: string) => {
    onIncrementViews(postId);
    setSelectedPostId(postId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle post submission
  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.author.trim()) {
      alert('모든 필수 항목을 기재해 주십시오.');
      return;
    }

    onAddPost({
      title: newPost.title,
      content: newPost.content,
      author: newPost.author,
      category: newPost.category,
    });

    setIsWriting(false);
    setNewPost({
      title: '',
      content: '',
      author: '',
      category: '문의사항',
      isSecret: false
    });
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort important posts first, then newest
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isImportant && !b.isImportant) return -1;
    if (!a.isImportant && b.isImportant) return 1;
    return b.id.localeCompare(a.id); // higher IDs are newer in our simulation
  });

  const selectedPostDetail = posts.find(p => p.id === selectedPostId);

  return (
    <div className="font-sans bg-white py-12 space-y-10">
      
      {/* HEADER SECTION */}
      <section className="relative py-16 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">
              고객지원 및 공지
            </h1>
            <p className="mt-4 text-base text-gray-600 font-light leading-relaxed">
              (주)이안정보통신의 공지사항, 기술 공시 및 고객 문의 창구입니다. 정보통신과 법정 점검에 관한 어떤 질문이든 성실하게 대응해 드리겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* BULLETIN BOARD VIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Post Detail Sub-View */}
        {selectedPostDetail ? (
          <div className="max-w-4xl mx-auto bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden animate-in fade-in duration-300">
            {/* Detail Header */}
            <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-100 space-y-4">
              <button
                onClick={() => setSelectedPostId(null)}
                className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-custom-accent font-bold cursor-pointer transition-colors"
                style={{ '--hover-color': config.accentColor } as React.CSSProperties}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>목록으로 돌아가기</span>
              </button>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-black text-white ${
                    selectedPostDetail.isImportant ? 'bg-red-600' : 'bg-gray-500'
                  }`}>
                    {selectedPostDetail.isImportant ? '중요 공지' : selectedPostDetail.category}
                  </span>
                  <span className="text-xs text-gray-400 font-mono flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{selectedPostDetail.createdAt}</span>
                  <span className="text-xs text-gray-400 font-mono flex items-center gap-1"><Eye className="w-3.5 h-3.5" />조회수 {selectedPostDetail.views}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                  {selectedPostDetail.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>작성자: <strong>{selectedPostDetail.author}</strong></span>
                </div>
              </div>
            </div>

            {/* Detail Body */}
            <div className="p-6 sm:p-8 space-y-8">
              <div className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-wrap font-light">
                {selectedPostDetail.content}
              </div>

              {/* Reply Section */}
              {selectedPostDetail.reply ? (
                <div className="p-6 bg-red-50/20 border border-red-100/50 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-custom-accent text-white flex items-center justify-center font-bold text-xs" style={{ backgroundColor: config.accentColor }}>
                      이안
                    </div>
                    <span className="font-bold text-xs text-gray-800">이안정보통신 운영자 답변</span>
                    <span className="text-[10px] text-gray-400 font-mono">신고 및 조치 완료</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-light border-t border-gray-100 pt-3">
                    {selectedPostDetail.reply}
                  </div>
                </div>
              ) : selectedPostDetail.category === '문의사항' ? (
                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-2 text-xs text-gray-400">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>본 문의사항은 접수되어 영업 및 시공 담당자가 검토 중에 있습니다. 조속한 시일 내로 실시간 답변을 기재해 드립니다. 급하신 용무는 고객센터(02-861-5511)로 전화주십시오.</span>
                </div>
              ) : null}
            </div>

            {/* Detail Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between">
              <button
                onClick={() => setSelectedPostId(null)}
                className="px-4 py-2 border border-gray-200 hover:bg-white text-gray-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                목록 보기
              </button>
              {selectedPostDetail.category === '문의사항' && !selectedPostDetail.reply && (
                <button
                  onClick={() => {
                    alert('관리자 대시보드(/admin)의 게시물 관리 탭에서 본 문의글에 대한 공식 답변을 작성 및 전송할 수 있습니다.');
                  }}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-950 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  관리자 답변 달기 기안
                </button>
              )}
            </div>
          </div>
        ) : isWriting ? (
          /* Create Post Form Sub-View */
          <div className="max-w-2xl mx-auto bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden animate-in fade-in duration-300">
            <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-custom-accent" style={{ color: config.accentColor }} />
                고객 지원 문의 및 글쓰기
              </h2>
              <button
                onClick={() => setIsWriting(false)}
                className="text-xs text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
              >
                취소
              </button>
            </div>

            <form onSubmit={handleSubmitPost} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">작성자명 *</label>
                  <input 
                    type="text"
                    required
                    value={newPost.author}
                    onChange={(e) => setNewPost(p => ({ ...p, author: e.target.value }))}
                    placeholder="성함 혹은 직함을 적으세요"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-custom-accent focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">게시물 분류 *</label>
                  <select 
                    value={newPost.category}
                    onChange={(e) => setNewPost(p => ({ ...p, category: e.target.value as '공지사항' | '문의사항' }))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-custom-accent focus:bg-white cursor-pointer font-medium text-gray-700"
                  >
                    <option value="문의사항">시공 및 성능점검 문의 (Q&A)</option>
                    <option value="공지사항">공지사항 제안</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">글 제목 *</label>
                <input 
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost(p => ({ ...p, title: e.target.value }))}
                  placeholder="제목을 기입하세요 (예: CCTV 견적서 송부 요청의 건)"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-custom-accent focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">본문 내용 *</label>
                <textarea 
                  rows={6}
                  required
                  value={newPost.content}
                  onChange={(e) => setNewPost(p => ({ ...p, content: e.target.value }))}
                  placeholder="문의 내용을 기술해 주십시오. 아파트 정보통신선로 점검, CCTV 신설, 무선 통신감리 자문 등 필요한 규격을 적어주시면 신속히 답변을 드리겠습니다."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-custom-accent focus:bg-white resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-1.5">
                <input 
                  type="checkbox"
                  id="secretPost"
                  checked={newPost.isSecret}
                  onChange={(e) => setNewPost(p => ({ ...p, isSecret: e.target.checked }))}
                  className="w-4 h-4 rounded text-custom-accent focus:ring-custom-accent cursor-pointer"
                />
                <label htmlFor="secretPost" className="text-xs text-gray-500 cursor-pointer">
                  비밀글로 작성합니다. (관리자와 본인만 상세 내용을 열람하도록 설정)
                </label>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriting(false)}
                  className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                >
                  작성 취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-custom-accent text-white font-bold text-xs rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  style={{ backgroundColor: config.accentColor }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>게시글 등록 완료</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Standard Posts List View */
          <div className="space-y-6">
            
            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-1.5">
                {(['전체', '공지사항', '뉴스', '문의사항'] as const).map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        isActive 
                          ? 'bg-custom-accent text-white' 
                          : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-800'
                      }`}
                      style={{ backgroundColor: isActive ? config.accentColor : undefined }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons & Search input */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="제목, 내용, 작성자 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs w-full sm:w-60 focus:outline-none focus:border-custom-accent"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                </div>
                
                <button
                  onClick={() => setIsWriting(true)}
                  className="px-4 py-1.5 bg-custom-accent text-white font-bold text-xs rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                  style={{ backgroundColor: config.accentColor }}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>문의/글쓰기</span>
                </button>
              </div>

            </div>

            {/* Posts Grid list */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              
              {/* Desktop Table Header */}
              <div className="hidden sm:grid grid-cols-12 gap-2 bg-gray-50 py-3.5 px-6 border-b border-gray-100 text-xs font-extrabold text-gray-500 text-center">
                <div className="col-span-1">구분</div>
                <div className="col-span-7 text-left pl-4">게시물 제목</div>
                <div className="col-span-1.5">작성자</div>
                <div className="col-span-1.5">작성일자</div>
                <div className="col-span-1">조회</div>
              </div>

              {/* Table items list */}
              <div className="divide-y divide-gray-100 bg-white">
                {sortedPosts.map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className={`grid grid-cols-1 sm:grid-cols-12 gap-2 py-4 px-6 items-center text-center text-xs hover:bg-gray-50/50 transition-colors cursor-pointer group ${
                      post.isImportant ? 'bg-red-50/15' : ''
                    }`}
                  >
                    {/* Badge Column */}
                    <div className="col-span-1 flex sm:justify-center">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black text-center uppercase ${
                        post.isImportant 
                          ? 'bg-red-600 text-white animate-pulse' 
                          : post.category === '문의사항' 
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : post.category === '뉴스'
                          ? 'bg-green-50 text-green-600 border border-green-100'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {post.isImportant ? '공지' : post.category}
                      </span>
                    </div>

                    {/* Title Column */}
                    <div className="col-span-7 text-left sm:pl-4 space-y-1 mt-2 sm:mt-0">
                      <div className="font-bold text-gray-800 text-sm group-hover:text-custom-accent transition-colors flex items-center gap-1.5 flex-wrap" style={{ '--hover-color': config.accentColor } as React.CSSProperties}>
                        <span className="line-clamp-1">{post.title}</span>
                        {post.reply && (
                          <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[9px] font-black">답변완료</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 font-light line-clamp-1 sm:hidden">
                        {post.content}
                      </p>
                    </div>

                    {/* Author Column */}
                    <div className="col-span-1.5 text-left sm:text-center text-gray-500 mt-1 sm:mt-0 flex sm:block items-center gap-1">
                      <span className="sm:hidden text-gray-400 font-bold">작성자:</span>
                      <span className="font-medium">{post.author}</span>
                    </div>

                    {/* Date Column */}
                    <div className="col-span-1.5 text-left sm:text-center text-gray-400 font-mono mt-0.5 sm:mt-0 flex sm:block items-center gap-1">
                      <span className="sm:hidden text-gray-400 font-bold">작성일:</span>
                      <span>{post.createdAt}</span>
                    </div>

                    {/* Views Column */}
                    <div className="col-span-1 text-left sm:text-center text-gray-400 font-mono mt-0.5 sm:mt-0 flex sm:block items-center gap-1">
                      <span className="sm:hidden text-gray-400 font-bold">조회:</span>
                      <span>{post.views}</span>
                    </div>

                  </div>
                ))}

                {sortedPosts.length === 0 && (
                  <div className="py-20 text-center text-gray-400 space-y-2">
                    <FileText className="w-10 h-10 mx-auto text-gray-300" />
                    <p className="font-semibold text-sm">작성되었거나 조건에 맞는 게시글이 존재하지 않습니다.</p>
                    <p className="text-xs text-gray-400">새 문의/글쓰기 단추를 누르거나 필터 값을 조율하십시오.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </section>

    </div>
  );
}
