import { router } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { useGame } from "../../../context/gameContext";
import Button from "../../components/button";
import FoldableCard from "../../components/foldableCards";
import TitleBar from "../../components/titlebar";

export default function givenRolesMenu() {
    const { players } = useGame();
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const currentPlayer = players[currentPlayerIndex];
    const isLastPlayer = currentPlayerIndex === players.length - 1;

    return (
        <ImageBackground
            source={require("../../../../assets/werwolf-background.png")}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <TitleBar title="Rollenvergabe" image={false} />
                <View style={styles.roleCardContainer}>

                    <FoldableCard
                        player={currentPlayer}
                    />

                </View>

                <View style={styles.coordinateButtonsContainer}>
                    <Button
                        icon={
                            <Image
                                source={require("../../../../assets/zuruck-pfeil.png")}
                                style={{ width: 24, height: 24, tintColor: "white" }}
                            />}
                        onPress={() => (router.back())}
                        width={50}

                        borderRadius={25}
                        style={styles.backButton}
                    />

                    <Button
                        title="Vorheriger"
                        onPress={() => {
                            if (currentPlayerIndex === 0) {
                                return;
                            }

                            setCurrentPlayerIndex(current => current - 1);
                        }}
                        style={styles.beforeButton}
                        textColor="white"
                        width={150}
                    />

                    <Button
                        title={isLastPlayer ? "Spiel starten" : "Nächster"}
                        onPress={() => {
                            if (isLastPlayer) {
                                router.push("/games/werwolf/storyMenu");
                            }

                            setCurrentPlayerIndex(current => current + 1);
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

    },

    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "rgba(0, 0, 0, 0.6)",

    },

    roleCardContainer: {
        height: "75%",
        padding: 20,

    },


    coordinateButtonsContainer: {
        zIndex: 101,

        height: "20%",

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",

        padding: 26
    },

    backButton: {

    },

    beforeButton: {
        width: 120,
    },

    nextButton: {
        width: 120
    },
});