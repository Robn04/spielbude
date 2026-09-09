import { router } from "expo-router";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import Button from "../../components/button";
import ParticipantList from "../../components/participants";
import TitleBar from "../../components/titlebar";


export default function participantsMenu() {

    return (
        <ImageBackground
            source={require("../../../../assets/werwolf-background.png")}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <TitleBar title="Teilnehmer" image={false} />
                <View style={styles.participantContainer}>
                    <ParticipantList />
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
                        title="Rolle wählen"
                        onPress={() => { router.push("/games/werwolf/rolesMenu"); }}
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

    participantContainer: {
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

    nextButton: {

    },
});