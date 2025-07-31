import { useState, useLayoutEffect, useCallback, useContext } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/common/IconButton";
import { AddPlaceFormContext } from "../store/add-place-form-context";
import { getAddress } from "../utils/location";

/**
 * 지도를 전체화면으로 표시하는 화면 컴포넌트
 * - 지도상에서 장소를 선택하는 등의 기능 제공
 */
const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.latitude,
    lng: route.params.longitude,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const addPlaceFormCtx = useContext(AddPlaceFormContext);

  const initialRegion = {
    latitude: initialLocation?.lat || 37.498095,
    longitude: initialLocation?.lng || 127.02761,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }; // 초기 위치 설정 (예: 서울 강남구)

  const selectLocationHandler = (event) => {
    if (initialLocation) return; // 초기 위치가 설정되어 있으면 선택 불가

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    // console.log("선택된 위치:", { lat, lng });

    setSelectedLocation({ lat, lng });
  };

  const saveSelectedLocationHandler = useCallback(async () => {
    if (!selectedLocation) {
      Alert.alert("선택된 위치 없음", "위치를 선택해주세요.");
      return;
    }
    const address = await getAddress(selectedLocation); // 주소 가져오기
    if (!address) {
      Alert.alert("주소 가져오기 실패", "위치의 주소를 가져올 수 없습니다.");
      return;
    }

    addPlaceFormCtx.setLocation(selectedLocation);
    addPlaceFormCtx.setAddress(address);
    navigation.navigate("AddPlace");
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={saveSelectedLocationHandler}
        />
      ),
    });
  }, [navigation, saveSelectedLocationHandler, initialLocation]);

  return (
    <MapView
      initialRegion={initialRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
          title="선택된 위치"
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
