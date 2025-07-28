import { useState, useCallback, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Colors } from "../../constants/colors";

import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../common/Button";
import { AddPlaceFormContext } from "../../store/add-place-form-context";

const PlaceForm = () => {
  const addPlaceFormCtx = useContext(AddPlaceFormContext);
  const [enteredTitle, setEnteredTitle] = useState(addPlaceFormCtx.title || "");

  const changeTitleInputHandler = (text) => {
    setEnteredTitle(text);
    addPlaceFormCtx.setTitle(text);
  };

  const savePlaceHandler = () => {
    console.log("장소 저장:", {
      title: enteredTitle,
      imageUri: addPlaceFormCtx.imageUri,
      location: addPlaceFormCtx.location,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>장소 제목</Text>
        <TextInput
          placeholder="장소 제목"
          onChangeText={changeTitleInputHandler}
          value={enteredTitle}
          style={styles.input}
        />
        <ImagePicker />
        <LocationPicker />
        <Button onPress={savePlaceHandler}>장소 추가</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: { flex: 1, padding: 24 },
  label: { fontWeight: "bold", marginBottom: 4, color: Colors.primary500 },
  input: {
    marginVertical: 8,
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
