import { Box, keyframes, Stack, Typography } from "@mui/material";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

const CurlyBracesTypeWriter = ({ words }: { words: string[] }) => {

    const locale = useLocale();

    const typeRef = useRef(null);

    const blinkCaret = keyframes`
        from, to { border-color: transparent }
        50% { border-color: black; }
    `

    const [typed, setTyped] = useState<string>("");

    const typeSpeed = locale === "zh" ? 600 : 150;
    const deleteSpeed = 100;
    const pauseSpeed = 1000;
    const idleSpeed = 1500;

    const type = (word: number = 0, index: number = 1, isDeleting: boolean = false) => {
        const shown = words[word].slice(0, index);
        setTyped(shown);

        if (shown.length >= words[word].length ) {
            setTimeout(() => type(word, index-1, true), pauseSpeed);
        } else if (shown.length === 0) {
            setTimeout(() => type(((word + 1) % words.length), 1, false), idleSpeed);
        } else if (isDeleting) {
            setTimeout(() => type(word, index-1, true), deleteSpeed);
        } else {
            setTimeout(() => type(word, index+1, false), typeSpeed);
        }
    }

    useEffect(() => {
        setTimeout(type, idleSpeed);
    }, [])

    return (
        <Stack sx={{ width: "100%", height: "100%", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ fontSize: "4.5rem", lineHeight: "6.3rem", fontWeight: 700, fontFamily: "monospace" }}>{"{"}</Typography>
            <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: "100%", gap: "0.5rem" }}>
                <Typography ref={typeRef} sx={{ fontFamily: "monospace", fontSize: "3.5rem", lineHeight: "4.9rem" }}>{typed}</Typography>
                <Box sx={{ width: "1px", height: "4rem", animation: `${blinkCaret} 1s linear infinite`, border: "1px solid transparent" }} />
            </Stack>
            <Typography sx={{ fontSize: "4.5rem", lineHeight: "6.3rem", fontWeight: 700, fontFamily: "monospace" }}>{"}"}</Typography>
        </Stack>
    )

}

export default CurlyBracesTypeWriter;