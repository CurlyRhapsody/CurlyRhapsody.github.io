import { SvgIconComponent } from "@mui/icons-material"

import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ConstructionIcon from '@mui/icons-material/Construction';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Locale } from "@/i18n/config";

type MenuItem = {
    icon: SvgIconComponent;
    localeStr: string;
    path: string;
}

type LangMenuItem = {
    locale: Locale;
    displayText: string;
}

export const menuList: MenuItem[] = [
    {
        icon: HomeIcon,
        localeStr: "home",
        path: "",
    },
    {
        icon: AccountBoxIcon,
        localeStr: "about",
        path: "/about",
    },
    {
        icon: EditNoteIcon,
        localeStr: "blog",
        path: "/blog",
    },
    {
        icon: ConstructionIcon,
        localeStr: "project",
        path: "/project",
    },
    {
        icon: SportsEsportsIcon,
        localeStr: "games",
        path: "/games",
    }
] 

export const languageList: LangMenuItem[] = [
    {
        locale: "en",
        displayText: "English",
    },
    {
        locale: "zh",
        displayText: "中文"
    }
]