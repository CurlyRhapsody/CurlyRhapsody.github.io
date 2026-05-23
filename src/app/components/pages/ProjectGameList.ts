import { SvgIconComponent } from "@mui/icons-material";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import PaletteIcon from '@mui/icons-material/Palette';
import CasinoIcon from '@mui/icons-material/Casino';
import PetsIcon from '@mui/icons-material/Pets';

type ProjectMenu = {
    id: string;
    Icon: SvgIconComponent;
}

type GameMenu = {
    id: string;
    Icon: SvgIconComponent;
}

export const projectList: ProjectMenu[] = [
    {
        id: "color-calc",
        Icon: PaletteIcon
    },
    {
        id: "casino-sim",
        Icon: CasinoIcon
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