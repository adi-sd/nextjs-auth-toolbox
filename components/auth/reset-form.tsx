"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas";

import { reset } from "@/actions/reset";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/components/commons/card-wrapper";
import { FormError } from "@/components/messages/form-error";
import { FormSuccess } from "@/components/messages/form-success";

const ResetForm = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            reset(values).then((data) => {
                if (data?.error) setError(data.error);
                if (data?.success) setSuccess(data.success);
            });
        });
    };

    return (
        <CardWrapper headerLabel="Forgot Your Password?" backButtonLabel="Back to Login" backButtonHref="/auth/login">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="john.doe@example.com"
                                            type="email"
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
                        Send Reset Email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default ResetForm;
