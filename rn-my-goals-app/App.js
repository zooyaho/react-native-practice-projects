import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCoursGoals] = useState([]);

  const addGoalHandler = (enteredGoalText) => {
    setCoursGoals((prevCourseGoals) => [
      ...prevCourseGoals,
      { id: Math.random().toString(), text: enteredGoalText },
    ]);
  };

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalsContainer}>
        {/* ScrollView의 사용 가능한 높이를 제한하기 위해 View로 차지할 높이를 설정 */}
        {/* <ScrollView alwaysBounceVertical={false}>
          {courseGoals
            .slice()
            .reverse()
            .map((goal, index) => (
              <View key={"goal-" + index} style={styles.goalItem}>
                <Text style={styles.goalText}>{goal}</Text>
              </View>
            ))}
        </ScrollView> */}
        <FlatList
          data={courseGoals}
          renderItem={({ item }) => <GoalItem text={item.text} />}
          keyExtractor={(item, index) => item.id}
          alwaysBounceVertical={false}
        />
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
  goalsContainer: {
    flex: 5,
  },
});
