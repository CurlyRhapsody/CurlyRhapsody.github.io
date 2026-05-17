"use client"

import { Stack } from "@mui/material";
import { Subtitle2, Title1 } from "../../styled/text";
import { useTranslations } from "next-intl";
import PageContainer from "../../styled/PageContainer";
import TabContainer from "../casino-sim/TabContainer";

const CasinoSimContainer = () => {

    const t = useTranslations("project.casino-sim");

    return (
        <PageContainer>
            <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem"  }}>
                <Title1>{t("title")}</Title1>
                <Subtitle2 sx={{ whiteSpace: "pre-wrap", textAlign: "center" }}>{t("disclaimer")}</Subtitle2>
            </Stack>
            <TabContainer />
        </PageContainer>
    )
}

export default CasinoSimContainer;