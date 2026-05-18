import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Divider, Stack, Tab, Tabs } from "@mui/material";
import { CasinoTab, casinoTabText, useCasinoSimContext } from "../providers/CasinoSimProvider";
import PokerSimulator from "./PokerSimulator";
import CoinFlipSimulator from "./CoinFlipSimulator";
import DiceSimulator from "./DiceSimulator";
import { Title1 } from "../../styled/text";

// Placeholder component
const ComingSoon = () => {
    const t = useTranslations("project.casino-sim");

    return (
        <Stack sx={{ alignItems: "center" }}>
            <Title1>{t("wip")}</Title1>
        </Stack>
    )
}

const CansinoContent = ({ activeTab }: { activeTab: CasinoTab }) => {

    if (activeTab === CasinoTab.POKER) return <PokerSimulator />;
    if (activeTab === CasinoTab.FLIP_COIN) return <CoinFlipSimulator />;
    if (activeTab === CasinoTab.DICE) return <DiceSimulator />;
    if (activeTab === CasinoTab.SIC_BO) return <ComingSoon />;
    if (activeTab === CasinoTab.MARK_SIX) return <ComingSoon />;
    if (activeTab === CasinoTab.ROUTELETTE) return <ComingSoon />;

    return null;
}

const TabContainer = () => {
    const t = useTranslations("project.casino-sim");
    const { tab, switchTab } = useCasinoSimContext();

    return (
        <ShadowedStack
            sx={{ width: "100%", borderRadius: "1rem", background: "#FFFFFF", p: "1rem", gap: "0.5rem", alignItems: "center" }}
            divider={<Divider sx={{ borderWidth: "0.0625rem" }} />}
        >
            <Tabs
                value={tab}
            >
                {casinoTabText.map((text, index) => (
                    <Tab
                        value={index}
                        label={t(`tabs.${text}`)}
                        key={text}
                        onClick={() => switchTab(index)}
                    />
                ))}
            </Tabs>
            <CansinoContent activeTab={tab} />
        </ShadowedStack>
    )
}

export default TabContainer;