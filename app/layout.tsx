import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Nexora",
    description:
        "Built a modern Threads-inspired social media application designed to deliver a fast, engaging, and scalable social experience. Inspired by the platform that reached 100 million sign-ups in less than five days, this project recreates the core experience of a next-generation social network with a focus on real-time conversations, seamless interactions, and a clean, responsive interface.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClerkProvider appearance={{ theme: dark }}>
                    {children}
                </ClerkProvider>
            </body>
        </html>
    );
}
