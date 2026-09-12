import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    return (
        <>
            <h1 className="head-text text-left">Home</h1>
        </>
    );
};

export default Home;
