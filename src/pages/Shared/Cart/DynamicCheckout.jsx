import React from 'react';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Button } from '@nextui-org/react';

const DynamicCheckout = () => {
    const { user } = useAuthProvider();
    const { res_id, branchID } = useParams();
    const axiosSecure = useAxiosSecure();
    if (location.pathname.includes('onsite-order')) {
        return (
            <Button color='success' variant='solid' className='text-white font-medium'>Checkout</Button>
        );
    } else {
        
        return (
            <Button color='success' variant='solid' className='text-white font-medium'>Checkout</Button>
        );
    }

 
   
};

export default DynamicCheckout;