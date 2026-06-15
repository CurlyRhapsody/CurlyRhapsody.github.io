import { Button, List, ListItemButton, ListSubheader, Stack } from "@mui/material";
import PopupWrapper from "../../PopupWrapper";
import { useTranslations } from "next-intl";
import { Body1, Subtitle2 } from '../../styled/text';
import { DecodersTab, toolList, useDecodersContext } from "../providers/DecodersProvider";

const ChooseToolPopup = ({
    open, onClose
}: {
    open: boolean;
    onClose: () => void;
}) => {

    const t = useTranslations("project.decoders");
    const { tab, switchTab } = useDecodersContext();

    return (
        <PopupWrapper open={open} onClose={onClose}>
            <Stack sx={{ gap: "0.5rem", alignItems: "center", width: "35rem"}}>
                <Stack sx={{ borderBottom: "0.125rem solid #CCCCCC", p: "0.75rem 2rem", width: "100%" }}>
                    <Subtitle2 sx={{ textAlign: "center" }}>{t("selectTool")}</Subtitle2>
                </Stack>
                <List sx={{ overflowY: "auto", width: "100%", maxHeight: "30rem", py: "0" }}>
                    {toolList.map((section) => (
                        <li key={`tool-section-${section.title}`}>
                            <ListSubheader sx={{ p: "1rem" }}>
                                <Body1>
                                    {t(section.title)}
                                </Body1>
                            </ListSubheader>
                            {section.tools.map((tool) => (
                                <ListItemButton
                                    component="button"
                                    selected={tab === tool}
                                    onClick={() => switchTab(tool as DecodersTab)}
                                    key={`select-${tool}`}
                                    value={tool}
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
                                    <Body1>{t(`tabs.${tool}`)}</Body1>
                                </ListItemButton>
                            ))}
                        </li>
                    ))}
                </List>
                <Button
                    variant="contained"
                    sx={{ p: "1rem", borderRadius: "0.5rem", width: "100%", fontSize: "1.25rem" }}
                    onClick={onClose}
                >
                    {t("confirm")}
                </Button>
            </Stack>
        </PopupWrapper>
    )
}

export default ChooseToolPopup;