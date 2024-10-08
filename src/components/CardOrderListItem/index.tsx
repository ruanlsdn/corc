import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, XStack } from 'tamagui';
import { iCardOrder } from '../../interfaces';

type props = {
  item: iCardOrder;
};

export default function CardOrderListItem({ item }: props) {
  return (
    <XStack
      flexDirection='row'
      marginBottom='$2'
      marginHorizontal='$2'
      height='$5'
      bc='#343541'
      borderRadius='$5'
      padding='$2'
      space='$2.5'
    >
      <XStack width='50%' alignItems='center' justifyContent='flex-start'>
        <Text fontSize='$5' color='#D9D9E3'>
          {item.product.description}
        </Text>
      </XStack>
      <XStack width={'15%'} alignItems='center' justifyContent='center'>
        <Text fontSize='$5' color='#D9D9E3'>
          x{item.productQuantity}
        </Text>
      </XStack>
      <XStack width={'30%'} alignItems='center' justifyContent='flex-end'>
        <Text fontWeight='bold' fontSize='$5' color='#ffffff'>
          R$ {(item.productQuantity * item.productPrice!).toFixed(2)}
        </Text>
      </XStack>
    </XStack>
  );
}

const styles = StyleSheet.create({});
