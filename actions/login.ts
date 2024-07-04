"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { AUTHENTICATED_USER_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>): Promise<AuthResponseType | undefined> => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields (Server Validation)!" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: AUTHENTICATED_USER_REDIRECT,
        });
        return { success: "User Logged in Successfully!" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CallbackRouteError":
                    return { error: error.cause?.err?.message };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }
};
