import { Asset } from "expo-asset";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GameProvider } from "../context/gameContext";

const werwolfBackground = require("../../assets/werwolf-background.png")


export default function RootLayout() {
  useEffect(() => {
    Asset.loadAsync([werwolfBackground]);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <Stack screenOptions={{
          headerShown: false,
        }} />
      </GameProvider>
    </GestureHandlerRootView>
  );
}
