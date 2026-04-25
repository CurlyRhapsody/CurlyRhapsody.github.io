import { Box, keyframes, Stack, Typography } from "@mui/material";
import { useRef } from "react";

const CurlyBracesTypeWriter = () => {

    const typeRef = useRef(null);

    const blinkCaret = keyframes`
        from, to { border-color: transparent }
        50% { border-color: black; }
    `

    return (
        <Stack sx={{ width: "100%", height: "100%", flexDirection: "row", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ fontSize: "5rem", lineHeight: "7rem", fontWeight: 700, fontFamily: "monospace" }}>{"{"}</Typography>
            <Stack sx={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: "100%", gap: "0.5rem" }}>
                <Typography ref={typeRef} sx={{ fontFamily: "monospace", fontSize: "4rem", lineHeight: "5.6rem" }}>asdsa</Typography>
                <Box sx={{ width: "1px", height: "4rem", animation: `${blinkCaret} 1s linear infinite`, border: "1px solid transparent" }} />
            </Stack>
            <Typography sx={{ fontSize: "5rem", lineHeight: "7rem", fontWeight: 700, fontFamily: "monospace" }}>{"}"}</Typography>
        </Stack>
    )

}

export default CurlyBracesTypeWriter;