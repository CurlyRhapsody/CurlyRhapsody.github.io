"use client"

import { AvailableProjects } from "@/app/[locale]/projects/[project]/params";
import { useParams } from "next/navigation";
import ColorCalcContainer from "../projects/containers/ColorCalcContainer";
import ColorCalcProvider from "../projects/providers/ColorCalcProvider";
import SnackbarProvider from "../providers/SnackbarProvider";

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
        default: return <></>; // This case is not suppose to happen, should fallback by 404
    }
}

export default ProjectPage;