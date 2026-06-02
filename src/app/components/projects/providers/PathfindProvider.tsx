"use client"

import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { useEffect } from 'react';
import { shuffleArray, sleep } from "../../utility/utils";
import useResponsiveSizing from '../../hooks/useResponsiveSizing';

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
    const [start, setStart] = useState<number[]>([2, 2]);
    const [end, setEnd] = useState<number[]>([0, 0]);

    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        const newGrid: Tile[][] = Array.from({ length: maxCols }, () => Array(maxCols).fill({ obstacle: ObstacleType.AIR, state: TileState.NORMAL }));
        setEnd([maxCols - 3, maxCols - 3]);
        newGrid[start[0]][start[1]] = { obstacle: ObstacleType.START, state: TileState.NORMAL };
        newGrid[maxCols - 3][maxCols - 3] = { obstacle: ObstacleType.END, state: TileState.NORMAL };
        setBoard(newGrid);
    }, [maxCols])


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

        }
        

        setIsSearching(false);
    }

    const reset = () => {
        const rows = board.length;
        const cols = board[0].length;
        const resetGrid = board.map(
            row => row.map(el => ({ obstacle: el.obstacle, state: TileState.NORMAL }))
        );
        setBoard(resetGrid);
    }

    const addTile = (row: number, column: number, tile: ObstacleType) => {
        const rows = board.length;
        const cols = board[0].length;

        const isStartTile = row === start[0] && column === start[1];
        const isEndTile = row === end[0] && column === end[1];

        if (isStartTile || isEndTile) return;

        if (row < 0 || row >= rows) return;
        if (column < 0 || column >= cols) return;
        
        // Deep copy
        const newGrid = board.map((r, rIdx) => 
            r.map((t, cIdx) => {
                if (rIdx === row && cIdx === column) {
                    return {
                        state: TileState.NORMAL,
                        obstacle: tile === ObstacleType.CLEAR ? ObstacleType.AIR : tile 
                    };
                }
                return t; 
            })
        );

        switch (tile) {
            case ObstacleType.START:
                newGrid[start[0]][start[1]].obstacle = ObstacleType.AIR;
                setStart([row, column]);
                newGrid[row][column].obstacle = tile;
                break;
            case ObstacleType.END:
                newGrid[end[0]][end[1]].obstacle = ObstacleType.AIR;
                setEnd([row, column]);
                newGrid[row][column].obstacle = tile;
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