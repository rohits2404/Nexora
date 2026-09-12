import { Bottombar } from "@/components/shared/Bottombar";
import { LeftSidebar } from "@/components/shared/LeftSidebar";
import { RightSidebar } from "@/components/shared/RightSidebar";
import { Topbar } from "@/components/shared/Topbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nexora",
    description: "A Next.js 13 Meta Threads application",
};

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Topbar />
            <main className="flex flex-row">
                <LeftSidebar />
                <section className="main-container">
                    <div className="w-full max-w-4xl">{children}</div>
                </section>
                <RightSidebar />
            </main>
            <Bottombar />
        </div>
    );
}
