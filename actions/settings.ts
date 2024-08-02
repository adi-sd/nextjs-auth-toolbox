"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { User } from "@prisma/client";

export const settings = async (
    values: z.infer<typeof SettingsSchema>
): Promise<
    AuthResponseType & {
        updatedUser?: User;
    }
> => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return { error: "Unauthorized" };
    }

    const validatedFields = SettingsSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields (Server Validation)!" };
    }
    const validatedValues = validatedFields.data;

    if (user.isOAuth) {
        validatedValues.email = undefined;
        validatedValues.password = undefined;
        validatedValues.newPassword = undefined;
        validatedValues.isTwoFactorEnabled = undefined;
    }

    if (validatedValues.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(validatedValues.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already exits" };
        }

        const verificationToken = await generateVerificationToken(validatedValues.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Verification email sent!" };
    }

    if (validatedValues.password && validatedValues.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(validatedValues.password, dbUser.password);

        if (!passwordsMatch) {
            return { error: "Invalid Password!" };
        }

        const hashedNewPassword = await bcrypt.hash(validatedValues.newPassword, 10);
        validatedValues.password = hashedNewPassword;
        validatedValues.newPassword = undefined;
    }

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...validatedValues,
        },
    });

    return { success: "Settings Successfully Updated!", updatedUser: updatedUser };
};
