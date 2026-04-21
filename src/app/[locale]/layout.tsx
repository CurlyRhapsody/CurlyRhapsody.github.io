import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import NavBar from "../components/NavBar/NavBar";
import { NextIntlClientProvider } from "next-intl";
import { Locale, locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Curly Braces Studios",
    description: "CurlyRhapsody personal website",
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children, params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {

    const { locale } = await params;

    if (!locales.includes(locale as Locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html
        lang="en"
        className={`${roboto.className} h-full antialiased bg-[#add8e6]`}
        >
            <body>
                <NextIntlClientProvider>
                    <NavBar />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
