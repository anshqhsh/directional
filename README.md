# [Directional] 프론트엔드 채용 과제

React 기반 웹 애플리케이션으로 게시판 기능과 데이터 시각화 기능을 구현한 프로젝트입니다.

## 🚀 프로젝트 실행 방법

### 필수 요구사항

- Node.js 18 이상
- pnpm (권장) 또는 npm, yarn

### 배포

**🌐 배포된 사이트:** [https://anshqhsh.github.io/directional/](https://anshqhsh.github.io/directional/)

이 프로젝트는 GitHub Pages를 통해 배포되었습니다.

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 빌드 미리보기
pnpm preview

# 린트 실행
pnpm lint
```

개발 서버 실행 후 `http://localhost:5173`에서 애플리케이션을 확인할 수 있습니다.

## 🛠 사용한 기술 스택

### Core

- **React** 19.1.1 - UI 라이브러리
- **TypeScript** 5.9.3 - 타입 안정성
- **Vite** 7.1.7 - 빌드 도구 및 개발 서버

### 라우팅 및 상태 관리

- **React Router DOM** 7.9.5 - 클라이언트 사이드 라우팅
- **TanStack Query (React Query)** 5.90.7 - 서버 상태 관리 및 데이터 페칭

### HTTP 클라이언트

- **Axios** 1.13.2 - HTTP 요청 처리

### 데이터 시각화

- **ECharts** 6.0.0 - 차트 라이브러리
- **echarts-for-react** 3.0.5 - React용 ECharts 래퍼

### 스타일링

- **Tailwind CSS** 4.1.17 - 유틸리티 기반 CSS 프레임워크
- **shadcn/ui** - Radix UI 기반 컴포넌트 라이브러리
  - Radix UI 컴포넌트들 (Dialog, Select, Tabs, Popover 등)
  - Lucide React - 아이콘 라이브러리

### 유틸리티

- **dayjs** 1.11.19 - 날짜 처리
- **date-fns** 4.1.0 - 날짜 포맷팅
- **jwt-decode** 4.0.0 - JWT 토큰 디코딩
- **clsx** & **tailwind-merge** - 클래스명 유틸리티

## ✨ 주요 구현 기능

### 1. 인증 시스템

- JWT 기반 인증 구현
- 로그인/로그아웃 기능
- 토큰 자동 갱신 및 관리
- 보호된 라우트 구현 (`RouteGuard` 컴포넌트)
- 전역 헤더 컴포넌트 (로그인 상태 표시 및 로그아웃)

### 2. 게시판 기능 (CRUD)

#### 게시글 관리

- ✅ **게시글 작성** - 제목, 본문, 카테고리, 태그 입력
- ✅ **게시글 조회** - 목록 조회 및 상세 조회 (모달)
- ✅ **게시글 수정** - 기존 게시글 수정
- ✅ **게시글 삭제** - 개별 삭제 (확인 다이얼로그)

#### 검색 및 필터링

- ✅ **제목/본문 검색** - Debounce 적용 (500ms)
- ✅ **카테고리 필터** - NOTICE, QNA, FREE 필터링
- ✅ **날짜 범위 필터** - 시작일/종료일 선택 (Calendar 컴포넌트)

#### 정렬 및 페이지네이션

- ✅ **정렬 기능** - 제목(`title`) 또는 작성일(`createdAt`) 기준
- ✅ **정렬 방향** - 오름차순(`asc`) / 내림차순(`desc`)
- ✅ **커서 기반 페이지네이션** - `nextCursor` / `prevCursor` 사용
- ✅ **페이지당 항목 수 선택** - 3, 10, 20, 50, 100개

#### 유효성 검증

- ✅ **금칙어 필터** - 다음 단어 포함 시 등록 불가
  - "캄보디아", "프놈펜", "불법체류", "텔레그램"
- ✅ **입력 제한**
  - 제목: 최대 80자
  - 본문: 최대 2000자
  - 태그: 최대 5개, 각 24자 이내
  - 태그 중복 제거

#### UI/UX 개선

- 게시글 목록 테이블 (반응형)
- 게시글 상세 모달 (스크롤 가능)
- 로딩 상태 표시 (Spinner 컴포넌트)
- 에러 처리 및 사용자 피드백
- 텍스트 줄바꿈 처리 (`break-words`)

### 3. 데이터 시각화 기능

#### 인기 커피 브랜드 (`/mock/top-coffee-brands`)

- ✅ **바 차트** - 브랜드별 점유율 막대 그래프
- ✅ **도넛 차트** - 브랜드별 점유율 원형 차트
- 탭으로 차트 타입 전환 가능

#### 주간 기분 트렌드 (`/mock/weekly-mood-trend`)

- ✅ **스택형 바 차트** - 주별 기분 상태 누적 막대 그래프
  - X축: 주차 (`week`)
  - Y축: 백분율 (%)
  - 항목: happy, tired, stressed (누적 표시)
- ✅ **스택형 면적 차트** - 주별 기분 상태 누적 영역 그래프
- 탭으로 차트 타입 전환 가능

#### 커피 소비량과 생산성 (`/mock/coffee-consumption`)

- ✅ **멀티라인 차트** - 팀별 커피 소비량과 생산성 관계
  - X축: 커피 섭취량 (잔/일)
  - 왼쪽 Y축: 버그 수 (`bugs`)
  - 오른쪽 Y축: 생산성 점수 (`productivity`)
  - 팀별 라인 구분 (Frontend, Backend, AI 등)
  - 각 팀당 두 개의 라인:
    - 실선: 버그 수
    - 점선: 생산성
    - 동일 팀은 동일 색상 유지
  - 데이터 포인트 마커:
    - 원형: 버그 수
    - 사각형: 생산성
  - 툴팁: 호버 시 해당 포인트의 커피 잔수, 버그 수, 생산성 점수 표시

### 4. 추가 구현 기능

#### Mock 게시판 섹션 (홈페이지)

- Mock API를 활용한 최근 게시글 표시
- 게시글 개수 선택 (5, 10, 20, 30, 50, 100, 300, 500)
- 게시글 상세 모달 연동

#### 컴포넌트 구조

- **Feature-based 폴더 구조** - 기능별로 코드 분리
  - `feature/posts` - 게시판 관련 API, hooks, types
  - `feature/auth` - 인증 관련 API, hooks, types
  - `feature/mock` - Mock API 관련 hooks
- **재사용 가능한 UI 컴포넌트** - shadcn/ui 기반
- **커스텀 훅** - 비즈니스 로직 분리
  - `usePostSearch` - 검색 및 필터링 로직
  - `usePostPagination` - 페이지네이션 로직
  - `usePostModal` - 모달 상태 관리
  - `useDebounce` - 검색 입력 디바운싱

#### 에러 처리

- Error Boundary 구현
- API 에러 처리 및 사용자 피드백
- 네트워크 에러 처리

#### 접근성 및 사용성

- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 키보드 네비게이션 지원
- 로딩 상태 일관성 (모든 로딩 상태에 Spinner 사용)
- 명확한 에러 메시지

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── charts/         # 차트 컴포넌트
│   ├── posts/          # 게시판 관련 컴포넌트
│   ├── ui/             # shadcn/ui 기반 UI 컴포넌트
│   ├── Header.tsx      # 전역 헤더
│   ├── Layout.tsx      # 레이아웃 컴포넌트
│   └── RouteGuard.tsx # 라우트 보호 컴포넌트
├── feature/            # 기능별 모듈
│   ├── auth/          # 인증 관련
│   ├── posts/         # 게시판 관련
│   └── mock/          # Mock API 관련
├── pages/              # 페이지 컴포넌트
├── lib/                # 유틸리티 및 설정
│   ├── axios.ts       # Axios 인스턴스 설정
│   ├── auth.ts        # 인증 유틸리티
│   ├── react-query.ts # React Query 설정
│   └── echarts.ts     # ECharts 설정
├── constants/          # 상수 정의
└── hooks/              # 공통 커스텀 훅
```

## 🔑 주요 구현 포인트

### 1. 타입 안정성

- TypeScript를 활용한 엄격한 타입 정의
- API 응답 타입 정의 및 검증
- Props 타입 명시

### 2. 상태 관리

- React Query를 활용한 서버 상태 관리
- 로컬 상태는 useState, useReducer 활용
- Query Key 중앙 관리

### 3. 코드 구조화

- Feature-based 아키텍처
- 관심사 분리 (API, hooks, types)
- 재사용 가능한 컴포넌트 설계

### 4. 사용자 경험

- Debounce를 활용한 검색 최적화
- 로딩 상태 일관성 유지
- 에러 처리 및 피드백
- 반응형 디자인

### 5. 성능 최적화

- React Query의 캐싱 활용
- 컴포넌트 메모이제이션 (필요시)
- Lazy loading (차트 컴포넌트)

## 📝 API 연동

### 인증 API

- `POST /auth/login` - 로그인 및 토큰 발급

### 게시판 API

- `GET /posts` - 게시글 목록 조회 (쿼리 파라미터 지원)
- `GET /posts/:id` - 게시글 상세 조회
- `POST /posts` - 게시글 작성
- `PATCH /posts/:id` - 게시글 수정
- `DELETE /posts/:id` - 게시글 삭제

### Mock API

- `GET /mock/top-coffee-brands` - 인기 커피 브랜드 데이터
- `GET /mock/weekly-mood-trend` - 주간 기분 트렌드 데이터
- `GET /mock/coffee-consumption` - 커피 소비량 데이터

## 🎨 UI/UX 특징

- **일관된 디자인 시스템** - Tailwind CSS와 shadcn/ui 활용
- **반응형 레이아웃** - 모바일부터 데스크톱까지 지원
- **직관적인 네비게이션** - 명확한 라우팅 구조
- **접근성 고려** - 키보드 네비게이션 및 ARIA 속성
