import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useGame } from "../../../context/gameContext";
import FoldableCard from "../../components/foldableCards";
import NavigationButtons from "../../components/navigationButtons";
import TitleBar from "../../components/titlebar";
import WerwolfLayout from "./gameLayout";

export default function RoleRandomizer() {
  const { players } = useGame();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = players[currentPlayerIndex];
  const isLastPlayer = currentPlayerIndex === players.length - 1;

  return (
    <WerwolfLayout>
      <TitleBar title="Rollenvergabe" image={false} />
      <View style={styles.roleCardContainer}>
        <FoldableCard player={currentPlayer} />
      </View>

      <NavigationButtons
        nextTitle="Nächster"
        onBack={() => router.back()}
        middleTitle="Vorheriger"
        onMiddle={() => {
          if (currentPlayerIndex === 0) {
            return;
          }

          setCurrentPlayerIndex((current) => current - 1);
        }}
        onNext={() => {
          if (isLastPlayer) {
            router.push("/games/werwolf/storyPage");
            return;
          }

          setCurrentPlayerIndex((current) => current + 1);
        }}
      />
    </WerwolfLayout>
  );
}

const styles = StyleSheet.create({
  roleCardContainer: {
    flex: 1,
    padding: 24,
  },
});
