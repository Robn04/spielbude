import { Image, StyleSheet, Text, View } from "react-native";

type TitleBarProps = {
  title: string;
  image?: boolean;
};

export default function TitleBar({ title, image }: TitleBarProps) {
  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={require("../../../assets/party-pfeife-rund.png")}
          style={styles.image}
        />
      )}
      <Text style={[styles.title, !image && styles.titlewithoutImage]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#101010",

    flexDirection: "row",
    alignItems: "center",

    boxShadow: "0px 1px 5px rgba(255, 255, 255, 0.5)",

    zIndex: 102,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 10,
  },

  image: {
    width: 50,
    height: 50,
  },

  titlewithoutImage: {
    textAlign: "center",
    flex: 1,
    marginLeft: 0,
  },
});
