import { BlurView } from "expo-blur";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/button";

type SidebarProps = {
  visible: boolean;

  title?: string;
  selectedRoles?: string[];
  counter?: boolean;
  onChangeRoleCount?: (role: string, amount: number) => void;
};

export default function Sidebar({
  visible,
  title,
  selectedRoles = [],
  counter = false,
  onChangeRoleCount,
}: SidebarProps) {
  if (!visible) {
    return null;
  }

  const uniqueRoles = [...new Set(selectedRoles)];
  return (
    <View style={styles.container}>
      <BlurView
        style={styles.sidebarContainer}
        tint="systemChromeMaterialDark"
        intensity={85}
      >
        <View style={styles.sidebarContent}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView style={styles.list}>
            {uniqueRoles.map((role) => (
              <View key={role} style={styles.listContainer}>
                <Text key={role} style={styles.listItem}>
                  {role}
                </Text>
                {counter && (
                  <View style={styles.counter}>
                    <Button
                      style={styles.countButton}
                      backgroundColor="white"
                      textColor="#ff196d"
                      borderRadius={50}
                      title="−"
                      onPress={() => onChangeRoleCount?.(role, -1)}
                    />

                    <Text style={styles.counterText}>
                      {selectedRoles.filter((r) => r === role).length}
                    </Text>

                    <Button
                      style={styles.countButton}
                      backgroundColor="white"
                      textColor="#ff196d"
                      borderRadius={50}
                      title="+"
                      onPress={() => onChangeRoleCount?.(role, 1)}
                    />
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 100,
  },

  sidebarContainer: {
    flex: 1,
  },

  sidebarContent: {
    marginTop: 80,
    height: "70%",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff196d",

    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
    padding: 16,
    borderRightWidth: 3,
    borderBottomWidth: 4,
    borderRightColor: "#cd0045",
    borderBottomColor: "#cd0045",

    alignSelf: "flex-start",
  },

  list: {
    flex: 1,
    alignSelf: "center",

    width: "85%",
    paddingTop: 40,
  },

  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  listItem: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  counterText: {
    color: "white",
    fontSize: 20,
    minWidth: 30,
    textAlign: "center",
  },

  countButton: {
    width: 30,
    height: 30,
    borderRightWidth: 1,
    borderBottomWidth: 2,
  },
});
