import { Text, View, StyleSheet } from "react-native";

const GoalItem = ({ text }) => {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    // borderWidth: 1,
    // borderColor: "#cccccc",
    backgroundColor: "powderblue",
  },
  goalText: {
    color: "white", // font색상은 <Text>에서만 적용됨!
  },
});

export default GoalItem;
