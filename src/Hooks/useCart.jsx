import React, { createContext, useState } from 'react';
import useAuthProvider from './useAuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';
export const CartContext = createContext();

const useCart = () => {
    const { user, loading } = useAuthProvider();
    const axiosSecure = useAxiosSecure();
    const { refetch : CartRefetch, data :CartData=[], isLoading: CartFetchLoading, error :CartFetchError} = useQuery({
        queryKey: ['cart', user?.email],
        enabled: (!loading && (!!user)),
        queryFn: async () => {
             const res = await axiosSecure.get(`/get-my-cart/${user?.email}`);
            //  console.log(res.data)
           return res?.data;


        },


        
    });
  
    return {CartData,CartFetchLoading,CartFetchError,CartRefetch};
};

export default useCart;