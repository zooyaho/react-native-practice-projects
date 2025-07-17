import { View, Text } from "react-native";

/**
 * 게임 화면
 * - 사용자가 입력한 숫자를 맞추는 게임 화면
 * - 핸드폰이 추측한 숫자를 확인
 * - 핸드폰이 추측한 숫자가 정답보다 높은지 낮은지 힌트를 제공
 */
const GameScreen = ({ userNumber }) => {
  return <Text>{userNumber}</Text>;
};

export default GameScreen;
