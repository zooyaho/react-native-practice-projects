import { View, TextInput, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";

/**
 * 시작 화면
 * - 맞추어야할 숫자를 입력받는 화면
 * - 숫자 입력 후 게임 시작 버튼을 누르면 게임 화면으로 이동
 */
const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState(""); // 숫자 입력 상태 관리

  const inputChangeHandler = (inputText) => {
    setEnteredNumber(inputText);
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // 유효하지 않은 숫자 처리
      Alert.alert(
        "⚠️ 유효하지 않는 숫자",
        "숫자를 1에서 99 사이로 입력해주세요.",
        [{ text: "확인", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    // 숫자 입력이 유효한 경우 게임 시작 로직 처리
    console.log("게임 시작:", chosenNumber);
    resetInputHandler(""); // 입력 필드 초기화
    onPickNumber(chosenNumber); // 부모 컴포넌트에 숫자 전달
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={enteredNumber}
        onChangeText={inputChangeHandler}
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        // autoCapitalize="none" // 자동 대문자 비활성화
        // autoComplete="off" // 자동 완성 비활성화
        // autoFocus={true} // 화면이 열리면 자동으로 포커스
        // autoCorrect={false} // 자동 교정 비활성화
        // placeholder="숫자를 입력하세요"
        // placeholderTextColor="#ddb52f" // 플레이스홀더 색상
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPressHandler={resetInputHandler}>
            Reset
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPressHandler={confirmInputHandler}>
            Confirm
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
    marginTop: 100,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#3b021f",
    elevation: 4, // Android shadow
    shadowColor: "black", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS 그림자 위치
    shadowOpacity: 0.25, // iOS 그림자 불투명도
    shadowRadius: 6, // iOS 그림자 번짐 정도
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default StartGameScreen;
