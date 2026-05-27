import { Stack } from "@mui/material";
import PageContainer from "../../styled/PageContainer";
import { Subtitle1, Title1 } from "../../styled/text";
import { useTranslations } from "next-intl";
import SortPanel from "../sort-sim/SortPanel";

const SortSimContainer = () => {

    const t = useTranslations("project.sort-sim")

    return (
        <PageContainer>
            <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem"  }}>
                <Title1>{t("title")}</Title1>
                <Subtitle1>{t("subtitle")}</Subtitle1>
            </Stack>
            <SortPanel />
        </PageContainer>
    )
}

export default SortSimContainer;