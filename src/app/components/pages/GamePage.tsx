"use client"

import { AvailableGames } from "@/app/[locale]/games/[game]/params";
import { useParams } from "next/navigation"
import RPSContainer from "../games/containers/RPSContainer";
import RPSProvider from "../games/providers/RPSProvider";
import PetCatContainer from "../games/containers/PetCatContainer";
import PrisonDilemmaContainer from "../games/containers/PrisonDilemmaContainer";

const GamePage = () => {
    const params = useParams();
    const { game } = params;

    switch (game) {
        case AvailableGames.RPS:
            return (
                <RPSProvider>
                    <RPSContainer />
                </RPSProvider>
            );
        case AvailableGames.PET_THE_CAT:
            return (
                <PetCatContainer />
            );
        case AvailableGames.PRISON:
            return (
                <PrisonDilemmaContainer />
            )
        default: return <></>; // This case is not suppose to happen, should fallback by 404
    }
}

export default GamePage;