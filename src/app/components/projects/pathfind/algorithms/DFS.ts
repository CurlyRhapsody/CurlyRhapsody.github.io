import { Tile, TileState } from "../../providers/PathfindProvider";
import { Coordinate, getNeighbours, isSameCoords, reconstructPath, updateBoardState } from "./utils";
import { sleep } from "@/app/components/utility/utils";

export async function DFS(
    start: Coordinate,
    end: Coordinate,
    board: Tile[][],
    setBoard: React.Dispatch<React.SetStateAction<Tile[][]>>,
    checkPause: () => Promise<void>,
) {
    const stack: Coordinate[] = [start];
    const parentMap: Map<string, Coordinate | null> = new Map<string, Coordinate | null>();

    board[start.r][start.c].state = TileState.VISITED;
    setBoard(board);

    parentMap.set(`${start.r},${start.c}`, null);

    while (stack.length > 0) {
        const current: Coordinate = stack.pop()!;

        board[current.r][current.c].state = TileState.FOCUSED;
        updateBoardState(current, TileState.FOCUSED, setBoard);

        if (isSameCoords(current, end)) {
            await reconstructPath(start, end, parentMap, board, setBoard);
            return;
        }

        await checkPause();
        await sleep(1);
    
        for (const neighbor of getNeighbours(current.r, current.c, board.length, board)) {

            if (![TileState.VISITED, TileState.DISCOVERED].includes(board[neighbor.r][neighbor.c].state)) {

                const key = `${neighbor.r},${neighbor.c}`;
                
                board[neighbor.r][neighbor.c].state = TileState.DISCOVERED;
                updateBoardState(neighbor, TileState.DISCOVERED, setBoard);

                parentMap.set(key, current);

                stack.push(neighbor);
            }
        }

        await checkPause();
        await sleep(1);

        board[current.r][current.c].state = TileState.VISITED;
        updateBoardState(current, TileState.VISITED, setBoard);
    }
}