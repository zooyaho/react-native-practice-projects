import { StyleSheet, Text, View } from "react-native";
import PlaceForm from "../components/places/PlaceForm";

/**
 * 새로운 장소를 추가하는 화면 컴포넌트
 * - 장소의 이름, 위치 등을 입력받아 저장하는 기능 제공
 */
const AddPlace = () => {
  return (
    <View>
      <Text>AddPlace</Text>
      <PlaceForm />
    </View>
  );
};

export default AddPlace;
