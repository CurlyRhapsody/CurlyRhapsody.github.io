import { Body1, Caption1, Subtitle2 } from '../../styled/text';
import PopupWrapper from '../../common/PopupWrapper';
import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useMealSplitContext } from '../providers/MealSplitProvider';

import CheckIcon from '@mui/icons-material/Check';

const SplitResultPopup = ({
    open, onClose
}: {
    open: boolean;
    onClose: () => void;
}) => {

    const t = useTranslations("project.meal-split");
    const { totalCost, basePay, people, remainder } = useMealSplitContext();

    return (
        <PopupWrapper open={open} onClose={onClose}>
            <Stack sx={{ gap: "0.5rem", alignItems: "center", width: "40rem", overflow: "hidden"}}>
                <Stack sx={{ borderBottom: "0.125rem solid #CCCCCC", p: "0.75rem 2rem", width: "100%" }}>
                    <Subtitle2 sx={{ textAlign: "center" }}>{t("results")}</Subtitle2>
                </Stack>
                <Box sx={{ width: "100%", pb: "0.25rem", borderBottom: "0.125rem solid #CCCCCC" }}>
                    <Stack direction="row" sx={{ p: "0.75rem 0.5rem", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                        <Body1 sx={{ fontWeight: 600 }}>{t("grandTotal")}</Body1>
                        <Body1>{`$${totalCost}`}</Body1>
                    </Stack>
                    <Stack direction="row" sx={{ p: "0.75rem 0.5rem", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                        <Body1 sx={{ fontWeight: 600 }}>{t("baseCost")}</Body1>
                        <Body1>{`$${basePay}`}</Body1>
                    </Stack>
                </Box>
                <TableContainer component={Grid} sx={{ borderBottom: "0.125rem solid #CCCCCC", pb: "0.75rem" }}>
                    <Table sx={{ tableLayout: "fixed", width: "100%" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Body1>{t("name")}</Body1>
                                </TableCell>
                                <TableCell colSpan={1}>
                                    <Body1>{t("willSplit")}</Body1>
                                </TableCell>
                                <TableCell colSpan={5}>
                                    <Body1>{t("pay")}</Body1>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(people ?? []).map((person, index) => {
                                return (
                                    <TableRow key={`participant-${index}`}>
                                        <TableCell colSpan={2}>
                                            <Body1>{(person.name && person.name !== "") ? person.name : t("unnamed", {id: index+1})}</Body1>
                                        </TableCell>
                                        <TableCell colSpan={1}>
                                            {person.willSplit && (
                                                <CheckIcon sx={{ fontSize: "1.5rem", color: "#1E90FF" }} />
                                            )}
                                        </TableCell>
                                        <TableCell colSpan={5}>
                                            {person.willSplit ? (
                                                <Body1>
                                                    {`$${basePay}`}{person.adjustedIC ? ` + $${person.adjustedIC} = $${person.needToPay}` : ""}
                                                </Body1>
                                            ) : (
                                                <Body1>-</Body1>
                                            )}
                                            
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ width: "100%" }}>
                    <Stack direction="row" sx={{ p: "0.75rem 0.5rem", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                        <Body1 sx={{ fontWeight: 600 }}>{t("remainder")}</Body1>
                        <Body1>{`$${remainder}`}</Body1>
                    </Stack>
                    <Caption1 sx={{ color: "#888888", fontStyle: "italic", whiteSpace: "pre-wrap", textAlign: "center" }}>{t("remainderDesc")}</Caption1>
                </Box>
                <Button
                    variant="contained"
                    sx={{ p: "1rem", borderRadius: "0.5rem", width: "100%", fontSize: "1.25rem" }}
                    onClick={onClose}
                >
                    {t("done")}
                </Button>
            </Stack>
        </PopupWrapper>
    )
}

export default SplitResultPopup;