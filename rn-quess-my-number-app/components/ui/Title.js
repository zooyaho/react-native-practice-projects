import { Text, StyleSheet } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    // fontWeight: "bold", // fontWeight는 커스텀 폰트 사용 시 무시됨
    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
    color: "white",
  },
});

export default Title;
