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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseGoals, setCoursGoals] = useState([]);

  const openModalHandler = () => {
    setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  const addGoalHandler = (enteredGoalText) => {
    setCoursGoals((prevCourseGoals) => [
      ...prevCourseGoals,
      { id: Math.random().toString(), text: enteredGoalText },
    ]);
    closeModalHandler(); // 목표 추가 후 모달 닫기
  };

  const deleteGoalHandler = (deleteGoalId) => {
    setCoursGoals((prevCourseGoals) =>
      prevCourseGoals.filter((goal) => goal.id !== deleteGoalId)
    );
  };

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add New Goal"
        color="powderblue"
        onPress={openModalHandler}
      />
      <GoalInput
        onAddGoal={addGoalHandler}
        visible={isModalVisible}
        onCancel={closeModalHandler}
      />
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
          renderItem={({ item }) => (
            <GoalItem
              text={item.text}
              id={item.id}
              onDeleteItem={deleteGoalHandler}
            />
          )}
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
