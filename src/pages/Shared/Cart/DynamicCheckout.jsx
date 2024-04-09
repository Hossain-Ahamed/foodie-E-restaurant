import React, { useState } from 'react';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { SwalErrorShow } from '../../../assets/scripts/Utility';

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
                toast.success("Order placed");
                navigate(`/onsite-order/restaurant/${res_id}/branch/${branchID}/ongoing-orders/table/${tableID}`)
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

        return (
            <Button color='success' variant='solid' className='text-white font-medium'>if not onsite order then check time of working hour</Button>
        );
    }



};

export default DynamicCheckout;