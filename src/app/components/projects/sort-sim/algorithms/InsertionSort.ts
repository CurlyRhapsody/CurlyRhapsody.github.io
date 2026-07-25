import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";
import { preprocess, postprocess } from "./utils";

export async function insertionSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;

    await preprocess(arr, setArray);

    for (let i = 1; i < arrLen; i++) {
        await checkPause();

        let curr = arr[i];
        let j = i-1;

        arr[i].state = ElementState.COMPARING;
        setArray([...arr]);
        await sleep(interval);

        while (j >= 0 && arr[j].value > curr.value) {
            await checkPause();
            arr[j+1] = arr[j];
            arr[j+1].state = ElementState.SWAPPING;
            setArray([...arr]);
            await sleep(interval);

            j--;
        }
        
        await checkPause();
        arr[j+1] = curr;
        arr.forEach(el => el.state = ElementState.NORMAL);
        setArray([...arr]);
        await sleep(interval);
    }
    
    await postprocess(arr, setArray);
}