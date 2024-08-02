"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SettingsSchema } from "@/schemas";
import { FormError } from "@/components/messages/form-error";
import { FormSuccess } from "@/components/messages/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
    const user = useCurrentUser();
    const { update: sessionUpdate } = useSession();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }
                    if (data.success) {
                        setSuccess(data.success);
                        sessionUpdate({
                            user: data.updatedUser,
                        });
                    }
                })
                .catch(() => {
                    setError("Something went wrong!");
                });
        });
    };

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center gap-x-4">
                                            <FormLabel className="w-[140px]">Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="John Doe"
                                                    type="name"
                                                    disabled={isPending}
                                                ></Input>
                                            </FormControl>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            ></FormField>
                            {user?.isOAuth === false && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center gap-x-4">
                                                    <FormLabel className="w-[140px]">Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="john.doe@example.com"
                                                            type="email"
                                                            disabled={isPending}
                                                        ></Input>
                                                    </FormControl>
                                                </div>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center gap-x-4">
                                                    <FormLabel className="w-[140px]">Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="******"
                                                            type="password"
                                                            disabled={isPending}
                                                        ></Input>
                                                    </FormControl>
                                                </div>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}
                                    ></FormField>
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center gap-x-4">
                                                    <FormLabel className="w-[140px]">New Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="******"
                                                            type="password"
                                                            disabled={isPending}
                                                        ></Input>
                                                    </FormControl>
                                                </div>
                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )}
                                    ></FormField>
                                </>
                            )}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center gap-x-4">
                                            <FormLabel className="w-[140px]">Role</FormLabel>

                                            <Select
                                                disabled={isPending}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a User Role"></SelectValue>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                                    <SelectItem value={UserRole.USER}>User</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )}
                            ></FormField>
                            {user?.isOAuth === false && (
                                <FormField
                                    control={form.control}
                                    name="isTwoFactorEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between border p-3 rounded-lg shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel className="w-[140px]">Two factor Auth</FormLabel>
                                                <FormDescription>
                                                    Enable Two Factor Authentication for Your Account
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                ></Switch>
                                            </FormControl>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    )}
                                ></FormField>
                            )}
                        </div>
                        {error ? <FormError message={error}></FormError> : null}
                        {success ? <FormSuccess message={success}></FormSuccess> : null}
                        <Button type="submit" className="w-full" disabled={isPending}>
                            Update User Details
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
