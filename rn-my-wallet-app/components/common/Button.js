import { StyleSheet, View, Pressable, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({ styleType, onPress, style, children }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
        android_ripple={{ color: GlobalStyles.colors.primary100 }}
      >
        <View style={[styles.button, styleType === "flat" && styles.flat]}>
          <Text
            style={[styles.buttonText, styleType === "flat" && styles.flatText]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.primary900,
    borderRadius: 4,
    padding: 8,
  },
  flat: {
    backgroundColor: "transparent",
    // borderWidth: 1,
    // borderColor: GlobalStyles.colors.primary400,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary900,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});

export default Button;
