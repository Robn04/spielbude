import { useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text
} from "react-native";

type InfoPopupProps = {
    text: string;
    selected: boolean;
};

export default function InfoPopup({
    text,
    selected,
}: InfoPopupProps) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Pressable
                style={[
                    styles.infoButton,
                    selected && styles.infoButtonSelected,
                ]}
                onPress={() => setVisible(true)}
            >
                <Text
                    style={[
                        styles.infoText,
                        selected && styles.infoTextSelected,
                    ]}
                >
                    i
                </Text>
            </Pressable>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <Pressable style={styles.popup}>

                        {/* Schließen */}
                        <Pressable
                            style={styles.closeButton}
                            onPress={() => setVisible(false)}
                            hitSlop={10}
                        >
                            <Text style={styles.closeText}>×</Text>
                        </Pressable>

                        <Text style={styles.popupText}>
                            {text}
                        </Text>

                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    infoButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },

    infoText: {
        color: "#ffffff",
        fontSize: 17,
        fontWeight: "700",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        alignItems: "center",
        justifyContent: "center",
    },

    popup: {
        width: "80%",
        maxWidth: 350,
        padding: 20,
        paddingRight: 40,
        borderRadius: 12,
        backgroundColor: "#ffffff",

        borderWidth: 1,
        borderColor: "#e5e5e5",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,

        elevation: 5,
    },

    closeButton: {
        position: "absolute",
        top: 8,
        right: 12,
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },

    closeText: {
        fontSize: 32,
        fontWeight: "300",
        color: "#222222",
        lineHeight: 34,
    },

    popupText: {
        fontSize: 14,
        lineHeight: 21,
        color: "#222222",
    },

    infoButtonSelected: {
        borderColor: "black",
    },

    infoTextSelected: {
        color: "black"
    }
});


