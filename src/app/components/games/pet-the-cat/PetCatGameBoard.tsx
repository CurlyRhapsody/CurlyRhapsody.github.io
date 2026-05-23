import { Box } from '@mui/material';
import { ShadowedStack } from '../../styled/component';
import { Body1 } from '../../styled/text';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export enum CatState {
    CALM = "CALM",
    WARNING = "WARNING",
    GLARING = "GLARING",
    ATTACKED = "ATTACKED"
}

const PetCatGameBoard = () => {
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useState<number>(0);
    const [catState, setCatState] = useState<CatState>(CatState.CALM);

    const t = useTranslations("games.pet-the-cat");

    return (
        <ShadowedStack sx={{ background: "#FFFFFF", p: "1rem", borderRadius: "1rem", width: "100%" }}>
            <Box sx={{ m: "2rem" }}>
                <Body1>{t("score", { score })}</Body1>
            </Box>
        </ShadowedStack>
    )
}

export default PetCatGameBoard;