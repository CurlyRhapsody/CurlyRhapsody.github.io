import { Box, Grid, Stack, styled } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Subtitle1, Body1, Subtitle2 } from '@/app/components/styled/text';

const WagerGrid = styled(Grid)<{ isactive: boolean }>(({ isactive }) => ({
    display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
    border: "0.0625rem solid #161616",
    background: isactive ? "#FFF4B3" : "unset"
}))

export const CommonTripleWagers = ({ diceSum, isTriple, triple }: { diceSum: number; isTriple: boolean; triple?: number }) => {

    const t = useTranslations("project.casino-sim.sic-bo");

    return (
        <Stack direction="row">
            <Box sx={{ width: "25%" }}>
                <WagerGrid isactive={!isTriple && diceSum < 11} sx={{ height: "50%" }}>
                    <Subtitle1 sx={{ color: "#C20000" }}>{t("small")}</Subtitle1>
                    <Body1 sx={{ mt: "0.5rem" }}>4-10</Body1>
                </WagerGrid>
                <WagerGrid isactive={!isTriple && (diceSum % 2 === 1)} sx={{ height: "50%" }}>
                    <Subtitle1 sx={{ color: "#C20000" }}>{t("odd")}</Subtitle1>
                </WagerGrid>
            </Box>
            <Box sx={{ width: "50%" }}>
                <Box sx={{ border: "0.0625rem solid #161616" }}>
                    <Subtitle2 sx={{ width: "100%", textAlign: "center", py: "0.5rem" }}>{t("triples")}</Subtitle2>
                </Box>
                <Grid container direction="row" columns={3} sx={{ width: "100%", justifyContent: "space-between" }}>
                    {[...Array(6)].map((_, i) => {
                        const value = i+1;
                        return (
                            <WagerGrid key={`triple-wager-${value}`} isactive={(triple === value)} size={1} sx={{ aspectRatio: "5/2" }}>
                                <Subtitle1>{`${value}-${value}-${value}`}</Subtitle1>
                            </WagerGrid>
                        )
                    })}
                </Grid>
                <WagerGrid isactive={isTriple} sx={{ width: "100%", height: "25%" }}>
                    <Subtitle2 sx={{ width: "100%", textAlign: "center", py: "0.5rem" }}>{t("any")}</Subtitle2>
                </WagerGrid>
            </Box>
            <Box sx={{ width: "25%" }}>
                <WagerGrid isactive={!isTriple && diceSum > 10} sx={{ height: "50%" }}>
                    <Subtitle1 sx={{ color: "#C20000" }}>{t("big")}</Subtitle1>
                    <Body1 sx={{ mt: "0.5rem" }}>11-17</Body1>
                </WagerGrid>
                <WagerGrid isactive={!isTriple && (diceSum % 2 === 0)} sx={{ height: "50%" }}>
                    <Subtitle1 sx={{ color: "#C20000" }}>{t("even")}</Subtitle1>
                </WagerGrid>
            </Box>
        </Stack>
    )

}

export const ValueWagers = ({ diceSum, isTriple }: { diceSum: number; isTriple: boolean }) => {

    // NOTE: 3 and 18 Should be excluded due to triple takes all rule
    return (
        <Grid container direction="row" columns={7} sx={{ width: "100%", justifyContent: "space-between" }}>
            {[...Array(14)].map((_, i) => (
                <WagerGrid key={`value-wager-${i+4}`} isactive={!isTriple && (diceSum === (i + 4))} size={1} sx={{ aspectRatio: "3/1" }}>
                    <Subtitle1>{i+4}</Subtitle1>
                </WagerGrid>
            ))}
        </Grid>
    )
}

export const SingleDoubleWagers = ({ freqs, double, isTriple }: { freqs: { [value: number]: number }; double?: number; isTriple: boolean; }) => {

    const t = useTranslations("project.casino-sim.sic-bo");

    return (
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Box sx={{ border: "0.0625rem solid #161616", width: "45%" }}>
                <Subtitle2 sx={{ width: "100%", textAlign: "center", py: "0.5rem" }}>{t("singles")}</Subtitle2>
                <Grid container direction="row" columns={3} sx={{ width: "100%", justifyContent: "space-between" }}>
                    {[...Array(6)].map((_, i) => {
                        const value = i+1;
                        return (
                            <WagerGrid key={`single-wager-${value}`} isactive={!isTriple && !!freqs[value]} size={1} sx={{ aspectRatio: "2/1" }}>
                                <Subtitle1>{`${value}`}</Subtitle1>
                            </WagerGrid>
                        )
                    })}
                </Grid>
            </Box>
            <Box sx={{ border: "0.0625rem solid #161616", width: "10%" }} />
            <Box sx={{ border: "0.0625rem solid #161616", width: "45%" }}>
                <Subtitle2 sx={{ width: "100%", textAlign: "center", py: "0.5rem" }}>{t("doubles")}</Subtitle2>
                <Grid container direction="row" columns={3} sx={{ width: "100%", justifyContent: "space-between" }}>
                    {[...Array(6)].map((_, i) => {
                        const value = i+1;
                        return (
                            <WagerGrid key={`double-wager-${value}`} isactive={!isTriple && (double === value)} size={1} sx={{ aspectRatio: "2/1" }}>
                                <Subtitle1>{`${value}-${value}`}</Subtitle1>
                            </WagerGrid>
                        )
                    })}
                </Grid>
            </Box>
        </Stack>
    )
}

export const TwoDiceWagers = ({ freqs }: { freqs: { [value: number]: number }; }) => {

    const t = useTranslations("project.casino-sim.sic-bo");

    const diceValues = [1, 2, 3, 4, 5, 6];
    const pairs = diceValues.flatMap((lowVal, i) => 
        diceValues.slice(lowVal).map((highVal) => [lowVal, highVal])
    )

    return (
        <Box>
            <Box sx={{ border: "0.0625rem solid #161616" }}>
                <Subtitle2 sx={{ width: "100%", textAlign: "center", py: "0.5rem" }}>{t("2dc")}</Subtitle2>
            </Box>
            <Grid container direction="row" columns={5} sx={{ width: "100%", justifyContent: "space-between" }}>
                {pairs.map(([low, high], i) => {
                    return (
                        <WagerGrid key={`pair-wager-${low}-${high}`} isactive={!!freqs[low] && !!freqs[high]} size={1} sx={{ aspectRatio: "3/1" }}>
                            <Subtitle1>{`${low}-${high}`}</Subtitle1>
                        </WagerGrid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export const FourCombWagers = ({ freqs }: { freqs: { [value: number]: number }; }) => {

    const t = useTranslations("project.casino-sim.sic-bo");

    const satisfy = (v1: number, v2: number, v3: number, v4: number) => {
        const bingo = [!!freqs[v1], !!freqs[v2], !!freqs[v3], !!freqs[v4]].reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
        return bingo === 3;
    }
    
    return (
        <Box>
            <Box sx={{ border: "0.0625rem solid #161616" }}>
                <Subtitle2 sx={{ width: "100%", textAlign: "center", py: "0.5rem" }}>{t("3in4")}</Subtitle2>
            </Box>
            <Grid container direction="row" columns={4} sx={{ width: "100%", justifyContent: "space-between" }}>
                <WagerGrid isactive={satisfy(1, 2, 3, 4)} size={1} sx={{ aspectRatio: "5/2", flexDirection: "row", gap: "1rem" }}>
                    <Subtitle1 sx={{ color: !!freqs[1] ? "#C20000" : "#000000" }}>1</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[2] ? "#C20000" : "#000000" }}>2</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[3] ? "#C20000" : "#000000" }}>3</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[4] ? "#C20000" : "#000000" }}>4</Subtitle1>
                </WagerGrid>
                <WagerGrid isactive={satisfy(2, 3, 4, 5)} size={1} sx={{ aspectRatio: "5/2", flexDirection: "row", gap: "1rem" }}>
                    <Subtitle1 sx={{ color: !!freqs[2] ? "#C20000" : "#000000" }}>2</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[3] ? "#C20000" : "#000000" }}>3</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[4] ? "#C20000" : "#000000" }}>4</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[5] ? "#C20000" : "#000000" }}>5</Subtitle1>
                </WagerGrid>
                <WagerGrid isactive={satisfy(2, 3, 5, 6)} size={1} sx={{ aspectRatio: "5/2", flexDirection: "row", gap: "1rem" }}>
                    <Subtitle1 sx={{ color: !!freqs[2] ? "#C20000" : "#000000" }}>2</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[3] ? "#C20000" : "#000000" }}>3</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[5] ? "#C20000" : "#000000" }}>5</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[6] ? "#C20000" : "#000000" }}>6</Subtitle1>
                </WagerGrid>
                <WagerGrid isactive={satisfy(3, 4, 5, 6)} size={1} sx={{ aspectRatio: "5/2", flexDirection: "row", gap: "1rem" }}>
                    <Subtitle1 sx={{ color: !!freqs[3] ? "#C20000" : "#000000" }}>3</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[4] ? "#C20000" : "#000000" }}>4</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[5] ? "#C20000" : "#000000" }}>5</Subtitle1>
                    <Subtitle1 sx={{ color: !!freqs[6] ? "#C20000" : "#000000" }}>6</Subtitle1>
                </WagerGrid>
            </Grid>
        </Box>
    )
}

export const WildWagers = ({ encoded, hasDouble, isTriple }: { encoded: string; hasDouble: boolean; isTriple: boolean }) => {

    const t = useTranslations("project.casino-sim.sic-bo");

    return (
        <Box>
            <Box sx={{ border: "0.0625rem solid #161616" }}>
                <Body1 sx={{ width: "100%", textAlign: "center", py: "0.5rem" }}>{t("winningOnly")}</Body1>
            </Box>
            <Grid container direction="row" columns={2} sx={{ width: "100%", justifyContent: "space-between" }}>
                <WagerGrid isactive={!isTriple && !hasDouble} sx={{ aspectRatio: "4/1" }} size={1}>
                    <Body1>{t("3singles")}</Body1>
                    <Subtitle1 sx={{ mt: "0.5rem" }}>{(!isTriple && !hasDouble) ? encoded : t("none")}</Subtitle1>
                </WagerGrid>
                <WagerGrid isactive={!isTriple && hasDouble} sx={{ aspectRatio: "4/1" }} size={1}>
                    <Body1>{t("2p1")}</Body1>
                    <Subtitle1 sx={{ mt: "0.5rem" }}>{(!isTriple && hasDouble) ? encoded : t("none")}</Subtitle1>
                </WagerGrid>
            </Grid>
        </Box>
    )
}