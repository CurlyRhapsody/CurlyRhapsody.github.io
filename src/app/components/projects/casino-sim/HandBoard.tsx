import { Grid, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { Body1, Subtitle1, Subtitle2 } from "../../styled/text";
import { useCasinoSimContext } from "../providers/CasinoSimProvider";
import { CardHandRank } from "./types";

const HandGrid = ({ currentHand, rank, activeWhen }: {
    currentHand?: CardHandRank;
    rank: CardHandRank;
    activeWhen: CardHandRank[];
}) => {

    const t = useTranslations("project.casino-sim.poker");
    const isMain = !!currentHand ? rank === currentHand : false;
    const isHighlighted = !!currentHand ? activeWhen.includes(currentHand) : false;

    return (
        <Grid size={1}>
            <Stack sx={{
                width: "100%", height: "5rem", alignItems: "center", justifyContent: "center", p: "0.5rem",
                gap: "1rem", border: "0.0625rem solid #161616",
                background: isMain ? "#E78587" : (isHighlighted ? "#FFF4B3" : "unset"),
            }}>
                <Subtitle2>{t(rank)}</Subtitle2>
                <Body1 sx={{ textAlign: "center", whiteSpace: "pre-wrap" }}>{t(`${rank}Def`)}</Body1>
            </Stack>
        </Grid>
    )
}

const HandBoard = () => {

    const { hand } = useCasinoSimContext();
    const t = useTranslations("project.casino-sim.poker");

    return (
        <Stack sx={{ width: "100%", alignItems: "flex-start", pt: "1.5rem" }}>
            <Subtitle1 sx={{ pb: "0.5rem" }}>{t("hands")}</Subtitle1>
            <Body1 sx={{ pb: "1rem" }}>{t("highlight")}</Body1>
            <Grid sx={{ width: "100%" }} container columns={1}>
                <HandGrid currentHand={hand} rank={CardHandRank.HighCard} activeWhen={[CardHandRank.HighCard]} />
            </Grid>
            <Grid sx={{ width: "100%" }} container columns={3}>
                <HandGrid currentHand={hand} rank={CardHandRank.OnePair}
                    activeWhen={[CardHandRank.OnePair, CardHandRank.TwoPairs, CardHandRank.ThreeOfAKind, CardHandRank.FullHouse, CardHandRank.FourOfAKind]}
                />
                <HandGrid currentHand={hand} rank={CardHandRank.TwoPairs}
                    activeWhen={[CardHandRank.TwoPairs, CardHandRank.FourOfAKind]}
                />
                <HandGrid currentHand={hand} rank={CardHandRank.ThreeOfAKind}
                    activeWhen={[CardHandRank.ThreeOfAKind, CardHandRank.FullHouse, CardHandRank.FourOfAKind]}
                />
            </Grid>
            <Grid sx={{ width: "100%" }} container columns={3}>
                <HandGrid currentHand={hand} rank={CardHandRank.Straight}
                    activeWhen={[CardHandRank.Straight, CardHandRank.StraightFlush, CardHandRank.RoyalFlush]}
                />
                <HandGrid currentHand={hand} rank={CardHandRank.Flush} activeWhen={[CardHandRank.Flush, CardHandRank.StraightFlush, CardHandRank.RoyalFlush]} />
                <HandGrid currentHand={hand} rank={CardHandRank.FullHouse} activeWhen={[CardHandRank.FullHouse]} />
            </Grid>
            <Grid sx={{ width: "100%" }} container columns={3}>
                <HandGrid currentHand={hand} rank={CardHandRank.FourOfAKind} activeWhen={[CardHandRank.FourOfAKind]} />
                <HandGrid currentHand={hand} rank={CardHandRank.StraightFlush} activeWhen={[CardHandRank.StraightFlush, CardHandRank.RoyalFlush]} />
                <HandGrid currentHand={hand} rank={CardHandRank.RoyalFlush} activeWhen={[CardHandRank.RoyalFlush]} />
            </Grid>
        </Stack>
    )
}

export default HandBoard;