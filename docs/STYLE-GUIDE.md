# Style Guide

## 코딩 컨벤션

### 파일/폴더 명명 규칙
- **파일명**: kebab-case 사용 (`user-profile.tsx`, `api-client.ts`)
- **폴더명**: kebab-case 사용 (`user-management/`, `api-endpoints/`)
- **컴포넌트 파일**: PascalCase + `.tsx` (`UserProfile.tsx`, `ApiClient.tsx`)

### 변수/함수 명명 규칙
- **변수명**: camelCase (`userName`, `isLoading`, `apiResponse`)
- **함수명**: camelCase (`getUserData`, `handleSubmit`, `validateInput`)
- **상수명**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRY_COUNT`)
- **타입/인터페이스**: PascalCase (`UserProfile`, `ApiResponse`, `ButtonProps`)

### 코드 스타일
- **들여쓰기**: 4 spaces (탭 사용 금지)
- **문자열**: 작은따옴표(`'`) 사용
- **세미콜론**: 필수 사용
- **라인 길이**: 100자 이내
- **빈 줄**: 함수/클래스 간 2줄, 로직 블록 간 1줄

### Import 순서
1. **React 관련**: React, useState, useEffect 등 React 훅과 타입
2. **Next.js 관련**: Head, Link, useRouter 등 Next.js 컴포넌트와 훅
3. **외부 라이브러리**: axios, clsx 등 npm 패키지
4. **내부 모듈 (절대 경로)**: @/lib/api, @/lib/auth 등 프로젝트 내부 모듈
5. **상대 경로**: ../components/Sidebar, ./styles.css 등 상대 경로 임포트

## URL/Path 컨벤션

### 페이지 경로 규칙
- **정적 페이지**: kebab-case (`/user-profile`, `/api-documentation`)
- **동적 페이지**: `[param].tsx` (`/users/[userId].tsx`, `/analytics/[appId].tsx`)
- **중첩 라우팅**: 폴더 구조로 표현 (`/admin/users/[userId]/edit.tsx`)

### API 엔드포인트 규칙
- **RESTful API**: 소문자 + 하이픈 (`/api/user-profiles`, `/api/ai-apps`)
- **동적 파라미터**: 중괄호 사용 (`/api/users/{userId}`, `/api/apps/{appId}/analytics`)
- **쿼리 파라미터**: camelCase (`?pageSize=10&sortBy=createdAt`)


## 컴포넌트 컨벤션

### 컴포넌트 구조
1. **Imports**: 필요한 모듈들을 임포트
2. **Types/Interfaces**: 컴포넌트 Props 타입 정의
3. **Component**: 메인 컴포넌트 함수 선언
4. **State**: useState 훅을 사용한 상태 관리
5. **Effects**: useEffect 훅을 사용한 사이드 이펙트
6. **Handlers**: 이벤트 핸들러 함수들
7. **Render**: JSX 반환

### Props 명명 규칙
- **Boolean props**: `is` 또는 `has` 접두사 (`isActive`, `hasError`, `isLoading`)
- **Event handlers**: `on` 접두사 (`onClick`, `onSubmit`, `onChange`)
- **Optional props**: `?` 사용 (`title?: string`, `onClick?: () => void`)

### CSS 클래스 명명
- **Tailwind CSS**: 유틸리티 클래스 우선 사용
- **커스텀 클래스**: BEM 방법론 (`block__element--modifier`)
- **CSS 변수**: kebab-case (`--sidebar-width`, `--primary-color`)

### 컴포넌트 파일 구조
- **루트 레벨**: 메인 컴포넌트들 (Sidebar.tsx, AppBuilderSidebar.tsx)
- **ui/ 폴더**: 재사용 가능한 UI 컴포넌트들 (Button, Modal, Input 등)
- **forms/ 폴더**: 폼 관련 컴포넌트들 (LoginForm, SignupForm 등)
- **기타 카테고리**: 기능별로 폴더를 나누어 관리

## 상태 관리 컨벤션

### State 명명 규칙
- **Loading states**: `isLoading`, `isSubmitting`, `isFetching`
- **Error states**: `error`, `validationError`, `apiError`
- **Data states**: `data`, `users`, `apps`, `currentUser`
- **UI states**: `isOpen`, `isVisible`, `isExpanded`

### State 초기값
- **Boolean**: false로 초기화 (isLoading, isActive 등)
- **String**: 빈 문자열('')로 초기화 (searchTerm, inputValue 등)
- **Array**: 빈 배열([])로 초기화 (users, items 등)
- **Object**: null 또는 빈 객체({})로 초기화 (currentUser, config 등)

## 에러 처리 컨벤션

### Try-Catch 패턴
- **성공 시**: API 응답 데이터를 상태에 저장
- **실패 시**: 콘솔에 에러 로그 출력 후 사용자에게 친화적인 에러 메시지 표시
- **에러 상태**: 별도의 error 상태를 관리하여 UI에 에러 상태 반영

### 에러 메시지 규칙
- **사용자 메시지**: 한국어, 친근한 톤
- **개발자 메시지**: 영어, 기술적 용어 사용
- **콘솔 로그**: `console.error` 사용, 컨텍스트 포함

## 주석 컨벤션

### JSDoc 스타일
- **함수 설명**: 함수의 목적과 역할을 명확히 설명
- **매개변수**: @param으로 각 매개변수의 타입과 설명 추가
- **반환값**: @returns로 반환되는 값의 타입과 설명 추가
- **예외**: @throws로 발생 가능한 예외 상황 설명

### 인라인 주석
- **TODO**: 향후 개선이 필요한 부분 표시
- **FIXME**: 수정이 필요한 버그나 문제점 표시
- **NOTE**: 특별한 주의사항이나 설명이 필요한 부분 표시
- **HACK**: 임시 해결책이나 우회 방법 사용 시 표시

