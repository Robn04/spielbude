import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Player, useGame } from "../../../context/gameContext";
import Button from "../../components/button";
import NavigationButtons from "../../components/navigationButtons";
import InfoPopup from "../../components/popup";
import StoryCard from "../../components/storyCard";
import TitleBar from "../../components/titlebar";
import WerwolfLayout from "./gameLayout";

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

export default function StoryPage() {
  const { players, setPlayers } = useGame();
  const [selectedVictimId, setSelectedVictimId] = useState<string | null>(null);
  const [selectedSeerPlayer, setSelectedSeerPlayer] = useState<Player | null>(
    null,
  );

  const [currentNight, setCurrentNight] = useState(1);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const availableRoles = new Set(players.map((player) => player.role));

  const activeStories = NIGHT_STEPS.filter(
    (step) => step.role === null || availableRoles.has(step.role),
  );
  const alivePlayers = players.filter((player) => player.alive);

  const currentStory = activeStories[currentStoryIndex];

  console.log(players);
  return (
    <WerwolfLayout>
      <TitleBar title="Spielverlauf" image={false} />

      <View style={styles.gameContainer}>
        <StoryCard
          title={`Nacht ${currentNight}: ${currentStory.title}`}
          description={currentStory.description}
        >
          {(currentStory.role === "Werwolf" ||
            currentStory.role === "Seherin") && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {players.map((player) => (
                <View key={player.id} style={{ width: "48%" }}>
                  <Button
                    title={player.name}
                    onPress={() => {
                      if (currentStory.role === "Seherin") {
                        setSelectedSeerPlayer(player);
                      } else if (currentStory.role === "Werwolf") {
                        setPlayers((currentPlayers) =>
                          currentPlayers.map((p) => ({
                            ...p,
                            alive:
                              p.id === player.id
                                ? false
                                : p.id === selectedVictimId
                                  ? true
                                  : p.alive,
                          })),
                        );

                        setSelectedVictimId(player.id);
                      }
                    }}
                    width="100%"
                    backgroundColor={
                      currentStory.role === "Werwolf" &&
                      selectedVictimId === player.id
                        ? "#ff196d"
                        : "white"
                    }
                    textColor={
                      currentStory.role === "Werwolf" &&
                      selectedVictimId === player.id
                        ? "white"
                        : "#ff196d"
                    }
                    borderWidth={2}
                    borderColor="white"
                  />
                </View>
              ))}
            </View>
          )}

          {currentStory.role === "Seherin" && (
            <InfoPopup
              text={`${selectedSeerPlayer?.role ?? "Abgeschlossen"}`}
              selected={false}
              visible={selectedSeerPlayer !== null}
              onClose={() => setSelectedSeerPlayer(null)}
              hideButton
            />
          )}
        </StoryCard>
      </View>

      <NavigationButtons
        nextTitle="Weiter"
        onBack={() => router.back()}
        middleTitle="Zurück"
        onMiddle={() => {
          if (currentStoryIndex > 0) {
            setCurrentStoryIndex((current) => current - 1);
          } else if (currentNight > 1) {
            setCurrentNight((current) => current - 1);
            setCurrentStoryIndex(activeStories.length - 1);
          }
        }}
        onNext={() => {
          if (currentStoryIndex < activeStories.length - 1) {
            setCurrentStoryIndex((current) => current + 1);
          } else {
            setCurrentNight((current) => current + 1);
            setCurrentStoryIndex(0);
          }
        }}
      />
    </WerwolfLayout>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
});
