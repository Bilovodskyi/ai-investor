import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { userId } = await auth();
    if (userId != null) redirect("/");
    return (
        <div className="h-svh md:h-screen flex-center overflow-hidden">
            <div className="circle-container">
                <div className="circle" id="circle1"></div>
                <div className="circle" id="circle2"></div>
                <div className="circle" id="circle3"></div>
            </div>
            {children}
        </div>
    );
}
