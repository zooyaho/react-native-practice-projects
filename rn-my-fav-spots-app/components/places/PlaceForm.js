import { useState, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Colors } from "../../constants/colors";

import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../common/Button";
import { AddPlaceFormContext } from "../../store/add-place-form-context";
import Place from "../../models/places";

const PlaceForm = ({ onCreatePlace }) => {
  const addPlaceFormCtx = useContext(AddPlaceFormContext);
  const [enteredTitle, setEnteredTitle] = useState(addPlaceFormCtx.title || "");

  const changeTitleInputHandler = (text) => {
    setEnteredTitle(text);
    addPlaceFormCtx.setTitle(text);
  };

  const savePlaceHandler = () => {
    const placeData = new Place(
      addPlaceFormCtx.title,
      addPlaceFormCtx.imageUri,
      addPlaceFormCtx.address,
      addPlaceFormCtx.location
    );

    if (!placeData.title || !placeData.imageUri || !placeData.location) {
      Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
      return;
    }

    addPlaceFormCtx.resetForm(); // 폼 초기화
    onCreatePlace(placeData);
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
