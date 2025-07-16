import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCoursGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    console.log(enteredGoalText);
    setCoursGoals((prevCourseGoals) => [...prevCourseGoals, enteredGoalText]);
    // setEnteredGoalText(""); // 초기화
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          value={enteredGoalText}
          onChangeText={goalInputHandler}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        {/* ScrollView의 사용 가능한 높이를 제한하기 위해 View로 차지할 높이를 설정 */}
        <ScrollView alwaysBounceVertical={false}>
          {courseGoals
            .slice()
            .reverse()
            .map((goal, index) => (
              <View key={"goal-" + index} style={styles.goalItem}>
                <Text style={styles.goalText}>{goal}</Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
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
  goalsContainer: {
    flex: 5,
  },
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
