import { Box, Grid, Stack } from "@mui/material";
import { ColorPalette } from "../providers/ColorCalcProvider";
import { Body2, Caption1 } from "../../styled/text";

const ColorList = ({ list }: {
    list?: ColorPalette[]
}) => {
    const listSize = list?.length;
    
    if (!listSize) return null;
    if (listSize === 0) return null;

    return (
        <Grid container columns={listSize}>
            {list.map((palette, index) => (
                <Grid key={`${palette.hex}-${index}`} sx={{ width: "4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Body2>{palette.hex}</Body2>
                    <Box
                        sx={{
                            width: "4rem", height: "3rem", background: palette.hex, my: "0.375rem",
                            borderTopLeftRadius: index === 0 ? "0.5rem" : "0",
                            borderBottomLeftRadius: index === 0 ? "0.5rem" : "0",
                            borderTopRightRadius: index === listSize - 1 ? "0.5rem" : "0",
                            borderBottomRightRadius: index === listSize - 1 ? "0.5rem" : "0"
                        }}
                    />
                    {palette.desc && <Body2>{palette.desc}</Body2>}
                </Grid>
            ))}
        </Grid>
    )
}

export default ColorList;