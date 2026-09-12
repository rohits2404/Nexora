import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    return (
        <>
            <h1 className="head-text text-left">Home</h1>
            <h1>{userInfo.name}</h1>
        </>
    );
};

export default Home;
