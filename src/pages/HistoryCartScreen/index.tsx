import React from "react";
import { StyleSheet, View } from "react-native";
import { CartList } from "../../components";
import { XStack, Text, Button } from "tamagui";
import {
  Check,
  ClipboardPaste,
  Printer,
  RefreshCcw,
  Send,
  X,
} from "@tamagui/lucide-icons";
import { iCartProduct } from "../../interfaces";

const dummyArray: iCartProduct[] = [
  {
    id: "1",
    name: "Hamburguer Artesanal Sabor Frango",
    amount: 2,
    price: 10.99,
  },
  {
    id: "2",
    name: "Produto 2",
    amount: 1,
    price: 19.99,
  },
  {
    id: "3",
    name: "Produto 3",
    amount: 3,
    price: 7.49,
  },
  {
    id: "4",
    name: "Produto 4",
    amount: 1,
    price: 14.95,
  },
  {
    id: "5",
    name: "Produto 5",
    amount: 2,
    price: 8.99,
  },
  {
    id: "6",
    name: "Produto 6",
    amount: 1,
    price: 25.5,
  },
  {
    id: "1",
    name: "Hamburguer Artesanal Sabor Frango",
    amount: 2,
    price: 10.99,
  },
  {
    id: "2",
    name: "Produto 2",
    amount: 1,
    price: 19.99,
  },
  {
    id: "3",
    name: "Produto 3",
    amount: 3,
    price: 7.49,
  },
  {
    id: "4",
    name: "Produto 4",
    amount: 1,
    price: 14.95,
  },
  {
    id: "5",
    name: "Produto 5",
    amount: 2,
    price: 8.99,
  },
  {
    id: "6",
    name: "Produto 6",
    amount: 1,
    price: 25.5,
  },
  {
    id: "1",
    name: "Hamburguer Artesanal Sabor Frango",
    amount: 2,
    price: 10.99,
  },
  {
    id: "2",
    name: "Produto 2",
    amount: 1,
    price: 19.99,
  },
  {
    id: "3",
    name: "Produto 3",
    amount: 3,
    price: 7.49,
  },
  {
    id: "4",
    name: "Produto 4",
    amount: 1,
    price: 14.95,
  },
  {
    id: "5",
    name: "Produto 5",
    amount: 2,
    price: 8.99,
  },
  {
    id: "6",
    name: "Produto 6",
    amount: 1,
    price: 25.5,
  },
];

export default function HistoryCartScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.clientInfoContainer}>
        <Text fontSize="$6" fontWeight="bold" color="#ffffff">
          Nome do Cliente
        </Text>
        <Text fontSize="$4" color="#D9D9E3">
          10/10/2023 - 18:30
        </Text>
      </View>
      <View style={styles.cartContainer}>
        <CartList list={dummyArray} />
      </View>
      <View style={styles.div} />
      <View style={styles.summaryContainer}>
        <XStack space="$2" alignSelf="flex-end" marginTop="$4">
          <Text fontSize="$6" color="#D9D9E3">
            Itens incluídos:
          </Text>
          <Text fontSize="$6" fontWeight="bold" color="#ffffff">
            x5
          </Text>
        </XStack>
        <XStack space="$2" alignSelf="flex-end" marginBottom="$4">
          <Text fontSize="$6" color="#D9D9E3">
            Somatório:
          </Text>
          <Text fontSize="$6" fontWeight="bold" color="#ffffff">
            R$ 20,00
          </Text>
        </XStack>
        <XStack space justifyContent="space-between">
          <Button
            bc="#343541"
            flex={1}
            elevationAndroid={5}
            pressStyle={{
              opacity: 0.5,
              borderColor: "#343541",
              backgroundColor: "#343541",
            }}
          >
            <X color="#D9D9E3" />
          </Button>
          <Button
            bc="#343541"
            flex={1}
            elevationAndroid={5}
            pressStyle={{
              opacity: 0.5,
              borderColor: "#343541",
              backgroundColor: "#343541",
            }}
          >
            <Check color="#D9D9E3" />
          </Button>
          <Button
            circular
            bc="#343541"
            flex={1}
            elevationAndroid={5}
            pressStyle={{
              opacity: 0.5,
              borderColor: "#343541",
              backgroundColor: "#343541",
            }}
          >
            <ClipboardPaste color="#D9D9E3" />
          </Button>
        </XStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202123",
    elevation: 5
  },
  clientInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  cartContainer: {
    flex: 3.5,
    backgroundColor: "#202123",
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: "#202123",
    paddingHorizontal: 10,
  },
  div: {
    marginHorizontal: 45,
    backgroundColor: "#19C37D",
    height: 0.5,
  },
});
