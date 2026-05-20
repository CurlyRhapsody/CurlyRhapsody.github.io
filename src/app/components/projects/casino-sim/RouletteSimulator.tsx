import { Stack, Box, Typography, Button } from '@mui/material';
import { useState } from "react";
import { ROULETTE_NUMBERS } from './utils';
import Roulette from './Roulette';
import { useTranslations } from 'next-intl';
import RouletteWager from './RouletteWager';

const RouletteSimulator = () => {
    const [spinning, setSpinning] = useState<boolean>(false);
    const [marbleRotation, setMarbleRotation] = useState<number>(0);
    const [winningNumber, setWinningNumber] = useState<number | null>(null);
    const [hasSpun, setHasSpun] = useState<boolean>(false);

    const totalSegments = ROULETTE_NUMBERS.length;
    const degreesPerSegment = 360 / totalSegments;

    const handleSpin = () => {
        if (spinning) return;

        setSpinning(true);
        setHasSpun(true);
        setWinningNumber(null);

        const winningIndex = Math.floor(Math.random() * totalSegments);
        const selectedNumber = ROULETTE_NUMBERS[winningIndex];

        const targetTileAngle = winningIndex * degreesPerSegment;
        
        const extraLaps = 3600;
        
        const currentLapBase = Math.ceil(marbleRotation / 360) * 360;
        const finalMarbleRotation = currentLapBase + extraLaps + targetTileAngle;

        setMarbleRotation(finalMarbleRotation);

        setTimeout(() => {
            setSpinning(false);
            setWinningNumber(selectedNumber);
        }, 4000);
    };

    const handleReset = () => {
        setSpinning(false);
        setMarbleRotation(0);
        setWinningNumber(null);
        setHasSpun(false);
    };

    const t = useTranslations("project.casino-sim.roulette");

    return (
        <Stack sx={{ p: "3rem", alignItems: 'center', gap: "2rem", width: "100%" }}>
            <Roulette 
                degreesPerSegment={degreesPerSegment}
                marbleRotation={marbleRotation}
                hasSpun={hasSpun}
            />
            <Stack direction="row" sx={{ gap: "2rem" }}>
                <Button 
                    variant="contained" 
                    size="large" 
                    disabled={spinning} 
                    onClick={handleSpin}
                    sx={{ width: "10rem", p: "0.5rem" }}
                >
                    {t("spin")}
                </Button>
                <Button 
                    variant="outlined" 
                    size="large" 
                    disabled={spinning || !hasSpun} 
                    onClick={handleReset}
                    sx={{ width: "10rem", p: "0.5rem" }}
                >
                    {t("reset")}
                </Button>
            </Stack>
            <RouletteWager winning={winningNumber} />
        </Stack>
    );
}

export default RouletteSimulator;