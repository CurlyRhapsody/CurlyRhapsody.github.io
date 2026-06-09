import { useTranslations } from "next-intl";
import PageContainer from "../../styled/PageContainer";
import { Stack } from "@mui/material";
import { Subtitle2, Title1 } from "../../styled/text";
import DecoderTabContainer from "../decoders/DecoderTabContainer";

const DecodersContainer = () => {

    const t = useTranslations("project.decoders");

    return (
        <PageContainer>
            <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem"  }}>
                <Title1>{t("title")}</Title1>
                <Subtitle2 sx={{ whiteSpace: "pre-wrap", textAlign: "center" }}>{t("subtitle")}</Subtitle2>
            </Stack>
            <DecoderTabContainer />
        </PageContainer>
    )
}

export default DecodersContainer;