import { Stack, Button, Grid } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { useTranslations } from 'next-intl';
import { useCasinoSimContext } from '../providers/CasinoSimProvider';
import { useState } from 'react';
import DottedDice from './sic-bo/DottedDice';
import WagerTable from './sic-bo/WagerTable';

const SicBoSimulator = () => {

    const t = useTranslations("project.casino-sim.sic-bo");
    const { sicBoDice, rollSicBo } = useCasinoSimContext();
    const [animationTrigger, setAnimationTrigger] = useState<number>(0);

    return (
        <Stack sx={{ alignItems: "center", gap: "1rem", width: "100%" }}>
            <Button
                variant="contained"
                startIcon={<CasinoIcon sx={{ fontSize: "1.5rem" }} />}
                sx={{
                    p: "1rem", width: "12.5rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                    "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                }}
                onClick={() => { 
                    setAnimationTrigger(Math.random());
                    setTimeout(rollSicBo, 600);
                }}
            >
                {t("roll")}
            </Button>
            <Grid container columns={3} direction="row" sx={{ mt: "1rem", justifyContent: "center" }} spacing="3rem">
                {sicBoDice.map((die, index) => (
                    <Grid size={1} sx={{ width: "7.25rem", height: "10rem" }}>
                        <DottedDice
                            key={`dice-${index}`}
                            value={die}
                            animationTrigger={animationTrigger}
                        />
                    </Grid>
                ))}
            </Grid>
            <WagerTable />
        </Stack>
    )
}

export default SicBoSimulator;