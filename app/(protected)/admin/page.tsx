"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RoleGate } from "../_components/role-gate";
import { FormSuccess } from "@/components/messages/form-success";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () => {
    const onServerActionClick = () => {
        admin().then((data) => {
            if (data.success) {
                toast.success("The API is allowed for you!");
            } else {
                toast.error("The API is forbidden for you!");
            }
        });
    };

    const onApiRouteClick = () => {
        fetch("/api/admin").then((response) => {
            if (response.ok) {
                toast.success("The API is allowed for you!");
            } else {
                toast.error("The API is forbidden for you!");
            }
        });
    };

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">🔑 Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content"></FormSuccess>
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-only API Route</p>
                    <Button onClick={onApiRouteClick}>Click to Test</Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-only Server Action</p>
                    <Button onClick={onServerActionClick}>Click to Test</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPage;
