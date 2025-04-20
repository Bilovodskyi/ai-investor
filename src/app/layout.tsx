import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "InvestSquid",
    description: "Invest smart",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${robotoMono.className} antialiased`}>
                <ReduxProvider>
                    <ClerkProvider
                        appearance={{
                            baseTheme: dark,
                        }}>
                        {children}
                    </ClerkProvider>
                </ReduxProvider>
                <Toaster richColors position="top-right" />
            </body>
        </html>
    );
}
