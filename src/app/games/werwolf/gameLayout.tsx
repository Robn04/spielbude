import type { PropsWithChildren } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function WerwolfLayout({ children }: PropsWithChildren) {
  return (
    <ImageBackground
      source={require("../../../../assets/werwolf-background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>{children}</View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },

  content: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
