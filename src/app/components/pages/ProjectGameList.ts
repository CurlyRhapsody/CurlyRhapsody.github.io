import { SvgIconComponent } from "@mui/icons-material";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import PaletteIcon from '@mui/icons-material/Palette';
import CasinoIcon from '@mui/icons-material/Casino';
import PetsIcon from '@mui/icons-material/Pets';
import CellTowerIcon from '@mui/icons-material/CellTower';
import BarChartIcon from '@mui/icons-material/BarChart';
import RouteIcon from '@mui/icons-material/Route';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import PatternIcon from '@mui/icons-material/Pattern';

import { AvailablePlatform } from "../hooks/useAccessPlatform";
import { AvailableProjects } from "@/app/[locale]/projects/[project]/params";
import { AvailableGames } from "@/app/[locale]/games/[game]/params";

type ProjectMenu = {
    id: AvailableProjects;
    Icon: SvgIconComponent;
    available?: AvailablePlatform;
}

type GameMenu = {
    id: AvailableGames;
    Icon: SvgIconComponent;
    available?: AvailablePlatform;
}

export const projectList: ProjectMenu[] = [
    {
        id: AvailableProjects.COLOR_CALCULATOR,
        Icon: PaletteIcon
    },
    {
        id: AvailableProjects.CASINO_SIM,
        Icon: CasinoIcon
    },
    {
        id: AvailableProjects.BROADCAST,
        Icon: CellTowerIcon,
        available: "DESKTOP"
    },
    {
        id: AvailableProjects.SORT_SIM,
        Icon: BarChartIcon
    },
    {
        id: AvailableProjects.PATHFIND,
        Icon: RouteIcon
    },
    {
        id: AvailableProjects.MEAL_SPLIT,
        Icon: DinnerDiningIcon
    },
    {
        id: AvailableProjects.DECODERS,
        Icon: PatternIcon
    }
];

export const gameList: GameMenu[] = [
    {
        id: AvailableGames.RPS,
        Icon: WavingHandIcon
    },
    {
        id: AvailableGames.PET_THE_CAT,
        Icon: PetsIcon
    }
]