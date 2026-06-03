import { flushSync } from "react-dom";
import { ObstacleType, Tile, TileState } from "../../providers/PathfindProvider";
import { Coordinate } from "./types";
import { sleep } from "@/app/components/utility/utils";

function getNeighbours(row: number, column: number, sideLen: number, board: Tile[][]): Coordinate[] {
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

function isSameCoords(
    a: Coordinate,
    b: Coordinate
) {
    return a.r === b.r && a.c === b.c;
}

async function reconstructPath(
    start: Coordinate, end: Coordinate,
    parentMap: Map<string, Coordinate | null>,
    board: Tile[][], setBoard: React.Dispatch<React.SetStateAction<Tile[][]>>,
) {
    let curr: Coordinate | null = end;
    board[end.r][end.c].state = TileState.PATH;
    setBoard(board);

    await sleep(5);

    while (curr !== null) {
        if (!isSameCoords(curr, end) && !isSameCoords(curr, start)) {
            board[curr.r][curr.c].state = TileState.PATH;
            flushSync(() => {
                setBoard(oldBoard => {
                    const newBoard = oldBoard.map((row) => row.map((tile) => ({ ...tile })));
                    newBoard[curr.r][curr.c].state = TileState.PATH;
                    return newBoard;
                })
            });
        }
        curr = parentMap.get(`${curr.r},${curr.c}`) || null;
        await sleep(5);
    }

    board[start.r][start.c].state = TileState.PATH;
    setBoard(board);
}

export async function BFS(
    start: Coordinate,
    end: Coordinate,
    board: Tile[][],
    setBoard: React.Dispatch<React.SetStateAction<Tile[][]>>,
    checkPause: () => Promise<void>,
) {
    const queue: Coordinate[] = [start];
    const parentMap: Map<string, Coordinate | null> = new Map<string, Coordinate | null>();

    board[start.r][start.c].state = TileState.VISITED;
    setBoard(board);

    parentMap.set(`${start.r},${start.c}`, null);

    await checkPause();
    await sleep(5);

    while (queue.length > 0) {
        const current: Coordinate = queue.shift()!;

        if (isSameCoords(current, end)) {
            await reconstructPath(start, end, parentMap, board, setBoard);
            return;
        }

        await checkPause();
        await sleep(5);
    
        for (const neighbor of getNeighbours(current.r, current.c, board.length, board)) {

            const key = `${neighbor.r},${neighbor.c}`;
            if (board[neighbor.r][neighbor.c].state === TileState.NORMAL) {

                await checkPause();
                await sleep(5);
                
                board[neighbor.r][neighbor.c].state = TileState.VISITED;
                flushSync(() => {
                    setBoard(oldBoard => {
                        const newBoard = oldBoard.map((row) => row.map((tile) => ({ ...tile })));
                        newBoard[neighbor.r][neighbor.c].state = TileState.VISITED;
                        return newBoard;
                    })
                });

                parentMap.set(key, current);

                queue.push(neighbor);
            }
        }
    }
}