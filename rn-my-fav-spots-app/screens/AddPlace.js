import PlaceForm from "../components/places/PlaceForm";
import { insertPlaceDB } from "../utils/database";
import { Alert } from "react-native";

/**
 * 새로운 장소를 추가하는 화면 컴포넌트
 * - 장소의 이름, 위치 등을 입력받아 저장하는 기능 제공
 */
const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (placeData) => {
    try {
      await insertPlaceDB(placeData);
      navigation.navigate("AllPlaces", { place: placeData });
    } catch (error) {
      console.error("장소 삽입 실패:", error);
      Alert.alert("장소 저장 실패", "장소를 저장하는데 실패했습니다.");
      return;
    }
  };
  return (
    <>
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </>
  );
};

export default AddPlace;
