
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';

import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import validateGrid from '../services/board_valid';

import { gridStyles as styles } from '../styles/gridStyles';
import { buttonStyles } from '@/styles/buttonStyles';

export default function GridScreen() {
  const { grid } = useLocalSearchParams<{ grid: string }>();

  const [sudoku, setSudoku] = useState<number[][]>(
    () => JSON.parse(grid)
  );

  const [contradictCells, setContradictCells] =
    useState<Set<string>>(new Set());

  const [validationEnabled, setValidationEnabled] =
    useState(false);

  const updateCell = (
    rowIndex: number,
    colIndex: number,
    text: string
  ) => {
    const updatedGrid = sudoku.map((row) => [...row]);

    updatedGrid[rowIndex][colIndex] =
      text === '' ? -1 : Number(text);

    setSudoku(updatedGrid);

    // Once validation is enabled, update conflicts
    // every time the user changes a cell.
    if (validationEnabled) {
      setContradictCells(validateGrid(updatedGrid));
    }
  };

  const checkGrid = () => {
    setValidationEnabled(true);
    setContradictCells(validateGrid(sudoku));
    Keyboard.dismiss();
  };

  return (
    <Pressable
      style={styles.container}
      onPress={Keyboard.dismiss}
    >
      <Text style={styles.title}>
        Sudoku Grid
      </Text>

      <Text style={styles.subtitle}>
        Your scanned Sudoku puzzle
      </Text>

      <View style={styles.grid}>
        {sudoku.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((value, colIndex) => {
              const isConflicting = contradictCells.has(
                `${rowIndex},${colIndex}`
              );

              return (
                <TextInput
                  key={colIndex}
                  style={[
                    styles.cell,

                    isConflicting
                      ? styles.cellIncorrect
                      : styles.cellCorrect,

                    (colIndex === 2 || colIndex === 5) &&
                      styles.boxRight,

                    (rowIndex === 2 || rowIndex === 5) &&
                      styles.boxBottom,
                  ]}
                  value={
                    value === -1 ? '' : String(value)
                  }
                  onChangeText={(text) =>
                    updateCell(rowIndex, colIndex, text)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                />
              );
            })}
          </View>
        ))}
      </View>

      <Pressable
        style={[
          buttonStyles.base,
          buttonStyles.primary,
        ]}
        onPress={checkGrid}
      >
        <Text style={buttonStyles.primaryText}>
          Test Error!
        </Text>
      </Pressable>
    </Pressable>
  );
}
