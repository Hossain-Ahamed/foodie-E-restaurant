import React from 'react';

import { Navigate } from 'react-router-dom';
import useProfile from '../../Hooks/useProfile';
import LoadingPage from '../../pages/Shared/LoadingPages/LoadingPage/LoadingPage';

const ProtectedByRole = ({ allowedRoles, children }) => {
    const { role, profileLoading } = useProfile();
   

    if (profileLoading) {
        return <LoadingPage />
    }

    if (allowedRoles.includes(role)) {
        return <>{children}</>
    }

    return <Navigate to="/" replace />
};

export default ProtectedByRole;