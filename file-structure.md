/  
# Next.js 프로젝트 루트

├── pages/  
│   ├── index.tsx                  # Landing Page (소개/CTA, 로그인 시 → /dashboard 리다이렉트)
│   ├── login.tsx                  # 카카오 OAuth 2.0 로그인, 신규 사용자 정보/약관 동의
│   ├── dashboard.tsx              # Dashboard (YouTube 영상 + [Create AI App] + AI App 리스트)
│   ├── analytics.tsx              # Analytics (사용 통계, 결제/수익, 피드백)
│   ├── marketplace/  
│   │   ├── index.tsx              # Marketplace (Custom AI App 리스트, 필터 기능)
│   │   └── [id].tsx               # 개별 AI App 상세 (구독/체험 가능)
│   ├── create-app.tsx             # Create App (모델 선택, 이름/설명 입력 → Next)
│   ├── editor.tsx                 # Create New AI App (사이드바: 모델/톤/가격 정책, 오른쪽: 미리보기 + Save)
│   ├── apps/  
│   │   ├── index.tsx              # Apps (내가 만든 앱 리스트, 상태/수정/삭제/공유)
│   │   └── [id].tsx               # AI App Page (대화 UI + 구독/공유 + 사용량/피드백)
│   └── api/  
│       ├── auth/[…nextauth].ts    # NextAuth (카카오 OAuth 연동)
│       ├── ai/stream.ts           # OpenAI 스트리밍 API 프록시 (BFF)
│       ├── apps.ts                # 앱 CRUD API (FastAPI 연동)
│       └── analytics.ts           # 통계/결제 데이터 fetch
│
├── components/                    # [component-structure.md](./component-structure.md) 참고
│
├── styles/  
│   └── globals.css                # TailwindCSS 글로벌 스타일
│
└── lib/  
    ├── api.ts                     # FastAPI 연동 helper
    └── auth.ts                    # JWT/세션 관리 helper

---

> **참고**: 
> - 컴포넌트 구조는 [component-structure.md](./component-structure.md)를 참조하세요.
> - 전체 아키텍처는 [architecture.md](./architecture.md)를 참조하세요.
> - 코딩 컨벤션은 [convention.md](./convention.md)를 참조하세요.



