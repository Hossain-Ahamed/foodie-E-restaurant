import React from 'react';
import useAuthProvider from './useAuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';


const useProfile = () => {

    const { user, loading } = useAuthProvider();
    const axiosSecure = useAxiosSecure();
    const { refetch : profileRefetch, data: profile = {}, isLoading: profileLoading, error :profileError} = useQuery({
        queryKey: ['profile', user?.email],
        enabled: (!loading && (!!user)),
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-profile/${user?.email}`);
            // res.data.phone = '880186726172'
            return res?.data;

            // return {
            //     _id : "87jfs43jfshfs",
            //     name: " Hossain Ahamed",
            //     phone: "+8801712345678",
            //     email: "hossainahamed6872@gmail.com",
            //     DOB: "1995-12-31T00:00:00Z", // Date of Birth in ISO format (with time)
            //     address: 
            //         {
            //             streetAddress: "123, ABC Street",
            //             city: "Dhaka",
            //             stateProvince: "Dhaka",
            //             postalCode: "1206",
            //             country: "Bangladesh",
                        
            //         }
            //     ,
            //     imgURL: "https://i.pravatar.cc/150?u=a042581f4e29026024d", // Example image URL
            //     gender: "Male",
            // }


        },
    });
    return { profile, profileLoading, profileRefetch, permitted: profile?.permitted, profileError }
   

};

export default useProfile;