import { Button, List, ListItemButton, Stack } from "@mui/material";
import PopupWrapper from "../../common/PopupWrapper";
import { useTranslations } from "next-intl";
import { Body1, Subtitle2 } from "../../styled/text";
import { PathfindMethod, usePathfindContext } from "../providers/PathfindProvider";

const ChooseAlgoPopup = ({
    open, onClose
}: {
    open: boolean;
    onClose: () => void;
}) => {

    const t = useTranslations("project.pathfind");
    const { pathfindAlgo, setPathfindAlgo } = usePathfindContext();

    return (
        <PopupWrapper open={open} onClose={onClose}>
            <Stack sx={{ gap: "0.5rem", alignItems: "center", width: "35rem"}}>
                <Stack sx={{ borderBottom: "0.125rem solid #CCCCCC", p: "0.75rem 2rem", width: "100%" }}>
                    <Subtitle2 sx={{ textAlign: "center" }}>{t("selectPopup")}</Subtitle2>
                </Stack>
                <List sx={{ overflowY: "auto", width: "100%", maxHeight: "30rem" }}>
                    {Object.values(PathfindMethod).map((method) => (
                        <ListItemButton
                            component="button"
                            selected={pathfindAlgo === method}
                            onClick={() => setPathfindAlgo(method as PathfindMethod)}
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
                            <Body1>{t(`algos.${method}`)}</Body1>
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