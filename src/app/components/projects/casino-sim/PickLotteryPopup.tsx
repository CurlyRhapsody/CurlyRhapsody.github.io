import PopupWrapper from "../../PopupWrapper";
import { Subtitle1 } from '../../styled/text';
import { useTranslations } from 'next-intl';
import { Grid, Button, Stack } from '@mui/material';
import MarkSixBall from "./MarkSixBall";
import { useState } from "react";
import { useCasinoSimContext } from '../providers/CasinoSimProvider';

const PickLotteryPopup = ({
    open, onClose
}: {
    open: boolean;
    onClose: () => void;
}) => {

    const t = useTranslations("project.casino-sim.mark-six");
    const { generateLottery } = useCasinoSimContext();
    const [picked, setPicked] = useState<number[]>([]);

    const isDisabled = (val: number) => picked.length === 6 && !isPicked(val);

    const isPicked = (val: number) => picked.includes(val);

    const toggleSelection = (val: number) => {
        if (isPicked(val)) {
            const newLottery = picked.filter(selected => selected !== val);
            setPicked(newLottery);
        } else {
            setPicked([...picked, val]);
        }
    }    

    return (
        <PopupWrapper open={open}>
            <Stack sx={{ gap: "2rem", alignItems: "center" }}>
                <Subtitle1>{t("select")}</Subtitle1>
                <Grid container direction="row" columns={10} spacing="0.5rem">
                    {Array.from({length: 49}, (_, i) => i + 1).map((val) => (
                        <Grid
                            key={`lottery-pick-${val}`}
                            sx={{ opacity: isPicked(val) ? 1 : 0.5, cursor: isDisabled(val) ? "unset" : "pointer" }}
                            onClick={() => {isDisabled(val) ? null : toggleSelection(val)}}
                        >
                            <MarkSixBall val={val} />
                        </Grid>
                    ))}

                </Grid>
                <Stack direction="row" sx={{ gap: "4rem" }}>
                    <Button
                        variant="contained"
                        sx={{ p: "1rem", borderRadius: "0.5rem", width: "15rem", fontSize: "1.25rem" }}
                        onClick={onClose}
                    >
                        {t("noBuy")}
                    </Button>
                    <Button
                        disabled={picked.length !== 6}
                        variant="contained"
                        sx={{ p: "1rem", borderRadius: "0.5rem", width: "15rem", fontSize: "1.25rem" }}
                        onClick={() => {
                            generateLottery(picked);
                            setPicked([]);
                            onClose();
                        }}
                    >
                        {t("done")}
                    </Button>
                </Stack>
            </Stack>
        </PopupWrapper>
    )
}

export default PickLotteryPopup;