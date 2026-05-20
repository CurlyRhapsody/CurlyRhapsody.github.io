import { Stack, Box, styled } from '@mui/material';
import { Body1, Subtitle1 } from '../../styled/text';
import { useTranslations } from 'next-intl';
import { getNumberColor } from './utils';

const StyledStack = styled(Stack)({
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    border: "0.0625rem solid #161616"
})

const RouletteWager = ({
    winning
}: {
    winning: number | null;
}) => {
    const t = useTranslations("project.casino-sim.roulette");

    const dozen = (!!winning && winning !== 0) ? Math.floor((winning-1) / 12) + 1 : 0;
    const column = (!!winning && winning !== 0) ? ((winning-1) % 3) + 1 : 0;

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "1rem" }}>
            <Box>
                <Subtitle1 sx={{ textAlign: "center" }}>{t("winWagers")}</Subtitle1>
            </Box>
            <Box sx={{ width: "100%", height: "fit-content" }}>
                <Stack direction="row" sx={{ height: "5rem" }}>
                    <StyledStack sx={{ width: "30%"}}>
                        <Body1 sx={{ position: "absolute", left: "0.5rem", top: "0.5rem" }}>{t("color")}</Body1>
                        <Box
                            sx={{
                                width: "70%", height: "3rem",
                                background: (!!winning && winning !== 0) ? getNumberColor(winning) : "none",
                                clipPath: "polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)",
                            }}
                        />
                    </StyledStack>
                    <StyledStack sx={{ width: "40%" }}>
                        <Body1 sx={{ position: "absolute", left: "0.5rem", top: "0.5rem" }}>{t("number")}</Body1>
                        <Subtitle1>{(!!winning || winning === 0) ? winning : ""}</Subtitle1>
                    </StyledStack>
                    <StyledStack sx={{ width: "30%" }}>
                        <Body1 sx={{ position: "absolute", left: "0.5rem", top: "0.5rem" }}>{t("evenOdd")}</Body1>
                        <Subtitle1>{(!!winning && winning !== 0) ? (winning % 2 ? t("odd") : t("even")) : ""}</Subtitle1>
                    </StyledStack>
                </Stack>
                <Stack direction="row" sx={{ height: "5rem" }}>
                    <StyledStack sx={{ flex: 1 }}>
                        <Body1 sx={{ position: "absolute", left: "0.5rem", top: "0.5rem" }}>{t("lowHigh")}</Body1>
                        <Subtitle1>{(!!winning && winning !== 0) ? (winning <= 18 ? t("low") : t("high")) : ""}</Subtitle1>
                    </StyledStack>
                    <StyledStack sx={{ flex: 1 }}>
                        <Body1 sx={{ position: "absolute", left: "0.5rem", top: "0.5rem" }}>{t("dozen")}</Body1>
                        <Subtitle1>{(!!winning && winning !== 0) ? `#${dozen}` : ""}</Subtitle1>
                        <Body1>{(!!winning && winning !== 0) ? `${(dozen-1)*12+1}-${dozen*12}` : ""}</Body1>
                    </StyledStack>
                    <StyledStack sx={{ flex: 1 }}>
                        <Body1 sx={{ position: "absolute", left: "0.5rem", top: "0.5rem" }}>{t("column")}</Body1>
                        <Subtitle1>{(!!winning && winning !== 0) ? `#${column}` : ""}</Subtitle1>
                        <Body1>{(!!winning && winning !== 0) ? `${column}, ${column+3}, ${column+6}...` : ""}</Body1>
                    </StyledStack>
                </Stack>
            </Box>
        </Stack>
    )
}

export default RouletteWager;