import { Box, Stack } from '@mui/material';
import { ShadowedStack } from '../../styled/component';
import { Body1, Subtitle1 } from '../../styled/text';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Cat from './Cat';
import useThrottle from '../../hooks/useThrottle';
import GameOverContainer from './GameOverContainer';

import Idle1 from "@/app/assets/audio/pet-cat/idle1.mp3"
import Idle2 from "@/app/assets/audio/pet-cat/idle2.mp3"
import Idle3 from "@/app/assets/audio/pet-cat/idle3.mp3"
import Idle4 from "@/app/assets/audio/pet-cat/idle4.mp3"
import Purr from "@/app/assets/audio/pet-cat/purr.mp3"
import Attack from "@/app/assets/audio/pet-cat/attack.mp3"


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

    const stateRef = useRef<CatState>(catState);
    const scoreRef = useRef<number>(score);
    const soundRef = useRef<HTMLAudioElement | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        stateRef.current = catState;
        if (catState === CatState.CALM) {
            const idleSounds = [Idle1, Idle2, Idle3, Idle4];
            const sound = idleSounds[Math.floor(Math.random() * idleSounds.length)];
            soundRef.current = new Audio(sound);
            soundRef.current.volume = 0.8;
        }
        if (catState === CatState.WARNING) {
            soundRef.current = new Audio(Purr);
            soundRef.current.volume = 1;
        }
        if (catState === CatState.ATTACKED) {
            soundRef.current = new Audio(Attack);
            soundRef.current.volume = 0.8;
        }
        if (!!soundRef.current) {
            soundRef.current.pause();
            soundRef.current.currentTime = 0;
            soundRef.current.play();
        }
    }, [catState]);
    useEffect(() => { scoreRef.current = score; }, [score]);

    const triggerCatTurn = (): void => {
        setCatState(CatState.WARNING);

        timeoutRef.current = setTimeout(() => {
            if (stateRef.current === CatState.ATTACKED) return;
            
            setCatState(CatState.GLARING);

            const stareDuration = Math.random() * 1200 + 800;
            
            timeoutRef.current = setTimeout(() => {
                if (stateRef.current === CatState.ATTACKED) return;
                
                setCatState(CatState.CALM);
            }, stareDuration);

        }, 500);
    };

    const handleMouseMove = (): void => {
        if (catState === CatState.ATTACKED) return;
    
        if (catState === CatState.GLARING) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setHighScore(Math.max(highScore, score));
            setCatState(CatState.ATTACKED);
        } else {
            setScore((prev) => prev + 1);
        }

        if (catState === CatState.WARNING) {
            if (Math.random() > 0.95) {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setHighScore(Math.max(highScore, score));
                setCatState(CatState.ATTACKED);
                return;
            }
        }

        if (catState === CatState.CALM) {
            setScore((prev) => prev + 1);
        
            if (Math.random() < 0.15) {
                triggerCatTurn();
            }
        }
    };

    const debouncedHandleMove = useThrottle(handleMouseMove, 500);

    const reset = () => {
        setScore(0);
        setCatState(CatState.CALM);
    }

    const t = useTranslations("games.pet-the-cat");

    return (
        <ShadowedStack sx={{ background: "#FFFFFF", p: "1rem", borderRadius: "1rem", width: "100%", gap: "2rem", alignItems: "center" }}>
            <Stack direction="row" sx={{ py: "2rem", width: "36rem", justifyContent: "space-around" }}>
                <Subtitle1 sx={{ textAlign: "center", py: "2rem" }}>{t("score", { score })}</Subtitle1>
                <Subtitle1 sx={{ textAlign: "center", py: "2rem" }}>{t("highScore", { score: highScore })}</Subtitle1>
            </Stack>
            <Stack sx={{ alignItems: "center" }}>
                <Cat gameState={catState} onPet={debouncedHandleMove} />
            </Stack>
            <GameOverContainer isGameOver={catState === CatState.ATTACKED} reset={reset} />
        </ShadowedStack>
    )
}

export default PetCatGameBoard;