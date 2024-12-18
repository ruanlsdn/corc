import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Calendar, CheckCircle2, XCircle } from '@tamagui/lucide-icons';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Label, XStack, YStack } from 'tamagui';
import { useApplicationControlContext, useAuthControlContext } from '../../contexts';
import { generateHtml } from '../../helpers/reports/generate-html';
import { generateBodyHtml } from '../../helpers/reports/generate-sell-report-body-html';
import { iCard } from '../../interfaces';
import { axiosCardService } from '../../services';
import { AxiosResponse } from 'axios';
import { useToastController } from '@tamagui/toast';

export interface ProductMap {
  description?: string;
  quantity?: number;
  total?: number;
}

export default function IncreaseAmount() {
  const { user } = useAuthControlContext();
  const { setIsSellReportSettingsDialogOpen } = useApplicationControlContext();
  const toast = useToastController();

  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());

  const currentDate = new Date();

  const showDatePickerInitialDate = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: onChangeInitialDate,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const onChangeInitialDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setInitialDate(currentDate);
  };

  const showDatePickerFinalDate = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: currentDate,
      onChange: onChangeFinalDate,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const onChangeFinalDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setFinalDate(currentDate);
  };

  const handleOnPressPeriod = (amount: number, unit: moment.unitOfTime.DurationConstructor) => {
    const newDate = moment().subtract(amount, unit);
    setInitialDate(newDate.toDate());
    setFinalDate(new Date());
  };

  const handleCancelButton = () => {
    setIsSellReportSettingsDialogOpen(false);
  };

  const handleConfirmButton = async () => {
    try {
      const response = await axiosCardService.get<iCard[], AxiosResponse<iCard[]>>(
        `/user/${user.id}/period?initialDate=${moment(initialDate).startOf('day').toISOString()}&finalDate=${moment(finalDate).endOf('day').toISOString()}`
      );

      if (response.data && response.data.length > 0) {
        const productsMap = new Map<string, ProductMap>();

        for (const card of response.data) {
          card.orders.forEach((order) => {
            if (productsMap.has(order.product.id)) {
              const current = productsMap.get(order.product.id);
              productsMap.set(order.product.id, {
                ...current,
                quantity: current?.quantity! + order.productQuantity,
                total: current?.total! + order.productQuantity * order.productPrice,
              });
            } else {
              productsMap.set(order.product.id, {
                description: order.product.description,
                quantity: order.productQuantity,
                total: order.productPrice * order.productQuantity,
              });
            }
          });
        }

        const sortedMap = new Map([...productsMap.entries()].sort((a, b) => b[1].quantity! - a[1].quantity!));

        generateAndShareReport(sortedMap);
      } else {
        toast.show('Ocorreu um erro!', {
          message: 'Nenhuma venda encontrada no período informado.',
          viewportName: 'main',
          customData: { icon: <XCircle size={25} /> },
        });
      }
    } catch (error) {
      toast.show('Ocorreu um erro!', {
        message: 'Não foi possível consultar as vendas.',
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    } finally {
      setIsSellReportSettingsDialogOpen(false);
    }
  };

  const generateAndShareReport = async (productsMap:  Map<string, ProductMap>) => {
    const responseFile = await Print.printToFileAsync({ html: generateHtml(generateBodyHtml(initialDate, finalDate, productsMap)) });
    const pdfName = `${responseFile.uri.slice(0, responseFile.uri.lastIndexOf('/') + 1)}relatorio_vendas_${moment().toDate().toLocaleDateString('pt-br').replaceAll('/', '-')}.pdf`;

    await FileSystem.moveAsync({
      from: responseFile.uri,
      to: pdfName,
    });

    try {
      await shareAsync(pdfName);
    } catch (error) {
      toast.show('Ocorreu um erro!', {
        message: 'Não foi possível gerar o relatório.',
        viewportName: 'main',
        customData: { icon: <XCircle size={25} /> },
      });
    } finally {
      await FileSystem.deleteAsync(pdfName, { idempotent: true });

      toast.show('Relatório gerado!', {
        viewportName: 'main',
        customData: { icon: <CheckCircle2 size={25} /> },
      });
    }
  }

  return (
    <>
      <View style={styles.container}>
        <XStack gap={10} padding={3}>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(0, 'days')}
          >
            Hoje
          </Button>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(7, 'days')}
          >
            7 dias
          </Button>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(1, 'months')}
          >
            1 mês
          </Button>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(3, 'months')}
          >
            3 meses
          </Button>
        </XStack>
        <XStack gap={10} padding={3}>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(6, 'months')}
          >
            6 meses
          </Button>
          <Button
            pressStyle={{
              opacity: 0.5,
              borderColor: '#565869',
              backgroundColor: '#565869',
            }}
            elevationAndroid={5}
            bc='#565869'
            color='#ffffff'
            onPress={() => handleOnPressPeriod(1, 'years')}
          >
            1 ano
          </Button>
        </XStack>
        <XStack gap={15} marginTop={30}>
          <YStack alignItems='center'>
            <Label fontSize='$4' color='#D9D9E3' htmlFor='initialDate'>
              Data Inicial:
            </Label>
            <XStack>
              <TextInput
                id='initialDate'
                editable={false}
                style={styles.dateInput}
                value={initialDate.toLocaleDateString()}
              />
              <TouchableOpacity style={styles.dateButton} children={<Calendar />} onPress={showDatePickerInitialDate} />
            </XStack>
          </YStack>
          <YStack alignItems='center'>
            <Label fontSize='$4' color='#D9D9E3' htmlFor='finalDate'>
              Data Final:
            </Label>
            <XStack>
              <TextInput
                id='finalDate'
                editable={false}
                style={styles.dateInput}
                value={finalDate.toLocaleDateString()}
              />
              <TouchableOpacity style={styles.dateButton} children={<Calendar />} onPress={showDatePickerFinalDate} />
            </XStack>
          </YStack>
        </XStack>
      </View>
      <XStack space='$3' justifyContent='center' marginTop={30}>
        <Button
          pressStyle={{
            opacity: 0.5,
            borderColor: '#565869',
            backgroundColor: '#565869',
          }}
          elevationAndroid={5}
          bc='#565869'
          color='$red10Dark'
          onPress={handleCancelButton}
        >
          Cancelar
        </Button>
        <Button
          pressStyle={{
            opacity: 0.5,
            borderColor: '#565869',
            backgroundColor: '#565869',
          }}
          elevationAndroid={5}
          bc='#565869'
          color='#19C37D'
          onPress={handleConfirmButton}
        >
          Confirmar
        </Button>
      </XStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
    gap: 15,
  },
  dateInput: {
    backgroundColor: '#D9D9E3',
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: 135,
    height: 40,
  },
  dateButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: 45,
    backgroundColor: '#D9D9E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
