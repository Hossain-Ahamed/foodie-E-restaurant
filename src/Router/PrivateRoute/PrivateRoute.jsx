import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuthProvider from '../../Hooks/useAuthProvider';
import LoadingPage from '../../pages/Shared/LoadingPages/LoadingPage/LoadingPage';


const PrivateRoute = ({children}) => {
    const location = useLocation();
    const { user, loading } = useAuthProvider();

    const navigate = useNavigate()

    if (loading) {
        return <LoadingPage/>
    }

    if (user) {
       return children;
    }

    return (
        <Navigate to='/login'  state={ {from: location}} replace></Navigate>
   );
};

export default PrivateRoute;