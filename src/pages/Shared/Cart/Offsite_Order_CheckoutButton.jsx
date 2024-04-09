import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { SwalErrorShow } from '../../../assets/scripts/Utility';

const Offsite_Order_CheckoutButton = () => {
    const { branchID, res_id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [uploading, setUploading] = useState(false)
    const { user } = useAuthProvider();

    const navigate = useNavigate();
    const CreateOffsiteOrder = () => {
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
                // navigate(`/restaurant/${res_id}/branch/${branchID}/ongoing-orders`)
            })
            .catch(e=>{
                SwalErrorShow(e)
            })
            .finally(()=>setUploading(false))
    }
    const { refetch, data, isLoading, error, } = useQuery({
        queryKey: ['res-order-placing-available', res_id, branchID],

        queryFn: async () => {
            const res = await axiosSecure.get(`/offsite-order-taking-place-check/${res_id}/${branchID}`);
            return res.data;
        },
    });
    return (
        <Button color='success' variant='solid' className='text-white font-medium' isLoading={isLoading} isDisabled={data?.available || (!!error)} >
            {
                data?.available ?
                    "Place Order"
                    :
                    "Closed Restaurant"

            }
        </Button>
    );
};

export default Offsite_Order_CheckoutButton;