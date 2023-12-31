import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Label, Input, AlertDialog, XStack, Button } from "tamagui";
import {
  useApplicationControlContext,
  useCartControlContext,
} from "../../contexts";

export default function IncreaseAmount() {
  const { setIsIncreaseAmountAlertOpen } = useApplicationControlContext();
  const { selectedProduct, upsertProductOnCart } = useCartControlContext();
  const [quantity, setQuantity] = useState<number>();

  const handleCancelButton = () => {
    setIsIncreaseAmountAlertOpen(false);
  };

  const handleConfirmButton = () => {
    upsertProductOnCart({
      id: selectedProduct?.id,
      description: selectedProduct?.description,
      price: selectedProduct?.price,
      quantity: quantity!,
    });
    setIsIncreaseAmountAlertOpen(false);
  };
  return (
    <>
      <View style={styles.container}>
        <Label fontSize="$4" color="#D9D9E3" width={90} htmlFor="name">
          Quantidade:
        </Label>
        <Input
          autoFocus
          fontSize="$6"
          keyboardType="numeric"
          textAlign="center"
          maxWidth={100}
          id="name"
          bc="#D9D9E3"
          onChangeText={(text) => setQuantity(Number(text))}
        />
      </View>
      <XStack space="$3" justifyContent="center">
        <AlertDialog.Action bc="#565869" asChild>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: "#565869",
              backgroundColor: "#565869",
            }}
            elevationAndroid={5}
            color="$red11Light"
            onPress={handleCancelButton}
          >
            Cancelar
          </Button>
        </AlertDialog.Action>
        <AlertDialog.Action bc="#565869" asChild>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: "#565869",
              backgroundColor: "#565869",
            }}
            elevationAndroid={5}
            color="#19C37D"
            onPress={handleConfirmButton}
          >
            Confirmar
          </Button>
        </AlertDialog.Action>
      </XStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
});
