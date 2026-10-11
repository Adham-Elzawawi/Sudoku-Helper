import { useLocalSearchParams, router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { View, Text, Pressable} from 'react-native';

import { homeStyles as styles } from '../styles/homeStyles';
import { buttonStyles } from '../styles/buttonStyles';


/*
 * Custom marker component for the slider.
 * @param index - The index of the marker.
 * @param stepMarked - A boolean indicating if the step is marked.
 * @returns A React component representing the marker.
 */
function CustomMarker({
    stepMarked
}: {
    index: number;
    stepMarked: boolean;
}) {
    if (stepMarked) {
        return (
            <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#007AFF',
            }} />
        );
    }


    return (
        <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#888888',
        }} />
    );
}

/**
 * Converts a percentage value to a descriptive word.
 * @param percent - The percentage value.
 * @returns The descriptive word.
 */
function percentToWord(percent: number): string {
    switch (percent) {
        case 25:
            return 'some';
        case 50:
            return 'half';
        case 75:
            return 'most';
        default:
            return 'all';

    }
}


export default function AmountToSolve() {
    // Get the grid parameter from the local search params to be passed to the next screen.
    const { grid, solvedGrid } = useLocalSearchParams<{ grid: string; solvedGrid: string }>();

    // State to hold the amount of the Sudoku puzzle to solve.
    const [amount, setAmount] = useState(25);
    // State to track if the slider is being pressed.
    const [isPressed, setIsPressed] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>How much to solve? </Text>
            <Text style={{fontSize:28, fontWeight: 'bold',}}> {percentToWord(amount)}</Text>
            <Slider
                style={{ width: '100%', height: 80, }}
                minimumValue={25}
                maximumValue={100}
                step={25}
                value={amount}
                onValueChange={setAmount}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#D3D3D3"
                thumbTintColor={isPressed ? '#007AFF' : '#AAAAAA'}
                onSlidingStart={() => setIsPressed(true)}
                onSlidingComplete={() => setIsPressed(false)}
                StepMarker={CustomMarker}
            />


            <Pressable
                style={[buttonStyles.base, buttonStyles.primary]}
                onPress={() => {
                    // Pass the grid and amount as parameters to the next screen.
                
                    router.push({
                        pathname: '/solved_sudoku',
                        params: {
                            grid: JSON.stringify(grid),
                            solvedGrid: JSON.stringify(solvedGrid),
                            amount: amount.toString(),
                        },
                    });
                }}
            >
                <Text style={buttonStyles.primaryText}>Solve</Text>
            </Pressable>
        </View>
    );
}
