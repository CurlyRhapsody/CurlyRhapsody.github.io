import ProjectPage from "@/app/components/pages/ProjectPage";
import { locales } from "@/i18n/config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AvailableProjects } from "./params";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ locale: string, project: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
    return locales.map((locale) => 
        Object.values(AvailableProjects).map((project) => ({ locale, project }))
    ).flat();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale, project } = await params;
    const t = await getTranslations({ locale, namespace: "headerTitle" });

    return {
        title: `${t(`projects.${project}`, { fallback: "404" })} | Curly Braces Studios`,
        description: "A bunch of random projects",
    };
};

export default async function Page({ params }: Props) {
    const { project } = await params;

    if (!Object.values(AvailableProjects).includes(project as AvailableProjects)) notFound();

    return <ProjectPage />;
}
