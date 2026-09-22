
import { View, Text, Pressable } from 'react-native';
import { homeStyles as styles } from '../styles/homeStyles';
import { buttonStyles } from '../styles/buttonStyles';
import { router } from 'expo-router'; 

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku Helper</Text>

      <Pressable
        style={[buttonStyles.base, buttonStyles.primary]}
        onPress={() => router.push('/check_error')}
      >
        <Text style={buttonStyles.primaryText}>
          Check Errors
        </Text>
      </Pressable>

      <Pressable
        style={[buttonStyles.base, buttonStyles.primary]}
      >
        <Text style={buttonStyles.primaryText}>
          Complete Sudoku
        </Text>
        
      </Pressable>

      <Pressable
        style={[buttonStyles.base, buttonStyles.secondary]}
      >
        <Text style={buttonStyles.secondaryText}>
          How to Use
        </Text>
      </Pressable>
    </View>
  );
}