# AI Builder - AI 에이전트 생성 플랫폼

사용자가 Custom AI App을 생성하고, 마켓플레이스를 통해 공유하며, 수익화할 수 있는 AI 에이전트 플랫폼입니다.

## 🚀 기술 스택

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: FastAPI (Python)
- **인증**: NextAuth.js + 카카오 OAuth
- **상태관리**: React Query, Zustand
- **UI 컴포넌트**: shadcn/ui + Radix UI
- **AI 연동**: OpenAI API (스트리밍)

## 📋 프로젝트 문서

- [개발 가이드](./agent.md) - 프로젝트 시작 및 개발 참고 문서
- [아키텍처 가이드](./architecture.md) - 시스템 구조 및 기술 스택
- [파일 구조](./file-structure.md) - 프로젝트 폴더 및 파일 구조
- [컴포넌트 구조](./component-convention.md) - React 컴포넌트 설계 원칙
- [컴포넌트 목록](./component.md) - 개발된 컴포넌트들 정리
- [코딩 컨벤션](./convention.md) - 개발 규칙 및 스타일 가이드

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
```bash
cp env.example .env.local
# .env.local 파일을 편집하여 실제 값 입력
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 브라우저에서 확인
```
http://localhost:3000
```

## 🐳 Docker 사용법

### 개발 환경 실행
```bash
# 개발 환경 전체 서비스 실행
docker-compose -f docker-compose.dev.yml up -d

# 특정 서비스만 실행
docker-compose -f docker-compose.dev.yml up frontend

# 로그 확인
docker-compose -f docker-compose.dev.yml logs -f frontend
```

### 프로덕션 환경 실행
```bash
# 환경 변수 설정
export POSTGRES_PASSWORD=your-secure-password

# 프로덕션 환경 실행
docker-compose -f docker-compose.prod.yml up -d

# 서비스 상태 확인
docker-compose -f docker-compose.prod.yml ps
```

### Docker 서비스 접속
- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:8000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **pgAdmin**: http://localhost:5050

### Docker 명령어
```bash
# 서비스 중지
docker-compose -f docker-compose.dev.yml down

# 볼륨 삭제 (데이터 초기화)
docker-compose -f docker-compose.dev.yml down -v

# 이미지 재빌드
docker-compose -f docker-compose.dev.yml build --no-cache
```

## 📁 프로젝트 구조

```
ai-builder/
├── components/          # React 컴포넌트
├── lib/                # 유틸리티 및 API 클라이언트
├── pages/              # Next.js 페이지
├── styles/             # 글로벌 스타일
├── types/              # TypeScript 타입 정의
├── docs/               # 프로젝트 문서
├── Dockerfile.dev      # 개발 환경 Dockerfile
├── Dockerfile.prod     # 프로덕션 환경 Dockerfile
├── docker-compose.dev.yml    # 개발 환경 Docker Compose
├── docker-compose.prod.yml   # 프로덕션 환경 Docker Compose
└── .dockerignore       # Docker 빌드 제외 파일
```

## 🔧 개발 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 검사
- `npm run type-check` - TypeScript 타입 검사

## 📚 주요 기능

- **Custom AI App 생성**: 모델 선택, 톤 설정, 가격 정책
- **실시간 AI 대화**: Server-Sent Events 기반 스트리밍
- **마켓플레이스**: AI App 공유 및 구독
- **사용자 인증**: 카카오 OAuth 기반 로그인
- **결제 시스템**: 토스페이먼츠 연동

## 🤝 기여하기

1. 이슈 생성 또는 기존 이슈 확인
2. 기능 브랜치 생성 (`feature/기능명`)
3. 코드 작성 및 테스트
4. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
