import { Clipboard, Eye, Plus } from "@tamagui/lucide-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import { iHistoryOrder } from "../../interfaces";
import AvatarIcon from "../AvatarIcon";
import { useNavigation } from "@react-navigation/native";

type props = {
  item: iHistoryOrder;
};

export default function HistoryOrderItem({ item }: props) {
  const { navigate } = useNavigation();

  const handleEyeButton = () => {
    navigate("historyCart" as never);
  };

  return (
    <>
      <View style={styles.container}>
        <XStack space="$3" alignItems="center" justifyContent="center">
          <AvatarIcon icon={<Clipboard color="#ffffff" />} />
          <YStack space="$1.5" alignItems="flex-start" justifyContent="center">
            <Text color="#ffffff" fontWeight="bold" fontSize="$6">
              {item.clientName}
            </Text>
            <Text color="#D9D9E3" fontSize="$4">
              {item.createdAt}
            </Text>
          </YStack>
        </XStack>
        <TouchableOpacity
          onPress={handleEyeButton}
          style={styles.buttonContainer}
        >
          <Eye color="#ffffff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#343541",
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 6,
    height: 85,
    elevation: 5,
    padding: 20,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    backgroundColor: "#565869",
    borderRadius: 100,
    elevation: 5,
  },
});
