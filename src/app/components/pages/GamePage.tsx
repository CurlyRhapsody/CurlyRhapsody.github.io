"use client"

import { AvailableGames } from "@/app/[locale]/games/[game]/params";
import { useParams } from "next/navigation"
import RPSContainer from "../games/containers/RPSContainer";

const GamePage = () => {
    const params = useParams();
    const { game } = params;

    switch (game) {
        case AvailableGames.RPS: return <RPSContainer />;
        default: return <></>; // This case is not suppose to happen, should fallback by 404
    }
}

export default GamePage;