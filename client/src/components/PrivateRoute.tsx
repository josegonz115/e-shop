import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthState, RootState } from '../types/interfaces';


const PrivateRoute = () => {
    const { userInfo } = useSelector<RootState, AuthState>(state=>state.auth);

    return userInfo ? <Outlet /> : <Navigate to="/login" replace/>
};

export default PrivateRoute