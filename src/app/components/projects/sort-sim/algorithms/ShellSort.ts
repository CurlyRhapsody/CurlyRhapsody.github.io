import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";
import { preprocess, postprocess } from "./utils";

export async function shellSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;

    await preprocess(arr, setArray);

    for (let gap = arrLen >> 1; gap > 0; gap = gap >> 1) {
        for (let i = gap; i < arrLen; i++) {
            let curr = arr[i];
            let j = i;

            while (j >= gap && arr[j - gap].value >= curr.value) {
                await checkPause();
                arr[j].state = ElementState.COMPARING;
                arr[j - gap].state = ElementState.COMPARING;
                setArray([...arr]);
                await sleep(interval);

                arr[j] = arr[j - gap];
                arr[j].state = ElementState.SWAPPING;
                setArray([...arr]);
                await sleep(interval);

                j -= gap;
            }

            await checkPause();
            arr[j] = curr;
            arr.forEach(el => el.state = ElementState.NORMAL);
            setArray([...arr]);
            await sleep(interval);
        }
    }
    
    await postprocess(arr, setArray);
}