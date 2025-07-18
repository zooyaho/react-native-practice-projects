import { use, useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./constants/colors";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState(null); // 유저가 입력한 숫자 상태 관리
  const [isGameOver, setIsGameOver] = useState(true); // 게임 종료 상태 관리
  const [guessRoundsCount, setGuessRoundsCount] = useState(0); // 추측 라운드 수 관리

  const [isFontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  }); // 커스텀 폰트 로드

  if (!isFontsLoaded) {
    return <AppLoading />; // 폰트가 로드될 때까지 대기
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber); // 유저가 입력한 숫자를 상태에 저장
    setIsGameOver(false); // 게임 시작 상태로 변경
  };

  /**
   * 게임 종료 핸들러
   * - 추측 라운드 수를 상태에 저장
   * - 게임 종료 상태로 변경
   */
  const gameOverHandler = (numberOfRounds) => {
    setGuessRoundsCount(numberOfRounds); // 추측 라운드 수 업데이트
    setIsGameOver(true); // 게임 종료 상태 업데이트
  };

  const startNewGameHandler = () => {
    setUserNumber(null); // 유저 숫자 초기화
    setGuessRoundsCount(0); // 추측 라운드 수 초기화
    setIsGameOver(true); // 게임 종료 상태로 변경
  };

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRoundsCount}
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={{ opacity: 0.15 }} // 이미지 투명도 조정
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
