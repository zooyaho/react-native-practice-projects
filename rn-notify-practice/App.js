import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert, Platform } from "react-native";
import PushTokenContextProvider, {
  PushTokenContext,
} from "./store/push-token-context";
import { EXPO_PROJECT_ID } from "@env";

import LocalNotify from "./screens/LocalNotify";
import PushNotify from "./screens/PushNotify";
import { useEffect, useContext } from "react";

const Stack = createNativeStackNavigator();

/**
 * 앱에 해당하는 알림이 들어왔을때 어떻게 처리할지 설정
 * - 알림을 배너로 표시
 * - 알림을 목록에 표시
 * - 소리 재생 안함
 * - 배지 설정 안함
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function AppContent() {
  const pushTokenCtx = useContext(PushTokenContext);

  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        // 알림 권한이 없으면 요청
        const { status: askStatus } =
          await Notifications.requestPermissionsAsync();

        if (askStatus !== "granted") {
          Alert.alert("알림 권한 요청", "알림 권한이 필요합니다.");
          return;
        }
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId: EXPO_PROJECT_ID,
      });

      pushTokenCtx.setPushToken(pushTokenData.data);

      if (Platform.OS === "android") {
        // 안드로이드에서 알림 채널 설정
        await Notifications.getNotificationChannelsAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    };

    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LocalNotify" component={LocalNotify} />
        <Stack.Screen name="PushNotify" component={PushNotify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PushTokenContextProvider>
      <AppContent />
    </PushTokenContextProvider>
  );
}
