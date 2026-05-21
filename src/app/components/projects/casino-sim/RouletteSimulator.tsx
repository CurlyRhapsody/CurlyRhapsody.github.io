import { Stack, Box, Typography, Button } from '@mui/material';
import { useState } from "react";
import { ROULETTE_NUMBERS } from './utils';
import Roulette from './Roulette';
import { useTranslations } from 'next-intl';
import RouletteWager from './RouletteWager';

const RouletteSimulator = () => {
    const [spinning, setSpinning] = useState<boolean>(false);
    const [marbleRotation, setMarbleRotation] = useState<number>(0);
    const [wheelRotation, setWheelRotation] = useState<number>(0);
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

        const delta = Math.floor(Math.random() * totalSegments); 

        const selectedNumber = ROULETTE_NUMBERS[(winningIndex - delta + totalSegments) % totalSegments];

        const targetTileAngle = winningIndex * degreesPerSegment;
        const targetWheelAngle = delta * degreesPerSegment * -1;
        
        const extraLaps = 5400;
        const wheelExtraLaps = -2160;
        
        const currentLapBase = Math.ceil(marbleRotation / 360) * 360;
        const currentWheelLapBase = Math.ceil(wheelRotation / 360) * 360;
        const finalWheelRotation = currentWheelLapBase + wheelExtraLaps + targetWheelAngle;
        const finalMarbleRotation = currentLapBase + extraLaps + targetTileAngle + targetWheelAngle;

        setMarbleRotation(finalMarbleRotation);
        setWheelRotation(finalWheelRotation);

        setTimeout(() => {
            setSpinning(false);
            setWinningNumber(selectedNumber);
        }, 4000);
    };

    const handleReset = () => {
        setSpinning(false);
        setMarbleRotation(0);
        setWheelRotation(0);
        setWinningNumber(null);
        setHasSpun(false);
    };

    const t = useTranslations("project.casino-sim.roulette");

    return (
        <Stack sx={{ p: "2rem", alignItems: 'center', gap: "2rem", width: "100%" }}>
            <Roulette 
                degreesPerSegment={degreesPerSegment}
                marbleRotation={marbleRotation}
                wheelRotation={wheelRotation}
                hasSpun={hasSpun}
            />
            <Stack direction="row" sx={{ gap: "3rem" }}>
                <Button 
                    variant="contained" 
                    size="large" 
                    disabled={spinning} 
                    onClick={handleSpin}
                    sx={{ width: "12.5rem", p: "1rem", fontSize: "1.25rem" }}
                >
                    {t("spin")}
                </Button>
                <Button 
                    variant="outlined" 
                    size="large" 
                    disabled={spinning || !hasSpun} 
                    onClick={handleReset}
                    sx={{ width: "12.5rem", p: "1rem", fontSize: "1.25rem" }}
                >
                    {t("reset")}
                </Button>
            </Stack>
            <RouletteWager winning={winningNumber} />
        </Stack>
    );
}

export default RouletteSimulator;