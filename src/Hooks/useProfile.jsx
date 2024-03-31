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
            // const res = await axiosSecure.get(`/get-profile/${user?.email}`);
            // console.log("profile: ",res.data, '\n role : ',{ role : res.data?.role})
            // return res?.data;

            return {
                name: "Ahamed Hossain",
                phone: "+8801712345678",
                email: "hossainahamed6872@gmail.com",
                DOB: "1995-12-31T00:00:00Z", // Date of Birth in ISO format (with time)
                address: [
                    {
                        streetAddress: "123, ABC Street",
                        city: "Dhaka",
                        stateProvince: "Dhaka",
                        postalCode: "1206",
                        country: "Bangladesh",
                        isSelected: true, // Selected address
                    },
                    {
                        streetAddress: "456, XYZ Street",
                        city: "Chittagong",
                        stateProvince: "Chittagong",
                        postalCode: "4000",
                        country: "Bangladesh",
                        isSelected: false, // Not selected address
                    }
                ],
                imgURL: "https://example.com/ahamed_hossain.jpg", // Example image URL
                gender: "Male",
            }


        },
    });
    return { profile, profileLoading, profileRefetch, permitted: profile?.permitted, profileError }
   

};

export default useProfile;