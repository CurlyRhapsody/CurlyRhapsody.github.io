import { Metadata } from "next";
import HomePage from "@/app/components/pages/HomePage";
import { getTranslations } from "next-intl/server";

type Props = {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "headerTitle" });

    return {
        title: `${t("home")} | Curly Braces Studios`,
        description: "CurlyRhapsody - Imagination is the limit",
    };
};

export default function Page() {

    return <HomePage />;
}
