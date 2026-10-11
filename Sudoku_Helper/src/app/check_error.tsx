import { View, Text, Pressable } from 'react-native';
import { errorCheckStyles as styles } from '../styles/checkErrorStyles';
import { buttonStyles } from '@/styles/buttonStyles';
import { router } from 'expo-router';

/**
 * Entry screen for the manual error-check flow.
 *
 * It explains the feature and lets the user begin scanning a Sudoku board for
 * conflicts or validation issues.
 */
export default function ErrorCheckScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error Check</Text>

      <Text style={styles.description}>
        This is the Error Check screen. {'\n'}
        Click the button to scan your Sudoku board for errors.
      </Text>

      <Pressable
        style={[buttonStyles.base, buttonStyles.primary]}
        onPress={() => router.push('/scan_board')}
      >
        <Text style={buttonStyles.primaryText}>Scan for Errors</Text>
      </Pressable>
    </View>
  );
}