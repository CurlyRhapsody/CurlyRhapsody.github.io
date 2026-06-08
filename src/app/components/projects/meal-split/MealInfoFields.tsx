import { useTranslations } from 'next-intl';
import { DiscountType, useMealSplitContext } from '../providers/MealSplitProvider';
import { Box, Stack, TextField, InputAdornment, Grid, RadioGroup, FormControlLabel, Radio, Checkbox, TableContainer, TableRow, TableCell, TableHead, Table, TableBody, SxProps } from '@mui/material';
import { Body1, Subtitle1, Subtitle2 } from '../../styled/text';
import { checkCurrencyFormat, checkParticipantFormat } from './util';
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

const IndividualCurrencyTextfield = ({ value, personId, onChange }: {
    value?: number;
    personId: number;
    onChange: (personId: number, value: { individualCost?: number }) => void;
}) => {
    
    const [displayValue, setDisplayValue] = useState<string | undefined>(value?.toString() ?? "");

    useEffect(() => onChange(personId, { individualCost: Number(displayValue) }), [displayValue]);

    return (
        <TextField
            value={displayValue}
            onChange={(e) => checkCurrencyFormat(e, setDisplayValue)}
            slotProps={{
                input: {
                    startAdornment: <InputAdornment position="start" sx={{ ml: "0.5rem" }}>$</InputAdornment>,
                    inputMode: 'decimal', 
                },
                htmlInput: { pattern: '[0-9]*\\.?[0-9]{0,2}' }
            }}
            sx={{
                width: "100%",
                "& .MuiInputBase-input": { padding: "0.75rem" },
                "& .MuiInputBase-root": { pl: "0.5rem", fontSize: "1.25rem" },
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

    const [participantHasError, setParticipantHasError] = useState<boolean>(false);
    const [participantText, setParticipantText] = useState<string>(numParticipant?.toString() ?? "");

    useEffect(() => {
        const num = Number(participantText);
        if (num > 1) adjustParticipantCount(num);
    }, [participantText])

    return (
        <Stack sx={{ gap: "1rem", alignItems: "center", width: "100%", py: "1rem" }}>
            <Box sx={{ width: "100%", p: "1rem 0 0.5rem 1rem" }}>
                <Subtitle1>{t("individual")}</Subtitle1>
            </Box>
            <Box>
                <Stack direction="row" sx={{ gap: "1rem", width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Subtitle2>{t("numAdjust")}</Subtitle2>
                    <TextField
                        value={participantText}
                        error={participantHasError}
                        onChange={(e) => {
                            setParticipantHasError(false);
                            const resCount = checkParticipantFormat(e);
                            if (resCount !== undefined) {
                                setParticipantText(e.target.value);
                                return;
                            }
                            setParticipantHasError(true);
                        }}
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
                <Body1 sx={{ color: "#C20000", fontStyle: "italic" }}>{t("adjustResets")}</Body1>
            </Box>
            <TableContainer component={Grid}>
                <Table sx={{ tableLayout: "fixed", width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Body1>{t("name")}</Body1>
                            </TableCell>
                            <TableCell colSpan={2}>
                                <Body1>{t("willSplit")}</Body1>
                            </TableCell>
                            <TableCell colSpan={6}>
                                <Body1 sx={{ whiteSpace: "pre-wrap" }}>{t("individualCost")}</Body1>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(people ?? []).map((person, index) => {
                            return (
                                <TableRow key={`participant-${index}`}>
                                    <TableCell colSpan={6}>
                                        <TextField
                                            value={people?.[index].name}
                                            onChange={(e) => updatePerson(index, { name: e.target.value })}
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputBase-input": { padding: "0.75rem" },
                                                "& .MuiInputBase-root": { pl: "0.5rem", fontSize: "1.25rem" },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                        <Checkbox
                                            sx={{
                                                width: "2rem", height: "2rem",
                                                "& .MuiSvgIcon-root": { fontSize: "2rem" }
                                            }}
                                            value={people?.[index].willSplit}
                                            checked={people?.[index].willSplit}
                                            onChange={() => updatePerson(index, { willSplit: !people?.[index].willSplit })}
                                        />
                                    </TableCell>
                                    <TableCell colSpan={6}>
                                        <IndividualCurrencyTextfield
                                            value={people?.[index].individualCost}
                                            personId={index}
                                            onChange={updatePerson}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}