/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BoardPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  category: '공지사항' | '문의사항' | '뉴스';
  isImportant?: boolean;
  reply?: string; // Admin reply
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'CCTV/네트워크' | '유지관리' | '설계/감리';
  content: string;
  imageUrl: string;
  date: string;
  client: string;
}

export interface SiteConfiguration {
  companyName: string;
  ceoName: string;
  phone: string;
  fax: string;
  email: string;
  address: string;
  registrationNumber: string;
  
  // Customizer Text Content
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  ceoGreeting: string;
  ceoPhilosophy: string;
  
  // Theme Color Configurations
  accentColor: string; // Point Sophisticated Red
  primaryColor: string; // Dark theme / text primary
  bgColor: string; // Main background
  fontFamily: 'Pretendard' | 'Noto Sans KR' | 'Inter' | 'System-UI';
}

export type ActiveTab = 'home' | 'intro' | 'services' | 'portfolio' | 'customer' | 'admin';
