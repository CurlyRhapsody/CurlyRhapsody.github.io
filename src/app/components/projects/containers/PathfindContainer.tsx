import { Stack } from "@mui/material";
import PageContainer from "../../styled/PageContainer";
import { Subtitle1, Title1 } from "../../styled/text";
import { useTranslations } from "next-intl";
import PathfindPanel from "../pathfind/PathfindPanel";

const PathfindContainer = () => {

    const t = useTranslations("project.pathfind");

    return (
        <PageContainer>
            <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem"  }}>
                <Title1>{t("title")}</Title1>
                <Subtitle1>{t("subtitle")}</Subtitle1>
            </Stack>
            <PathfindPanel />
        </PageContainer>
    )
}

export default PathfindContainer;