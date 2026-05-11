import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import GameCenterPage from "@/app/components/pages/GameCenterPage";

type Props = {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "headerTitle" });

    return {
        title: `${t("games.hub")} | Curly Braces Studios`,
        description: "Play games in any genre",
    };
};

export default function Page() {

    return <GameCenterPage />;
}
