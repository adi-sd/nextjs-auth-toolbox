import { Resend } from "resend";

const domain = process.env.NEXT_PUBLIC_APP_URL!;

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Password Reset Link for nextjs-auth-toolbox!",
        html: `
        <p>
            Hi,</br>
            This is your password reset link - <a href="${resetLink}">Link</a></br>
            <i>(This link is valid for one hour!)</i></br>
            <i>(Do not share this with anyone!)</i></br>
        </p>
        `,
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Please confirm your email for nextjs-auth-toolbox!",
        html: `
        <p>
            Hi,</br>
            This is your verification link - <a href="${confirmationLink}">Link</a></br>
            <i>(This link is valid for one hour!)</i></br>
        </p>
        `,
    });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Two Factor Verification Token for nextjs-auth-toolbox!",
        html: `
        <p>
            Hi,</br>
            This is your Two Factor verification Token - <b>${token}</b></br>
            <i>(This Token is valid for 15 minutes!)</i></br>
        </p>
        `,
    });
};
