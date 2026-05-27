import { SvgIconComponent } from "@mui/icons-material";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import PaletteIcon from '@mui/icons-material/Palette';
import CasinoIcon from '@mui/icons-material/Casino';
import PetsIcon from '@mui/icons-material/Pets';
import CellTowerIcon from '@mui/icons-material/CellTower';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AvailablePlatform } from "../hooks/useAccessPlatform";

type ProjectMenu = {
    id: string;
    Icon: SvgIconComponent;
    available?: AvailablePlatform;
}

type GameMenu = {
    id: string;
    Icon: SvgIconComponent;
    available?: AvailablePlatform;
}

export const projectList: ProjectMenu[] = [
    {
        id: "color-calc",
        Icon: PaletteIcon
    },
    {
        id: "casino-sim",
        Icon: CasinoIcon
    },
    {
        id: "broadcast",
        Icon: CellTowerIcon,
        available: "DESKTOP"
    },
    {
        id: "sort-sim",
        Icon: BarChartIcon
    }
];

export const gameList: GameMenu[] = [
    {
        id: "rps",
        Icon: WavingHandIcon
    },
    {
        id: "pet-the-cat",
        Icon: PetsIcon
    }
]