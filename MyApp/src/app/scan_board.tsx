import {
  CameraView,
  type CameraType,
  useCameraPermissions,
  type CameraCapturedPicture,
} from 'expo-camera';

import { View, Text, Pressable } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { router, useIsFocused } from 'expo-router';

import { scanStyles as styles } from '../styles/scanStyles';
import { buttonStyles } from '../styles/buttonStyles';

export default function ScanBoardScreen() {
  const [facing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const isFocused = useIsFocused();

  const cameraRef = useRef<CameraView>(null);

  const [photo, setPhoto] =
    useState<CameraCapturedPicture | null>(null);

  const [isCameraReady, setIsCameraReady] =
    useState(false);

  const [isTakingPhoto, setIsTakingPhoto] =
    useState(false);

  useEffect(() => {
    console.log('Screen focused:', isFocused);

    if (!isFocused) {
      setIsCameraReady(false);
    }
  }, [isFocused]);

  const takePhoto = async () => {
    if (
      !cameraRef.current ||
      !isCameraReady ||
      isTakingPhoto
    ) {
      return;
    }

    try {
      setIsTakingPhoto(true);

      const data =
        await cameraRef.current.takePictureAsync();

      if (!data) {
        return;
      }

      console.log('Photo taken:', data.uri);

      setPhoto(data);

      router.push({
        pathname: '/image_scanned',
        params: {
          imageUri: data.uri,
        },
      });
    } catch (error) {
      console.error('Error taking picture:', error);
    } finally {
      setIsTakingPhoto(false);
    }
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

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
        {isFocused && (
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
            }}
          />
        )}

        <View
          style={styles.guideOverlay}
          pointerEvents="none"
        >
          <View style={styles.guideSquare} />
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[
            buttonStyles.base,
            buttonStyles.primary,
          ]}
          onPress={takePhoto}
          disabled={!isCameraReady || isTakingPhoto}
        >
          <Text style={buttonStyles.primaryText}>
            {isTakingPhoto
              ? 'Taking Photo...'
              : isCameraReady
                ? 'Scan Sudoku'
                : 'Loading Camera...'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}