import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Divider, Tab, Tabs } from "@mui/material";
import { CasinoTab, casinoTabText, useCasinoSimContext } from "../providers/CasinoSimProvider";
import PokerSimulator from "./PokerSimulator";
import CoinFlipSimulator from "./CoinFlipSimulator";
import DiceSimulator from "./DiceSimulator";
import SicBoSimulator from './SicBoSimulator';
import MarkSixSimulator from "./MarkSixSimulator";
import RouletteSimulator from "./RouletteSimulator";

const CansinoContent = ({ activeTab }: { activeTab: CasinoTab }) => {

    if (activeTab === CasinoTab.POKER) return <PokerSimulator />;
    if (activeTab === CasinoTab.FLIP_COIN) return <CoinFlipSimulator />;
    if (activeTab === CasinoTab.DICE) return <DiceSimulator />;
    if (activeTab === CasinoTab.SIC_BO) return <SicBoSimulator />;
    if (activeTab === CasinoTab.MARK_SIX) return <MarkSixSimulator />;
    if (activeTab === CasinoTab.ROULETTE) return <RouletteSimulator />;

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
            <Tabs value={tab} sx={{ width: "100%", borderBottom: "0.125rem solid #0000001F", minHeight: "unset" }}>
                {casinoTabText.map((text, index) => (
                    <Tab
                        sx={{ p: "0.75rem 1rem", flex: 1, minWidth: "unset", minHeight: "unset", fontSize: "1.125rem" }}
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