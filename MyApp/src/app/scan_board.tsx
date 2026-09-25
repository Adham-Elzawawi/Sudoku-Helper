
import {
  CameraView,
  type CameraType,
  useCameraPermissions,
} from 'expo-camera';

import {
  View,
  Text,
  Pressable,
  Alert,
} from 'react-native';

import { useEffect, useRef, useState } from 'react';
import { router, useIsFocused } from 'expo-router';

import { scanStyles as styles } from '../styles/scanStyles';
import { buttonStyles } from '../styles/buttonStyles';

export default function ScanBoardScreen() {
  const [facing] = useState<CameraType>('back');
  const [permission, requestPermission] =
    useCameraPermissions();

  const isFocused = useIsFocused();
  const cameraRef = useRef<CameraView>(null);

  const [isCameraReady, setIsCameraReady] =
    useState(false);

  const [isTakingPhoto, setIsTakingPhoto] =
    useState(false);

  const [cameraVisible, setCameraVisible] =
    useState(true);

  // Mount the camera only when this screen is active.
  useEffect(() => {
    setCameraVisible(isFocused);
    setIsCameraReady(false);
  }, [isFocused]);

  
  const takePhoto = async () => {
    if (!cameraRef.current || !isCameraReady || isTakingPhoto) {
      return;
    }

    try {
      setIsTakingPhoto(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
      });

      if (!photo) return;

      console.log('Photo taken:', photo.uri);

      router.push({
        pathname: '/image_scanned',
        params: {
          imageUri: photo.uri,
          imageWidth: String(photo.width),
          imageHeight: String(photo.height),
        },
      });

    } catch (error) {
      console.error('Camera error:', error);
    } finally {
      setIsTakingPhoto(false);
    }
  };

  // Wait for permission status.
  if (!permission) {
    return <View style={styles.container} />;
  }

  // Request camera permission.
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.title}>
          Camera Access Required
        </Text>

        <Text style={styles.description}>
          Sudoku Helper needs access to your camera.
        </Text>

        <Pressable
          style={[
            buttonStyles.base,
            buttonStyles.primary,
          ]}
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
        {isFocused && cameraVisible && (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            onCameraReady={() => {
              console.log('Camera is ready!');
              setIsCameraReady(true);
            }}
            onMountError={(error) => {
              console.error(
                'Camera mount error:',
                error.message
              );
              setIsCameraReady(false);
            }}
          />
        )}

        {cameraVisible && (
          
        <View style={styles.guideOverlay} pointerEvents="none">
          <View style={styles.guideSquare}>
            {Array.from({ length: 9 }, (_, row) => (
              <View key={row} style={styles.gridRow}>
                {Array.from({ length: 9 }, (_, col) => (
                  <View
                    key={col}
                    style={[
                      styles.gridCell,

                      col < 8 &&
                        (col === 2 || col === 5
                          ? styles.thickRight
                          : styles.thinRight),

                      row < 8 &&
                        (row === 2 || row === 5
                          ? styles.thickBottom
                          : styles.thinBottom),
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
        )}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[
            buttonStyles.base,
            buttonStyles.primary,
          ]}
          onPress={takePhoto}
          disabled={
            !isCameraReady ||
            isTakingPhoto ||
            !cameraVisible
          }
        >
          <Text style={buttonStyles.primaryText}>
            {isTakingPhoto
              ? 'Processing...'
              : isCameraReady
                ? 'Scan Sudoku'
                : 'Loading Camera...'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}