import { StyleSheet } from 'react-native';

export const imageStyles = StyleSheet.create({
    image: {
    width: '75%',
    height: '75%',
    resizeMode: 'contain',
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 10,
    },

    container: {
        flex: 1,
        backgroundColor: '#111827',
        padding: 16,
        alignItems: 'center',

    },

    

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
    },
});