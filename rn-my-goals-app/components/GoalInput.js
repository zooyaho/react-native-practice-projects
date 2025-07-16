import { useState } from "react";
import { TextInput, Button, View, StyleSheet, Modal } from "react-native";

const GoalInput = ({ onAddGoal, visible, onCancel }) => {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim().length === 0) {
      return; // 빈 문자열은 추가하지 않음
    }
    onAddGoal(enteredGoalText);
    setEnteredGoalText(""); // 입력 필드 초기화
  };

  const cancelGoalHandler = () => {
    setEnteredGoalText(""); // 입력 필드 초기화
    onCancel(); // 모달 닫기
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          value={enteredGoalText}
          onChangeText={goalInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={cancelGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    // flexDirection: "column", // 기본값이 column이므로 생략 가능
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 24,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
  textInput: {
    borderColor: "#cccccc",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});

export default GoalInput;
