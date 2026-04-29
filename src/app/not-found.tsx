"use client"

import { Button, Stack } from "@mui/material";
import { Subtitle1, Title1 } from "./components/styled/text";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import "@/app/globals.css";
import Dusted from "@/app/assets/gif/dusted.gif"
import HomeIcon from '@mui/icons-material/Home';
import { Suspense } from "react";

export default function NotFound() {

    const pathname = usePathname();
    const router = useRouter();

    const locale = pathname.split("/")[1] === "zh" ? "zh" : "en";

    const dict = locale === "zh"
        ? {
            "title": "噢不！",
            "desc": "看來這一頁並不存在。",
            "goHome": "返回主頁"
        } : {
            "title": "Oh no!",
            "desc": "Looks like this page is off limits.",
            "goHome": "Take me home"
        }

    return (
        <Stack sx={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)", gap: "2rem", alignItems: "center" }}>
            <Title1>{dict.title}</Title1>
            <Subtitle1>{dict.desc}</Subtitle1>
            <Stack sx={{ width: "15rem", height: "15rem", p: "2.25rem", borderRadius: "2.25rem", background: "white" }}>
                <Image src={Dusted.src} alt="" width={1} height={1} style={{ width: "100%", height: "100%" }} />
            </Stack>
            <Button
                variant="contained"
                sx={{
                    p: "1rem", background: "#5897EE", width: "100%", color: "white", borderRadius: "0.5rem", fontSize: "1.25rem",
                    "&:hover": { background: "#4678BE" }
                }}
                startIcon={<HomeIcon sx={{ fontSize: "1.25rem" }} />}
                onClick={() => router.push(`/${locale}`)}
            >
                {dict.goHome}
            </Button>
        </Stack>
    );
}