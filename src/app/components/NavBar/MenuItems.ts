import { SvgIconComponent } from "@mui/icons-material"

import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ConstructionIcon from '@mui/icons-material/Construction';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

type MenuItem = {
    icon: SvgIconComponent;
    localeStr: string;
}

export const menuList: MenuItem[] = [
    {
        icon: HomeIcon,
        localeStr: "home",
    },
    {
        icon: AccountBoxIcon,
        localeStr: "profile",
    },
    {
        icon: EditNoteIcon,
        localeStr: "blog",
    },
    {
        icon: ConstructionIcon,
        localeStr: "project",
    },
    {
        icon: SportsEsportsIcon,
        localeStr: "games"
    }
] 
