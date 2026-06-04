import { flushSync } from "react-dom";
import { ObstacleType, Tile, TileState } from "../../providers/PathfindProvider";
import { sleep } from "@/app/components/utility/utils";

export type Coordinate = {
    r: number;
    c: number;
}

export const terrainCost: Record<ObstacleType, number> =  {
    ".": 1,
    " ": 0,
    "S": 0,
    "E": 0,
    "X": Infinity,
    "N": 2,
    "T": 5,
    "W": 9,
    "M": 15
}

export function getNeighbours(row: number, column: number, sideLen: number, board: Tile[][]): Coordinate[] {
    const neighbours: Coordinate[] = [];
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = column + dc;

        if (newRow >= 0 && newRow < sideLen && newCol >= 0 && newCol < sideLen && board[newRow][newCol].obstacle !== ObstacleType.WALL) {
            neighbours.push({ r: newRow, c: newCol });
        }
    }

    return neighbours;
}

export function heuristic(pt: Coordinate, end: Coordinate) {
    return Math.abs(pt.c - end.c) + Math.abs(pt.r - end.r);
}

export function isSameCoords(
    a: Coordinate,
    b: Coordinate
) {
    return a.r === b.r && a.c === b.c;
}

export function updateBoardState(
    target: Coordinate,
    state: TileState,
    setBoard: React.Dispatch<React.SetStateAction<Tile[][]>>,
) {

    flushSync(() => {
        setBoard(oldBoard => {
            const newBoard = oldBoard.map((row) => row.map((tile) => ({ ...tile })));
            newBoard[target.r][target.c].state = state;
            return newBoard;
        })
    });
}

export async function reconstructPath(
    start: Coordinate, end: Coordinate,
    parentMap: Map<string, Coordinate | null>,
    board: Tile[][], setBoard: React.Dispatch<React.SetStateAction<Tile[][]>>,
) {
    let curr: Coordinate | null = end;
    board[end.r][end.c].state = TileState.PATH;
    setBoard(board);

    await sleep(1);

    while (curr !== null) {
        if (!isSameCoords(curr, end) && !isSameCoords(curr, start)) {
            board[curr.r][curr.c].state = TileState.PATH;
            updateBoardState(curr, TileState.PATH, setBoard);
        }
        curr = parentMap.get(`${curr.r},${curr.c}`) || null;
        await sleep(1);
    }

    board[start.r][start.c].state = TileState.PATH;
    setBoard(board);
}