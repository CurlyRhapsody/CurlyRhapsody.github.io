import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";

export async function gnomeSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;
    let index = 1;
    while (index < arrLen) {

        await checkPause();

        arr[index].state = ElementState.COMPARING;
        arr[index-1].state = ElementState.COMPARING;
        setArray([...arr]);
        await sleep(interval);

        if (index === 0 || arr[index].value >= arr[index-1].value) {
            arr[index].state = ElementState.NORMAL;
            arr[index-1].state = ElementState.NORMAL;
            index++;
        } else {
            arr[index].state = ElementState.COMPARING;
            arr[index-1].state = ElementState.COMPARING;
            [arr[index], arr[index-1]] = [arr[index-1], arr[index]];
            setArray([...arr]);
            await sleep(interval);

            arr[index].state = ElementState.NORMAL;
            arr[index-1].state = ElementState.NORMAL;
            index = index > 1 ? index - 1 : 1;
        }
    }
    
    for (let i = 0; i < arrLen; i++) {
        arr[i].state = ElementState.FINISHED;
        setArray([...arr]);
        await sleep(3)
    }
}