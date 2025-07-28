import { StyleSheet, Text, View } from "react-native";
import PlacesList from "../components/places/PlacesList";

/**
 * 사용자가 저장한 모든 장소를 보여주는 화면 컴포넌트
 * - 앱의 시작 화면
 */
function AllPlaces() {
  return (
    <View>
      <PlacesList places={null} />
    </View>
  );
}

export default AllPlaces;
