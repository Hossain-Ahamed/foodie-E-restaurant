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
import { Navigate, useLocation } from 'react-router-dom';
import Cart_Before_Checkout_offsite from './Cart_Before_Checkout_Offsite';

const Cart = () => {
    const { CartData, CartFetchLoading, CartRefetch, CartFetchError } = useCart();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { profile, profileLoading, profileError } = useProfile();
    const location = useLocation();


    if (CartFetchLoading || profileLoading) {
        return <LoadingPage />
    }

    if (CartFetchError || profileError) {
        return <ErrorPage />
    }

    if (!(profile?.phone && profile?.address?.city && profile?.phone)) {

        if (!(profile?.phone && profile?.phone)) {
            toast.success('Add your details');
            return <Navigate to="/edit-profile" replace={true} />
        }

        if (!profile?.address?.city || location.pathname.includes('onsite-order')) {
            toast.error("Please add your address");
            return <Navigate to="/edit-profile" replace={true} />
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}  placement="auto">
                <ModalContent>
                    {(onClose) => (
                        <>
                          
                            <ModalBody className='h-fit max-h-[85vh]  overflow-scroll pt-0 mx-0 px-0 scrollbar-hide'>
                                {
                                    location.pathname.includes('onsite-order') ?
                                        <>
                                            <Cart_Before_Checkout />
                                        </>
                                        :
                                        <>
                                            <Cart_Before_Checkout_offsite />
                                        </>
                                }


                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Cart;