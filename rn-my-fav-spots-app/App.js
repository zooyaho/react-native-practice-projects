import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import IconButton from "./components/common/IconButton";
import { Colors } from "./constants/colors";
import AddPlaceFormContextProvider from "./store/add-place-form-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AddPlaceFormContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary500 },
              headerTintColor: Colors.gray700,
              contentStyle: { backgroundColor: Colors.gray700 },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                title: "좋아하는 장소",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="add"
                    color={tintColor}
                    size={24}
                    onPress={() => {
                      navigation.navigate("AddPlace");
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={{
                title: "장소 추가",
              }}
            />
            <Stack.Screen
              name="Map"
              component={Map}
              options={{
                title: "장소 선택",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AddPlaceFormContextProvider>
    </>
  );
}
