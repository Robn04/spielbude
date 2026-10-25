import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import NavigationButtons from "../../components/navigationButtons";
import ParticipantList from "../../components/participants";
import TitleBar from "../../components/titlebar";
import WerwolfLayout from "./gameLayout";

export default function PlayerSelector() {
  return (
    <WerwolfLayout>
      <TitleBar title="Teilnehmer" image={false} />
      <View style={styles.participantContainer}>
        <ParticipantList />
      </View>

      <NavigationButtons
        nextTitle="Rolle wählen"
        onBack={() => router.back()}
        onNext={() => router.push("/games/werwolf/roleSelectorPage")}
      />
    </WerwolfLayout>
  );
}

const styles = StyleSheet.create({
  participantContainer: {
    flex: 1,
    height: "100%",
    padding: 24,
  },
});
