import React, { useEffect, useState } from 'react';

import { useQuery } from "react-query";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

import { useParams } from 'react-router-dom';
import LoadingPage from '../LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import BreadCrumb from '../../../components/BreadCrumbs/BreadCrumb';
import DishContainer from '../../../components/DishContainer/DishContainer';
import Restaurant_Detail from '../../../components/RestaurantDetail/Restaurant_Detail';
import SetTitle from '../SetTtitle/SetTitle';

const RestaurantHomePage = () => {
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
        <SetTitle title={data?.restaurant_name || ""}/>
            <BreadCrumb data={[data?.restaurant_name, data?.branch_name]} className="text-yellow-600 p-2" />


            <Restaurant_Detail data={data} />


            <DishContainer  dishes={data?.dishes && Array.isArray(data.dishes) ? data.dishes : []} />


        </>
    );
};

export default RestaurantHomePage;  