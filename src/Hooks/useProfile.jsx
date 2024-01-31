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
            // console.log("profile: ",res.data, '\n role : ',{ role : res.data?.role})
            // return res?.data;

            return {
                f_name: 'Alex',
                l_name: 'benjamin',
                email: 'a@gmail.com',
                gender: 'Female',
                DOB: '2001-01-19',
                nid: '45273485',              
                mobile: '01868726172',
                commentNotes: "tui moros na k",
                profilePhoto: 'https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no',
                streetAddress: "J A M T O L A",
                city: 'Narayanganj',
                stateProvince: 'Dhaka',
                postalCode: '435',
                country: "Bangladesh",


                emergencyAddress: "J A M T O L A",
                emergencyEmail: "hossainahamed6872@gmail.com",
                emergencyName: "Md. Hossain Ahamed",
                emergencyPhoneNumber: "01868726172",
                emergencyRelation: "3241",
                
                permitted : [
                    {
                        res_img : 'https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        res_name : 'fuoco',
                        res_id : '743ndsa8t43',
                        
                        branch_name : 'kolabagan',
                        branchID : '3485jdsfu',

                        role : 'Customer Service',
                    },
                    {
                        res_img : 'https://plus.unsplash.com/premium_photo-1676977396095-07e0648d92df?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        res_name : 'Chitchat',
                        res_id : '849358',
                        
                        branch_name : 'Dhanmondi',
                        branchID : 'jfsd845jfdsa',

                        role : 'Super-Admin',
                    },

                ]
            }

        },
    });
    return { profile, profileLoading, profileRefetch, permitted: profile?.permitted, profileError }
   

};

export default useProfile;