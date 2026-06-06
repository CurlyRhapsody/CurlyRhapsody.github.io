import { useTranslations } from 'next-intl';
import { DiscountType, useMealSplitContext } from '../providers/MealSplitProvider';
import { Box, Stack, TextField, InputAdornment } from '@mui/material';
import { Subtitle1, Subtitle2 } from '../../styled/text';
import { checkCurrencyFormat } from './util';
import { useEffect, useState } from 'react';

export const GrandTotalInputs = () => {
    
    const t = useTranslations("project.meal-split");
    const {
        totalCost, servicePercentage, discount, discountMode, discountAppliesToService,
        updateTotalCost, updateServicePercentage, updateDiscount, updateDiscountMode, updateDiscountAppliesToService
    } = useMealSplitContext();

    const [totalCostText, setTotalCostText] = useState<string | undefined>(String(totalCost ?? ""));
    const [serviceChargeText, setServiceChargeText] = useState<string | undefined>(String(servicePercentage ?? ""));
    const [discountText, setDiscountText] = useState<string | undefined>(String(discount ?? ""));

    useEffect(() => updateTotalCost(Number(totalCostText)), [totalCostText]);
    useEffect(() => updateServicePercentage(Number(serviceChargeText)), [serviceChargeText]);
    useEffect(() => updateDiscount(Number(discountText)), [discountText]);

    return (
        <Stack sx={{ gap: "1rem", alignItems: "center", width: "100%" }}>
            <Box sx={{ width: "100%", p: "1rem 0 0.5rem 1rem" }}>
                <Subtitle1>{t("totalInfo")}</Subtitle1>
            </Box>
            <Stack direction="row" sx={{ width: "100%", justifyContent: "center", gap: "2rem", alignItems: "center" }}>
                <Subtitle2>{t("total")}</Subtitle2>
                <TextField
                    value={totalCostText}
                    onChange={(e) => checkCurrencyFormat(e, setTotalCostText)}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start" sx={{ ml: "0.5rem" }}>$</InputAdornment>,
                            inputMode: 'decimal', 
                        },
                        htmlInput: { pattern: '[0-9]*\\.?[0-9]{0,2}' }
                    }}
                    sx={{
                        "& .MuiInputBase-input": { padding: "0.5rem" },
                        "& .MuiInputBase-root": { pl: "0.875rem" },
                    }}
                />
            </Stack>
            <Stack direction="row" sx={{ width: "100%", justifyContent: "center", gap: "2rem", alignItems: "center" }}>
                <Subtitle2>{t("service")}</Subtitle2>
                <TextField
                    value={serviceChargeText}
                    onChange={(e) => checkCurrencyFormat(e, setServiceChargeText)}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end" sx={{ ml: "0.5rem" }}>%</InputAdornment>,
                            inputMode: 'decimal', 
                        },
                        htmlInput: { pattern: '[0-9]*\\.?[0-9]{0,2}' }
                    }}
                    sx={{
                        "& .MuiInputBase-input": { padding: "0.5rem" },
                        "& .MuiInputBase-root": { pr: "0.875rem" },
                    }}
                />
            </Stack>
            <Stack direction="row" sx={{ width: "100%", justifyContent: "center", gap: "2rem", alignItems: "center" }}>
                <Subtitle2>{t("discountValue")}</Subtitle2>
                <TextField
                    value={discount}
                    onChange={(e) => checkCurrencyFormat(e, setDiscountText)}
                    slotProps={{
                        input: {
                            startAdornment: (discountMode === DiscountType.ABSOLUTE)
                                                ? <InputAdornment position="start" sx={{ ml: "0.5rem" }}>-$</InputAdornment>
                                                : <InputAdornment position="start" sx={{ ml: "0.5rem" }}>-</InputAdornment>,
                            endAdornment: (discountMode === DiscountType.ABSOLUTE)
                                                ? <InputAdornment position="end" sx={{ ml: "0.5rem" }}> </InputAdornment>
                                                : <InputAdornment position="end" sx={{ ml: "0.5rem" }}>%</InputAdornment>,
                            inputMode: 'decimal', 
                        },
                        htmlInput: { pattern: '[0-9]*\\.?[0-9]{0,2}' }
                    }}
                    sx={{
                        "& .MuiInputBase-input": { padding: "0.5rem" },
                        "& .MuiInputBase-root": { px: "0.875rem" },
                    }}
                />
            </Stack>
        </Stack>
    );
}