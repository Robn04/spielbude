import { router } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { useGame } from "../../../context/gameContext";
import Button from "../../components/button";
import Card from "../../components/card";
import Sidebar from "../../components/sidebar";
import TitleBar from "../../components/titlebar";


export default function rolesMenu() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const { players, setPlayers } = useGame();

    const maxRoles = players.length;

    const changeRoleCount = (role: string, amount: number) => {
        setSelectedRoles(current => {
            const count = current.filter(r => r === role).length;

            // Eine Rolle hinzufügen
            if (amount > 0) {
                if (current.length >= maxRoles) {
                    return current;
                }

                return [...current, role];
            }

            // Eine Rolle entfernen
            if (amount < 0 && count > 0) {
                const index = current.indexOf(role);

                return current.filter((_, i) => i !== index);
            }

            return current;
        });
    };

    const toggleRole = (role: string) => {
        setSelectedRoles(current => {
            if (current.includes(role)) {
                return current.filter(r => r !== role);
            }

            if (current.length >= maxRoles) {
                return current;
            }

            return [...current, role];
        });
    };

    const shuffle = <T,>(array: T[]) => {
        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    };


    return (
        <ImageBackground
            source={require("../../../../assets/werwolf-background.png")}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlayContainer}>
                <TitleBar title="Rollenwahl" image={false} />
                <Sidebar
                    visible={sidebarVisible}
                    title="Verteilung"
                    selectedRoles={selectedRoles}
                    counter={true}
                    onChangeRoleCount={changeRoleCount}
                />
                <View style={styles.scrollViewContainer}>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContentContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <Card
                            title="Werwolf"
                            description={`Die Werwölfe sind finstere Gestalten, die nachts im Düsterwald umgehen. Sie lauern auf Beute und fressen harmlose Dorfbewohner. Tagsüber sind sie normale Menschen und müssen sich vor den anderen Bürgern verstecken, um nicht gelyncht zu werden. Sie gewinnen nur mit den Werwölfen und dürfen gemeinsam in jeder Nacht einen Dorfbewohner fressen. Sie dürfen sich nicht gegenseitig fressen und bei Unstimmigkeiten fällt das Fressen aus.`}
                            width="48%"
                            height={130}
                            image={{
                                source: require("../../../../assets/wolf.png"),
                                imageHeight: 60,
                                imageWidth: 60,
                            }
                            }
                            text={{
                                fontSize: 14
                            }}
                            onPress={() => toggleRole("Werwolf")}
                            selected={selectedRoles.includes("Werwolf")}

                        />
                        <Card
                            title="Dorfbewohner"
                            description={`Der Dorfbewohner ist ein ganz normaler Mensch ohne jegliche Fähigkeiten. Niemand achtet sonderlich auf sie, weswegen sie viel grübeln. Dieses Grübeln kann oft aber Werwölfe an den Galgen bringen. Er gewinnt mit dem Dorf und hat keine andere Waffe als seinen Verstand.`}
                            width="48%"
                            height={130}
                            image={{
                                source: require("../../../../assets/farmer.png"),
                                imageHeight: 60,
                                imageWidth: 60,
                            }
                            }
                            text={{
                                fontSize: 14
                            }}
                            onPress={() => toggleRole("Dorfbewohner")}
                            selected={selectedRoles.includes("Dorfbewohner")}

                        />
                        <Card
                            title="Seherin"
                            description={`Die Seherin schaut jede Nacht in ihre treue Kristallkugel. Darin erkennt sie Dinge, die anderen Dorfbewohnern verborgen bleiben. Des Nachts verrät die Kugel ihr zuverlässig die Identität eines Dorfbewohners. Sie gewinnt mit dem Dorf und darf jede Nacht beim Spielleiter die Rolle eines Mitspielers erfragen.`}
                            width="48%"
                            height={130}
                            image={{
                                source: require("../../../../assets/hellsehen.png"),
                                imageHeight: 60,
                                imageWidth: 60,
                            }
                            }
                            text={{
                                fontSize: 14
                            }}
                            onPress={() => toggleRole("Seherin")}
                            selected={selectedRoles.includes("Seherin")}

                        />
                        <Card
                            title="Hexe"
                            description={`Die Hexe wird vom gesamten Dorf verehrt und gefürchtet. Niemand möchte es sich mit ihr verscherzen, da sie mächtige Zaubertränke brauen kann. Sie gewinnt mit dem Dorf und kann einmal im Spiel das Werwolfsopfer heilen, sowie einen Spieler vergiften. Solange sie ihren Heiltrank noch hat, wird ihr das Opfer nachts verraten. Ihr wird aber auch verraten wer das Opfer ist, wenn sie sterben würde und ihren Gifttrank noch hat.`}
                            width="48%"
                            height={130}
                            image={{
                                source: require("../../../../assets/hexen-hut.png"),
                                imageHeight: 60,
                                imageWidth: 60,
                            }
                            }
                            text={{
                                fontSize: 14
                            }}
                            onPress={() => toggleRole("Hexe")}
                            selected={selectedRoles.includes("Hexe")}

                        />
                        <Card
                            title="Jäger"
                            description={`Der Jäger trägt ständig ein großes Gewehr mit sich herum. Die Dorfbewohner wissen nicht so recht, was er will, denn er geht eigentlich nie wirklich im Wald jagen. Er gewinnt mit dem Dorf und kann bei seinem Tod einen beliebigen Spieler erschießen.`}
                            width="48%"
                            height={130}
                            image={{
                                source: require("../../../../assets/jager.png"),
                                imageHeight: 60,
                                imageWidth: 60,
                            }
                            }
                            text={{
                                fontSize: 14
                            }}
                            onPress={() => toggleRole("Jäger")}
                            selected={selectedRoles.includes("Jäger")}

                        />
                        <Card
                            title="Amor"
                            description={`Der Amor sorgt für die Liebe im Düsterwald. Er schießt seine Herzpfeile auf zwei Spieler, die sich sofort unsterblich ineinander verlieben und einander in den Tod folgen würden. Er gewinnt mit dem Dorf und darf sich auch selbst verlieben. Das Liebespaar bildet eine eigene Partei, außer sie gehören beide derselben Partei an. Sonst gewinnt es auch nur allein. Stirbt ein Verliebter, stirbt auch der andere. Die Verliebten dürfen sich in allen Belangen absprechen.`}
                            width="48%"
                            height={130}
                            image={{
                                source: require("../../../../assets/amor.png"),
                                imageHeight: 60,
                                imageWidth: 60,
                            }
                            }
                            text={{
                                fontSize: 14
                            }}
                            onPress={() => toggleRole("Amor")}
                            selected={selectedRoles.includes("Amor")}

                        />
                    </ScrollView>
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
                        title="Anzahl"
                        onPress={() => setSidebarVisible(current => !current)}
                        style={{
                            ...styles.openRolesButton,
                            ...(sidebarVisible ? styles.selected : {})
                        }}
                        textColor={sidebarVisible ? "#ff196d" : "white"}
                        width={90}
                    />

                    <Button
                        title="Rollen zeigen"
                        onPress={() => {
                            if ((selectedRoles.length !== maxRoles) || (selectedRoles.length === 0)) {
                                return;
                            }

                            const shuffledRoles = shuffle(selectedRoles);

                            const playersWithRoles = players.map((player, index) => ({
                                ...player,
                                role: shuffledRoles[index],
                            }));

                            setPlayers(playersWithRoles);

                            router.push("/games/werwolf/givenRolesMenu");
                        }}
                        style={styles.nextButton}
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

    overlayContainer: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "rgba(0, 0, 0, 0.6)",

    },

    roleCounter: {},

    scrollViewContainer: {
        padding: 20,
        paddingBottom: 0,
        height: "75%",

    },

    scrollViewContentContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",

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

    openRolesButton: {
        width: 90,
    },
    selected: {
        backgroundColor: "white"
    },

    nextButton: {

    },


});