import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{ title: 'Home' }}/>
    <Stack.Screen name="check_error" options={{ title: 'Check Errors' }}/>
    <Stack.Screen name="scan_board" options={{ title: 'Scan Sudoku Board' }}/>
  </Stack>);
}
