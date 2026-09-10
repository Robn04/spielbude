import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import Card from "./components/card";
import TitleBar from "./components/titlebar";

export default function Index() {

  return (
    <View style={styles.container}>
      <TitleBar title="Spielbuden" image={true} />
      <View style={styles.contentContainer}>
        <Card
          title="Werwolf"
          image={{
            source: require("../../assets/wolf.png")
          }}
          onPress={() => { router.push("/games/werwolf/participantsMenu"); }}
          text={{
            textAlign: "center",
            fontWeight: "bold",
          }}
          activeOpacity={0.8}


        />
        <Card
          title="Wahrheit oder Pflicht"
          image={{
            source: require("../../assets/gleichgewicht.png")
          }}
          onPress={() => { console.log("Wahrheit oder Pflicht geöffnet"); }}
          text={{
            textAlign: "center",
            fontWeight: "bold",
          }}
          activeOpacity={0.8}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#1d1d1d",
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    padding: 16

  }
});
