import { Stack } from "@mui/material";
import { Title1 } from "../../styled/text";
import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";

const RPSContainer = () => {

    const t = useTranslations("games.rps")

    return (
        <Stack sx={{ width: "100%", py: "2rem", alignItems: "center" }}>
            <Stack sx={{ width: "40rem", alignItems: "center", gap: "2rem" }}>
                <Title1>{t("title")}</Title1>
                <Stack direction="row" sx={{ gap: "1.5rem" }}>
                    <ShadowedStack sx={{ borderRadius: "1rem", background: "#FFFFFF", p: "1rem" }}>
                        WIP
                    </ShadowedStack>
                    <ShadowedStack sx={{ borderRadius: "1rem", background: "#FFFFFF", p: "1rem" }}>
                        ad
                    </ShadowedStack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default RPSContainer;