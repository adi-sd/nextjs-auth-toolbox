"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

import { NewPasswordSchema } from "@/schemas";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
): Promise<AuthResponseType> => {
    if (!token) {
        return { error: "missing Token!" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Password!" };
    }

    const { password: newPassword } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid Token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has Expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id },
    });

    return { success: "Password changed Successfully!" };
};
