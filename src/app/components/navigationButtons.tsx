import { Image, StyleSheet, View } from "react-native";
import Button from "./button";

type NavigationProps = {
  nextTitle: string;
  onNext: () => void;
  onBack: () => void;
  onMiddle?: () => void;
  middleTitle?: string;
  middleSelected?: boolean;
};

export default function NavigationButtons({
  nextTitle,
  onNext,
  onBack,
  onMiddle,
  middleTitle,
  middleSelected,
}: NavigationProps) {
  return (
    <View style={styles.container}>
      <Button
        icon={
          <Image
            source={require("../../../assets/zuruck-pfeil.png")}
            style={styles.backIcon}
          />
        }
        onPress={onBack}
        width={50}
        borderRadius={25}
      />

      {middleTitle && (
        <Button
          title={middleTitle}
          onPress={() => onMiddle?.()}
          width={110}
          textColor={middleSelected ? "#ff196d" : "white"}
          backgroundColor={middleSelected ? "white" : "#ff196d"}
        />
      )}

      <Button
        title={nextTitle}
        onPress={onNext}
        width={130}
        textColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 101,
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 26,
  },

  backIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
});
