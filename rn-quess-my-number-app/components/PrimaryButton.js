import { View, Text, StyleSheet, Pressable } from "react-native";

const PrimaryButton = ({ children, onPressHandler }) => {
  const pressHandler = () => {
    onPressHandler?.();
  };

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={pressHandler}
        android_ripple={{ color: "#640233" }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden", // Pressable 내부 요소가 버튼 외부로 넘치지 않도록(android 물결효과가 넘치는거 방지)
    elevation: 2, // Android shadow
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, // Android shadow
    shadowColor: "black", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow opacity
    shadowRadius: 6, // iOS shadow radius
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75, // Pressable가 눌렸을 때 투명도 조절
  },
});

export default PrimaryButton;
