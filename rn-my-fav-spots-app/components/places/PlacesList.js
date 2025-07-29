import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  console.log("PlacesList places:", places);
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>아직 추가된 장소가 없습니다</Text>
        <Text style={styles.fallbackText}>새로운 장소를 추가해보세요!</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem {...item} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    marginTop: 200,
    // justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
    marginBottom: 8,
  },
});

export default PlacesList;
