"use client";

import { FormError } from "@/components/messages/form-error";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGate: React.FC<RoleGateProps> = ({ children, allowedRole }) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return <FormError message="You do not have permission to view this content!"></FormError>;
    }

    return <>{children}</>;
};
