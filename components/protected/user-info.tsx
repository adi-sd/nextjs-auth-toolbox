import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExtendedUser } from "@/lib/next-auth";

interface UserInfo {
    user?: ExtendedUser;
    label: string;
}

export const UserInfo: React.FC<UserInfo> = ({ user, label }) => {
    return (
        <Card className="h-[500px] w-[600px] flex flex-col justify-start shadow-lg">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">{label}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">ID</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.id}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">User Name</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.name}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Email</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Role</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.role}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Two Factor Authentication</p>
                    <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};