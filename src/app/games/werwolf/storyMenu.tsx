import StoryCard from "@/app/components/storyCard";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { useGame } from "../../../context/gameContext";
import Button from "../../components/button";
import TitleBar from "../../components/titlebar";

const { width, height } = Dimensions.get("window");

type StoryStep = {
  role: string | null;
  title: string;
  description: string;
};

const NIGHT_STEPS: StoryStep[] = [
  {
    role: null,
    title: "Alle gehen schlafen",
    description: "Das Dorf wird ruhig. Alle Spieler schließen die Augen.",
  },
  {
    role: "Dorfmatratze",
    title: "Die Dorfmatratze erwacht",
    description: "Die Dorfmatratze führt ihre Nachtaktion aus.",
  },
  {
    role: "Werwolf",
    title: "Die Werwölfe erwachen",
    description: "Die Werwölfe wählen gemeinsam ein Opfer.",
  },
  {
    role: "Seherin",
    title: "Die Seherin erwacht",
    description: "Die Seherin darf die Rolle eines Spielers überprüfen.",
  },
  {
    role: "Hexe",
    title: "Die Hexe erwacht",
    description: "Die Hexe entscheidet, ob sie heilt oder jemanden vergiftet.",
  },
  {
    role: null,
    title: "Alle wachen auf",
    description: "Das Dorf erfährt, was in der Nacht passiert ist.",
  },
];

export default function storyMenu() {
  const { players, setPlayers } = useGame();

  const [currentNight, setCurrentNight] = useState(1);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const availableRoles = new Set(players.map((player) => player.role));

  const activeStories = NIGHT_STEPS.filter(
    (step) => step.role === null || availableRoles.has(step.role),
  );
  const alivePlayers = players.filter((player) => player.alive);

  const currentStory = activeStories[currentStoryIndex];

  console.log("Aktueller Schritt:", currentStory);
  console.log("Lebende Spieler:", alivePlayers);

  return (
    <ImageBackground
      source={require("../../../../assets/werwolf-background.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <TitleBar title="Spielverlauf" image={false} />

        <View style={styles.gameContainer}>
          <StoryCard
            title={`Nacht ${currentNight}: ${currentStory.title}`}
            description={currentStory.description}
          >
            {currentStory.role === "Werwolf" && (
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {alivePlayers.map((player) => (
                  <View key={player.id} style={{ width: "48%" }}>
                    <Button
                      title={player.name}
                      onPress={() => {}}
                      width="100%"
                      backgroundColor="white"
                      textColor="#ff196d"
                    />
                  </View>
                ))}
              </View>
            )}
          </StoryCard>
        </View>

        <View style={styles.coordinateButtonsContainer}>
          <Button
            icon={
              <Image
                source={require("../../../../assets/zuruck-pfeil.png")}
                style={{ width: 24, height: 24, tintColor: "white" }}
              />
            }
            onPress={() => router.back()}
            width={50}
            borderRadius={25}
            style={styles.backButton}
          />

          <Button
            title="Zurück"
            onPress={() => {
              if (currentStoryIndex > 0) {
                setCurrentStoryIndex((current) => current - 1);
              } else if (currentNight > 1) {
                setCurrentNight((current) => current - 1);
                setCurrentStoryIndex(activeStories.length - 1);
              }
            }}
            style={styles.beforeButton}
            textColor="white"
            width={150}
          />

          <Button
            title="Weiter"
            onPress={() => {
              if (currentStoryIndex < activeStories.length - 1) {
                setCurrentStoryIndex((current) => current + 1);
              } else {
                setCurrentNight((current) => current + 1);
                setCurrentStoryIndex(0);
              }
            }}
            style={styles.nextButton}
            textColor="white"
            width={150}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },

  gameContainer: {
    flex: 1,
    height: "75%",
    padding: 20,
    justifyContent: "center",
  },

  coordinateButtonsContainer: {
    zIndex: 101,

    height: "20%",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    padding: 26,
  },

  backButton: {},

  beforeButton: {
    width: 120,
  },

  nextButton: {
    width: 120,
  },
});
