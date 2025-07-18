import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useEffect, useMemo } from "react";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

/**
 * 게임 화면
 * - 사용자가 입력한 숫자를 맞추는 게임 화면
 * - 핸드폰이 추측한 숫자를 확인
 * - 핸드폰이 추측한 숫자가 정답보다 높은지 낮은지 힌트를 제공
 */

/**
 * 랜덤 숫자 생성 함수
 * - min: 최소값
 * - max: 최대값
 * - exclude: 제외할 숫자 (이미 추측한 숫자)
 * - 반환값: min과 max 사이의 랜덤 숫자 (exclude 제외)
 */
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let maxBoundary = 100;
let minBoundary = 1;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = useMemo(
    () => generateRandomBetween(minBoundary, maxBoundary, userNumber),
    [userNumber]
  ); // 초기 추측 숫자 생성
  const [currentGuess, setCurrentGuess] = useState(initialGuess); // 현재 핸드폰이 추측한 숫자 상태 관리

  /**
   * 다음 추측 숫자 생성 함수
   * - direction: 'lower' 또는 'higher'
   * - 현재 추측 숫자(currentGuess)와 유저가 입력한 숫자(userNumber)를 비교하여
   *   - 'lower'인 경우: 현재 추측 숫자보다 낮은 범위로 설정
   *   - 'higher'인 경우: 현재 추측 숫자보다 높은 범위로 설정
   * - 잘못된 힌트인 경우 알림 표시
   * - 새로운 추측 숫자를 생성하여 상태 업데이트
   */
  const nextGuessHandler = (direction) => {
    // direction: 'lower' 또는 'higher'

    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      // 잘못된 힌트 처리
      Alert.alert("잘못된 힌트", "올바른 방향으로 힌트를 주세요.", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    // 힌트에 따라 범위 조정
    if (direction === "lower") {
      maxBoundary = currentGuess - 1; // 현재 추측 숫자보다 낮은 범위로 설정
    } else if (direction === "higher") {
      minBoundary = currentGuess + 1; // 현재 추측 숫자보다 높은 범위로 설정
    }

    // 새로운 추측 숫자 생성
    const newGuessNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newGuessNumber);
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(); // 게임 종료 처리
    }
  }, [currentGuess, userNumber, onGameOver]);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPressHandler={() => nextGuessHandler("lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPressHandler={() => nextGuessHandler("higher")}>
            +
          </PrimaryButton>
        </View>
      </View>
      <View>
        <Text>Log Rounds</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});

export default GameScreen;
