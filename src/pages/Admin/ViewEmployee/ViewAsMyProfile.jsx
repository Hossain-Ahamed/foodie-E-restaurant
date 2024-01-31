import React from 'react';
import ViewEmployee from './ViewEmployee';
import useProfile from '../../../Hooks/useProfile';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MyRestaurantCard from '../../Others/MyRestaurantCard/MyRestaurantCard';

const ViewAsMyProfile = () => {
    const { profile,permitted } = useProfile();
  
    return (
        <section >
            <ViewEmployee data={profile} title="My Profile" editable={false} />
           
        </section>
    );
};

export default ViewAsMyProfile;