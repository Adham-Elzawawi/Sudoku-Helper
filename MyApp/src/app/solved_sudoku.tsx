import { View, Text, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';


import { gridStyles as styles } from '../styles/gridStyles';
import toNotAdd from '../services/randomNumber';

/**
 * Displays a read-only Sudoku grid.
 * The user can view the result but cannot modify any cells.
 */
export default function solvedSudoku() {
  const { grid, amount, solvedGrid } = 
        useLocalSearchParams<{ grid: string; amount: string; solvedGrid: string }>();


  const parsed_grid = JSON.parse(grid);
  const parsed_solvedGrid = JSON.parse(solvedGrid);


  const parsed_sudoku: number[][] = typeof parsed_grid === 'string' ? JSON.parse(parsed_grid) : parsed_grid;
  
  const solvedSudokuIndexes: number[][] = typeof parsed_solvedGrid === 'string' ? JSON.parse(parsed_solvedGrid) : parsed_solvedGrid;


  // Remove some numbers from the solved Sudoku grid based on the specified amount to create a partially solved puzzle.
  const sudoku = toNotAdd(parsed_sudoku, solvedSudokuIndexes, Number(amount));
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku Result</Text>

      <Text style={styles.subtitle}>Your solved Sudoku puzzle</Text>

      <View style={styles.grid}>
        {sudoku.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((value, colIndex) => (
              <TextInput
                key={colIndex}
                style={[
                  styles.cell,
                  // Fix to show green cells to show newly added cells
                  solvedSudokuIndexes.some(
                      ([r, c]) => r === rowIndex && c === colIndex && value != -1)
                      ? styles.cellCorrect
                      : styles.normalCell,
                  (colIndex === 2 || colIndex === 5) && styles.boxRight,
                  (rowIndex === 2 || rowIndex === 5) && styles.boxBottom,
                ]}
                value={value === -1 ? '' : String(value)}
              
                editable={false}
                showSoftInputOnFocus={false}
                textAlign="center"
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}