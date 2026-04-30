"use client"

import { Drawer, IconButton, Menu, MenuList, Stack } from "@mui/material";
import Logo from "../../assets/images/logo.jpg"
import Image from "next/image";
import SectionButton from "./SectionButton";
import useResponsiveSizing from "../hooks/useResponsiveSizing";

import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';

import { useRef, useState } from "react";
import { languageList, menuList } from "./MenuItems";
import LangOption from "./LangOption";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useLocalePathname, useLocaleRouter } from "@/i18n/routing";
import { Title3 } from "../styled/text";

const MobileMenu = () => {

    const router = useRouter();
    const localeRouter = useLocaleRouter();
    const localePathname = useLocalePathname();
    const locale = useLocale();
    const t = useTranslations("menu");
    
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

    return (
        <>
            <Image src={Logo.src} width={1} height={1} alt="" style={{ width: "3rem", height: "3rem" }} />
            <IconButton onClick={() => setIsDrawerOpened(true)}>
                <MenuIcon sx={{ fontSize: "1.5rem", color: "#3C3C3C" }} />
            </IconButton>
            <Drawer open={isDrawerOpened} onClose={() => setIsDrawerOpened(false)}>
                <MenuList sx={{ display: "flex", flexDirection: "column", width: "15rem", padding: 0 }}>
                    <Stack sx={{ width: "100%", height: "4rem", justifyContent: "center", pl: "1rem", pt: "1rem" }}>
                        <Image src={Logo.src} width={1} height={1} alt="" style={{ width: "3rem", height: "3rem" }} />
                    </Stack>
                    <Stack sx={{ width: "100%", justifyContent: "center", pl: "1rem", mt: "1.5rem", mb: "0.5rem" }}>
                        <Title3 color="#3C3C3C">{t("cates")}</Title3>
                    </Stack>
                    {menuList.map(({ icon, localeStr, path }) => (
                        <SectionButton
                            key={localeStr} Icon={icon} text={localeStr}
                            onClick={() => router.push(`/${locale}${path}`)}
                        />
                    ))}
                    <Stack sx={{ width: "100%", justifyContent: "center", pl: "1rem", mt: "1.5rem", mb: "0.5rem" }}>
                        <Title3 color="#3C3C3C">{t("language")}</Title3>
                    </Stack>
                    {languageList.map(({ locale, displayText }) => (
                        <LangOption
                            key={locale} text={displayText}
                            onClick={() => localeRouter.replace(localePathname, { locale })}
                        />
                    ))}
                </MenuList>
            </Drawer>
        </>
    )
}

const DesktopMenu = () => {

    const router = useRouter();
    const localeRouter = useLocaleRouter();
    const localePathname = useLocalePathname();
    const locale = useLocale();

    const [isLangMenuOpened, setIsLangMenuOpened] = useState<boolean>(false);
    const langButtonRef = useRef(null);

    return (
        <>
            <Image src={Logo.src} width={48} height={48} alt="" />
            <MenuList sx={{ display: "flex", flexDirection: "row", gap: "0.5rem", height: "100%", padding: 0 }}>
                {menuList.map(({ icon, localeStr, path }) => (
                    <SectionButton
                        key={localeStr} Icon={icon} text={localeStr}
                        onClick={() => router.push(`/${locale}${path}`)}
                    />
                ))}
            </MenuList>
            <Menu
                anchorEl={langButtonRef.current}
                open={isLangMenuOpened}
                onClose={() => setIsLangMenuOpened(false)}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: 'drop-shadow(0rem 0.5rem 0.5rem rgba(0,0,0,0.32))',
                            mt: "1.5rem",
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                left: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                        }
                    }
                }}
            >
                {languageList.map(({ locale, displayText }) => (
                    <LangOption
                        key={locale} text={displayText}
                        onClick={() => localeRouter.replace(localePathname, { locale })}
                    />
                ))}
            </Menu>
            <IconButton
                ref={langButtonRef}
                onClick={() => {
                    setIsLangMenuOpened(true)
                }}
            >
                <TranslateIcon sx={{ fontSize: "1.5rem", color: "#3C3C3C" }} />
            </IconButton>
        </>
    )
}

const NavBar = () => {

    const { isMobile } = useResponsiveSizing();

    return (
        <Stack 
            sx={{
                background: "white",
                width: "100%",
                height: "4rem",
                boxShadow: "0 0.25rem 0.75rem 0rem rgba(0,0,0,0.75)",
                borderBottom: "1px solid #AAAAAA",
                flexDirection: "row",
                justifyContent: isMobile ? "flex-start" : "center",
                alignItems: "center",
                gap: isMobile ? "1.5rem" : "3rem",
                position: "sticky",
                px: "1.5rem",
                top: "0",
                zIndex: 100
            }}
        >
            {isMobile ? <MobileMenu /> : <DesktopMenu />}    
        </Stack>
    )
}

export default NavBar;