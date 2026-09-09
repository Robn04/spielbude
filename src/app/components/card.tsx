import { DimensionValue, Image, StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native";
import InfoPopup from "../components/popup";

type PartyCardProps = {
    title: string;
    description?: string;

    image?: {
        source: any;
        imageWidth?: DimensionValue;
        imageHeight?: DimensionValue;
    };

    text?: {
        fontSize?: number;
        textAlign?: TextStyle["textAlign"];
        fontWeight?: TextStyle["fontWeight"];
    };

    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    backgroundColor?: string,
    activeOpacity?: number,

    onPress?: () => void;
    onLongPress?: () => void;
    selected?: boolean;
};

export default function Card({
    title,
    description,
    image,
    text,
    activeOpacity = 1,
    width = "85%",
    height = 180,
    borderRadius = 20,
    backgroundColor = "#ff196d",
    onPress,
    onLongPress,
    selected = false,
}: PartyCardProps) {

    const {
        source,
        imageHeight = 110,
        imageWidth = 110,
    } = image ?? {};

    return (
        <TouchableOpacity
            style={[styles.container, { width, height, borderRadius, backgroundColor }, selected && styles.selected]}
            onLongPress={onLongPress}
            onPress={onPress}
            activeOpacity={activeOpacity}
        >
            <Image source={source} style={[styles.image, { height: imageHeight, width: imageWidth }]} />
            <View style={styles.titleInfoLine}>
                <Text style={[styles.title, text, selected && styles.selected]}>{title}</Text>
                {description && (
                    <InfoPopup
                        text={description}
                        selected={selected}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        marginBottom: 12,

        borderRightWidth: 4,
        borderBottomWidth: 5,
        borderRightColor: "#cd0045",
        borderBottomColor: "#cd0045",
    },

    selected: {
        backgroundColor: "white",
        color: "black"
    },

    image: {
        marginTop: 8,
        resizeMode: "contain",
        alignSelf: "center"
    },

    title: {
        flex: 1,
        marginLeft: 8,
        color: "#fcfcfc",
    },

    titleInfoLine: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    }
});

