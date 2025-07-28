import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Image, Text } from "react-native";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import OutlinedButton from "../common/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getMapPreview } from "../../utils/location";

const LocationPicker = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused(); // 현재 화면이 포커스 상태인지 확인

  const [selectedLocation, setSelectedLocation] = useState(); // {lat: number, lng: number}
  const [locationPermission, requestLocationPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      // 앱이 권한 요청을 한 적이 없거나, 사용자 반응을 받지 않은 초기 상태
      const permissionResponse = await requestLocationPermission(); // 권한 요청

      return permissionResponse.granted; // 권한이 허용되었는지 여부 반환, 허용: true/거부: false
    }
    if (locationPermission.status === PermissionStatus.DENIED) {
      // 사용자가 권한을 거부한 경우
      Alert.alert(
        "권한 거부!",
        "이 앱을 사용하려면 위치 접근 권한이 필요합니다."
      );
      return false; // 권한이 거부된 경우 false 반환
    }

    return true; // 권한이 이미 허용된 경우 true 반환
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions(); // 권한 확인 함수 호출

    if (!hasPermission) {
      // 권한이 허용되지 않은 경우 함수 종료
      return;
    }

    const location = await getCurrentPositionAsync();
    // console.log("📍현재 위치 정보: ", location);
    setSelectedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickLocationHandler = () => {
    navigation.navigate("Map", {
      initialLocation: selectedLocation,
      onPickLocation: setSelectedLocation,
    });
  };

  useEffect(() => {
    const initialLocation = route.params?.pickedLocation; // 초기 위치가 있다면 가져오기

    if (isFocused && initialLocation) {
      // 화면이 포커스 상태이고 초기 위치가 있다면 선택된 위치로 설정
      setSelectedLocation(initialLocation);
    }
  }, [route.params?.pickedLocation, isFocused]);

  let locationPreview = <Text>위치를 선택해주세요!</Text>;
  if (selectedLocation) {
    locationPreview = (
      <Image
        source={{ uri: getMapPreview(selectedLocation) }}
        style={styles.mapImage}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {/* 위치 미리보기(지도 미리보기) */}
        {locationPreview}
      </View>
      <View style={styles.actions}>
        {/* 위치 찾기 버튼 */}
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          위치 찾기
        </OutlinedButton>
        {/* 위치 선택 버튼 > 새화면에 지도를 띄어 위치 선택 */}
        <OutlinedButton icon="map" onPress={pickLocationHandler}>
          위치 선택
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
    // borderRadius: 4,
  },
});

export default LocationPicker;
