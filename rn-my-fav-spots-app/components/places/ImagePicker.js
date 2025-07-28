import React, { useState } from "react";
import { StyleSheet, View, Button, Alert, Image, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../common/OutlinedButton";

/**
 * 이미지 선택 기능을 제공하는 컴포넌트
 * - 카메라 권한 요청 및 확인
 * - 카메라를 통해 사진 촬영 기능 제공
 * - 찍은 이미지 미리보기로 표시
 */
const ImagePicker = () => {
  const [selectedImageUri, setSelectedImageUri] = useState(""); // 선택된 이미지의 정보객체를 저장할 상태 변수
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      // 앱이 권한 요청을 한 적이 없거나, 사용자 반응을 받지 않은 초기 상태
      const permissionResponse = await requestCameraPermission(); // 권한 요청
      return permissionResponse.granted; // 권한이 허용되었는지 여부 반환, 허용: true/거부: false
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      // 사용자가 권한을 거부한 경우
      // 권한 상의 이유로 이미지를 찍는 기능이 차단되어 앱을 계속할 수 없다는 경고창 활성화
      Alert.alert(
        "권한 거부!",
        "이 앱을 사용하려면 카메라 접근 권한이 필요합니다."
      );
      return false; // 권한이 거부된 경우 false 반환
    }

    return true; // 권한이 이미 허용된 경우 true 반환
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions(); // 권한 확인 함수 호출

    if (!hasPermission) {
      // 권한이 허용되지 않은 경우 함수 종료
      return;
    }

    const image = await launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log("📸이미지 정보: ", image);
    setSelectedImageUri(image.assets[0].uri);
  };

  let imagePreview = <Text>이미지를 선택해주세요!</Text>;
  if (selectedImageUri) {
    imagePreview = (
      <Image source={{ uri: selectedImageUri }} style={styles.image} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        사진 찍기
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});

export default ImagePicker;
