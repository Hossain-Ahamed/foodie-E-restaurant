import React from 'react';
import useAuthProvider from '../../../../Hooks/useAuthProvider';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import FoodCard from '../../../../components/FoodCard/FoodCard';
const ShowingOngoingOrders = () => {

    const {user} = useAuthProvider();
    const { res_id, branchID,tableID } = useParams();

    const axiosSecure = useAxiosSecure();
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ["data", res_id, branchID,user?.email],

        queryFn: async () => {

            const res = await axiosSecure.get(`/ongoing-order/restaurant/${res_id}/branch/${branchID}/email/${user?.email}`);
            console.log(res.data)
            return res?.data;
        },
    });


    if (isLoading) {
        return <LoadingPage />
    }
    if (error) {
        return <ErrorPage />
    }
    return (
        <>
        <div className='w-[300px] md:w-[700px] mx-auto my-10 items-center justify-items-center'>
            {data?.map(order => <FoodCard key={order?._id} order={order}>
            </FoodCard>)}
        </div>
        </>
    );
};

export default ShowingOngoingOrders;