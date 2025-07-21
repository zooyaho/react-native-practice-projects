import { useLayoutEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { MEALS, CATEGORIES } from "../data/dummy-data";

import MealsList from "../components/MealsList/MealsList";

const MealsOverviewScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

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
    <>
      <MealsList items={displayedMeals} />
    </>
  );
};

export default MealsOverviewScreen;
