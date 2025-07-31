import { StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/places/PlacesList";
import { useEffect, useState } from "react";
import { fetchPlacesDB } from "../utils/database";

/**
 * 사용자가 저장한 모든 장소를 보여주는 화면 컴포넌트
 * - 앱의 시작 화면
 */
function AllPlaces() {
  const isFocused = useIsFocused(); // 현재 화면이 포커스 상태인지 확인
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const loadedPlaces = await fetchPlacesDB();
        setPlaces(loadedPlaces);
      } catch (error) {
        console.error("장소 로딩 실패:", error);
      }
    };
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return (
    <>
      <PlacesList places={places} />
    </>
  );
}

export default AllPlaces;
