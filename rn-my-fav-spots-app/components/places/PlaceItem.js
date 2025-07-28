import { Pressable, StyleSheet, Text, View } from "react-native";

const PlaceItem = ({ title, imageUri, address, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});

export default PlaceItem;
