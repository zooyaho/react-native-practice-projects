import { StyleSheet, SafeAreaView, StatusBar, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

import FavoritesContextProvider from "./store/context/favorites-context";
import { store } from "./store/redux/store";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white", // 헤더의 글자색
        headerTitleAlign: "center", // 헤더의 제목 정렬
        sceneStyle: { backgroundColor: "#3f2f25" }, // 화면의 배경색 설정
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <>
      <Provider store={store}>
        <FavoritesContextProvider>
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
                component={DrawerNavigator}
                options={{
                  // title: "All Categories",
                  headerShown: false,
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
              <Stack.Screen
                name="MealDetail"
                component={MealDetailScreen}
                options={{
                  title: "About the Meal",
                  // headerRight: () => <Button title="Tab me!" />,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          {/* </SafeAreaView> */}
        </FavoritesContextProvider>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
