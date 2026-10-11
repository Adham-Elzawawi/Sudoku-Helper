import { View, Text, Pressable } from 'react-native';
import { homeStyles as styles } from '../styles/homeStyles';
import { buttonStyles } from '../styles/buttonStyles';
import { router } from 'expo-router';

/**
 * Sends a request to the backend test endpoint to verify the skip scanning pipeline.
 * Returns the raw HTTP response so the caller can parse the returned board data.
 */
async function ImageTest() {
  const response = await fetch('http://192.168.129.85:8000/test_image', {
    method: 'GET',
  });

  console.log('Sending to Backend!');

  if (!response.ok) {
    throw new Error(`Image scan failed: ${response.status}`);
  }

  return response;
}

/**
 * Landing screen for the Sudoku Helper app.
 * Lets the user start a scan or trigger a backend image test for debugging.
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku Helper</Text>

      <Pressable
        style={[buttonStyles.base, buttonStyles.primary]}
        onPress={() => router.push('/scan_board')}
      >
        <Text style={buttonStyles.primaryText}>Scan Board</Text>
      </Pressable>

      <Pressable
        style={[buttonStyles.base, buttonStyles.secondary]}
        onPress={async () => {
          try {
            const response = await ImageTest();
            console.log('HTTP status:', response.status);

            // The backend is expected to return the detected Sudoku board as JSON.
            // That payload is passed into the grid editor for review.
            router.push({
              pathname: '/show_grid',
              params: {
                grid: JSON.stringify(response.json()),
              },
            });
          } catch (error) {
            console.error('Error during image test:', error);
          }
        }}
      >
        <Text style={buttonStyles.secondaryText}>Test Image</Text>
      </Pressable>

      <Pressable style={[buttonStyles.base, buttonStyles.secondary]}>
        <Text style={buttonStyles.secondaryText}>How to Use</Text>
      </Pressable>
    </View>
  );
}