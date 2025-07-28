import { useState, useLayoutEffect, useCallback } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/common/IconButton";

/**
 * 지도를 전체화면으로 표시하는 화면 컴포넌트
 * - 지도상에서 장소를 선택하는 등의 기능 제공
 */
const Map = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const initialRegion = {
    latitude: 37.498095,
    longitude: 127.02761,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }; // 초기 위치 설정 (예: 서울 강남구)

  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    // console.log("선택된 위치:", { lat, lng });

    setSelectedLocation({ lat, lng });
  };

  const saveSelectedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("선택된 위치 없음", "위치를 선택해주세요.");
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLocation: selectedLocation, // { lat, lng }
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
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
  }, [navigation, selectedLocation]);

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
          // description={`위도: ${selectedLocation.lat}, 경도: ${selectedLocation.lng}`}
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
