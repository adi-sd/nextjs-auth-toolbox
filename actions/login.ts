"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { db } from "@/lib/db";
import { signIn } from "@/auth/auth";
import { AUTHENTICATED_USER_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorConfirmationByUserId } from "@/data/tow-factor-confirmation";

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string
): Promise<AuthResponseType | undefined> => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields (Server Validation)!" };
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email Does not exist!" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: "Confirmation email sent!" };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

            if (!twoFactorToken) {
                return { error: "Invalid Code!" };
            }

            if (twoFactorToken.token !== code) {
                return { error: "Invalid Code!" };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();
            if (hasExpired) {
                return { error: "Two Factor Code Expired!" };
            }

            await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (existingConfirmation) {
                const hasTwoFactorConfirmationExpired = new Date(existingConfirmation.expires) < new Date();
                if (hasTwoFactorConfirmationExpired) {
                    await db.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } });
                }
            } else {
                await db.twoFactorConfirmation.create({
                    data: {
                        userId: existingUser.id,
                        expires: new Date(new Date().getTime() + 3600 * 1000),
                    },
                });
            }
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
            return { twoFactor: true };
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || AUTHENTICATED_USER_REDIRECT,
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
