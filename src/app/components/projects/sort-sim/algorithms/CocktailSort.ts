import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";

export async function cocktailSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;
    let swapped = true;
    let start = 0;
    let end = arrLen - 1;
    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            await checkPause();

            arr[i].state = ElementState.COMPARING;
            arr[i+1].state = ElementState.COMPARING;
            setArray([...arr]);
            await sleep(interval);

            if (arr[i].value > arr[i+1].value) {
                arr[i].state = ElementState.SWAPPING;
                arr[i+1].state = ElementState.SWAPPING;
                
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]];

                setArray([...arr]);
                await sleep(interval);

                swapped = true;
            }

            await checkPause();
            
            arr[i].state = ElementState.NORMAL;
            arr[i+1].state = ElementState.NORMAL;
            setArray([...arr]);
        }

        if (!swapped) break;

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            await checkPause();

            arr[i].state = ElementState.COMPARING;
            arr[i+1].state = ElementState.COMPARING;
            setArray([...arr]);
            await sleep(interval);

            if (arr[i].value > arr[i+1].value) {
                arr[i].state = ElementState.SWAPPING;
                arr[i+1].state = ElementState.SWAPPING;
                
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]];

                setArray([...arr]);
                await sleep(interval);

                swapped = true;
            }

            await checkPause();
            
            arr[i].state = ElementState.NORMAL;
            arr[i+1].state = ElementState.NORMAL;
            setArray([...arr]);
        }

        start++;
    }
    
    for (let i = 0; i < arrLen; i++) {
        arr[i].state = ElementState.FINISHED;
        setArray([...arr]);
        await sleep(3)
    }
}