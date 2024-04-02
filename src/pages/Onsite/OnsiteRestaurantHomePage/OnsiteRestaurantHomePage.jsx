import React, { useEffect, useState } from 'react';

import { useQuery } from "react-query";
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import SetTitle from '../../Shared/SetTtitle/SetTitle';
import BreadCrumb from '../../../components/BreadCrumbs/BreadCrumb';
import Restaurant_Detail from '../../../components/RestaurantDetail/Restaurant_Detail';
import DishContainer from '../../../components/DishContainer/DishContainer';
import LoadingPage from '../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../Shared/ErrorPage/ErrorPage';

const OnsiteRestaurantHomePage = () => {
    const { res_id, branchID } = useParams();


    const axiosSecure = useAxiosSecure();
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ["data", res_id, branchID],

        queryFn: async () => {

            const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/single-restaurant-all-data`);
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
            <SetTitle title={data?.restaurant_name || ""} />
            <div className='flex justify-between'>

                <BreadCrumb data={[data?.restaurant_name, data?.branch_name]} className="text-yellow-600 p-2" />
                <div className='pr-3 flex justify-end items-center gap-2'>
                   <Link to={`/onsite-order/restaurant/${res_id}/branch/${branchID}/ongoing-orders`} className='text-blue-300'>Ongoing Orders</Link>
                   <Link to={`/onsite-order/restaurant/${res_id}/branch/${branchID}/ongoing-orders`} className='text-blue-300'>Ongoing Orders</Link>
                   <Link to={`/onsite-order/restaurant/${res_id}/branch/${branchID}/Completed-orders`}>Completed Orders</Link>
                  
                </div>
            </div>


            <Restaurant_Detail data={data} />


            <DishContainer dishes={data?.dishes && Array.isArray(data.dishes) ? data.dishes : []} />


        </>
    );
};

export default OnsiteRestaurantHomePage;  