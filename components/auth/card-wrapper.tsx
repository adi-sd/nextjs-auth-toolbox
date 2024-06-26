"use client";

import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import BackButton from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial = false,
}) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel}></Header>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social></Social>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;
