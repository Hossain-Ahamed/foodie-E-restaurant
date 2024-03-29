import React, { useEffect, useState } from 'react';

import { useQuery } from "react-query";
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';

import { useParams } from 'react-router-dom';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import BreadCrumb from '../../../../components/BreadCrumbs/BreadCrumb';
import Restaurant_Detail from './Restaurant_Detail';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import DishContainer from './DishContainer';

const OnsiteRestaurantHomePage = () => {
    const { res_id, branchID, tableID } = useParams();

    const [cart, setCart] = useState([]);


    const axiosSecure = useAxiosSecure();
    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ["data", res_id, branchID, tableID],

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
            <BreadCrumb data={[data?.restaurant_name, data?.branch_name]} className="text-yellow-600 p-2" />


            <Restaurant_Detail data={data} />


            <DishContainer  dishes={data?.dishes && Array.isArray(data.dishes) ? data.dishes : []} />


        </>
    );
};

export default OnsiteRestaurantHomePage;  