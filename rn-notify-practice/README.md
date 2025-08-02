# rn-notify-practice

React Native로 로컬 알림과 푸시 알림을 연습하기 위한 예제 프로젝트입니다.  
Expo Notifications API를 사용해 알림 권한 요청, 알림 수신 처리, 토큰 발급 등을 다뤄보았습니다.

## 주요 기능

- **로컬 알림 (Local Notification)**

  - 앱 내에서 즉시 또는 예약된 시간에 알림 표시
  - 알림 도착 시 배너, 소리, 배지 등 설정 가능

- **푸시 알림 (Push Notification)**
  - Expo 푸시 알림 토큰 생성 및 관리
  - Expo 푸시 서버로 토큰 전송 가능 (연동 예시는 없음)
  - 권한 요청 및 권한 거부 시 처리 로직 구현

## 사용 기술

- React Native (Expo Managed Workflow)
- `expo-notifications`
- `@react-navigation/native`, `@react-navigation/native-stack`
- React Hooks (`useState`, `useEffect`)

## 실행 방법

1. 저장소 클론

```bash
   git clone https://github.com/zooyaho/react-native-practice-projects.git
   cd rn-notify-practice
```

2. 의존성 설치

```bash
npm install
```

3. Expo 앱 실행

```bash
expo start
```

4. Expo Go 앱 또는 시뮬레이터에서 실행

## 주요 코드 설명

- `Notifications.setNotificationHandler`
  알림 도착 시 앱 내 알림 처리 방식을 정의 (배너, 목록, 소리 등)

- `Notifications.getPermissionsAsync` / `requestPermissionsAsync`
  알림 권한 확인 및 요청

- `Notifications.getExpoPushTokenAsync({ projectId })`
  Expo Push Token 발급 (푸시 알림 식별용)

- Android 알림 채널 설정

  - Android 기기에서 알림 채널을 등록하여 알림 중요도 및 스타일 제어

- React Navigation을 이용해 화면 간 이동 구현

## 참고 문서

- [Expo Push Notifications 공식 문서](https://docs.expo.dev/push-notifications/overview/)
