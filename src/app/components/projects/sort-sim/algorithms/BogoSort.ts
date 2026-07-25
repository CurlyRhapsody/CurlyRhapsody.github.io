import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";
import { postprocess, preprocess } from "./utils";

// Since we will not animate shuffle and check sorted part, we can use non-async here
function isSorted(array: SortElement[]): boolean {
    const arrLen = array.length;
    for (var i = 1; i < arrLen; i++){
        if (array[i-1].value > array[i].value) {
            return false;
        }
    }
    return true;
}

function shuffle(array: SortElement[]): SortElement[] {
    var count = array.length, index;

    while(count > 0){
        index = Math.floor(Math.random() * count);
        count--;

        [array[count], array[index]] = [array[index], array[count]];
    }

    return array;
}

export async function bogoSort(
    array: SortElement[],
    interval: number,
    setArray: (arr: SortElement[]) => void,
    checkPause: () => Promise<void>,
) {
    let arr: SortElement[] = [...array];
    const arrLen = arr.length;

    await preprocess(arr, setArray);

    arr.forEach(el => el.state = ElementState.SWAPPING);

    while (!isSorted(arr)) {
        await checkPause();

        arr = shuffle(arr);
        setArray([...arr]);
        await sleep(interval)
    }

    await postprocess(arr, setArray);
}