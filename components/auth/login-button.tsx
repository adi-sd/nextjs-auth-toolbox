"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/login-form";

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
        return (
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="p-0 w-auto bg-transparent border-none">
                    <LoginForm></LoginForm>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <div onClick={onClick} className="cursor-pointer">
            {children}
        </div>
    );
};

export default LoginButton;
