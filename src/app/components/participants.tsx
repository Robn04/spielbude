import { useState } from "react";
import {
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import DraggableFlatList, {
    RenderItemParams,
} from "react-native-draggable-flatlist";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Player, useGame } from "../../context/gameContext";
import Button from "./button";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ParticipantList() {
  const [name, setName] = useState("");
  const { players, setPlayers } = useGame();

  const addParticipant = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    setPlayers((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        name: trimmedName,
      },
    ]);
    setName("");
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Player>) => {
    return (
      <Swipeable
        overshootLeft={false}
        overshootRight={false}
        rightThreshold={150}
        renderRightActions={() => <View style={styles.invisibleSwipeArea} />}
        onSwipeableWillOpen={(direction) => {
          if (direction === "left") {
            setTimeout(() => {
              setPlayers((current) =>
                current.filter((player) => player.id !== item.id),
              );
            }, 200);
          }
        }}
      >
        <View
          style={[styles.participant, isActive && styles.activeParticipant]}
        >
          <Text style={styles.name}>{item.name}</Text>

          <Pressable
            onLongPress={drag}
            delayLongPress={150}
            disabled={isActive}
            style={({ pressed }) => [
              styles.dragHandle,
              pressed && styles.dragHandlePressed,
            ]}
          >
            <Text style={styles.dragIcon}>☰</Text>
          </Pressable>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Eingabe */}
      <View style={styles.inputRow}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name eingeben"
          placeholderTextColor="#888"
          style={styles.input}
          onSubmitEditing={addParticipant}
          returnKeyType="done"
        />

        <Button
          title="+"
          onPress={addParticipant}
          width={50}
          height={50}
          borderRadius={25}
          borderBottomLeftRadius={0}
          borderTopLeftRadius={0}
          fontSize={20}
        />
      </View>

      {/* Teilnehmerliste */}
      <View style={styles.listContainer}>
        <DraggableFlatList<Player>
          style={{ flex: 1 }}
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onDragEnd={({ data }) => setPlayers(data)}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputRow: {
    flexDirection: "row",
    gap: 0,
    padding: 20,
    paddingBottom: 0,
  },

  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "white",
    color: "#222",
    fontSize: 16,

    borderBottomWidth: 4,
    borderBottomColor: "#adadad",
  },

  listContainer: {
    flex: 1,
    marginTop: 15,
    minHeight: 0,
    overflow: "scroll",
    paddingHorizontal: 20,
  },

  participant: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
  },

  activeParticipant: {
    opacity: 0.7,
  },

  name: {
    flex: 1,
    fontSize: 17,
    color: "#222",
  },

  dragHandle: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    touchAction: "none",
  },

  dragHandlePressed: {
    opacity: 0.5,
  },

  dragIcon: {
    fontSize: 24,
    color: "#555",
  },

  invisibleSwipeArea: {
    width: SCREEN_WIDTH,
  },
});
