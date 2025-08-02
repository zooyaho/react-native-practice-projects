import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { PushTokenContext } from "../store/push-token-context";

// https://expo.dev/notifications 에서 보낼수도 있음!

const PushNotify = () => {
  const pushTokenCtx = useContext(PushTokenContext);

  const sendPushNotificationHandler = async () => {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: pushTokenCtx.pushToken,
        sound: "default",
        title: "push 알림 제목",
        body: "push 알림 내용",
        data: { message: "push 알림 데이터" },
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("푸시 알림 전송 실패");
      }
    });
  };

  return (
    <View>
      <Text>PushNotify</Text>
      <Button title="push 알림 보내기" onPress={sendPushNotificationHandler} />
    </View>
  );
};

export default PushNotify;
