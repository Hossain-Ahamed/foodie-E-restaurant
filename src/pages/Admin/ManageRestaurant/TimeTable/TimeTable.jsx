import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query'
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';

const RestaurantTimes = () => {
    const { handleSubmit, control, setValue } = useForm();

    const axiosSecure = useAxiosSecure();
    const { res_id, branchID } = useRestauarantAndBranch();

    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError } = useQuery({
        queryKey: ['shiftdata', res_id, branchID],
        enabled: true,
        cacheTime: 0,
        queryFn: async () => {
            const { data1 } = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/manage-shift`);
            const data =// Default data format for each day of the week
            {
                "Sunday": {
                    "openingTime": "10:00",
                    "closingTime": "18:00"
                },
                "Monday": {
                    "openingTime": "09:00",
                    "closingTime": "20:00"
                },
                "Tuesday": {
                    "openingTime": "08:30",
                    "closingTime": "19:30"
                },
                "Wednesday": {
                    "openingTime": "09:30",
                    "closingTime": "21:00"
                },
                "Thursday": {
                    "openingTime": "11:00",
                    "closingTime": "17:30"
                },
                "Friday": {
                    "openingTime": "07:00",
                    "closingTime": "22:00"
                },
                "Saturday": {
                    "openingTime": "10:30",
                    "closingTime": "19:00"
                }
            }
            Object.keys(data).forEach((day) => {
                setValue(`${day}.openingTime`, data[day].openingTime);
                setValue(`${day}.closingTime`, data[day].closingTime);
            });

            return data;
        },
    });


    const onSubmit = async (data) => {
        console.log(data)
        try {
            // Perform API call to update restaurant times (replace with your API endpoint)
            await fetch('https://your-api-endpoint.com/restaurant/times', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            Swal.fire('Success', 'Restaurant times updated successfully!', 'success');
        } catch (error) {
            Swal.fire('Error', 'An error occurred. Please try again.', 'error');
        }
    };

    if (dataError) {
        return <ErrorPage />
    }
    if (dataLoading) {
        return <LoadingPage />
    }
    return (
        <>
            <SetTitle title="Shifts" />
            <SectionTitle h1="Manage Shifts" />
            <div className="container mx-auto mt-8 max-w-[800px] p-3 border rounded-md">
                <div className='grid grid-cols-7 '>
                    <div className='col-span-1'><p className='mb-1 text-lg font-normal text-gray-800 '>Day</p></div>
                    <div className='col-span-3'><p className='mb-1 text-lg font-normal text-gray-800 '>Opening Time</p></div>
                    <div className='col-span-3'><p className='mb-1 text-lg font-normal text-gray-800 '>Closing Time</p></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {Object.keys(data).map((day) => (
                        <div key={day} className="grid grid-cols-7 gap-2 ">
                            <div className='col-span-1'><p className='mb-6 text-lg font-normal text-gray-500 '>{day}</p></div>

                            <div className='col-span-3'>
                                <Controller
                                    name={`${day}.openingTime`}
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="time"
                                            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    )}
                                />
                            </div>
                            <div className='col-span-3'>
                                <Controller
                                    name={`${day}.closingTime`}
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="time"
                                            className="appearance-none border rounded w-full py-2 px-2 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    )}
                                /></div>





                        </div>
                    ))}

                    <div className='w-full flex justify-center'>
                        <button
                            type="submit"
                            className="inline-block rounded border border-green-500 bg-green-500 px-12 py-3 text-sm font-medium text-white hover:bg-green-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RestaurantTimes;
