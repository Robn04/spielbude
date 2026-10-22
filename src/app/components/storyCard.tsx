import {
    DimensionValue,
    StyleSheet,
    Text,
    TextStyle,
    View,
} from "react-native";

type StoryCardProps = {
  title: string;
  description: string;
  children?: React.ReactNode;

  text?: {
    fontSize?: number;
    textAlign?: TextStyle["textAlign"];
    fontWeight?: TextStyle["fontWeight"];
  };

  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  backgroundColor?: string;
};

export default function StoryCard({
  title,
  text,
  children,
  description,
  width = "100%",
  height,
  borderRadius = 20,
  backgroundColor = "#ff196d",
}: StoryCardProps) {
  return (
    <View
      style={[
        styles.container,
        { width, height, borderRadius, backgroundColor },
      ]}
    >
      <View style={styles.titleInfoLine}>
        <Text style={[styles.title, text]}>{title}</Text>
      </View>
      <View>
        <Text style={[styles.description, text]}>{description}</Text>
      </View>
      <View>{children}</View>
    </View>
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

  title: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#fcfcfc",
  },

  titleInfoLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  description: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 8,
    color: "#fcfcfc",
  },
});
