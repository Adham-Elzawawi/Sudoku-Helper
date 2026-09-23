import { View, Text, Pressable } from 'react-native';
import { scanStyles as styles } from '../styles/scanStyles';
import {Image, StyleSheet} from 'react-native';



export default function image_scanned() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Image Taken!</Text>
        </View>
    );
}
