import { useEffect, useState } from "react";
import { Dice } from "./types"
import { motion, useAnimationControls, useTime, useTransform } from "motion/react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Body1 } from "../../styled/text";

import DeleteIcon from '@mui/icons-material/Delete';
import { diceStyles } from "./diceStyles";

const EditableDice = ({ dice, animationTrigger, isDeleteDisabled, onClick, onDelete }: {
    dice: Dice;
    animationTrigger: number;
    isDeleteDisabled: boolean;
    onClick: () => void;
    onDelete: () => void;
}) => {

    const [startTime, setStartTime] = useState(0);
    const [showRes, setShowRes] = useState(false);

    const time = useTime();
    const controls = useAnimationControls();

    useEffect(() => {
        setStartTime(time.get());
        setShowRes(false);
        
        controls.start({
            rotate: [0, 360],
            transition: {
                duration: 0.1,
                repeat: 6,
                times: [0, 1],
                ease: "easeOut"
            }
        })
    }, [animationTrigger, controls, time]);

    const isRevealed = useTransform(time, (latestTime) => {
        const elapsed = latestTime - startTime;
        return elapsed >= 600;
    });

    useEffect(() => {
        return isRevealed.on("change", (latestBool) => {
            setShowRes(latestBool);
        });
    }, [isRevealed]);

    return (
        <Box>
            <motion.div animate={controls}>
                <Stack
                    onClick={onClick}
                    sx={{
                        display: "inline-block",
                        cursor: "pointer",
                        width: "7.25rem", height: "7.25rem", padding: "0.5rem", borderRadius: "0.5rem",
                        userSelect: "none",
                        filter: "drop-shadow(0 0.0625rem 0.125rem #0000004D)",
                        ...diceStyles[dice.type]
                    }}
                >
                    <Stack sx={{ position: "relative", height: "100%", alignItems: "center", justifyContent: "center" }}>
                        <Typography
                            sx={{
                                color: "white", fontSize: "2.5rem", lineHeight: "3.5rem", fontWeight: 700,
                                textShadow: "0 0.0625rem 0.125rem #0000004D"
                            }}
                        >
                            {dice.value}
                        </Typography>
                    </Stack>
                </Stack>
            </motion.div>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Body1 sx={{ px: "0.5rem" }}>{`D${dice.type}`}</Body1>
                <IconButton onClick={onDelete} disabled={isDeleteDisabled}>
                    <DeleteIcon sx={{ fontSize: "1.25rem", fill: isDeleteDisabled ? "#9E9E9E" : "#990000" }} />
                </IconButton>
            </Stack>
        </Box>
    )
}

export default EditableDice;