export function alwaysWin(throwEnum: number): number {
    return (throwEnum + 2) % 3;
}

export function alwaysLose(throwEnum: number): number {
    return (throwEnum + 1) % 3;
}

export function randomThrow(): number {
    return Math.floor(Math.random() * 3);
}

export function determineByLastThrow(playerLastThrow?: number, cpuLastThrow?: number): number {
    
    if ((!playerLastThrow || !cpuLastThrow) || (playerLastThrow === cpuLastThrow)) {
        return randomThrow();
    }

    // 1 = win, -1 = lose
    const previousCpuState = (cpuLastThrow - playerLastThrow + 4) % 3 - 1;

    // Chaotic factor: 6.67% random
    const doRandom = Math.floor(Math.random() * 15);
    if (doRandom === 0) return randomThrow();
    if (previousCpuState == 1) {
        // Switch up for winning move for last move
        return (cpuLastThrow + 1) % 3;
    }
    if (previousCpuState == -1) {
        // Switch up to play what could beat player
        return (playerLastThrow + 1) % 3;
    }

    return randomThrow();
}