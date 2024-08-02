import { currentUser } from "@/lib/auth";
import { UserInfo } from "../../../components/protected/user-info";

const ServerPage = async () => {
    const user = await currentUser();

    return <UserInfo label="💻 Server Component" user={user}></UserInfo>;
};

export default ServerPage;
