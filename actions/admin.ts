"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async (): Promise<AuthResponseType> => {
    const role = await currentRole();

    if (role === UserRole.ADMIN) {
        return { success: "succuss" };
    }

    return { error: "forbidden" };
};
