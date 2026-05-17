import { Stack } from "@mui/material";
import { Card } from "./types"
import { Body1 } from "../../styled/text";
import { motion, useAnimationControls, useTime, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const rankToText = {
    2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10",
    11: "J", 12: "Q", 13: "K", 14: "A"
}

const CardPattern = () => {

}

const CardBack = () => (
    <Stack
        sx={{
            boxShadow: "0.25rem 0.25rem 0.3125rem -0.0625rem rgba(0,0,0,0.5)",
            width: "5rem", height: "7rem", padding: "0.5rem", borderRadius: "0.5rem",
            border: "0.0625rem solid #CCCCCC",
            background: "radial-gradient(ellipse,rgba(30, 144, 255, 1) 25%, rgba(76, 114, 230, 1) 50%, rgba(123, 104, 238, 1) 80%, rgba(51, 51, 51, 1) 98%)"
        }}
    />
)

export const PokerCard = ({ card }: {
    card?: Card;
}) => {

    const [startTime, setStartTime] = useState(0);
    const [showFront, setShowFront] = useState(false);

    const time = useTime();
    const controls = useAnimationControls();

    useEffect(() => {
        setStartTime(time.get());
        setShowFront(false);
        
        controls.start({
            scaleX: [1, 0, 1],
            transition: {
                duration: 0.4,
                times: [0, 0.5, 1],
                ease: "easeInOut"
            }
        })
    }, [card, controls, time]);

    const isRevealed = useTransform(time, (latestTime) => {
        const elapsed = latestTime - startTime;
        return elapsed >= 200;
    });

    useEffect(() => {
        return isRevealed.on("change", (latestBool) => {
            setShowFront(latestBool);
        });
    }, [isRevealed]);

    if (!card) return ( <CardBack /> );

    return (
        <motion.div
            animate={controls}
            initial={{ scaleX: 1 }}
        >
            {!showFront ? (
                <CardBack />
            ) : (
                <Stack
                    sx={{
                        boxShadow: "0.25rem 0.25rem 0.3125rem -0.0625rem rgba(0,0,0,0.5)",
                        width: "6.25rem", height: "8.75rem", padding: "0.5rem", borderRadius: "0.5rem",
                        border: "0.0625rem solid #CCCCCC", background: "white"
                    }}
                >
                    <Body1 sx={{ whiteSpace: "pre-wrap", textAlign: "center", width: "fit-content" }}>
                        {`${card.suit}\n${rankToText[card.rank]}`}
                    </Body1>
                </Stack>
            )}
        </motion.div>
    )
}