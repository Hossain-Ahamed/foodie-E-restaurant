import useAuthProvider from "../../Hooks/useAuthProvider";
import useProfile from "../../Hooks/useProfile";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import ViewAsMyProfile from "../../pages/Admin/ViewEmployee/ViewAsMyProfile";
import LoadingPage from "../../pages/Shared/LoadingPages/LoadingPage/LoadingPage";


const RoleWiseNavigateToDashboardHome = () => {
    const { role, profileLoading } = useProfile();
    const { provideSignOut, loading } = useAuthProvider();


    if (profileLoading || loading) {
        return <LoadingPage />
    }

    if (role === "Admin" || role === "Accounts") {
        return <Dashboard/>
    } else if (role === "Developer") {
        return <ViewAsMyProfile />
    } else {
        return provideSignOut();
    }

};

export default RoleWiseNavigateToDashboardHome;