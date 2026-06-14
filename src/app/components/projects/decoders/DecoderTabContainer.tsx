import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Divider, Tab, Tabs } from "@mui/material";
import { DecodersTab, decoderTabText, useDecodersContext } from "../providers/DecodersProvider";
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
    if (activeTab === DecodersTab.LINK_CHECK) return <>LINK_CHECK</>;

    return null;
}


const DecoderTabContainer = () => {

    const t = useTranslations("project.decoders");
    const { tab, switchTab } = useDecodersContext();

    return (
        <ShadowedStack
            sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "0.5rem", alignItems: "center" }}
            divider={<Divider sx={{ borderWidth: "0.0625rem" }} />}
        >
            <Tabs
                value={tab}
                sx={{
                    width: "100%", borderBottom: "0.125rem solid #0000001F", minHeight: "unset",
                    "& .MuiTabs-scrollButtons.Mui-disabled": {
                        opacity: 0.3
                    }
                }}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
            >
                {decoderTabText.map((text, index) => (
                    <Tab
                        sx={{ p: "0.75rem 1rem", minWidth: "unset", minHeight: "unset", fontSize: "1.125rem" }}
                        value={index}
                        label={t(`tabs.${text}`)}
                        key={text}
                        onClick={() => switchTab(index)}
                    />
                ))}
            </Tabs>
            <DecoderContent activeTab={tab} />
        </ShadowedStack>
    )
}

export default DecoderTabContainer;