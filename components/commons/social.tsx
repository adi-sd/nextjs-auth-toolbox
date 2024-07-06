"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSpotify } from "react-icons/fa";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { AUTHENTICATED_USER_REDIRECT } from "@/routes";

const Social = () => {
    const onClick = (provider: "google" | "github" | "spotify") => {
        signIn(provider, {
            callbackUrl: AUTHENTICATED_USER_REDIRECT,
        });
    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("google")}>
                <FcGoogle className="h-5 w-5"></FcGoogle>
            </Button>
            <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("github")}>
                <FaGithub className="h-5 w-5"></FaGithub>
            </Button>
            <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("spotify")}>
                <FaSpotify className="h-5 w-5"></FaSpotify>
            </Button>
        </div>
    );
};

export default Social;
