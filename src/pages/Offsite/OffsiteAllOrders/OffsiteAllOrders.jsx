import React from 'react';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from "react-query";
import LoadingPage from '../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../Shared/ErrorPage/ErrorPage';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import OrderOffsiteModal from '../../../components/OrderOffsiteModal/OrderOffsiteModal';
import FoodCard from '../../../components/FoodCard/FoodCard';
import backgroundImage from '../../../assets/images/Background/blur-coffee-cafe-shop-restaurant.png';
import SetTitle from '../../Shared/SetTtitle/SetTitle';

const OffsiteAllOrders = () => {
    const {user} = useAuthProvider();
    const axiosSecure = useAxiosSecure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { refetch, data: order, isLoading, error } = useQuery({
        queryKey: ["order", user?.email],

        queryFn: async () => {
            
            const res = await axiosSecure.get(`/all-order-list-user/${user?.email}`);
            console.log(res?.data)
            return res?.data;
        },
    });

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    if (isLoading) {
        return <LoadingPage />
    }
    if (error) {
        return <ErrorPage />
    }
    return (
        <div className='h-screen' style={backgroundStyle}>
            <p className="text-center text-3xl font-bold text-white pt-20"> Orders</p>
            
            <SetTitle title=" Orders" />
        <div className='mx-auto p-5 flex flex-wrap justify-center gap-10'>
            {
                order?.map(order=><FoodCard key={order?._id} order={order}>
                    </FoodCard>
                
                )
                
            }
            </div>
            
        </div>
    );
};

export default OffsiteAllOrders;