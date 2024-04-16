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
        <div className='w-[300px] md:w-[700px] xl:w-[900px] mx-auto py-5 grid grid-cols-2 items-center justify-items-center'>
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