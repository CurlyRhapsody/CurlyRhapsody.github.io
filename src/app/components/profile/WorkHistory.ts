import HKTVLogo from "@/app/assets/images/hktv-logo.png"

export enum WorkStatus {
    RESIGNED = "RESIGNED",
    WORKING = "WORKING",
    UPCOMING = "UPCOMING"
}

export type WorkHistory = {
    status: WorkStatus;
    imageLink: string;
    localeCode: string;
    projects: {
        title: string;
        duties: string[];
    }[]
}

export const workExp: WorkHistory[] = [
    {
        status: WorkStatus.WORKING,
        imageLink: HKTVLogo.src,
        localeCode: "hktv",
        projects: [
            {
                title: "project.lm.name",
                duties: [
                    "project.lm.role1",
                    "project.lm.role2",
                    "project.lm.role3"
                ]
            },
            {
                title: "project.mabs.name",
                duties: [
                    "project.mabs.role1",
                    "project.mabs.role2",
                    "project.mabs.role3"
                ]
            }
        ]
    }
]