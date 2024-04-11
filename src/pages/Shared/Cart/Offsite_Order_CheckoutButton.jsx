import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { SwalErrorShow } from '../../../assets/scripts/Utility';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import { Button } from '@nextui-org/react'; // Assuming Button component is from Next UI
import { BsFillGiftFill } from 'react-icons/bs';
import { TbCurrencyTaka } from 'react-icons/tb';
import toast from 'react-hot-toast';

const Offsite_Order_CheckoutButton = ({ branchID, res_id, discountData, setDiscountData, coupon, setCoupon, subtotal }) => {

    const axiosSecure = useAxiosSecure();
    const [uploading, setUploading] = useState(false);
    const { user } = useAuthProvider();
    const navigate = useNavigate();

    const CreateOffsiteOrder = () => {
        setUploading(true);
        const data = {
            res_id,
            branchID,
            email : user?.email
        };
        if (discountData?.discountedPrice !== 0) {
            data.couponCode = coupon,
            data.discountedPrice = discountData?.discountedPrice
        }

        console.log(data)
        axiosSecure.post(`/create-an-offsite-order/${user?.email}`, data)
            .then(res => {
                console.log(res.data);
                // toast.success("Order placed");
                Swal.fire({
                    title: res.data?.token || "",
                    text: res.data?.message || ""
                });
                // navigate(`/restaurant/${res_id}/branch/${branchID}/ongoing-orders`)
            })
            .catch(e => {
                SwalErrorShow(e);
            })
            .finally(() => setUploading(false));
    };

    const handleCouponChange = (e) => {
        setDiscountData({ discountedPrice: 0, message: "" })
        setCoupon(e.target.value);
    };

    const checkDiscount = () => {
        setUploading(true)

        const data = {
            res_id, branchID, couponCode: coupon, totalPrice: subtotal, email: user?.email
        }
        axiosSecure.post(`/get-discount-by-applying-coupon`, data)
            .then(res => {

                setDiscountData(res.data);
                if (res.data?.discountedPrice == 0) {
                    toast.error(res.data?.message)
                } else {
                    toast.success(res.data?.message)

                }
            })
            .catch(error => {
                SwalErrorShow(error);
            })
            .finally(() => setUploading(false))
    };

    const { refetch, data, isLoading, error } = useQuery({
        queryKey: ['res-order-placing-available', res_id, branchID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offsite-order-taking-place-check/${res_id}/${branchID}`);
            return res.data;
        },
    });

    return (
        <>



            <div className="flex items-center justify-between relative">

                {/* ____________________________________voucher ________________________________ */}
                <div className="bg-[#F7F7F7] rounded-md md:rounded-lg  px-2 md:px-4 py-2 flex ">

                    <div className="relative flex-1">
                        <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BsFillGiftFill className="text-[#4ABA6F] " />
                        </div>
                        <input autoComplete="off" type="text" id="simple-search" className=" text-gray-900 text-sm rounded-lg  block w-full pl-10 p-1.5" name="vouchername" placeholder="Coupon" value={coupon}
                            onChange={handleCouponChange} />
                    </div>
                    <button onClick={checkDiscount} disabled={!(data?.available) || (!!error) || coupon.length == 0} className="p-1.5 md:px-4 ml-2 text-sm font-medium text-white  rounded-lg bg-root-100 disabled:cursor-not-allowed disabled:bg-slate-300">
                        Apply
                    </button>


                </div>
                <span className="text-right">৳ {discountData?.discountedPrice}</span>

            </div>
            <div className=" text-xs border-t border-black border-dashed my-4 pt-4">
                <div className="grid grid-cols-2  text-left py-1">
                    <span>Payment Amount</span>
                    <span className="text-right">৳ {subtotal - discountData?.discountedPrice}</span>
                </div>
            </div>





            <Button color='success' variant='solid' className='text-white font-medium' isLoading={isLoading || uploading} isDisabled={!(data?.available) || (!!error)} onPress={CreateOffsiteOrder}>
                {
                    error ?
                        "Error Occured"
                        :
                        data?.available ?
                            " Order Now"
                            :
                            "Closed Restaurant"
                }
            </Button>

        </>
    );
};

export default Offsite_Order_CheckoutButton;
