import { Roboto } from "next/font/google";
import "@/app/globals.css";

const roboto = Roboto({ subsets: ["latin"] });

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" className={`${roboto.className} antialiased`}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
