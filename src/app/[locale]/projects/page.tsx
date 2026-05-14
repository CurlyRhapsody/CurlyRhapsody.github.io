import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectListPage from "@/app/components/pages/ProjectListPage";

type Props = {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "headerTitle" });

    return {
        title: `${t("projects.list")} | Curly Braces Studios`,
        description: "The hub of project of anything but games",
    };
};

export default function Page() {

    return <ProjectListPage />;
}
