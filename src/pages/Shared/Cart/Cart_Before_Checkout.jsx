import React, { useState } from 'react';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { ScaleLoader } from 'react-spinners';
import ErrorPage from '../ErrorPage/ErrorPage';
import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { SwalErrorShow } from '../../../assets/scripts/Utility';

const Cart_Before_Checkout = () => {
    const { user } = useAuthProvider();
    const { res_id, branchID, tableID } = useParams();
    const axiosSecure = useAxiosSecure();
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate();

    const { refetch, data, isLoading, error, } = useQuery({
        queryKey: ['my-cart-data-user-end', user?.email],

        queryFn: async () => {
            const res = await axiosSecure.get(`/restuarant/${res_id}/branch/${branchID}/email/${user?.email}`);

            return res.data;
        },
    });





    const CreateOnsiteOrder = () => {
        setUploading(true);
        const data = {
            res_id,
            branchID,
            table_id: tableID
        }
        axiosSecure.post(`/create-an-onsite-order/${user?.email}`, data)
            .then(res => {
                console.log(res.data);
                // toast.success("Order placed");
                Swal.fire({
                    title: res.data?.token || "",
                    text: res.data?.message || ""
                })
                // navigate(`/onsite-order/restaurant/${res_id}/branch/${branchID}/ongoing-orders`)
            })
            .catch(e => {
                SwalErrorShow(e)
            })
            .finally(() => setUploading(false))
    }


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
            <p className="flex flex-col  items-center text-lg">Place Your Order</p>
            <div className="text-xs">
                <div className="grid grid-cols-5  text-left border-black border-b border-dashed">
                    <span>Qty</span>
                    <span className='col-span-2'>Item</span>

                    <span className="text-right">Options</span>
                    <span className="text-right">Total</span>
                </div>
                {
                    data?.dishes && Array.isArray(data.dishes) && data.dishes.map(dish => <div key={dish?._id || Date.now().toString()} className="grid grid-cols-5  text-left py-1">
                        <span>{dish?.quantity}x</span>
                        <span className='col-span-2'>{dish?.title} <br /> {dish.addOn && Array.isArray(dish.addOn) && dish.addOn.length > 0 && <>+{dish?.addOn.join(", ")}</>} </span>
                        <span className="text-right"> {dish?.options && <>{dish?.options}</> || "Standard"}</span>
                        <span className="text-right">৳ {dish?.totalPrice.toFixed(2)}</span>
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
            <Button color='success' variant='solid' className='text-white font-medium' onPress={CreateOnsiteOrder} isLoading={uploading}>Checkout</Button>
        </>
    );
};

export default Cart_Before_Checkout;