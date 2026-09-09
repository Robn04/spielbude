import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import { Player } from "../../context/gameContext";

type FoldableCardProps = {
    player: Player;
};

export default function FoldableCard({ player }: FoldableCardProps) {

    const swipeX = useSharedValue(0);

    const swipeGesture = Gesture.Pan()
        .onUpdate((event) => {
            swipeX.value = event.translationX;
        })
        .onEnd(() => {
            swipeX.value = withTiming(0);
        });

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotation = interpolate(
            swipeX.value,
            [-200, 200],
            [-180, 180]
        );

        return {
            transform: [
                { perspective: 1500 },
                { rotateY: `${rotation}deg` },
            ],
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotation = interpolate(
            swipeX.value,
            [-200, 200],
            [0, 360]
        );

        return {
            transform: [
                { perspective: 1500 },
                { rotateY: `${rotation}deg` },
            ],
        };
    });

    return (
        <GestureDetector gesture={swipeGesture}>
            <View style={styles.cardContainer}>

                {/* Vorderseite */}
                <Animated.View
                    style={[
                        styles.card,
                        styles.front,
                        frontAnimatedStyle,
                    ]}
                >
                    <Text style={styles.name}>
                        {player.name}
                    </Text>

                    <Text>
                        Wische zum Aufdecken
                    </Text>
                </Animated.View>

                {/* Rückseite */}
                <Animated.View
                    style={[
                        styles.card,
                        styles.back,
                        backAnimatedStyle,
                    ]}
                >

                    <Text style={styles.role}>
                        {player.role}
                    </Text>
                </Animated.View>

            </View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    card: {
        position: "absolute",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backfaceVisibility: "hidden",

        width: "85%",
        height: 180,

        borderRightWidth: 4,
        borderBottomWidth: 5,
        borderBottomColor: "#adadad",
        borderRightColor: "#adadad"
    },

    front: {
        backgroundColor: "#ffffff",
    },

    back: {
        backgroundColor: "#cdcdcd",
    },

    name: {
        fontSize: 24,
        fontWeight: "bold",
    },

    role: {
        fontSize: 24,
    },
});