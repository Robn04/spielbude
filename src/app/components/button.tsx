import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type ButtonProps = {
    title?: string;
    onPress: () => void;
    width?: number;
    height?: number;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: number;
    borderBottomLeftRadius?: number;
    borderTopLeftRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    fontSize?: number;
    icon?: ReactNode;
    style?: ViewStyle;
};

export default function Button({
    title,
    onPress,
    width,
    height = 50,
    backgroundColor = "#ff196d",
    textColor = "white",
    borderRadius = 10,
    borderBottomLeftRadius,
    borderTopLeftRadius,
    borderWidth = 0,
    borderColor = "transparent",
    fontSize = 18,
    icon,
    style,
}: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                {
                    width,
                    height,
                    backgroundColor,
                    borderRadius,
                    borderBottomLeftRadius,
                    borderTopLeftRadius,
                    borderWidth,
                    borderColor,
                },
                pressed && styles.pressed,
                style,
            ]}
        >
            {icon}

            {title && (
                <Text
                    style={{
                        color: textColor,
                        fontSize: fontSize,
                        fontWeight: "bold",
                    }}
                >
                    {title}
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 3,
        borderBottomWidth: 4,
        borderRightColor: "#cd0045",
        borderBottomColor: "#cd0045",
    },

    pressed: {
        opacity: 0.7,
    },
});

