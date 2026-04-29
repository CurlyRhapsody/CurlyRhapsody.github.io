import { Roboto } from "next/font/google";
import "@/app/globals.css";
import { Suspense } from "react";

const roboto = Roboto({ subsets: ["latin"] });

export default function RootLayout({
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
                <Suspense>
                    {children}
                </Suspense>
            </body>
        </html>
    );
}
