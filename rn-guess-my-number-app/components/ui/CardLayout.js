import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const CardLayout = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 4, // Android shadow
    shadowColor: "black", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS 그림자 위치
    shadowOpacity: 0.25, // iOS 그림자 불투명도
    shadowRadius: 6, // iOS 그림자 번짐 정도
  },
});

export default CardLayout;
