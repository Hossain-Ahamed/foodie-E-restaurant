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
import {Button} from "@nextui-org/react";
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
            <div className='flex justify-between pr-3'>

                <BreadCrumb data={[data?.restaurant_name, data?.branch_name]} className="text-yellow-600 px-2" />
                <div className='pr-3 flex justify-end flex-wrap items-center gap-x-4 font-semibold text-blue-500'>
                 
                    <Link to={`/onsite-order/restaurant/${res_id}/branch/${branchID}/cart`} className='hover:cursor-pointer hover:underline'>Cart</Link>
                    <Link to={`/onsite-order/restaurant/${res_id}/branch/${branchID}/ongoing-orders`} className='hover:cursor-pointer hover:underline'>Ongoing Orders</Link>
                    <Link to={`/onsite-order/restaurant/${res_id}/branch/${branchID}/recent-orders`} className='hover:cursor-pointer hover:underline'>Order History</Link>

                </div>
            </div>


            <Restaurant_Detail data={data} />


            <DishContainer dishes={data?.dishes && Array.isArray(data.dishes) ? data.dishes : []} />


        </>
    );
};

export default OnsiteRestaurantHomePage;  