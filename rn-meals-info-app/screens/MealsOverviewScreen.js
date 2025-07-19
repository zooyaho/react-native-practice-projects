import { useLayoutEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { MEALS, CATEGORIES } from "../data/dummy-data";

import MealItem from "../components/MealItem";

const MealsOverviewScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  const RenderMealItem = ({ item }) => {
    return (
      <>
        <MealItem
          id={item.id}
          title={item.title}
          imageUrl={item.imageUrl}
          duration={item.duration}
          complexity={item.complexity}
          affordability={item.affordability}
        />
      </>
    );
  };

  useLayoutEffect(() => {
    // 화면의 옵션을 설정하는 것이 부수효과이기 때문에 useLayoutEffect를 사용
    const categoryTitle =
      CATEGORIES.find((cat) => cat.id === categoryId)?.title ||
      "Meals Overview";

    navigation.setOptions({
      title: categoryTitle,
    }); // categoryId가 변경될 때마다 타이틀을 동적으로 설정
  }, [categoryId, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={RenderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

export default MealsOverviewScreen;
