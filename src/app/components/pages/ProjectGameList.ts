import { SvgIconComponent } from "@mui/icons-material";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import PaletteIcon from '@mui/icons-material/Palette';

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
    }
];

export const gameList: GameMenu[] = [
    {
        id: "rps",
        Icon: WavingHandIcon
    }
]