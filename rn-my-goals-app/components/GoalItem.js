import { Text, View, StyleSheet, Pressable } from "react-native";

/*
Pressable: 터치하려는 요소에 감싸서 적용
*/

const GoalItem = ({ id, text, onDeleteItem }) => {
  const deleteGoalHandler = () => {
    onDeleteItem(id);
  };

  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "skyblue" }}
        style={({ pressed }) => pressed && styles.pressedItem}
        onPress={deleteGoalHandler}
      >
        <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    // borderWidth: 1,
    // borderColor: "#cccccc",
    backgroundColor: "powderblue",
  },
  pressedItem: {
    opacity: 0.5, // Pressable이 눌렸을 때 투명도 변경
    borderRadius: 6,
    backgroundColor: "skyblue",
  },
  goalText: {
    color: "white", // font색상은 <Text>에서만 적용됨!
    padding: 8,
  },
});

export default GoalItem;
