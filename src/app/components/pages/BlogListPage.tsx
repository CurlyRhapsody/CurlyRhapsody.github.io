"use client"

import { Stack } from "@mui/material";
import { Subtitle1, Title1 } from "../styled/text";
import { useTranslations } from "next-intl";
import DrawIcon from '@mui/icons-material/Draw';

const EmptyBlogList = () => {
    const t = useTranslations("blog");

    return (
        <Stack sx={{ alignItems: "center", gap: "1rem" }}>
            <DrawIcon sx={{ fontSize: "10rem" }} />
            <Subtitle1>{t("soon1")}</Subtitle1>
            <Subtitle1>{t("soon2")}</Subtitle1>
        </Stack>
    )
}

const BlogListPage = () => {

    const t = useTranslations("blog");

    return (
        <Stack sx={{ width: "100%", py: "4rem", alignItems: "center", gap: "4rem" }}>
            <Title1>{t("title")}</Title1>
            <EmptyBlogList />           
        </Stack>
    )
}

export default BlogListPage;