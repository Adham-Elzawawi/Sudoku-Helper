import { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';

import { scanStyles as styles } from '../styles/scanStyles';
import { buttonStyles } from '../styles/buttonStyles';

export default function ScanSudokuScreen() {
  const cameraRef = useRef<CameraView | null>(null);

  const [permission, requestPermission] =
    useCameraPermissions();

  const [ready, setReady] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  async function takePicture() {
    if (!cameraRef.current || !ready || capturing) {
      return;
    }

    setCapturing(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
      });

      if (photo) {
        setPhotoUri(photo.uri);
      }
    } catch {
      Alert.alert('Error', 'Could not take the picture.');
    } finally {
      setCapturing(false);
    }
  }

  // Wait for the camera permission status to load.
  if (!permission) {
    return <View style={styles.container} />;
  }

  // Ask for camera access if necessary.
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.title}>
          Camera access required
        </Text>

        <Text style={styles.description}>
          Sudoku Helper needs your camera to
          photograph your Sudoku board.
        </Text>

        <Pressable
          style={[buttonStyles.base, buttonStyles.primary]}
          onPress={requestPermission}
        >
          <Text style={buttonStyles.primaryText}>
            Allow Camera Access
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
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.camera}
            resizeMode="contain"
          />
        ) : (
          <>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="back"
              onCameraReady={() => setReady(true)}
            />

            <View
              style={styles.guideOverlay}
              pointerEvents="none"
            >
              <View style={styles.guideSquare} />
            </View>
          </>
        )}
      </View>

      <View style={styles.actions}>
        {photoUri ? (
          <>
            <Text style={styles.description}>
              Photo captured!
            </Text>

            <Pressable
              style={[buttonStyles.base, buttonStyles.primary]}
              onPress={() => {
                setReady(false);
                setPhotoUri(null);
              }}
            >
              <Text style={buttonStyles.primaryText}>
                Retake Photo
              </Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={[buttonStyles.base, buttonStyles.primary]}
            onPress={takePicture}
            disabled={!ready || capturing}
          >
            <Text style={buttonStyles.primaryText}>
              {capturing ? 'Capturing...' : 'Take Picture'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}