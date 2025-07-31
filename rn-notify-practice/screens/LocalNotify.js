import { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

function LocalNotify() {
  const navigation = useNavigation();

  const scheduleNotificationHandler = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "나의 첫 로컬 알림",
          body: "알림 내용",
          data: { message: "알림 데이터" },
        },
        trigger: {
          seconds: 5, // 5초 후에 알림
        },
      });
      // alert("알림이 예약되었습니다.");
    } catch (error) {
      console.error("알림 예약 실패:", error);
      alert("알림 예약에 실패했습니다.");
    }
  };

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: askStatus } =
          await Notifications.requestPermissionsAsync();
        if (askStatus !== "granted") {
          alert("알림 권한이 필요합니다.");
        }
      }
    };

    // 알림 수신 리스너 설정
    // 알림이 들어왔을 때 어떻게 처리할지 설정
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("알림 수신:", notification);
        console.log("알림 데이터:", notification.request.content.data.message); // 알림 데이터 출력
        // alert(`알림 수신: ${notification.request.content.title}`);
        // 필요하면 알림 내용 기반 UI 업데이트, 사운드 재생 등 작업 가능
      }
    );

    // 알림 응답 리스너 설정
    // 사용자가 알림을 클릭했을 때 어떻게 처리할지 설정
    // 예: 알림 클릭 시 특정 화면으로 이동
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("알림 응답:", response);
        console.log(
          "알림 데이터:",
          response.notification.request.content.data.message
        );
      }
    );
    getPermissions();

    return () => {
      // 메모리 누수 방지용으로, 컴포넌트가 사라질 때 이벤트 리스너를 꼭 제거
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Test Notification</Text>
      <Button title="알림 예약" onPress={scheduleNotificationHandler} />
      <Button
        title="Push Notification 페이지 이동"
        onPress={() => navigation.navigate("PushNotify")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LocalNotify;
