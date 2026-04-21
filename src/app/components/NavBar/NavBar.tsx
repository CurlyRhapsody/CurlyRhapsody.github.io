"use client"

import { Drawer, IconButton, MenuList, Stack } from "@mui/material";
import Logo from "../../assets/images/logo.jpg"
import Image from "next/image";
import SectionButton from "./SectionButton";
import useResponsiveSizing from "../Provider/useResponsiveSizing";

import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';

import { useState } from "react";
import { menuList } from "./MenuItems";

const NavBar = () => {

    const { isMobile } = useResponsiveSizing();
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
    const [isBubbleOpened, setIsBubbleOpened] = useState<boolean>(false);

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
            <Image src={Logo.src} width={48} height={48} alt="" />
            {isMobile ? (
                <>
                    <IconButton onClick={() => setIsDrawerOpened(true)}>
                        <MenuIcon sx={{ fontSize: "1.5rem", color: "#3C3C3C" }} />
                    </IconButton>
                    <Drawer open={isDrawerOpened} onClose={() => setIsDrawerOpened(false)}>
                        <MenuList sx={{ display: "flex", flexDirection: "column", width: "15rem", padding: 0 }}>
                            <Stack sx={{ width: "100%", height: "5rem", justifyContent: "center", paddingLeft: "1rem" }}>
                                <Image src={Logo.src} width={48} height={48} alt="" />
                            </Stack>
                            {menuList.map(({ icon, localeStr }) => (
                                <SectionButton key={localeStr} Icon={icon} text={localeStr} />
                            ))}
                        </MenuList>
                    </Drawer>
                </>
            ) : (
                <>
                    <MenuList sx={{ display: "flex", flexDirection: "row", gap: "0.5rem", height: "100%", padding: 0 }}>
                        {menuList.map(({ icon, localeStr }) => (
                            <SectionButton key={localeStr} Icon={icon} text={localeStr} />
                        ))}
                    </MenuList>
                    <IconButton onClick={() => {
                        setIsBubbleOpened(true)
                    }}>
                        <TranslateIcon sx={{ fontSize: "1.5rem", color: "#3C3C3C" }} />
                    </IconButton>
                </>
            )}
            
        </Stack>
    )
}

export default NavBar;