import {
  View,
  Text,
  TextInput,
} from 'react-native';

import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import solve_sudoku from '../services/sudoku_solve';

import { gridStyles as styles } from '../styles/gridStyles';

export default function ShowConflict() {
  const { grid } = useLocalSearchParams<{ grid: string }>();

  const sudoku: number[][] = JSON.parse(grid);

  const [incorrectCells, setIncorrectCells] =
    useState<Set<string>>(new Set());

  useEffect(() => {
    const foundIncorrect = new Set<string>();

    for (let row_indx = 0; row_indx < sudoku.length; row_indx++) {
      for (let col_indx = 0; col_indx < sudoku.length; col_indx++) {
        const boardCopy = sudoku.map((row: number[]) => [...row]);

        const original_cell = boardCopy[row_indx][col_indx];

        if (original_cell > 0) {
          boardCopy[row_indx][col_indx] = -1;

          const solvable = solve_sudoku(boardCopy, 0, 0);

          if (solvable) {
            foundIncorrect.add(`${row_indx},${col_indx}`);
          }
        }
      }
    }

    setIncorrectCells(foundIncorrect);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Conflicts Found
      </Text>

      <View style={styles.grid}>
        {sudoku.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((value, colIndex) => {
              const isIncorrect = incorrectCells.has(
                `${rowIndex},${colIndex}`
              );

              return (
                <TextInput
                  key={colIndex}
                  style={[
                    styles.cell,

                    isIncorrect
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
                  editable={false}
                  textAlign="center"
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}