# 코딩 컨벤션 (Coding Convention)

> **참고**: 
> - 전체 아키텍처는 [architecture.md](./architecture.md)를 참조하세요.
> - 파일 구조는 [file-structure.md](./file-structure.md)를 참조하세요.
> - 컴포넌트 구조는 [component-convention.md](./component-convention.md)를 참조하세요.

## 파일 및 폴더 명명 규칙

### 폴더명
- **kebab-case**: 소문자와 하이픈 사용
- 예: `user-profile/`, `api-endpoints/`, `data-models/`

### 파일명
- **kebab-case**: 소문자와 하이픈 사용
- 예: `user-profile.tsx`, `api-client.ts`, `data-types.ts`

## 코드 스타일

### 들여쓰기 및 포맷팅
- **들여쓰기**: 4칸 공백 사용 (탭 사용 금지)
- **Prettier 설정**: 자동 포맷팅 적용
- **줄 길이**: 최대 80자
- **세미콜론**: 사용하지 않음
- **따옴표**: 작은따옴표 사용

### TypeScript
- **인터페이스명**: PascalCase
- **타입명**: PascalCase
- **변수/함수명**: camelCase
- **상수명**: UPPER_SNAKE_CASE

```typescript
interface UserProfile {
    id: string
    name: string
    email: string
}

type ApiResponse<T> = {
    data: T
    status: number
}

const API_BASE_URL = 'https://api.example.com'

function getUserProfile(userId: string): Promise<UserProfile> {
    // 구현
}
```

### React 컴포넌트
- **컴포넌트명**: PascalCase
- **Props 인터페이스**: `ComponentNameProps` 형식
- **커스텀 훅**: `use` 접두사 사용

```typescript
interface UserCardProps {
    user: UserProfile
    onEdit?: (user: UserProfile) => void
}

export function UserCard({ user, onEdit }: UserCardProps) {
    // 구현
}

export function useUserData(userId: string) {
    // 구현
}
```

## API 관련

### 엔드포인트
- **RESTful**: 리소스 중심의 URL 구조
- **HTTP 메서드**: GET, POST, PUT, DELETE, PATCH
- **응답 형식**: 일관된 JSON 구조

```typescript
// 좋은 예
GET /api/users/{id}
POST /api/users
PUT /api/users/{id}
DELETE /api/users/{id}

// 응답 형식
{
    "success": true,
    "data": { ... },
    "message": "성공적으로 처리되었습니다"
}
```

### 에러 처리
- **HTTP 상태 코드**: 적절한 상태 코드 사용
- **에러 메시지**: 명확하고 사용자 친화적
- **로깅**: 에러 발생 시 상세 로그 기록

## 상태 관리

### React Query
- **쿼리 키**: 배열 형태로 계층적 구조
- **뮤테이션**: 낙관적 업데이트 고려

```typescript
// 쿼리 키
const userQueries = {
    all: ['users'] as const,
    lists: () => [...userQueries.all, 'list'] as const,
    list: (filters: string) => [...userQueries.lists(), { filters }] as const,
    details: () => [...userQueries.all, 'detail'] as const,
    detail: (id: string) => [...userQueries.details(), id] as const,
}

// 사용 예시
useQuery(userQueries.detail(userId))
```

### Zustand
- **스토어명**: `useStoreName` 형식
- **액션명**: 동사로 시작하는 명확한 이름

```typescript
interface UserStore {
    user: UserProfile | null
    setUser: (user: UserProfile) => void
    clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}))
```

## 스타일링

### TailwindCSS
- **클래스 순서**: 레이아웃 → 스페이싱 → 크기 → 색상 → 기타
- **커스텀 클래스**: `@apply` 지시어 사용
- **반응형**: 모바일 우선 접근법

```css
/* 좋은 예 */
.user-card {
    @apply flex flex-col p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow;
}

/* 클래스 순서 */
<div className="flex flex-col p-4 w-full bg-white rounded-lg shadow-md">
```

### shadcn/ui
- **컴포넌트 확장**: 기존 컴포넌트를 확장하여 사용
- **일관된 디자인**: 디자인 시스템 준수

## Git 컨벤션

### 커밋 메시지
- **형식**: `type(scope): description`
- **타입**: feat, fix, docs, style, refactor, test, chore
- **예시**: `feat(auth): 카카오 로그인 기능 추가`

### 브랜치명
- **feature**: `feature/기능명`
- **bugfix**: `bugfix/버그명`
- **hotfix**: `hotfix/긴급수정명`

## 문서화

### 주석
- **JSDoc**: 함수와 클래스에 상세 설명
- **인라인 주석**: 복잡한 로직에만 간단한 설명

```typescript
/**
 * 사용자 프로필을 가져옵니다
 * @param userId - 사용자 ID
 * @returns 사용자 프로필 정보
 * @throws 사용자를 찾을 수 없는 경우
 */
async function fetchUserProfile(userId: string): Promise<UserProfile> {
    // 구현
}
```

### README
- **프로젝트 개요**: 목적과 주요 기능
- **설치 및 실행**: 개발 환경 설정 방법
- **API 문서**: 주요 엔드포인트 설명
- **컨트리뷰션**: 개발 가이드라인
