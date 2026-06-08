import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Button, Divider, Stack } from '@mui/material';
import { GrandTotalInputs, IndividualItemTable } from "./MealInfoFields";
import { useMealSplitContext } from "../providers/MealSplitProvider";
import { useState } from "react";
import SplitResultPopup from "./SplitResultPopup";
import { Body1 } from '../../styled/text';

const MealInfoInputPanel = () => {
    
    const t = useTranslations("project.meal-split");
    const { error, calculate } = useMealSplitContext();

    const [isResultPopupOpened, setIsResultPopupOpened] = useState<boolean>(false);
    
    return (
        <>
            <SplitResultPopup open={isResultPopupOpened} onClose={() => setIsResultPopupOpened(false)} />
            <ShadowedStack sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}>
                <Stack sx={{ width: "100%" }} divider={<Divider sx={{ borderWidth: "0.0625rem" }} />}>
                    <GrandTotalInputs />
                    <IndividualItemTable />
                    <Stack sx={{ alignItems: "center", width: "100%", gap: "1rem", py: "1rem" }}>
                        <Button
                            variant="contained"
                            sx={{
                                p: "1rem", width: "25rem", borderRadius: "0.5rem", fontSize: "1.25rem",
                                "& .MuiButton-startIcon svg": { fontSize: "1.5rem" }
                            }}
                            onClick={() => {
                                if (calculate()) {
                                    setIsResultPopupOpened(true);
                                }
                            }}
                        >
                            {t("calculate")}
                        </Button>
                        {error && (
                            <Body1 sx={{ color: "#C20000" }}>{t(`errors.${error}`)}</Body1>
                        )}
                    </Stack>
                </Stack>
            </ShadowedStack>
        </>
    )
}

export default MealInfoInputPanel;