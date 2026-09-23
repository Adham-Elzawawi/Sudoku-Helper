import { View, Text, Pressable } from 'react-native';
import { imageStyles as styles } from '../styles/ImageStyles';
import { buttonStyles as buttonStyles } from '../styles/buttonStyles';
import {Image, StyleSheet} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';




export default function image_scanned() {

    const { imageUri } = useLocalSearchParams<{ imageUri: string }>();

    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Image Taken!</Text>
            <Image source={{ uri: imageUri }} style={styles.image} />

            <Pressable 
            style={[buttonStyles.base, buttonStyles.primary]} 
            onPress={() => router.push('/scan_board')}
            >
            <Text style={buttonStyles.primaryText}>Retake Photo</Text>
            </Pressable>
        </View>

        
    );
}
