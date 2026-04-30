"use client"

import { defaultLocale } from "@/i18n/config";
import { CircularProgress, Stack } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectClient = () => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        router.replace(`/${defaultLocale}${pathname}`);
    }, [router, pathname]);

    return (
        <Stack sx={{ justifyContent: "center", alignItems: "center", height: "100vh", background: "#00000080" }}>
            <CircularProgress size="4rem" sx={{ color: "white" }} />
        </Stack>
    );
}

export default RedirectClient;