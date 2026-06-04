import { ObstacleType, TileState } from "../providers/PathfindProvider";
import { SvgIconComponent } from '@mui/icons-material';

import CloseIcon from '@mui/icons-material/Close';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ForestIcon from '@mui/icons-material/Forest';
import WavesIcon from '@mui/icons-material/Waves';
import TerrainIcon from '@mui/icons-material/Terrain';
import { JSX } from "@emotion/react/jsx-runtime";

export const EmptyIcon = () => (<span />);

export const tileToIcon: Record<ObstacleType, SvgIconComponent | (() => JSX.Element)> = {
    [ObstacleType.AIR]: EmptyIcon,
    [ObstacleType.CLEAR]: CloseIcon,
    [ObstacleType.START]: LocationPinIcon,
    [ObstacleType.END]: SportsScoreIcon,
    [ObstacleType.WALL]: DashboardIcon,
    [ObstacleType.SNOW]: AcUnitIcon,
    [ObstacleType.FOREST]: ForestIcon,
    [ObstacleType.WATER]: WavesIcon,
    [ObstacleType.MOUNTAIN]: TerrainIcon
}

export const stateToColor: Record<TileState, string> = {
    [TileState.NORMAL]: "#FFFFFF",
    [TileState.DISCOVERED]: "#D2FFA5",
    [TileState.FOCUSED]: "#FFA5A5",
    [TileState.VISITED]: "#A5D3FF",
    [TileState.PATH]: "#FFFFA5",
}