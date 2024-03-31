import React from 'react';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import { Navigate } from 'react-router-dom';
import useProfile from '../../../Hooks/useProfile';
import NonLogInCityPage from '../../Offsite/NonLogInCityPage/NonLogInCityPage';

const Home = () => {
    const {user} = useAuthProvider();
    const { profile } = useProfile()
    console.log(profile)

    if(!user){
        return <Navigate to="/home"/>
    }

    if (!profile?.address || (profile && profile?.address && Array.isArray(profile?.address) && profile.address.length <= 0)) {
        console.log('object')
    }
    // if(profile && Object.keys(profile).length>0){
    //    return <Navigate to="/nearby-restaurant"/>
    // }

  
};

export default Home;