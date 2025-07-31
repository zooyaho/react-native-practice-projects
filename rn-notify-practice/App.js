import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LocalNotify from "./screens/LocalNotify";
import PushNotify from "./screens/PushNotify";

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LocalNotify" component={LocalNotify} />
        <Stack.Screen name="PushNotify" component={PushNotify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
