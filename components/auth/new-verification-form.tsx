"use client";

import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { CardWrapper } from "@/components/commons/card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../messages/form-success";
import { FormError } from "../messages/form-error";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing token!");
            return;
        }
        newVerification(token)
            .then((data) => {
                if (data?.error) setError(data.error);
                if (data?.success) setSuccess(data.success);
            })
            .catch(() => {
                setError("Something went wrong!");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to Login"
            backButtonHref="/auth/login"
        >
            <div className="flex flex-col gap-y-5 items-center w-full justify-center">
                {!success && !error && <BeatLoader></BeatLoader>}
                {error ? <FormError message={error}></FormError> : null}
                {success ? <FormSuccess message={success}></FormSuccess> : null}
            </div>
        </CardWrapper>
    );
};
