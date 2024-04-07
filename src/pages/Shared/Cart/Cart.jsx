import React from 'react';
import useCart from '../../../Hooks/useCart';
import SetTitle from '../SetTtitle/SetTitle';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import LoadingPage from '../LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import CartItem from './CartItem';
import EmptyCart from '../../../assets/images/Home/emptycart.jpeg'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Cart_Before_Checkout from './Cart_Before_Checkout';
import useProfile from '../../../Hooks/useProfile';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const OnsiteCart = () => {
    const { CartData, CartFetchLoading, CartRefetch, CartFetchError } = useCart();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const {profile,profileLoading , profileError} = useProfile();

    if (CartFetchLoading || profileLoading) {
        return <LoadingPage />
    }

    if (CartFetchError || profileError) {
        return <ErrorPage />
    }

    if(!(profile?.phone && profile?.address?.city && profile?.phone )){
       
        if(!(profile?.phone &&  profile?.phone )){
            toast.success('Add your details');
           return <Navigate  to="/edit-profile"  replace={true}/>
        }

        if(!profile?.address?.city){
            toast.error("Please add your address");
            return <Navigate  to="/edit-profile"  replace={true}/>
        }
    }
    return (
        <>
            <SetTitle title="Cart" />
            <SectionTitle h1="My Cart" />
            <div className='w-fit mx-auto mt-5  p-2 border rounded-md'>
                <div className='grid grid-cols-1 w-screen gap-y-2 max-w-[500px]'>

                    {
                        CartData && Array.isArray(CartData) &&
                        CartData.map(item => <CartItem key={item?._id} dishData={item} />)
                    }
                </div>

                {
                    CartData && Array.isArray(CartData) && CartData.length > 0 ?
                        <Button className='mt-3 w-full text-white font-medium text-lg' color='success' variant='solid' isLoading={CartFetchLoading} onPress={onOpen}>Place Order</Button>

                        :
                        <img src={EmptyCart} alt="" className='w-full h-auto' />
                }

            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 items-center">Place Your Order</ModalHeader>
                            <ModalBody>
                                <Cart_Before_Checkout />
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default OnsiteCart;