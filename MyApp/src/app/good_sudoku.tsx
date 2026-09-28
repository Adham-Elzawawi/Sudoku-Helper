import {
  View,
  Text,
  Animated,
  Pressable,
} from 'react-native';

import { useEffect, useRef } from 'react';
import { router } from 'expo-router';

import { successStyles as styles } from '@/styles/successStyles';
import { buttonStyles } from '@/styles/buttonStyles';

export default function SuccessScreen() {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.checkCircle,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={styles.checkMark}>
          ✓
        </Text>
      </Animated.View>

      <Text style={styles.title}>
        All Good! {'\n'}
      </Text>
      <Text style = {styles.subtitle}>
        No Conflicts Found
      </Text>

      <Pressable
      style = {[buttonStyles.base, buttonStyles.primary]}
      onPress={() => router.push('/')}
      >
        <Text style = {buttonStyles.primaryText}>Home Page</Text>

      </Pressable>
    </View>
  );
}