
import { View, Text, Pressable, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ImageManipulator } from 'expo-image-manipulator';
import { File } from 'expo-file-system';
import { fetch } from 'expo/fetch';

import { imageStyles as styles } from '../styles/ImageStyles';
import { buttonStyles } from '../styles/buttonStyles';


async function ImageToBackend(imageURI: string) {
  const file = new File(imageURI);
  const bytes = await file.bytes();

  const response = await fetch(
    'http://192.168.129.85:8000/scan',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: bytes,
    }
  );

  console.log('Sending to Backend!')

  if (!response.ok) {
    throw new Error(`Image scan failed: ${response.status}`);
  }

  return response;
}


export default function ImageScanned() {
  const { imageUri, imageWidth, imageHeight } =
    useLocalSearchParams<{
      imageUri: string;
      imageWidth: string;
      imageHeight: string;
    }>();

  const [croppedUri, setCroppedUri] = useState('');


  
useEffect(() => {
    const cropImage = async () => {
      const width = Number(imageWidth);
      const height = Number(imageHeight);

      const cropScale = 0.95;
      const offsetX = 0;
      const offsetY = 0;

      const size = Math.floor(Math.min(width, height) * cropScale);

      const originX = Math.max(
        0,
        Math.min(width - size, Math.floor((width - size) / 2 + offsetX))
      );

      const originY = Math.max(
        0,
        Math.min(height - size, Math.floor((height - size) / 2 + offsetY))
      );

      const context = ImageManipulator.manipulate(imageUri);

      context.crop({
        originX,
        originY,
        width: size,
        height: size,
      });

      const image = await context.renderAsync();
      const result = await image.saveAsync();

      setCroppedUri(result.uri);
      console.log('Image Cropped!');
    };

    cropImage().catch(console.error);
  }, [imageUri, imageWidth, imageHeight]);




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Taken!</Text>

      {croppedUri ? (
        <Image
          source={{ uri: croppedUri }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <Text>Cropping...</Text>
      )}


      <Pressable
        style={[buttonStyles.base, buttonStyles.primary]}
        onPress={async () => {
          try {
            const response = await ImageToBackend(croppedUri);

            console.log('HTTP status:', response.status);

            const sudoku: number[][] = await response.json();

            console.log('Backend response:', sudoku);

            router.push({
              pathname: '/show_grid',
              params: {
                grid: JSON.stringify(sudoku),
              },
            });
          } catch (error) {
            console.error('Scan failed:', error);
          }
        }}
        disabled={!croppedUri}
      >
        <Text style={buttonStyles.primaryText}>
          Scan
        </Text>
      </Pressable>

      <Pressable
        style={[buttonStyles.base, buttonStyles.primary]}
        onPress={() => router.replace('/scan_board')}
      >
        <Text style={buttonStyles.primaryText}>
          Retake Photo
        </Text>
      </Pressable>

    </View>
  );
}