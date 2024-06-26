"use client";

import { log } from "console";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ children, mode = "redirect", asChild }) => {
    const router = useRouter();

    const onClick = () => {
        router.push("/auth/login");
    };

    if (mode === "modal") {
        return <span>TODO: Implement Modal</span>;
    }

    return (
        <div onClick={onClick} className="cursor-pointer">
            {children}
        </div>
    );
};

export default LoginButton;
