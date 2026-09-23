
import {
  CameraView,
  type CameraType,
  useCameraPermissions,
} from 'expo-camera';

import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';

import { scanStyles as styles } from '../styles/scanStyles';
import { buttonStyles } from '../styles/buttonStyles';

export default function ScanBoardScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  // Wait for permission status
  if (!permission) {
    return <View style={styles.container} />;
  }

  // Request camera permission
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.title}>
          Camera Access Required
        </Text>

        <Text style={styles.description}>
          We need your permission to use the camera.
        </Text>

        <Pressable
          style={[buttonStyles.base, buttonStyles.primary]}
          onPress={requestPermission}
        >
          <Text style={buttonStyles.primaryText}>
            Grant Permission
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Align your Sudoku grid inside the square.
      </Text>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
        />

        <View
          style={styles.guideOverlay}
          pointerEvents="none"
        >
          <View style={styles.guideSquare} />
        </View>
      </View>
    </View>
  );
}