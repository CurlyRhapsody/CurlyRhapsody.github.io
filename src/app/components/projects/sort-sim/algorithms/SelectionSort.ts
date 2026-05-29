import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";

export async function selectionSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;
    for (let i = 0; i < arrLen - 1; i++) {

        let minIndex = i;

        for (let j = i+1; j < arrLen; j++) {
            await checkPause();

            arr[minIndex].state = ElementState.COMPARING;
            arr[j].state = ElementState.COMPARING;
            setArray([...arr]);
            if (arr[j].value < arr[minIndex].value) {
                arr[minIndex].state = ElementState.NORMAL;
                minIndex = j;
            }
            await sleep(interval);
            arr[j].state = ElementState.NORMAL;
        }

        await checkPause();
        if (minIndex !== i) {
            arr[minIndex].state = ElementState.SWAPPING;
            arr[i].state = ElementState.SWAPPING;
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            setArray([...arr]);
            await sleep(interval);
        }

        arr.forEach(el => el.state = ElementState.NORMAL);
        setArray([...arr]);
    }
    
    for (let i = 0; i < arrLen; i++) {
        arr[i].state = ElementState.FINISHED;
        setArray([...arr]);
        await sleep(5)
    }
}