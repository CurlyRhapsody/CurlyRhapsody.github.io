export function shuffleArray<T>(arr: T[]): T[] {
    const n: number = arr.length;
    for (let i: number = n - 1; i > 0; i--) {
        const p = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[p]] = [arr[p], arr[i]];
    }
    return arr;
}

export function sleep(interval: number) {
    return new Promise(resolve => setTimeout(resolve, interval));
}