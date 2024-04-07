import React from 'react';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { ScaleLoader } from 'react-spinners';
import ErrorPage from '../ErrorPage/ErrorPage';
import { Button } from '@nextui-org/react';
import DynamicCheckout from './DynamicCheckout';

const Cart_Before_Checkout = () => {
    const { user } = useAuthProvider();
    const { res_id, branchID } = useParams();
    const axiosSecure = useAxiosSecure();

    const { refetch, data, isLoading, error, } = useQuery({
        queryKey: ['my-cart-data-user-end', user?.email],

        queryFn: async () => {
            const res = await axiosSecure.get(`/restuarant/${res_id}/branch/${branchID}/email/${user?.email}`); 
            return res.data;
        },
    });

    if (isLoading) {
        return <div className='max-w-screen h-[300px] flex justify-center items-center z-[100] overflow-hidden' aria-label='loading-icon'>
            <ScaleLoader size={100} color='#36d7b7' />
        </div>
    }

    if (error) {
        return <ErrorPage />
    }
    return (
        <>

            <div className="text-xs">
                <div className="grid grid-cols-5  text-left border-black border-b border-dashed">
                    <span>Qty</span>
                    <span className='col-span-2'>Item</span>

                    <span className="text-right">Options</span>
                    <span className="text-right">Total</span>
                </div>
                {
                    data?.dishes && Array.isArray(data.dishes) && data.dishes.map(dish=><div key={dish?._id || Date.now().toString()} className="grid grid-cols-5  text-left py-1">
                    <span>{dish?.quantity}x</span>
                    <span className='col-span-2'>{dish?.title} <br/> {dish.addOn && Array.isArray(dish.addOn) && dish.addOn.length >0 && <>+{dish?.addOn.join(", ")}</>} </span>
                    <span className="text-right"> {dish?.options && <>{dish?.options}</> || "Standard"}</span>
                    <span className="text-right">৳ {dish?.totalPrice}</span>
                </div>)
                }

                
            </div>

            <div className=" text-xs border-t border-black border-dashed">
            <div className="grid grid-cols-2  text-left py-1">
              <span>Subtotal</span>
              <span className="text-right">৳ {data?.subtotal}</span>
            </div>
            
           
            <div className="grid grid-cols-2  text-left py-1">
              <span>Discounts</span>
              <span className="text-right">(-) ৳ {data?.discount}</span>
            </div>
            <div className="grid grid-cols-2  text-left py-1 font-semibold">
              <span>Total</span>
              <span className="text-right"> ৳ {data?.total.toFixed(1)}</span>
            </div>
          </div>
          <DynamicCheckout/>
        </>
    );
};

export default Cart_Before_Checkout;