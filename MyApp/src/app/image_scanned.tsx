import { View, Text, Pressable, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ImageManipulator } from 'expo-image-manipulator';

import { imageStyles as styles } from '../styles/ImageStyles';
import { buttonStyles } from '../styles/buttonStyles';

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
      const size = Math.min(width, height);

      const context = ImageManipulator.manipulate(imageUri);

      context.crop({
        originX: Math.floor((width - size) / 2),
        originY: Math.floor((height - size) / 2),
        width: size,
        height: size,
      });

      const image = await context.renderAsync();
      const result = await image.saveAsync();

      setCroppedUri(result.uri);
    };

    console.log('Image Cropped!');

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
        onPress={() => router.replace('/scan_board')}
      >
        <Text style={buttonStyles.primaryText}>
          Retake Photo
        </Text>
      </Pressable>
    </View>
  );
}