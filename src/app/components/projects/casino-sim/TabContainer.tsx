import { useTranslations } from "next-intl";
import { ShadowedStack } from "../../styled/component";
import { Divider, Tab, Tabs } from "@mui/material";
import { CasinoTab, casinoTabText, useCasinoSimContext } from "../providers/CasinoSimProvider";
import PokerSimulator from "./PokerSimulator";

const CansinoContent = ({ activeTab }: { activeTab: CasinoTab }) => {

    if (activeTab === CasinoTab.POKER) return <PokerSimulator />;
    if (activeTab === CasinoTab.DICE) return null;
    if (activeTab === CasinoTab.SIC_BO) return null;
    if (activeTab === CasinoTab.MARK_SIX) return null;
    if (activeTab === CasinoTab.ROUTELETTE) return null;

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