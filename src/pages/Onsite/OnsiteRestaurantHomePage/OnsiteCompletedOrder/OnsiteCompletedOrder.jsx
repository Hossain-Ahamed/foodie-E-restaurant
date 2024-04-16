import React from 'react';
import useAuthProvider from '../../../../Hooks/useAuthProvider';
import { useSearchParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from "react-query";
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';

const OnsiteCompletedOrder = () => {
    // const {user} = useAuthProvider();
    // const { res_id, branchID,tableID } = useSearchParams();

    // const axiosSecure = useAxiosSecure();
    // const { refetch, data, isLoading, error } = useQuery({
    //     queryKey: ["data", res_id, branchID,user?.email],

    //     queryFn: async () => {
            
    //         const res = await axiosSecure.get(`/completed-order/restaurant/${res_id}/branch/${branchID}/email/${user?.email}`);
    //         console.log(res?.data)
    //         return res?.data;
    //     },
    // });


    // if (isLoading) {
    //     return <LoadingPage />
    // }
    // if (error) {
    //     return <ErrorPage />
    // }
    return (
        <div>
            dghfgh
        </div>
    );
};

export default OnsiteCompletedOrder;