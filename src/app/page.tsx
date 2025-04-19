import StartPage from "@/components/StartPage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const { userId } = await auth();
    if (userId != null) redirect("/private/search");
    return <StartPage />;
}
