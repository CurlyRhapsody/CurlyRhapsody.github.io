import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProfilePage from "@/app/components/pages/ProfilePage";

type Props = {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "headerTitle" });

    return {
        title: `${t("about")} | Curly Braces Studios`,
        description: "About CurlyRhapsody",
    };
};

export default function Page() {

    return <ProfilePage />;
}
