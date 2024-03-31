import React from 'react';
import useProfile from '../../../Hooks/useProfile';
import { Navigate } from 'react-router-dom';

const NearbyRestaurant = () => {
    const {profile} = useProfile();

    if(!profile?.address){
        return <Navigate  to='/edit-profile' replace/>
    }
    return (
        <div>
           nearby res 
        </div>
    );
};

export default NearbyRestaurant;