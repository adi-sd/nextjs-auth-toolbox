"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { NewPasswordSchema } from "@/schemas";

import { newPassword } from "@/actions/new-password";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/components/commons/card-wrapper";
import { FormError } from "@/components/messages/form-error";
import { FormSuccess } from "@/components/messages/form-success";

const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            newPassword(values, token).then((data) => {
                if (data?.error) setError(data.error);
                if (data?.success) setSuccess(data.success);
            });
        });
    };

    return (
        <CardWrapper headerLabel="Enter a new Password" backButtonLabel="Back to Login" backButtonHref="/auth/login">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled={isPending}
                                        ></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        ></FormField>
                    </div>
                    {error ? <FormError message={error}></FormError> : null}
                    {success ? <FormSuccess message={success}></FormSuccess> : null}
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Change Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default NewPasswordForm;
