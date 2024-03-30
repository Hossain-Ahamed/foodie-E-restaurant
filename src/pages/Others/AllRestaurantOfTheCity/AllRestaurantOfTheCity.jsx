import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import LoadingPage from '../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../Shared/ErrorPage/ErrorPage';

const AllRestaurantOfTheCity = () => {
    const {city} = useParams();
   
    const axiosSecure = useAxiosSecure();



    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError, } = useQuery({
        queryKey: ['all_restaurant_of_the_city',city],
       
        queryFn: async () => {
            let res = await axiosSecure.get(`/all-restaurant/city/${city}`);
            console.log(res.data)
            return res?.data;
        },
    });
    if(dataLoading){
        return <LoadingPage/>
    }
    if(dataError){
        return <ErrorPage/>
    }
    return (
        <>
        
            
        </>
    );
};

export default AllRestaurantOfTheCity;