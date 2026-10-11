import { View, Text, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { gridStyles as styles } from '../styles/gridStyles';

/**
 * Displays a read-only Sudoku grid.
 * The user can view the result but cannot modify any cells.
 */
export default function solvedSudoku() {
  const { grid, amount } = useLocalSearchParams<{ grid: string; amount: string }>();
  const parsed = JSON.parse(grid);

  const sudoku: number[][] =
    typeof parsed === 'string' ? JSON.parse(parsed) : parsed;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku Result</Text>

      <Text style={styles.subtitle}>Your solved Sudoku puzzle</Text>
      <Text style={styles.subtitle}>Amount solved: {amount}%</Text>

      <View style={styles.grid}>
        {sudoku.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((value, colIndex) => (
              <TextInput
                key={colIndex}
                style={[
                  styles.cell,
                  styles.cellCorrect,
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