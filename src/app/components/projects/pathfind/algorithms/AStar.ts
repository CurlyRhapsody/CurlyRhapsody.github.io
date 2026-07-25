import { Tile, TileState } from "../../providers/PathfindProvider";
import { Coordinate, getNeighbours, heuristic, isSameCoords, reconstructPath, terrainCost, updateBoardState } from './utils';
import { sleep } from "@/app/components/utility/utils";

type WeightedCoordinate = Coordinate & { cost: number };

export async function AStar(
    start: Coordinate,
    end: Coordinate,
    board: Tile[][],
    setBoard: React.Dispatch<React.SetStateAction<Tile[][]>>,
    checkPause: () => Promise<void>,
) {
    const gScore: Record<string, number> = {};
    const fScore: Record<string, number> = {};
    const pQueue: Coordinate[] = [start];
    const parentMap: Map<string, Coordinate | null> = new Map<string, Coordinate | null>();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            board[i][j].state = TileState.NORMAL;
        }
    }
    board[start.r][start.c].state = TileState.VISITED;
    setBoard(board);

    const startKey = `${start.r},${start.c}`;
    gScore[startKey] = 0;
    fScore[startKey] = heuristic(start, end);
    
    while (pQueue.length > 0) {
        pQueue.sort((a, b) => fScore[`${a.r},${a.c}`] - fScore[`${b.r},${b.c}`]);
        const current: Coordinate = pQueue.shift()!;

        board[current.r][current.c].state = TileState.FOCUSED;
        updateBoardState(current, TileState.FOCUSED, setBoard);

        if (isSameCoords({ r: current.r, c: current.c }, end)) {
            await reconstructPath(start, end, parentMap, board, setBoard);
            return;
        }

        checkPause();
        await sleep(1);

        for (const neighbor of getNeighbours(current.r, current.c, board.length, board)) {
            const finalGScore = gScore[`${current.r},${current.c}`] + terrainCost[board[neighbor.r][neighbor.c].obstacle];

            if (finalGScore < (gScore[`${neighbor.r},${neighbor.c}`] ?? Infinity)) {
                gScore[`${neighbor.r},${neighbor.c}`] = finalGScore;
                fScore[`${neighbor.r},${neighbor.c}`] = finalGScore + heuristic(neighbor, end);
                parentMap.set(`${neighbor.r},${neighbor.c}`, current);
                
                board[neighbor.r][neighbor.c].state = TileState.DISCOVERED;
                updateBoardState(neighbor, TileState.DISCOVERED, setBoard);
                pQueue.push(neighbor);
                
                checkPause();
                await sleep(1);
            }
        }

        board[current.r][current.c].state = TileState.VISITED;
        updateBoardState(current, TileState.VISITED, setBoard);
    }
}