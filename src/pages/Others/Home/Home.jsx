import React, { useEffect } from 'react';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import useProfile from '../../../Hooks/useProfile';
import { Navigate } from 'react-router-dom';

const Home = () => {
  
    const { user } = useAuthProvider();
    const { profile } = useProfile();


  

    if (!user) {
        return <Navigate to="/home" />;
    }

    if (profile && Object.keys(profile).length > 0 && profile.address) {
        return <Navigate to="/nearby-restaurant" />;
    }

    return <Navigate to="/edit-profile" />;
};

export default Home;
