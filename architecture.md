# 기술 스택
- **프레임워크**: Next.js 14 App Router
    - 서버컴포넌트 + 클라이언트 컴포넌트 혼합, SEO, 이미지 최적화, 라우팅 단순화
- **언어**: TypeScript
- **스타일**: TailwindCSS, shadcn/ui 컴포넌트 라이브러리
- **상태관리**: React Query(서버 상태), Zustand(로컬/글로벌 UI 상태)
- **인증**: NextAuth + Kakao Provider
- **결제**: 토스페이먼츠 Web SDK (카드/가상계좌/간편결제), 정기결제 BillingKey
- **스트리밍**: Server-Sent Events(SSE) 기반(기본)

# JWT 인증 패턴 정리

## 1. 인증 아키텍처 개요

* **Next.js (NextAuth)**

  * 사용자 로그인 (카카오 등 OAuth) 처리
  * JWT 발급 (RS256 서명)
  * BFF(Backend for Frontend) 역할: 브라우저 요청 → FastAPI 호출 프록시
* **FastAPI**

  * 도메인 API 담당
  * NextAuth가 발급한 JWT를 **RS256 공개키(JWKS)** 로 검증
  * 권한/스코프 기반 접근 제어

---

## 2. 인증 주요 흐름

1. **브라우저 → Next.js**

   * 로그인 시 NextAuth가 카카오 OAuth 처리 후 **JWT 발급**
   * JWT는 **HTTPOnly 쿠키**로 관리 (XSS 안전)

2. **브라우저 → Next.js API (BFF)**

   * 클라이언트는 그냥 `/api/...` 호출
   * Next.js가 쿠키에서 JWT 추출 → 내부에서 **Bearer 토큰**으로 FastAPI 호출

3. **Next.js → FastAPI**

   * `Authorization: Bearer <JWT>` 헤더 포함
   * FastAPI는 RS256 **공개키(JWKS)** 로 서명/만료 검증
   * `roles` / `scopes` 클레임 기반으로 권한 체크 후 응답 반환

---

## 3. JWT 페이로드 예시

```json
{
  "sub": "user_123",
  "roles": ["user"],
  "scopes": ["project:read"],
  "onboarded": false,
  "iss": "your-next-app",
  "aud": "fastapi",
  "exp": 1735920000
}
```

* `sub`: 사용자 ID (FastAPI 기준)
* `roles`, `scopes`: 권한/역할
* `onboarded`: 온보딩 여부
* `iss` / `aud`: 발급자 / 대상 검증용

---

## 4. 인증 권장 패턴

* **RS256 서명**: Next.js가 개인키로 서명, FastAPI는 JWKS 공개키로 검증
* **BFF 구조**: 브라우저는 JWT 직접 관리 ❌ → Next.js가 쿠키로 처리 후 내부적으로 전달
* **FastAPI Dependency**: JWT 검증/스코프 체크를 공통 의존성으로 사용
* **짧은 토큰 수명**(15–60분) + NextAuth 자동 갱신
* **JWKS 캐싱**: FastAPI는 JWKS 키를 5–10분 캐시, 키 회전 지원

---

## 5. 이 패턴 장점

* **보안**: JWT는 브라우저 JS에 노출되지 않음 (쿠키 기반)
* **단순성**: 프론트는 `/api/...`만 호출, 토큰 신경 안 씀
* **확장성**: FastAPI가 독립적으로 JWT 검증 → 다른 서비스에서도 재사용 가능
* **일관성**: 권한/스코프는 JWT 클레임에 통일

---

✅ **최종 인증 패턴**

* NextAuth가 RS256으로 JWT 발급
* 브라우저는 쿠키 기반 인증만 사용
* Next.js가 FastAPI 호출 시 Bearer로 전달
* FastAPI는 RS256 공개키로 검증 + 스코프 기반 접근 제어

---

# 채팅 스트림 구조 요약

## 구성요소

* **브라우저(React/Next)**: EventSource 또는 fetch-stream으로 스트림 수신
* **Next.js (BFF)**: 인증(쿠키→JWT) 확인 후 **FastAPI로 스트림 프록시**
* **FastAPI**: JWT 검증 + **권한/쿼터 판정** 후 **OpenAI 스트림 호출** → 클라이언트로 그대로 전송
* **OpenAI**: `stream: true` 응답

---

## 채팅 스트림 요청 흐름(2-hop SSE)

1. **브라우저 → Next(BFF)**

   * `GET /api/ai/stream?convId=...` (EventSource)
   * 쿠키 기반 인증 자동 포함

2. **Next(BFF) → FastAPI**

   * `GET /ai/stream?convId=...`
   * 헤더: `Authorization: Bearer <user_jwt>` (NextAuth RS256 JWT)
   * BFF는 응답 바디를 **그대로 파이프**(버퍼링 금지)

3. **FastAPI 내부**

   * RS256 **JWKS**로 `user_jwt` 검증(iss/aud/exp)
   * **권한/쿼터/모델 허용** 판단(조직/요금제/스코프)
   * 허용 시 **OpenAI ChatCompletions(stream: true)** 호출
   * 토큰이 들어오는 대로 **SSE 청크로 `StreamingResponse`** 반환
   * 사용량/감사 로깅

4. **브라우저**

   * 수신 이벤트를 이어붙여 **실시간 출력**(ChatGPT UX 참고)

---

## 채팅 스트림 핵심 구현 포인트

### Next(BFF)

* 쿠키 → `getToken()`으로 `user_jwt` 추출
* **파이프만** 수행 (버퍼링 금지, 중간 변환 최소화)
* 요청 취소 시 `AbortController`로 상류에 전달
* 권장 헤더:

  * `Content-Type: text/event-stream`
  * `Cache-Control: no-cache`
  * `Connection: keep-alive`

### FastAPI(Backend API server)

* **의존성**으로 JWT 검증 + 스코프 검사(패턴 A)
* **SSE 제너레이터**에서 OpenAI 스트림을 읽어 즉시 yield
* **하트비트**: 15–30초 간격으로 keep-alive(프록시 타임아웃 방지)
* **JWKS 캐시**: 5–10분 메모리 캐시(+ETag)

---

## 보안/정책

* **JWT**: RS256(Next가 서명, FastAPI가 JWKS로 검증), `iss/aud/exp` 필수 검증
* **권한**: `roles/scopes` + 조직/플랜별 모델/맥스토큰/쿼터
* **비용/감사**: userId, traceId, 모델, 토큰 사용량 로깅
* **키 관리**: OpenAI 키는 **FastAPI에만** 존재

---

### 결론

* **권한판단/실행을 FastAPI에 집중**시키고,
* **BFF(next)는 인증·프록시만** 담당하는 **패턴**이 초기 서비스에 **가장 단순하고 안전**합니다.
