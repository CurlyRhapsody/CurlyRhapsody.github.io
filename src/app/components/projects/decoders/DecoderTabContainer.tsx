import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Divider, InputAdornment, Stack, TextField } from "@mui/material";
import { DecodersTab, useDecodersContext } from "../providers/DecodersProvider";
import ASCIIDecoder from "./ASCIIDecoder";
import AlphaDecoder from "./AlphaDecoder";
import EncodingsDecoder from "./EncodingsDecoder";
import LinearDecoder from "./LinearDecoder";
import TranspositionDecoder from "./TranspositionDecoder";
import VigenereDecoder from "./VigenereDecoder";
import PolybiusDecoder from "./PolybiusDecoder";
import BaconDecoder from "./BaconDecoder";
import MorseDecoder from "./MorseDecoder";
import ImageProcessor from "./ImageProcessor";
import LinkChecker from "./LinkChecker";
import { useState } from "react";
import ChooseToolPopup from "./ChooseToolPopup";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Subtitle2 } from "../../styled/text";

const DecoderContent = ({ activeTab }: { activeTab: DecodersTab }) => {

    if (activeTab === DecodersTab.ASCIIS) return <ASCIIDecoder />;
    if (activeTab === DecodersTab.ALPHABETS) return <AlphaDecoder />
    if (activeTab === DecodersTab.ENCODES) return <EncodingsDecoder />;

    if (activeTab === DecodersTab.LINEAR_CIPHERS) return <LinearDecoder />;
    if (activeTab === DecodersTab.TRANSPOSITION) return <TranspositionDecoder />;
    if (activeTab === DecodersTab.VIGENERE) return <VigenereDecoder />;
    if (activeTab === DecodersTab.POLYBIUS) return <PolybiusDecoder />;
    if (activeTab === DecodersTab.BACON) return <BaconDecoder />;
    if (activeTab === DecodersTab.MORSE) return <MorseDecoder />;

    if (activeTab === DecodersTab.IMAGE) return <ImageProcessor />;
    if (activeTab === DecodersTab.LINK_CHECK) return <LinkChecker />;

    return null;
}


const DecoderTabContainer = () => {

    const t = useTranslations("project.decoders");
    const [isSelectingTool, setIsSelectingTool] = useState<boolean>(false);
    const { tab, switchTab } = useDecodersContext();

    return (
        <>
            <ChooseToolPopup open={isSelectingTool} onClose={() => setIsSelectingTool(false)} />
            <ShadowedStack
                sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "1rem", alignItems: "center" }}
                divider={<Divider orientation="horizontal" sx={{ borderWidth: "0.03125rem", borderColor: "#CCCCCC", width: "100%" }} />}
            >
                <Stack direction="row" sx={{ alignItems: "center", justifyContent: "center", gap: "2rem" }}>
                    <Subtitle2>{t("tool")}</Subtitle2>
                    <TextField
                        value={t(`tabs.${tab}`)}
                        onClick={() => setIsSelectingTool(true)}
                        sx={{
                            width: "30rem",
                            "& .MuiInputBase-root": { pr: "0.875rem" },
                            "& .MuiInputBase-input": {
                                p: "1rem 2rem 1rem 0.875rem",
                                fontSize: "1.25rem",
                                lineHeight: "1.75rem",
                                fontWeight: 400,
                            }
                        }}
                        slotProps={{
                            input: {
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ ml: "0.5rem" }}>
                                        <ArrowDropDownIcon />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Stack>
                <DecoderContent activeTab={tab} />
            </ShadowedStack>
        </>
    )
}

export default DecoderTabContainer;