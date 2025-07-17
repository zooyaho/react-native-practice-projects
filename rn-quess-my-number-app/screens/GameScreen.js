import { View, Text, StyleSheet } from "react-native";

import Title from "../components/Title";

/**
 * 게임 화면
 * - 사용자가 입력한 숫자를 맞추는 게임 화면
 * - 핸드폰이 추측한 숫자를 확인
 * - 핸드폰이 추측한 숫자가 정답보다 높은지 낮은지 힌트를 제공
 */

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const GameScreen = ({ userNumber }) => {
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {/* Guess */}
      <View>
        <Text>Higher or Lower?</Text>
        {/* - Button */}
        {/* + Button */}
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
