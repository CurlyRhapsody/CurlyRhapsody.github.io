import { Stack } from "@mui/material";
import { Card, Rank, Suit } from "./types"
import { Body2, Subtitle1, Title1 } from "../../styled/text";
import { motion, useAnimationControls, useTime, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import ChessPawnIcon from "@/app/assets/svg/ChessPawnIcon";
import ChessQueenIcon from "@/app/assets/svg/ChessQueenIcon";
import ChessKingIcon from "@/app/assets/svg/ChessKingIcon";

const rankToText = {
    2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10",
    11: "J", 12: "Q", 13: "K", 14: "A"
}

const NumberPattern = ({ symbol, count, fill }: { symbol: string, count: number, fill: string }) => {

    if (count < 2 || count > 10) return null;

    const colPrintCount = ((num: number) => {
        switch (num) {
            case 2: return [2];
            case 3: return [3];
            case 4: return [2, 0, 2];
            case 5: return [2, 1, 2];
            case 6: return [3, 0, 3];
            case 7: return [3, 1, 3];
            case 8: return [3, 2, 3];
            case 9: return [4, 1, 4];
            case 10: return [4, 2, 4];
        }
    })(count)

    return (
        <Stack direction="row" sx={{ justifyContent: "center", gap: "0.5rem", width: "100%", height: "100%" }}>
            {colPrintCount?.map((count, i) => (
                <Stack key={`col-${i}`} direction="column" sx={{ justifyContent: "space-around", width: "1.125rem" }}>
                    {Array(count).fill(0).map((_, j) => (
                        <Subtitle1 key={`col-${i}-${j}-sym`} sx={{ color: fill }}>{symbol}</Subtitle1>
                    ))}
                </Stack>
            ))}
        </Stack>
    )
}

const CardPattern = ({ card }: { card: Card }) => {
    const isRed = card.suit === Suit.Hearts || card.suit === Suit.Diamonds;
    const symbol = card.suit.valueOf();
    const fill = isRed ? "#990000" : "#000000"

    const cardPattern = (rank: Rank) => {
        if (rank < 11) return <NumberPattern symbol={symbol} fill={fill} count={card.rank} />
        if (rank === 11) return (
            <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Title1 sx={{ color: fill }}>{symbol}</Title1>
                <ChessPawnIcon props={{ fontSize: "2.25rem", fill: fill }} />
            </Stack>
        )
        if (rank === 12) return (
            <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Title1 sx={{ color: fill }}>{symbol}</Title1>
                <ChessQueenIcon props={{ fontSize: "2.25rem", fill: fill }} />
            </Stack>
        )
        if (rank === 13) return (
            <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Title1 sx={{ color: fill }}>{symbol}</Title1>
                <ChessKingIcon props={{ fontSize: "2.25rem", fill: fill }} />
            </Stack>
        )
        if (rank === 14) return (
            <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Title1 sx={{ fontSize: "5rem", lineHeight: "7rem", color: fill }}>{symbol}</Title1>
            </Stack>
        )
    }

    return (
        <Stack sx={{ position: "relative", width: "100%", height: "100%" }}>
            <Body2
                sx={{
                    position: "absolute", top: "0", left: "0",
                    whiteSpace: "pre-wrap", textAlign: "center", width: "fit-content",
                    color: fill
                }}
            >
                {`${card.suit}\n${rankToText[card.rank]}`}
            </Body2>
            {cardPattern(card.rank)}
        </Stack>
    )

}

const CardBack = () => (
    <Stack
        sx={{
            boxShadow: "0.25rem 0.25rem 0.3125rem -0.0625rem rgba(0,0,0,0.5)",
            width: "7.5rem", height: "10.5rem", padding: "0.5rem", borderRadius: "0.5rem",
            border: "0.0625rem solid #CCCCCC",
            background: "radial-gradient(ellipse,rgba(30, 144, 255, 1) 25%, rgba(76, 114, 230, 1) 50%, rgba(123, 104, 238, 1) 80%, rgba(51, 51, 51, 1) 98%)"
        }}
    />
)

export const PokerCard = ({ card, animationTrigger }: {
    card?: Card;
    animationTrigger: number;
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
    }, [animationTrigger, controls, time]);

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
                        width: "7.5rem", height: "10.5rem", padding: "0.5rem", borderRadius: "0.5rem",
                        border: "0.0625rem solid #CCCCCC", background: "white", userSelect: "none"
                    }}
                >
                    <CardPattern card={card} />
                </Stack>
            )}
        </motion.div>
    )
}