import { Button, List, ListItemButton, Stack } from "@mui/material";
import PopupWrapper from "../../PopupWrapper";
import { useTranslations } from "next-intl";
import { Body1, Subtitle2 } from "../../styled/text";
import { SortMethod, useSortSimContext } from "../providers/SortSimProvider";

const ChooseAlgoPopup = ({
    open, onClose
}: {
    open: boolean;
    onClose: () => void;
}) => {

    const t = useTranslations("project.sort-sim");
    const { sortAlgo, changeSortMethod } = useSortSimContext();

    return (
        <PopupWrapper open={open} onClose={onClose}>
            <Stack sx={{ gap: "0.5rem", alignItems: "center", width: "35rem"}}>
                <Stack sx={{ borderBottom: "0.125rem solid #CCCCCC", p: "0.75rem 2rem", width: "100%" }}>
                    <Subtitle2 sx={{ textAlign: "center" }}>{t("selectPopup")}</Subtitle2>
                </Stack>
                <List sx={{ overflowY: "auto", width: "100%", maxHeight: "30rem" }}>
                    {Object.values(SortMethod).map((method) => (
                        <ListItemButton
                            component="button"
                            selected={sortAlgo === method}
                            onClick={() => changeSortMethod(method as SortMethod)}
                            key={`select-${method}`}
                            value={method}
                            sx={{
                                width: "100%",
                                p: "1rem 2rem 1rem 3rem",
                                fontSize: "1.25rem",
                                lineHeight: "1.75rem",
                                fontWeight: 400,
                                "&.Mui-selected": {
                                    bgcolor: "#A5D3FF"
                                }
                            }}
                        >
                            <Body1>{t(`sort.${method}`)}</Body1>
                        </ListItemButton>
                    ))}
                </List>
                <Button
                    variant="contained"
                    sx={{ p: "1rem", borderRadius: "0.5rem", width: "100%", fontSize: "1.25rem" }}
                    onClick={onClose}
                >
                    {t("close")}
                </Button>
            </Stack>
        </PopupWrapper>
    )
}

export default ChooseAlgoPopup;