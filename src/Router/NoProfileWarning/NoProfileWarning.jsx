import React from 'react';
import useProfile from '../../Hooks/useProfile';
import LoadingPage from '../../Pages/LoadingPage/LoadingPage/LoadingPage';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const NoProfileWarning = ({ children }) => {
    const { profile, profileLoading, profileError } = useProfile();
    // const { provideSignOut } = useAuthProvider();

    if (profileLoading) {
        return <LoadingPage />
    }

    if (profileError) {
        console.log(profileError)
        return;
    }

    if (!profile?.name || !profile?.phone ) {
        
              Swal.fire(
                'Incomplete profile!',
                'Your must upload necessary Data.',
                'warning'
              )
            
        return <Navigate to='/update-profile' replace></Navigate>
    }

    return <>{children}</>
};

export default NoProfileWarning;