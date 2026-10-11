function toNotAdd(
    grid: number[][],
    solvedIndexes: number[][],
    amount: number
): number[][] {
    if (amount <= 0 || amount >= 100) {
        return grid;
    }

    const result = grid.map(row => [...row]);

    for (const [i, j] of solvedIndexes) {
        if (Math.random() >= amount / 100) {
            result[i][j] = -1;
        }
    }

    return result;
}

export default toNotAdd;
