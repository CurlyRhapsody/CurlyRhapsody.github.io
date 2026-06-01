import { ObstacleType } from "../providers/PathfindProvider";
import { SvgIconComponent } from '@mui/icons-material';

import CloseIcon from '@mui/icons-material/Close';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ForestIcon from '@mui/icons-material/Forest';
import WavesIcon from '@mui/icons-material/Waves';
import TerrainIcon from '@mui/icons-material/Terrain';

export const tileToIcon: Record<ObstacleType, SvgIconComponent | undefined> = {
    [ObstacleType.AIR]: undefined,
    [ObstacleType.CLEAR]: CloseIcon,
    [ObstacleType.START]: LocationPinIcon,
    [ObstacleType.END]: SportsScoreIcon,
    [ObstacleType.WALL]: DashboardIcon,
    [ObstacleType.SNOW]: AcUnitIcon,
    [ObstacleType.FOREST]: ForestIcon,
    [ObstacleType.WATER]: WavesIcon,
    [ObstacleType.MOUNTAIN]: TerrainIcon
}