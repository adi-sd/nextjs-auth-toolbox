"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendResetPasswordEmail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>): Promise<AuthResponseType> => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Email!" };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Email doesn't exist!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendResetPasswordEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Reset Email Sent Successfully!" };
};
