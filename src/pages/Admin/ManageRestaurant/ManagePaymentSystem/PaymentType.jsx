import React, { useState } from 'react';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import { Button } from '@nextui-org/react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import { ScaleLoader } from 'react-spinners';

const PaymentType = () => {
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID } = useRestauarantAndBranch();


    const { handleSubmit, register, setValue } = useForm();

    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError, } = useQuery({
        queryKey: ['paymenttype', res_id, branchID],
        enabled: true,
        cacheTime: 0,
        queryFn: async () => {
            let res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/payments-type`);

            res = {
                data: {
                    "paymentTypes": "PayLater"
                }
            }
            setValue('paymentType', res.data?.paymentTypes);
            return res?.data;
        },
    });

    const handleChange = (Changedata) => {

        setValue('paymentType', Changedata);

        const reqData = {
            "paymentTypes": Changedata
        }

        Swal.fire({
            title: "Are you sure?",
            text: "It will change the business policy",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "info",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/restaurant/${res_id}/branch/${branchID}/payments-type`, reqData)
                    .then(data => {
                        toast.success("Successfully Changed");
                        dataRefetch();
                    })
                    .catch((error) => {
                        setValue('paymentType', data?.paymentTypes);
                        Swal.fire({
                            icon: 'error',
                            title: error?.code + " " + error?.message,
                            text: error.response.data?.message
                        })




                    })
            }
        });

    };

    const onSubmit = (formData) => {
        // Handle submission logic here, e.g., send data to the server
        console.log('Submitted Data:', formData);
    };

    if (dataLoading) {
        return <ScaleLoader size={100} color='#36d7b7' style={{margin:'auto',"height": '50px'}} />;
    }

    if (dataError) {
        return <ErrorPage />;
    }

    return (
        <section>
            <SetTitle title="Payment" />
            <form >
                <fieldset className="grid grid-cols-2 gap-4">
                    <legend className="sr-only">Payment type</legend>

                    <div>
                        <input
                            type="radio"
                            {...register("paymentType")}
                            id="PayFirst"
                            value="PayFirst"
                            className="peer hidden [&:checked_+_label_svg]:block"
                            onClick={() => handleChange("PayFirst")}
                        />
                        <label
                            htmlFor="PayFirst"
                            className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700">Pay First / Pre pay</p>
                            </div>
                            <p className="mt-1 text-xs text-gray-400">
                                For business that charge customer while ordering meal <br />Create a new order in case of adding a new meal
                            </p>
                        </label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            {...register("paymentType")}
                            id="PayLater"
                            value="PayLater"
                            className="peer hidden [&:checked_+_label_svg]:block"
                            onClick={() => handleChange("PayLater")}
                        />
                        <label
                            htmlFor="PayLater"
                            className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700">Pay Later / Post Pay </p>
                            </div>
                            <p className="mt-1 text-xs text-gray-400">
                                For business that charge customer after meal <br /> Update previous order in case of adding extra meal
                            </p>
                        </label>
                    </div>
                </fieldset>


            </form>

            <label htmlFor="Currency" className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Curency</label>
            <select id="Currency" disabled className="disabled:cursor-not-allowed block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option >Bangaldeshi taka- BDT (৳)</option>
            </select>
            <label htmlFor="TimeZone" className="block text-sm font-medium text-gray-900 dark:text-white">TimeZone</label>
            <select id="TimeZone" disabled className="disabled:cursor-not-allowed block w-full p-2 mb-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option >Asia/Dhaka UTC+06:00</option>
            </select>
            <p className='m-0 p-0 pl-1 text-xs text-gray-400'>Changing the timezone will cahnge the Business Hours and start and end times of your existing offer, Memberships and Vouchers</p>
        </section >
    );
};

export default PaymentType;