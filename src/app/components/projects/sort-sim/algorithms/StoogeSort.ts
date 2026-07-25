import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";
import { preprocess, postprocess } from "./utils";

async function _stoogeSort(
    arr: SortElement[],
    interval: number,
    start: number,
    end: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    await checkPause();

    arr[start].state = ElementState.COMPARING;
    arr[end].state = ElementState.COMPARING;
    setArray([...arr]);
    await sleep(interval);

    if (arr[start].value > arr[end].value) {

        await checkPause();

        arr[start].state = ElementState.SWAPPING;
        arr[end].state = ElementState.SWAPPING;

        [arr[start], arr[end]] = [arr[end], arr[start]];
        setArray([...arr]);
        await sleep(interval);
    }

    await checkPause();
            
    arr[start].state = ElementState.NORMAL;
    arr[end].state = ElementState.NORMAL;
    setArray([...arr]);

    if (end - start + 1 > 2) {
        const third = Math.floor((end - start + 1) / 3);

        await _stoogeSort(arr, interval, start, end - third, setArray, checkPause);
        await _stoogeSort(arr, interval, start + third, end, setArray, checkPause);
        await _stoogeSort(arr, interval, start, end - third, setArray, checkPause);
    }

}

export async function stoogeSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;

    await preprocess(arr, setArray);

    await _stoogeSort(arr, interval, 0, arrLen-1, setArray, checkPause);

    await postprocess(arr, setArray);
}