"use client"

import { AvailableGames } from "@/app/[locale]/games/[game]/params";
import { useParams } from "next/navigation"
import RPSContainer from "../games/containers/RPSContainer";
import RPSProvider from "../games/providers/RPSProvider";

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
        default: return <></>; // This case is not suppose to happen, should fallback by 404
    }
}

export default GamePage;