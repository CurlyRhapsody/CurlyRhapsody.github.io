import { Tile, TileState } from "../../providers/PathfindProvider";
import { Coordinate, getNeighbours, isSameCoords, reconstructPath, terrainCost, updateBoardState } from './utils';
import { sleep } from "@/app/components/utility/utils";

type WeightedCoordinate = Coordinate & { cost: number };

export async function Dijkstra(
    start: Coordinate,
    end: Coordinate,
    board: Tile[][],
    setBoard: React.Dispatch<React.SetStateAction<Tile[][]>>,
    checkPause: () => Promise<void>,
) {
    const gScore: Record<string, number> = {};
    const pQueue: WeightedCoordinate[] = [{ ...start, cost: 0 }];
    const parentMap: Map<string, Coordinate | null> = new Map<string, Coordinate | null>();

    board[start.r][start.c].state = TileState.VISITED;
    setBoard(board);

    gScore[`${start.r},${start.c}`] = 0;
    
    while (pQueue.length > 0) {
        pQueue.sort((a, b) => a.cost - b.cost);
        const current: WeightedCoordinate = pQueue.shift()!;

        board[current.r][current.c].state = TileState.FOCUSED;
        updateBoardState(current, TileState.FOCUSED, setBoard);

        if (isSameCoords({ r: current.r, c: current.c }, end)) {
            await reconstructPath(start, end, parentMap, board, setBoard);
            return;
        }

        checkPause();
        await sleep(1);

        for (const neighbor of getNeighbours(current.r, current.c, board.length, board)) {
            const tileCost = terrainCost[board[neighbor.r][neighbor.c].obstacle] ?? 1;
            const newCost = gScore[`${current.r},${current.c}`] + tileCost;

            if (newCost < (gScore[`${neighbor.r},${neighbor.c}`] ?? Infinity)) {
                gScore[`${neighbor.r},${neighbor.c}`] = newCost;
                parentMap.set(`${neighbor.r},${neighbor.c}`, current);
                
                board[neighbor.r][neighbor.c].state = TileState.DISCOVERED;
                updateBoardState(neighbor, TileState.DISCOVERED, setBoard);
                pQueue.push({ ...neighbor, cost: newCost });
                
                checkPause();
                await sleep(1);
            }
        }

        board[current.r][current.c].state = TileState.VISITED;
        updateBoardState(current, TileState.VISITED, setBoard);
    }
}