import GamePage from "@/app/components/pages/GamePage";
import { locales } from "@/i18n/config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AvailableGames } from "./params";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ locale: string, game: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
    return locales.map((locale) => 
        Object.values(AvailableGames).map((game) => ({ locale, game }))
    ).flat();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale, game } = await params;
    const t = await getTranslations({ locale, namespace: "headerTitle" });

    return {
        title: `${t(`games.${game}`, { fallback: "404" })} | Curly Braces Studios`,
        description: "It's playtime!",
    };
};

export default async function Page({ params }: Props) {
    const { game } = await params;

    if (!Object.values(AvailableGames).includes(game as AvailableGames)) notFound();

    return <GamePage />;
}
