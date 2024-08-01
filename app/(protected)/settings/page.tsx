"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import ProtectedLayout from "../layout";

const SettingsPage = () => {
    const user = useCurrentUser();

    const handleLogOut = async () => {
        await logout();
    };

    return (
        <div className="bg-white p-10 rounded-xl">
            <button onClick={handleLogOut} type="submit">
                Sign Out
            </button>
        </div>
    );
};

export default SettingsPage;
