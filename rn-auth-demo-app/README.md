# rn-auth-demo-app

React Native 기반 사용자 인증 학습용 더미 앱 프로젝트입니다.  
기본적인 회원가입, 로그인, 로그아웃 기능 구현과 함께,  
Firebase Authentication 혹은 기타 인증 방식을 실습하기에 적합한 구조로 설계되었습니다.

---

## 주요 기능

- 이메일/비밀번호를 이용한 회원가입 및 로그인
- 인증 상태 관리 (로그인 상태 유지 및 로그아웃)
- 에러 처리 및 입력 유효성 검사
- React Navigation을 활용한 화면 전환
- Context API를 통한 상태 관리 구조 예시
- Expo 환경 기반 개발

---

## 기술 스택

- React Native (Expo)
- React Navigation
- Context API
- Axios (API 호출용)
- Firebase Authentication

---

## 설치 및 실행 방법

1. 저장소 클론

```bash
git clone https://github.com/zooyaho/react-native-practice-projects.git
cd rn-auth-demo-app
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. Expo 시작

```bash
expo start
```

4. Expo Go 앱이나 시뮬레이터로 실행

---

## 프로젝트 구조

```
/api           - 인증 관련 API 함수
/components    - 인증 관련 UI 컴포넌트
/context       - 인증 상태 관리 Context
/screens       - 회원가입, 로그인, 메인 화면 등
/utils         - 유틸 함수 및 상수
App.js         - 네비게이션 및 루트 컴포넌트
```

---

## 주요 코드 설명

- **AuthContext**  
  사용자 인증 상태 및 로그인/로그아웃 로직을 Context API로 관리

- **API 함수**  
  `api/auth.api.js` 에서 서버 혹은 Firebase와의 통신 처리

- **Navigation**  
  인증 상태에 따라 로그인 화면과 메인 화면을 분기 처리

- **유효성 검사 및 에러 처리**  
  이메일, 비밀번호 유효성 검사 및 서버 에러 처리 로직 포함

---

## 참고 사항

- Firebase 연동 예시는 포함되어 있으나, Firebase 설정은 별도 진행 필요
- Expo 환경에서 `.env` 환경변수 사용 시 `react-native-dotenv` 설정 필요
