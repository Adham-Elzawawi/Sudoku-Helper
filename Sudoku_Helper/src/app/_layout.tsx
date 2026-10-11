import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{ title: 'Home' }}/>
    <Stack.Screen name="check_error" options={{ title: 'Check Errors' }}/>
    <Stack.Screen name="scan_board" options={{ title: 'Scan Sudoku Board' }}/>
    <Stack.Screen name="image_scanned" options={{ title: 'Image Scanned' }}/>
    <Stack.Screen name="show_grid" options={{title: 'Show Grid'}}/>
    <Stack.Screen name="good_sudoku" options={{title: 'Good Sudoku'}}/>
    <Stack.Screen name="show_conflict" options={{title: 'Conflicts'}}/>
    <Stack.Screen name="amount_to_solve" options={{title: 'Amount to Solve'}}/>
    <Stack.Screen name="solved_sudoku" options={{title: 'Solved Sudoku'}}/>
  </Stack>);
}
