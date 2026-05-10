import HKUSTLogo from "@/app/assets/images/hkust-logo.png"
import AskpireLogo from "@/app/assets/images/askpire-logo.png"
import HKTVLogo from "@/app/assets/images/hktv-logo.png"

export type CertificateRecord = {
    localeCode: string;
    certUrlText?: string;
    certUrl?: string;
}

export type AcademicInstitutionHistory = {
    imageLink: string;
    localeCode: string;
    projects: { // locale strings
        title: string;
        description: string[];
        duties: string[];
        projectUrlText?: string;
        projectUrl?: string;
    }[]
}

export type AcademicHistory = {
    institutions: AcademicInstitutionHistory[];
    certificates?: CertificateRecord[];
}

export enum WorkStatus {
    RESIGNED = "RESIGNED",
    WORKING = "WORKING",
    UPCOMING = "UPCOMING"
}

export type WorkHistory = {
    status: WorkStatus;
    imageLink?: string;
    localeCode: string;
    projects?: { // locale strings
        title: string;
        duties: string[];
    }[]
}

export const academicsHist: AcademicHistory = {
    institutions: [
        {
            imageLink: HKUSTLogo.src,
            localeCode: "hkust",
            projects: [
                {
                    title: "project.e2ee.name",
                    description: [
                        "project.e2ee.desc1",
                        "project.e2ee.desc2",
                        "project.e2ee.desc3"
                    ],
                    duties: [
                        "project.e2ee.role1",
                        "project.e2ee.role2",
                        "project.e2ee.role3"
                    ],
                    projectUrlText: "project.e2ee.repository",
                    projectUrl: "https://github.com/chanjeff2/fyp-chat-app"
                }
            ]
        }
    ]
}

export const workExp: WorkHistory[] = [
    {
        status: WorkStatus.RESIGNED,
        imageLink: AskpireLogo.src,
        localeCode: "askpire",
        projects: [
            {
                title: "project.app.name",
                duties: ["project.app.role1"]
            }
        ]
    },
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
    },
    {
        status: WorkStatus.UPCOMING,
        localeCode: "comingSoon"
    }
]