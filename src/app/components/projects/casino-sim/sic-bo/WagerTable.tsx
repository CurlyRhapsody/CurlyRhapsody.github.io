import { useTranslations } from 'next-intl';
import { Stack, Box } from '@mui/material';
import { Subtitle1, Body1 } from '../../../styled/text';
import { useCasinoSimContext } from '../../providers/CasinoSimProvider';
import { useMemo } from 'react';
import { evaluateSicBo } from '../utils';
import { CommonTripleWagers, FourCombWagers, SingleDoubleWagers, TwoDiceWagers, ValueWagers, WildWagers } from './Wagers';

const WagerTable = () => {

    const t = useTranslations("project.casino-sim.sic-bo");

    const { sicBoDice } = useCasinoSimContext();
    const sicBoInfo = useMemo(() => evaluateSicBo(sicBoDice), [sicBoDice])

    if (!sicBoInfo) return null;

    const { sum, encoded, isTriple, triple, hasDouble, double, freqs } = sicBoInfo;

    return (
        <Stack sx={{ width: "100%", alignItems: "center", gap: "2rem" }}>
            <Box>
                <Subtitle1 sx={{ textAlign: "center" }}>{t("winWagers")}</Subtitle1>
                <Body1 sx={{ textAlign: "center" }}>{t("rateVaries")}</Body1>
            </Box>
            <Box sx={{ width: "100%" }}>
                <CommonTripleWagers diceSum={sum} isTriple={isTriple} triple={triple} />
                <ValueWagers diceSum={sum} isTriple={isTriple} />
                <SingleDoubleWagers freqs={freqs} double={double} isTriple={isTriple} />
                <TwoDiceWagers freqs={freqs} />
                <FourCombWagers freqs={freqs} />
                <WildWagers encoded={encoded} hasDouble={hasDouble} isTriple={isTriple} />
            </Box>
        </Stack>
    )
}

export default WagerTable;