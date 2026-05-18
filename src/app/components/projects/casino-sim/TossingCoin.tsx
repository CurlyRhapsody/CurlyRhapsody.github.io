import { Stack, Typography } from "@mui/material";
import { motion, useAnimationControls, useTime, useTransform } from "motion/react";
import { useEffect, useState } from "react";

import DataObjectIcon from '@mui/icons-material/DataObject';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CoinPrint = ({ isHead }: { isHead: boolean; }) => {
    return (
        <Stack sx={{ position: "relative", height: "100%", alignItems: "center", justifyContent: "center" }}>
            {isHead
                ? (
                    <>
                        <DataObjectIcon sx={{ fontSize: "4rem", fill: "white" }} />
                        <FavoriteIcon sx={{ position: "absolute", fontSize: "1rem", fill: "white" }} />
                    </>
                ) : (
                    <Typography
                        sx={{
                            color: "white", fontSize: "2.5rem", lineHeight: "3.5rem", fontWeight: 700,
                            textShadow: "0 0.0625rem 0.125rem #0000004D"
                        }}
                    >
                        {1}
                    </Typography>
                )}
        </Stack>
    )
}

const TossingCoin = ({ isHead, animationTrigger }: { isHead: boolean; animationTrigger: number; }) => {

    const [startTime, setStartTime] = useState(0);
    const [showRes, setShowRes] = useState(false);

    const time = useTime();
    const controls = useAnimationControls();

    useEffect(() => {
        setStartTime(time.get());
        setShowRes(false);
        
        controls.start({
            scaleX: [1, 0, 1],
            transition: {
                duration: 0.2,
                repeat: 3,
                times: [0, 0.5, 1],
                ease: "easeInOut"
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
        <motion.div
            animate={controls}
            initial={{ scaleX: 1 }}
        >
            <Stack
                sx={{
                    boxShadow: "0.25rem 0.25rem 0.3125rem -0.0625rem rgba(0,0,0,0.5)",
                    width: "7.25rem", height: "7.25rem", padding: "0.5rem", borderRadius: "50%",
                    border: "0.1875rem solid #FFFFFFCC", userSelect: "none",
                    background: "linear-gradient(145deg, #FCD868, #E9B92A)",
                }}
            >
                {showRes && <CoinPrint isHead={isHead} />}
            </Stack>
        </motion.div>
    )
}

export default TossingCoin;