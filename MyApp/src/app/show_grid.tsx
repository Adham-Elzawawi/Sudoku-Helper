
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { gridStyles as styles } from '../styles/gridStyles';

export default function GridScreen() {
  const { grid } = useLocalSearchParams<{ grid: string }>();

  const [sudoku, setSudoku] = useState<number[][]>(() => JSON.parse(grid));

  const updateCell = (
    rowIndex: number,
    colIndex: number,
    text: string
  ) => {
    const updatedGrid = sudoku.map((row) => [...row]);

    updatedGrid[rowIndex][colIndex] =
      text === '' ? -1 : Number(text);

    setSudoku(updatedGrid);
  };

  return (
    <Pressable
      style={styles.container}
      onPress={Keyboard.dismiss}
    >
      <Text style={styles.title}>Sudoku Grid</Text>

      <Text style={styles.subtitle}>
        Your scanned Sudoku puzzle
      </Text>

      <View style={styles.grid}>
        {sudoku.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((value, colIndex) => (
              <TextInput
                key={colIndex}
                style={[
                  styles.cell,
                  styles.cellText,
                  (colIndex === 2 || colIndex === 5) &&
                    styles.boxRight,
                  (rowIndex === 2 || rowIndex === 5) &&
                    styles.boxBottom,
                ]}
                value={value === -1 ? '' : String(value)}
                onChangeText={(text) =>
                  updateCell(rowIndex, colIndex, text)
                }
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
              />
            ))}
          </View>
        ))}
      </View>


    </Pressable>
  );
}
