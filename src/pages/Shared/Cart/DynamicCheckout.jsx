import React, { useState } from 'react';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { SwalErrorShow } from '../../../assets/scripts/Utility';
import Swal from 'sweetalert2';
import Offsite_Order_CheckoutButton from './Offsite_Order_CheckoutButton';

const DynamicCheckout = () => {
    const [uploading, setUploading] = useState(false)
    const { user } = useAuthProvider();
    const { res_id, branchID, tableID } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
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
                    title : res.data?.token || "",
                    text : res.data?.message || ""
                })
                // navigate(`/onsite-order/restaurant/${res_id}/branch/${branchID}/ongoing-orders`)
            })
            .catch(e=>{
                SwalErrorShow(e)
            })
            .finally(()=>setUploading(false))
    }
    if (location.pathname.includes('onsite-order')) {
        return (
            <Button color='success' variant='solid' className='text-white font-medium' onPress={CreateOnsiteOrder} isLoading={uploading}>Checkout</Button>
        );
    } else {

        return <Offsite_Order_CheckoutButton/>
    }



};

export default DynamicCheckout;