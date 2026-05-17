"use client"

import { AvailableProjects } from "@/app/[locale]/projects/[project]/params";
import { useParams } from "next/navigation";
import ColorCalcContainer from "../projects/containers/ColorCalcContainer";
import ColorCalcProvider from "../projects/providers/ColorCalcProvider";
import SnackbarProvider from "../providers/SnackbarProvider";
import CasinoSimContainer from "../projects/containers/CasinoSimContainer";
import CasinoSimProvider from "../projects/providers/CasinoSimProvider";

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
        default: return <></>; // This case is not suppose to happen, should fallback by 404
    }
}

export default ProjectPage;