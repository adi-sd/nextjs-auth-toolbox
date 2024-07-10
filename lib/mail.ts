import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

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
