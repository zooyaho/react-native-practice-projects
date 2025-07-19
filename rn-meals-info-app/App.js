import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      {/* <SafeAreaView style={styles.screen}> */}
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#351401" },
            headerTintColor: "white", // 헤더의 글자색
            headerTitleAlign: "center", // 헤더의 제목 정렬
            contentStyle: { backgroundColor: "#3f2f25" }, // 화면의 배경색 설정
          }}
        >
          {/* initialRouteName="" 앱이 시작할 때 어떤 화면이 기본으로 표시될지를 설정 */}
          <Stack.Screen
            name="MealsCategories"
            component={CategoriesScreen}
            options={{
              title: "All Categories",
              // headerStyle: { backgroundColor: "#351401" },
              // headerTintColor: "white", // 헤더의 글자색
              // headerTitleAlign: "center", // 헤더의 제목 정렬
              // contentStyle: { backgroundColor: "#3f2f25" }, // 화면의 배경색 설정
            }}
          />
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverviewScreen}
            // options={({ route, navigation }) => {
            //   const { categoryId } = route.params;
            //   const categoryTitle = CATEGORIES.find(
            //     (cat) => cat.id === categoryId
            //   )?.title;
            //   return { title: categoryTitle || "Meals Overview" };
            // }}
          />
          <Stack.Screen name="MealDetail" component={MealDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
