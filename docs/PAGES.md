# Pages

## Overview
Next.js Pages Router를 사용한 파일 기반 라우팅 시스템입니다. 각 파일은 해당 경로의 페이지를 렌더링합니다.

## Pages Structure

### Core Pages

#### 1. index.tsx
**경로**: `/` (루트)  
**용도**: 랜딩 페이지 (홈페이지)  
**특징**: 로그인하지 않은 사용자를 위한 마케팅 페이지


#### 2. login.tsx
**경로**: `/login`  
**용도**: 사용자 로그인 페이지  
**레이아웃**: 중앙 정렬된 두 컬럼 레이아웃


#### 3. signup.tsx
**경로**: `/signup`  
**용도**: 사용자 회원가입 페이지  
**레이아웃**: 로그인 페이지와 동일한 구조


### Dashboard Pages

#### 4. dashboard.tsx
**경로**: `/dashboard`  
**용도**: 사용자 대시보드 (로그인 후 메인 페이지)  
**레이아웃**: Sidebar + 메인 콘텐츠


#### 5. create-app.tsx
**경로**: `/create-app`  
**용도**: AI 앱 생성을 위한 모델 선택 페이지  
**레이아웃**: Sidebar + 메인 콘텐츠


#### 6. editor.tsx
**경로**: `/editor`  
**용도**: AI 앱 빌더 (상세 설정 페이지)  
**레이아웃**: AppBuilderSidebar + 미리보기 영역

#### 6-1. app/[appId].tsx
**경로**: `/app/[appId]` (동적 라우트)  
**용도**: 고객이 접근하는 공개 앱 실행 페이지  
**레이아웃**: 단독 `AppView` (사이드바 패딩 없음)


### Management Pages

#### 7. marketplace.tsx
**경로**: `/marketplace`  
**용도**: AI 앱 마켓플레이스  
**레이아웃**: Sidebar + 메인 콘텐츠


#### 8. users.tsx
**경로**: `/users`  
**용도**: 사용자 관리 페이지  
**레이아웃**: Sidebar + 메인 콘텐츠


### Analytics Pages

#### 9. analytics/[appId].tsx
**경로**: `/analytics/[appId]` (동적 라우트)  
**용도**: 특정 AI 앱의 분석 페이지  
**레이아웃**: Sidebar + 메인 콘텐츠


### Authentication API Routes

#### 10. api/auth/kakao/callback.ts
**경로**: `/api/auth/kakao/callback`  
**용도**: 카카오 access_token 검증, 사용자 처리, HttpOnly 세션 쿠키 설정 후 리다이렉트  
**특징**: 서버 사이드에서 `Set-Cookie (HttpOnly; Secure; SameSite=Lax)` 설정, `/dashboard`로 302 리다이렉트


### Special Pages

#### 11. _app.tsx
**용도**: Next.js 앱의 루트 컴포넌트  
**기능**: 전역 설정 및 스타일 적용


#### 12. _document.tsx
**용도**: HTML 문서의 기본 구조 정의  
**기능**: `<html>`, `<head>`, `<body>` 태그 커스터마이징


## 라우팅 구조

```
/ (index.tsx)                    # 랜딩 페이지
├── /login                       # 로그인
├── /signup                      # 회원가입
├── /dashboard                   # 대시보드
├── /create-app                  # 앱 생성 (모델 선택)
├── /editor                      # 앱 빌더
├── /app/[appId]                 # 공개 앱 실행 (동적)
├── /marketplace                 # 마켓플레이스
├── /users                       # 사용자 관리
├── /analytics/[appId]           # 앱 분석 (동적)
└── /api/auth/kakao/callback     # 카카오 OAuth 서버 콜백(API Route)
```
