import React from 'react';
import ViewEmployee from './ViewEmployee';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { Skeleton } from '@nextui-org/react';
import ErrorPage from '../../Shared/ErrorPage/ErrorPage';
import useRestauarantAndBranch from '../../../Hooks/useRestauarantAndBranch';

const ViewAsAdmin = () => {
    const { employeeID } = useParams();

    const axiosSecure = useAxiosSecure();
    const { branchID, res_id } = useRestauarantAndBranch();

    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError } = useQuery({
        queryKey: ['employeeData', employeeID],
        enabled: true,
        cacheTime: 0,
        queryFn: async () => {
        const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/get-employee-data/${employeeID}`);

            //   to do uncomment 
            // setSelectedImage0(res.data?.profilePhoto);
            // return res?.data;

            const prev = {
                id: 1,
                f_name: 'Farhan Hasan',
                l_name: 'Nilok',
                email: 'a@gmail.com',
                gender: 'Male',
                DOB: '2001-01-19',
                nid: '45273485',
                role: 'Accounts',
                mobile: '01868726172',
                commentNotes: "tui moros na k",
                profilePhoto: 'https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no',
                streetAddress: "14/9 New Chasara",
                city: 'Narayanganj',
                stateProvince: 'Dhaka',
                postalCode: '435',
                country: "Bangladesh",


                emergencyAddress: "J A M T O L A",
                emergencyEmail: "hossainahamed6872@gmail.com",
                emergencyName: "Md. Hossain Ahamed",
                emergencyPhoneNumber: "01868726172",
                emergencyRelation: "3241"
            }

            return prev;
        },
    });


    if (dataLoading) {
        return <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
        </div>
    }

    if (dataError) {
        return <ErrorPage />
    }

    return (
        <>
            <ViewEmployee data={data} title="Employee Profile" editable={true} />
        </>
    );
};

export default ViewAsAdmin;