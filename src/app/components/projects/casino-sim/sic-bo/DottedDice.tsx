import { Box, Stack } from '@mui/material';
import { useAnimationControls, useTime, useTransform, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const dots: { [value: number]: number[] } = {
    1: [4],
    2: [2, 6],
    3: [2, 4, 6],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
}

const DottedDice = ({ value, animationTrigger }: {
    value: number;
    animationTrigger: number;
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
        <motion.div animate={controls}>
            <Box
                sx={{
                    width: "7.25rem", height: "7.25rem", padding: "0.5rem", borderRadius: "0.5rem",
                    boxShadow: "0.25rem 0.25rem 0.3125rem -0.0625rem rgba(0,0,0,0.5)",
                    background: "#E6515D", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem"
                }}
            >
                {[...Array(9)].map((_, i) => (
                    <Stack key={i} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    {dots[value].includes(i) && (
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                bgcolor: "white",
                            }}
                            />
                        )}
                    </Stack>
                ))}
            </Box>
        </motion.div>
        
    )

}

export default DottedDice;