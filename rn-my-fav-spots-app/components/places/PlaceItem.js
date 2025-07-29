import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "../../constants/colors";

const PlaceItem = ({ title, imageUri, address, onSelect }) => {
  console.log("PlaceItem props:", { title, imageUri, address });
  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    // width: "100%",
    height: 100,
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    color: Colors.gray700,
    fontSize: 12,
  },
});

export default PlaceItem;
