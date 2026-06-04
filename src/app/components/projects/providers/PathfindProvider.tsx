"use client"

import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { useEffect } from 'react';
import { shuffleArray, sleep } from "../../utility/utils";
import useResponsiveSizing from '../../hooks/useResponsiveSizing';
import { Coordinate } from "../pathfind/algorithms/utils";
import * as PathfindingAlgorithms from "../pathfind/algorithms/index"

type Context = {
    board?: Tile[][];
    pathfindAlgo?: PathfindMethod;
    isSearching?: boolean;
    isPaused?: boolean;
    selectedTile?: ObstacleType;
    search: () => void;
    togglePause: () => void;
    reset: () => void;
    setPathfindAlgo: (newMethod: PathfindMethod) => void;
    setSelectedTile: (newTile: ObstacleType) => void;
    addTile: (row: number, column: number, tile: ObstacleType) => void;
}

export enum TileState {
    NORMAL = "Normal",
    DISCOVERED = "Discovered",
    FOCUSED = "Focused",
    VISITED = "Visited",
    PATH = "Path"
}

export enum ObstacleType {
    AIR = ".",
    CLEAR = " ",
    START = "S",
    END = "E",
    WALL = "X",
    SNOW = "N",
    FOREST = "T",
    WATER = "W",
    MOUNTAIN = "M"
}

export enum PathfindMethod {
    BFS = "bfs",
    DFS = "dfs",
    GBFS = "gbfs",
    DIJKSTRA = "dijkstra",
    ASTAR = "aStar",
}

export type Tile = {
    obstacle: ObstacleType;
    state: TileState;
}


const initContext: Context = {
    board: undefined,
    pathfindAlgo: undefined,
    isSearching: undefined,
    isPaused: undefined,
    selectedTile: undefined,
    search: () => { return; },
    togglePause: () => { return; },
    reset: () => { return; },
    setPathfindAlgo: () => { return; },
    setSelectedTile: () => { return; },
    addTile: () => { return; }
}


const PathfindContext = createContext<Context>(initContext);

const PathfindProvider = ({ children }: {children: React.ReactNode}) => {

    const { isWideDesktop } = useResponsiveSizing();

    const maxCols = isWideDesktop ? 32 : 20;

    const [board, setBoard] = useState<Tile[][]>([]);
    const [pathfindAlgo, setPathfindAlgo] = useState<PathfindMethod>(PathfindMethod.BFS);
    const [selectedTile, setSelectedTile] = useState<ObstacleType>(ObstacleType.WALL);
    const [start, setStart] = useState<Coordinate>({ r: 2, c: 2 });
    const [end, setEnd] = useState<Coordinate>({ r: 0, c: 0 });

    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        const newGrid: Tile[][] = Array.from({ length: maxCols }, () => Array(maxCols).fill({ obstacle: ObstacleType.AIR, state: TileState.NORMAL }));
        setEnd({ r: maxCols-3, c: maxCols-3 });
        newGrid[2][2] = { obstacle: ObstacleType.START, state: TileState.NORMAL };
        newGrid[maxCols - 3][maxCols - 3] = { obstacle: ObstacleType.END, state: TileState.NORMAL };
        setBoard(newGrid);
    }, [maxCols]);

    useEffect(() => {
        reset();
    }, [pathfindAlgo])

    const pauseRef = useRef<boolean>(false);

    const togglePause = () => {
        pauseRef.current = !pauseRef.current;
        setIsPaused(!isPaused)
    }

    const checkPause = async () => {
        while (pauseRef.current) {
            await sleep(100);
        }
    }

    const search = async () => {

        if (isSearching) return;
        setIsSearching(true);

        switch (pathfindAlgo) {
            case PathfindMethod.BFS:
                await PathfindingAlgorithms.BFS(start, end, board, setBoard, checkPause);
                break;
            case PathfindMethod.DFS:
                await PathfindingAlgorithms.DFS(start, end, board, setBoard, checkPause);
                break;
            case PathfindMethod.GBFS:
                await PathfindingAlgorithms.GBFS(start, end, board, setBoard, checkPause);
                break;
            case PathfindMethod.DIJKSTRA:
                await PathfindingAlgorithms.Dijkstra(start, end, board, setBoard, checkPause);
                break;
            case PathfindMethod.ASTAR:
                await PathfindingAlgorithms.AStar(start, end, board, setBoard, checkPause);
                break;
            default:
                await PathfindingAlgorithms.BFS(start, end, board, setBoard, checkPause);
                break;
        }
        

        setIsSearching(false);
    }

    const reset = () => {
        if (!board) return;
        const resetGrid = board.map(
            row => row.map(el => ({ obstacle: el.obstacle, state: TileState.NORMAL }))
        );
        setBoard(resetGrid);
    }

    const addTile = (row: number, column: number, tile: ObstacleType) => {
        const rows = board.length;
        const cols = board[0].length;

        const isStartTile = row === start.r && column === start.c;
        const isEndTile = row === end.r && column === end.c;

        if ((isStartTile || isEndTile) && tile !== ObstacleType.START && tile !== ObstacleType.END) return;

        if (row < 0 || row >= rows) return;
        if (column < 0 || column >= cols) return;
        
        // Deep copy
        const newGrid = board.map((row) => row.map((tile) => ({ ...tile })));

        switch (tile) {
            case ObstacleType.START:
                newGrid[start.r][start.c].obstacle = ObstacleType.AIR;
                setStart({ r: row, c: column });
                newGrid[row][column].obstacle = ObstacleType.START;
                break;
            case ObstacleType.END:
                newGrid[end.r][end.c].obstacle = ObstacleType.AIR;
                setEnd({ r: row, c: column });
                newGrid[row][column].obstacle = ObstacleType.END;
                break;
            case ObstacleType.CLEAR:
                newGrid[row][column].obstacle = ObstacleType.AIR;
                break;
            default:
                newGrid[row][column].obstacle = tile;
        }
        
        setBoard(newGrid);
    }

    return (
        <PathfindContext.Provider value={{
            board, pathfindAlgo, selectedTile, isSearching, isPaused,
            search, togglePause, reset, setPathfindAlgo, setSelectedTile, addTile
        }}>
            {children}
        </PathfindContext.Provider>
    )
}

export const usePathfindContext = () => {
    const context = useContext(PathfindContext);

    if (context === undefined) {
        throw Error("usePathfindContext must be wrapped inside PathfindProvider");
    }

    return context;
}

export default PathfindProvider;