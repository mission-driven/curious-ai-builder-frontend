# Components

## Overview
프로젝트의 React 컴포넌트들을 관리하는 디렉토리입니다. 현재 2개의 주요 사이드바 컴포넌트, 1개의 인증 컴포넌트, 1개의 앱 뷰 컴포넌트가 있습니다.

## Components List

### 1. Sidebar.tsx
**위치**: `components/Sidebar.tsx`  
**용도**: 메인 애플리케이션의 고정 사이드바 네비게이션  
**사용 페이지**: Dashboard, Marketplace, Users, Analytics 등
**설명**: 메인 애플리케이션의 네비게이션 허브 역할을 하는 고정 사이드바입니다. 사용자가 현재 어느 페이지에 있는지 시각적으로 표시하고, 주요 기능 영역(Dashboard, Manage, Support)으로 쉽게 이동할 수 있도록 도와줍니다. 또한 사용자의 메시지 사용량과 로그아웃 기능을 제공하여 계정 관리 기능도 포함하고 있습니다.

### 2. AppBuilderSidebar.tsx
**위치**: `components/AppBuilderSidebar.tsx`  
**용도**: AI 앱 빌더 페이지의 설정 사이드바  
**사용 페이지**: Editor 페이지 (`/editor`)
**설명**: AI 앱을 구체적으로 설정하고 커스터마이징할 수 있는 전용 사이드바입니다. 5개의 탭(Basic, Design, Credits, Actions, More)으로 나누어져 있어 사용자가 체계적으로 AI 앱의 모든 측면을 설정할 수 있습니다. 기본적인 앱 정보부터 디자인, 수익화, 고급 기능까지 포괄적으로 다루며, 실시간으로 설정 변경사항을 미리보기할 수 있도록 설계되었습니다.

### 3. KakaoLoginButton.tsx
**위치**: `components/auth/KakaoLoginButton.tsx`  
**용도**: 카카오 로그인 버튼 컴포넌트  
**사용 페이지**: Login, Signup 페이지

**설명**: 버튼 클릭 시 카카오 SDK 로그인 플로우를 시작하고, 성공 시 `/api/auth/kakao/callback?access_token=...`으로 리다이렉트합니다. 세션 쿠키는 서버 콜백에서 HttpOnly; Secure로 설정되며, 프론트에서는 토큰을 저장하지 않습니다.

### 4. AppView
**위치**: `components/AppView/`  
**용도**: AI 앱 미리보기 및 메인 콘텐츠 영역  
**사용 페이지**: Editor 페이지 (`/editor`)

**설명**: AI 앱 빌더의 메인 콘텐츠 영역을 담당하는 컴포넌트입니다. 스크린샷 레이아웃에 맞춰 다음 서브컴포넌트로 구성됩니다.
- `AppHeader`: 상단 섹션 타이틀
- `AppInfoCard`: 앱 아이콘/이름/설명 영역
- `ConversationStarters`: 퍼플 버튼 2개 (대화 시작 프롬프트)
- `ChatInput`: 화면 하단 입력창
