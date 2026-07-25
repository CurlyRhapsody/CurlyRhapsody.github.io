import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";
import { preprocess, postprocess } from "./utils";

export async function bubbleSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;

    await preprocess(arr, setArray);

    for (let i = 0; i < arrLen - 1; i++) {
        for (let j = 0; j < arrLen - i - 1; j++) {
            await checkPause();

            arr[j].state = ElementState.COMPARING;
            arr[j+1].state = ElementState.COMPARING;
            setArray([...arr]);
            await sleep(interval);

            if (arr[j].value > arr[j+1].value) {
                await checkPause();
                arr[j].state = ElementState.SWAPPING;
                arr[j+1].state = ElementState.SWAPPING;
                
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];

                setArray([...arr]);
                await sleep(interval);
            }

            await checkPause();
            
            arr[j].state = ElementState.NORMAL;
            arr[j+1].state = ElementState.NORMAL;
            setArray([...arr]);
        }
    }
    
    await postprocess(arr, setArray);
}