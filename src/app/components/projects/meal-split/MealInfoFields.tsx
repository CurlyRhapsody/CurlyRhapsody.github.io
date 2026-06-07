import { useTranslations } from 'next-intl';
import { DiscountType, useMealSplitContext } from '../providers/MealSplitProvider';
import { Box, Stack, TextField, InputAdornment, Grid, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import { Subtitle1, Subtitle2 } from '../../styled/text';
import { checkCurrencyFormat } from './util';
import { useEffect, useState } from 'react';

const CurrencyTextfield = ({ value, startAdornment, endAdornment, onChange }: {
    value?: number;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    onChange: (val?: number) => void;
}) => {
    
    const [displayValue, setDisplayValue] = useState<string | undefined>(value?.toString() ?? "");

    useEffect(() => onChange(Number(displayValue)), [displayValue]);

    return (
        <TextField
            value={displayValue}
            onChange={(e) => checkCurrencyFormat(e, setDisplayValue)}
            slotProps={{
                input: {
                    startAdornment,
                    endAdornment,
                    inputMode: 'decimal', 
                },
                htmlInput: { pattern: '[0-9]*\\.?[0-9]{0,2}' }
            }}
            sx={{
                width: "10rem",
                "& .MuiInputBase-input": { padding: "0.5rem" },
                "& .MuiInputBase-root": { pl: "0.875rem" },
            }}
        />
    )
}

export const GrandTotalInputs = () => {
    
    const t = useTranslations("project.meal-split");
    const {
        totalCost, servicePercentage, discount, discountMode, discountAppliesToService,
        updateTotalCost, updateServicePercentage, updateDiscount, updateDiscountMode, updateDiscountAppliesToService
    } = useMealSplitContext();

    return (
        <Stack sx={{ gap: "1rem", alignItems: "center", width: "100%", py: "1rem" }}>
            <Box sx={{ width: "100%", p: "0 0 0.5rem 1rem" }}>
                <Subtitle1>{t("totalInfo")}</Subtitle1>
            </Box>
            <Grid direction="row" columnSpacing="2rem" rowSpacing="1rem" container sx={{ width: "100%", justifyContent: "center", alignItems: "center" }} columns={2}>
                <Grid size={1}>
                    <Subtitle2 sx={{ textAlign: "right" }}>{t("total")}</Subtitle2>
                </Grid>
                <Grid size={1}>
                    <CurrencyTextfield
                        value={totalCost}
                        onChange={updateTotalCost}
                        startAdornment={<InputAdornment position="start" sx={{ ml: "0.5rem" }}>$</InputAdornment>}
                    />
                </Grid>
                <Grid size={1}>
                    <Subtitle2 sx={{ textAlign: "right" }}>{t("service")}</Subtitle2>
                </Grid>
                <Grid size={1}>
                    <CurrencyTextfield
                        value={servicePercentage}
                        onChange={updateServicePercentage}
                        endAdornment={<InputAdornment position="end" sx={{ ml: "0.5rem" }}>%</InputAdornment>}
                    />
                </Grid>
                <Grid size={1}>
                    <Subtitle2 sx={{ textAlign: "right" }}>{t("discountType")}</Subtitle2>
                </Grid>
                <Grid size={1}>
                    <RadioGroup
                        value={discountMode}
                        onChange={(e) => updateDiscountMode(e.target.value as DiscountType)}
                        sx={{ flexDirection: "row", columnGap: "1rem" }}
                    >
                        <FormControlLabel
                            value={DiscountType.ABSOLUTE}
                            control={<Radio sx={{ padding: "0.5rem" }} />}
                            label={t("absolute")}
                            sx={{
                                ml: "-0.625rem", mr: "1rem",
                                "& .MuiFormControlLabel-label": {
                                    fontSize: "1.25rem",
                                    lineHeight: "1.75rem",
                                    fontWeight: 400,
                                }
                            }}
                        />
                        <FormControlLabel
                            value={DiscountType.RELATIVE}
                            control={<Radio sx={{ padding: "0.5rem" }} />}
                            label={t("relative")}
                            sx={{
                                ml: "-0.625rem", mr: "1rem",
                                "& .MuiFormControlLabel-label": {
                                    fontSize: "1.25rem",
                                    lineHeight: "1.75rem",
                                    fontWeight: 400,
                                }
                            }}
                        />
                    </RadioGroup>
                </Grid>
                <Grid size={1}>
                    <Subtitle2 sx={{ textAlign: "right" }}>{t("discountValue")}</Subtitle2>
                </Grid>
                <Grid size={1}>
                    <CurrencyTextfield
                        value={discount}
                        onChange={updateDiscount}
                        startAdornment={
                            (discountMode === DiscountType.ABSOLUTE)
                                ? <InputAdornment position="start" sx={{ ml: "0.5rem" }}>-$</InputAdornment>
                                : <InputAdornment position="start" sx={{ ml: "0.5rem" }}>-</InputAdornment>
                        }
                        endAdornment={
                            (discountMode === DiscountType.ABSOLUTE)
                                ? <InputAdornment position="end" sx={{ ml: "0.5rem" }}> </InputAdornment>
                                : <InputAdornment position="end" sx={{ ml: "0.5rem" }}>%</InputAdornment>
                        }
                    />
                </Grid>
                {discountMode === DiscountType.RELATIVE && (
                    <>
                        <Grid size={1} />
                        <Grid size={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={discountAppliesToService}
                                        onChange={() => updateDiscountAppliesToService(!discountAppliesToService)}
                                    />
                                }
                                label={t("applyToService")}
                                sx={{
                                    ml: "-0.625rem", mr: "1rem",
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: "1.25rem",
                                        lineHeight: "1.75rem",
                                        fontWeight: 400,
                                    }
                                }}
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </Stack>
    );
}

export const IndividualItemTable = () => {
    const t = useTranslations("project.meal-split");
    const {
        people, numParticipant,
        updatePerson, adjustParticipantCount
    } = useMealSplitContext();

    return (
        <Stack sx={{ gap: "1rem", alignItems: "center", width: "100%", py: "1rem" }}>
            <Box sx={{ width: "100%", p: "1rem 0 0.5rem 1rem" }}>
                <Subtitle1>{t("individual")}</Subtitle1>
            </Box>
            <Stack direction="row" sx={{ gap: "1rem", width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Subtitle2>{t("numAdjust")}</Subtitle2>
                <TextField
                    value={numParticipant}
                    onChange={(e) => adjustParticipantCount(Number(e.target.value))}
                    type="number"
                    slotProps={{
                        htmlInput: {
                            min: 2,
                            max: 100,
                            pattern: '[0-9]*'
                        }
                    }}
                    sx={{
                        width: "10rem",
                        "& .MuiInputBase-input": { padding: "0.5rem" },
                        "& .MuiInputBase-root": { pl: "0.875rem" },
                    }}
                />
            </Stack>
        </Stack>
    );
}