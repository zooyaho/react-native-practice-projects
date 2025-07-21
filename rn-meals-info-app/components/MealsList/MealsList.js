import { StyleSheet, FlatList, View } from "react-native";

import MealItem from "./MealItem";

function MealsList({ items }) {
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

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={RenderMealItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});

export default MealsList;
