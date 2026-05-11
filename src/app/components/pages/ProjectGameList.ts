import { SvgIconComponent } from "@mui/icons-material";
import WavingHandIcon from '@mui/icons-material/WavingHand';


type GameMenu = {
    id: string;
    Icon: SvgIconComponent;
}

export const gameList: GameMenu[] = [
    {
        id: "rps",
        Icon: WavingHandIcon
    }
]