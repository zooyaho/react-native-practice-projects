import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";

import OutlinedButton from "../components/common/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceByIdDB } from "../utils/database";

/**
 * 장소의 상세 정보를 보여주는 화면 컴포넌트
 * - 장소의 이름, 위치, 설명 등을 표시
 */
const PlaceDetails = ({ route }) => {
  const navigation = useNavigation();
  const selectedPlaceId = route.params?.placeId;
  const [place, setPlace] = useState();

  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      latitude: place.location.lat,
      longitude: place.location.lng,
    });
  };

  useEffect(() => {
    const loadPlaceDetails = async () => {
      try {
        const detailsData = await fetchPlaceByIdDB(selectedPlaceId);
        setPlace(detailsData);
      } catch (error) {
        Alert.alert("오류", "장소 정보를 불러오는 데 실패했습니다.", [
          {
            text: "확인",
            style: "default",
            onPress: () => {
              navigation.navigate("AllPlaces");
            },
          },
        ]);
      }
    };

    loadPlaceDetails();
    navigation.setOptions({
      title: place ? place.title : "장소 상세 정보",
    });
  }, [selectedPlaceId]);

  if (!place) {
    return (
      <View style={styles.fallbackContainer}>
        <Text>장소 정보를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          지도에서 보기
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "35%",
    minHeight: 300,
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PlaceDetails;
