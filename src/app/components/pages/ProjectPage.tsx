"use client"

import { AvailableProjects } from "@/app/[locale]/projects/[project]/params";
import { useParams } from "next/navigation";
import ColorCalcContainer from "../projects/containers/ColorCalcContainer";
import ColorCalcProvider from "../projects/providers/ColorCalcProvider";
import SnackbarProvider from "../providers/SnackbarProvider";
import CasinoSimContainer from "../projects/containers/CasinoSimContainer";
import CasinoSimProvider from "../projects/providers/CasinoSimProvider";
import BroadcastContainer from "../projects/containers/BroadcastContainer";
import SortSimContainer from "../projects/containers/SortSimContainer";
import SortSimProvider from "../projects/providers/SortSimProvider";
import PathfindProvider from "../projects/providers/PathfindProvider";
import PathfindContainer from "../projects/containers/PathfindContainer";

const ProjectPage = () => {
    const params = useParams();
    const { project } = params;

    switch (project) {
        case AvailableProjects.COLOR_CALCULATOR:
            return (
                <SnackbarProvider>
                    <ColorCalcProvider>
                        <ColorCalcContainer />
                    </ColorCalcProvider>
                </SnackbarProvider>
            );
        case AvailableProjects.CASINO_SIM:
            return (
                <CasinoSimProvider>
                    <CasinoSimContainer />
                </CasinoSimProvider>
            )
        case AvailableProjects.BROADCAST:
            return (
                <BroadcastContainer />
            )
        case AvailableProjects.SORT_SIM:
            return (
                <SortSimProvider>
                    <SortSimContainer />
                </SortSimProvider>
            )
        case AvailableProjects.PATHFIND:
            return (
                <PathfindProvider>
                    <PathfindContainer />
                </PathfindProvider>
            )
        default: return <></>; // This case is not suppose to happen, should fallback by 404
    }
}

export default ProjectPage;