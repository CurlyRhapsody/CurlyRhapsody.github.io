import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";
import { preprocess, postprocess } from "./utils";

export async function countSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    await preprocess(arr, setArray);

    const min = Math.min(...arr.map((el) => el.value));
    const max = Math.max(...arr.map((el) => el.value));
    const freqs = Array(max - min + 1).fill(0);
    const freqRange = freqs.length;
    const arrLen = arr.length;
    for (let i = 0; i < arrLen; i++) {
        await checkPause();
        arr[i].state = ElementState.COMPARING;

        freqs[arr[i].value - min]++;

        setArray([...arr]);
        await sleep(interval);
    }

    let ptr = 0;

    for (let i = 0; i < freqRange; i++) {
        const freq = freqs[i];
        for (let j = 0; j < freq; j++) {
            await checkPause();

            arr[ptr].value = min + i;
            arr[ptr].state = ElementState.SWAPPING;
            setArray([...arr]);
            await sleep(interval);

            ptr++;
        }
    }
    
    await postprocess(arr, setArray);
}