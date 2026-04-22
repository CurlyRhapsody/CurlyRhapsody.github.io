import { Metadata } from "next";
import HomePage from "../components/pages/HomePage";

type Props = {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;

    const titleText = locale === "zh" ? "首頁" : "Home";

    return {
        title: `${titleText} | Curly Braces Studios`,
        description: "CurlyRhapsody - Imagination is the limit",
    };
};

export default function Page() {

    return <HomePage />;
}
