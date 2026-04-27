import { Roboto } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";

const roboto = Roboto({ subsets: ["latin"] });


export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" className={`${roboto.className} antialiased`}>
            <body>
                {children}
            </body>
        </html>
    );
}
