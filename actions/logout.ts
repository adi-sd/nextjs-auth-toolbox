"use server";

import { signOut } from "@/auth/auth";

export const logout = async () => {
    // Some server stuff
    await signOut();
};
