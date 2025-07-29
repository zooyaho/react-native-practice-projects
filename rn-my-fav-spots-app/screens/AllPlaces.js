import { StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/places/PlacesList";
import { useEffect, useState } from "react";

/**
 * 사용자가 저장한 모든 장소를 보여주는 화면 컴포넌트
 * - 앱의 시작 화면
 */
function AllPlaces({ route }) {
  const isFocused = useIsFocused(); // 현재 화면이 포커스 상태인지 확인
  const place = route.params?.place; // 전달된 장소 정보
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (isFocused && place) {
      console.log("새로운 장소가 추가되었습니다:", place);
      setPlaces((prevPlaces) => [...prevPlaces, place]);
    }
  }, [isFocused, place]);

  return (
    <>
      <PlacesList places={places} />
    </>
  );
}

export default AllPlaces;
