import { sleep } from "@/app/components/utility/utils";
import { ElementState, SortElement } from "../../providers/SortSimProvider";

export async function preprocess(array: SortElement[], setArray: (arr: SortElement[]) => void): Promise<void> {
    let arr: SortElement[] = [...array];
    arr.forEach(el => el.state = ElementState.NORMAL);
    setArray([...arr]);
}

export async function postprocess(array: SortElement[], setArray: (arr: SortElement[]) => void): Promise<void> {
    let arr: SortElement[] = [...array];
    arr.forEach(el => el.state = ElementState.NORMAL);
    const arrLen = arr.length;

    for (let i = 0; i < arrLen; i++) {
        arr[i].state = ElementState.FINISHED;
        setArray([...arr]);
        await sleep(3)
    }
}