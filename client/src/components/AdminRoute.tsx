import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState, RootState } from '../types/interfaces';


const AdminRoute = () => {
    const { userInfo } = useSelector<RootState, AuthState>(state=>state.auth);

    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace/>
};

export default AdminRoute;
