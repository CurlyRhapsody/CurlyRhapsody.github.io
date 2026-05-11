import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BlogListPage from "@/app/components/pages/BlogListPage";

type Props = {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "headerTitle" });

    return {
        title: `${t("blog")} | Curly Braces Studios`,
        description: "The place where I write random things",
    };
};

export default function Page() {

    return <BlogListPage />;
}
