import { Poppins } from "next/font/google";

import LoginButton from "@/components/auth/login-button";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <div className="space-y-6 text-center">
                <h1 className={cn("text-6xl front-semibold text-white drop-shadow-md", font.className)}>🔐Auth</h1>
                <p className="text-white text-lg">Next Auth - Authentication Toolbox</p>
                <div>
                    <LoginButton>
                        <Button variant="secondary" size="lg">
                            Sign In
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    );
}
