import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";

async function _quickSort(
    array: SortElement[],
    interval: number,
    start: number,
    end: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    if (start >= end) return;

    const pivot = await partition(array, interval, start, end, setArray, checkPause);

    await _quickSort(array, interval, start, pivot - 1, setArray, checkPause);
    await _quickSort(array, interval, pivot + 1, end, setArray, checkPause);
}

async function partition(
    array: SortElement[],
    interval: number,
    start: number,
    end: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
): Promise<number> {

    // Pivot = first element of subarray
    const pivot = array[start];
    let ptr = start;

    array[start].state = ElementState.COMPARING;

    for (let comp = start+1; comp <= end; comp++) {
        await checkPause();

        array[comp].state = ElementState.COMPARING;
        setArray([...array]);
        await sleep(interval);

        if (array[comp].value < pivot.value) {
            ptr++;
            await checkPause();
            array[ptr].state = ElementState.SWAPPING;
            array[comp].state = ElementState.SWAPPING;

            [array[ptr], array[comp]] = [array[comp], array[ptr]];

            setArray([...array]);
            await sleep(interval);
        }

        await checkPause();
        array[ptr].state = ElementState.NORMAL;
        array[comp].state = ElementState.NORMAL;
        
        setArray([...array]);
        await sleep(interval);
    }

    await checkPause();
    array[start].state = ElementState.SWAPPING;
    array[ptr].state = ElementState.SWAPPING;

    [array[ptr], array[start]] = [array[start], array[ptr]];

    setArray([...array]);
    await sleep(interval);

    array[start].state = ElementState.NORMAL;
    array[ptr].state = ElementState.NORMAL;
    setArray([...array]);
    await sleep(interval);

    return ptr;
}

export async function quickSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;

    await _quickSort(arr, interval, 0, arrLen-1, setArray, checkPause);

    for (let i = 0; i < arrLen; i++) {
        arr[i].state = ElementState.FINISHED;
        setArray([...arr]);
        await sleep(3)
    }
}