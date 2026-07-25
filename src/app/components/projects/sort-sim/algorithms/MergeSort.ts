import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";
import { preprocess, postprocess } from "./utils";

async function _mergeSort(
    array: SortElement[],
    interval: number,
    start: number,
    end: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    if (start >= end) return;

    const mid = Math.floor((start + end)/2);

    await _mergeSort(array, interval, start, mid, setArray, checkPause);
    await _mergeSort(array, interval, mid+1, end, setArray, checkPause);
    await merge(array, interval, start, mid, end, setArray, checkPause);
}

async function merge(
    array: SortElement[],
    interval: number,
    start: number,
    mid: number,
    end: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let left = array.slice(start, mid+1);
    let right = array.slice(mid+1, end+1);

    let pLeft = 0, pRight = 0, idx = start;

    while (pLeft < left.length && pRight < right.length) {
        await checkPause();

        array[idx].state = ElementState.COMPARING;
        setArray([...array]);
        await sleep(interval);

        if (left[pLeft].value <= right[pRight].value) {
            array[idx] = { value: left[pLeft++].value, state: ElementState.SWAPPING };
        } else {
            array[idx] = { value: right[pRight++].value, state: ElementState.SWAPPING };
        }

        await checkPause();

        setArray([...array]);
        await sleep(interval);

        array[idx].state = ElementState.NORMAL;
        idx++;
    }

    while (pLeft < left.length) {
        await checkPause();
        array[idx] = { value: left[pLeft++].value, state: ElementState.SWAPPING };
        setArray([...array]);
        await sleep(interval);
        array[idx].state = ElementState.NORMAL;
        idx++;
    }

    while (pRight < right.length) {
        await checkPause();
        array[idx] = { value: right[pRight++].value, state: ElementState.SWAPPING };
        setArray([...array]);
        await sleep(interval);
        array[idx].state = ElementState.NORMAL;
        idx++;
    }

    setArray([...array]);

}

export async function mergeSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;

    await preprocess(arr, setArray);

    await _mergeSort(arr, interval, 0, arrLen-1, setArray, checkPause);

    await postprocess(arr, setArray);
}