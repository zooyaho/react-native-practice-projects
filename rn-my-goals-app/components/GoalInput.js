import { useState } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";

const GoalInput = ({ onAddGoal }) => {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
    setEnteredGoalText(""); // 초기화
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim().length === 0) {
      return; // 빈 문자열은 추가하지 않음
    }
    onAddGoal(enteredGoalText);
    setEnteredGoalText(""); // 입력 필드 초기화
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Your course goal!"
        value={enteredGoalText}
        onChangeText={goalInputHandler}
      />
      <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
  textInput: {
    borderColor: "#cccccc",
    borderWidth: 1,
    width: "70%",
    padding: 10,
    marginRight: 8,
    borderRadius: 6,
  },
});

export default GoalInput;
