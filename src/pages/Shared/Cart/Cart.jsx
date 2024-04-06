import React from 'react';
import useCart from '../../../Hooks/useCart';
import SetTitle from '../SetTtitle/SetTitle';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import LoadingPage from '../LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import CartItem from './CartItem';
import { Button } from '@nextui-org/react';
import EmptyCart from '../../../assets/images/Home/emptycart.jpeg'

const OnsiteCart = () => {
    const { CartData, CartFetchLoading, CartRefetch, CartFetchError } = useCart();


    if (CartFetchLoading) {
        return <LoadingPage />
    }

    if (CartFetchError) {
        return <ErrorPage />
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
                    CartData && Array.isArray(CartData) && CartData.length>0 ?
                    <Button className='mt-3 w-full text-white font-medium text-lg' color='success' variant='solid' isLoading={CartFetchLoading}>Place Order</Button>

                    :
                    <img src={EmptyCart} alt=""  className='w-full h-auto'/>
                }

            </div>

        </>
    );
};

export default OnsiteCart;