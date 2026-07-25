import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";
import { preprocess, postprocess } from "./utils";

function getDigit(
    num: number,
    base: number,
    power: number,
): number {
    return Math.floor(num / Math.pow(base, power)) % base;
}

function countDigits(
    num: number,
    base: number
): number {
    if (num === 0) return 1;
    return Math.floor(Math.log(num) / Math.log(base)) + 1;
}

function getIterations(
    array: SortElement[],
    base: number
): number {
    let maxDigits = 0;
    const arrLen = array.length;
    for (let i = 0; i < arrLen; i++) {
        maxDigits = Math.max(maxDigits, countDigits(array[i].value, base));
    }
    return maxDigits;
}

export async function radixSort(
    array: SortElement[],
    base: number,
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;

    await preprocess(arr, setArray);

    const numIterations = getIterations(array, base);

    for (let k = 0; k < numIterations; k++) {
        const digitBuckets = Array.from({ length: base }, () => [] as SortElement[]);

        for (let i = 0; i < arr.length; i++) {

            await checkPause();
    
            const digit = getDigit(arr[i].value, base, k);
            arr[i].state = ElementState.COMPARING;
            setArray([...arr]);
            await sleep(interval);
    
            digitBuckets[digit].push(arr[i]);
    
            arr[i].state = ElementState.NORMAL;
        }

        arr = ([] as SortElement[]).concat(...digitBuckets);
        setArray([...arr]);
        await sleep(interval);
    }

    setArray([...arr]);
    await sleep(interval);

    await postprocess(arr, setArray);
}