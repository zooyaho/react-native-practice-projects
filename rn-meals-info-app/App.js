import { StyleSheet, Text, View } from "react-native";
import CATEGORIES from "./data/dummy-data";

export default function App() {
  console.log(CATEGORIES);
  return (
    <View style={styles.container}>
      {/* {CATEGORIES.map((item, idx) => (
        <Text key={idx}>{item.title}</Text>
      ))} */}
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
