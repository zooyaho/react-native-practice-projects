import { Text, StyleSheet, Platform } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    // fontWeight: "bold", // fontWeight는 커스텀 폰트 사용 시 무시됨
    textAlign: "center",
    // borderWidth: Platform.OS === "android" ? 2 : 0, // 안드로이드에서만 테두리 추가
    borderWidth: Platform.select({ android: 2, ios: 2 }), // 안드로이드에서만 테두리 추가
    borderColor: "white",
    padding: 12,
    color: "white",
    maxWidth: "80%",
    width: 300,
  },
});

export default Title;
