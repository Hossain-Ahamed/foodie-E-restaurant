import React, { useState } from 'react';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { SwalErrorShow } from '../../../assets/scripts/Utility';
import { ScaleLoader } from 'react-spinners';
import ErrorPage from '../ErrorPage/ErrorPage';
import Offsite_Order_CheckoutButton from './Offsite_Order_CheckoutButton';

const Cart_Before_Checkout_offsite = () => {

    const [coupon, setCoupon] = useState("");
    const [discountData, setDiscountData] = useState({ discountedPrice: 0, message: "" });
    const { user } = useAuthProvider();
    const { res_id, branchID, tableID } = useParams();
    const axiosSecure = useAxiosSecure();
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate();

    const { refetch, data, isLoading, error, } = useQuery({
        queryKey: ['my-cart-data-user-end', user?.email],

        queryFn: async () => {
            const res = await axiosSecure.get(`/get-all-pricing-detail-before-offsite-order-checkout/${user?.email}`);
            // console.log(res.data)
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

            <p className='text-center text-lg mb-3 text-blue-300'>{data?.res_name} : {data?.branch_name}</p>
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
            </div>
            <Offsite_Order_CheckoutButton coupon={coupon} discountData={discountData} setCoupon={setCoupon} setDiscountData={setDiscountData} branchID={data?.branchID} res_id={data?.res_id} subtotal={data?.subtotal} />
        </>
    );
};

export default Cart_Before_Checkout_offsite;