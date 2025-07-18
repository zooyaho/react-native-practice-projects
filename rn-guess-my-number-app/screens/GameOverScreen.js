import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

/**
 * 게임 종료 화면
 * - 게임이 끝난 후 보여지는 화면
 * - 게임 결과를 보여주고, 다시 시작할 수 있는 버튼 제공
 */
const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions(); // 화면 너비 가져오기

  let imageSize = 300; // 기본 이미지 크기

  if (deviceWidth < 380) {
    imageSize = 150; // 화면 너비가 380px 이하인 경우 이미지
  }

  if (deviceHeight < 400) {
    imageSize = 80; // 화면 높이가 400px 이하인 경우 이미지 크기
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2, // 원형 이미지
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>Game Over!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{roundsNumber} rounds</Text> to guess
          the number <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPressHandler={onStartNewGame}>
          Start New Game
        </PrimaryButton>
      </View>
    </ScrollView>
  );
};

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    margin: 36,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    color: Colors.primary500,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
