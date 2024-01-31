import React from 'react';
import { Tooltip } from 'react-tooltip'
import SectionTitle from '../../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../../../Shared/SetTtitle/SetTitle';
import useRestauarantAndBranch from '../../../../../Hooks/useRestauarantAndBranch';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import Swal from "sweetalert2";
import { toast } from 'react-hot-toast';
import LoadingPage from '../../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../../Shared/ErrorPage/ErrorPage';
const CouponList = () => {
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID } = useRestauarantAndBranch();
    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError } = useQuery({
        queryKey: ['coupon'],
        enabled: true,
        cacheTime: 0,
        queryFn: async () => {


            // const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/coupon-list`);


            const res = {
                data: [
                    {
                        _id: "43058934",
                        name: "Coupon 1",
                        percantage: "10",
                        minimumOrderAmmount: "20",
                        maximumDiscountLimit: "50",
                        maximumNumberOfUse: "3",
                        from: "2024-02-01T08:00:00.000Z",
                        to: "2023-02-10T20:00:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 2",
                        percantage: "15",
                        minimumOrderAmmount: "30",
                        maximumDiscountLimit: "70",
                        maximumNumberOfUse: "5",
                        from: "2024-02-12T10:00:00.000Z",
                        to: "2024-02-20T22:00:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 3",
                        percantage: "20",
                        minimumOrderAmmount: "25",
                        maximumDiscountLimit: "60",
                        maximumNumberOfUse: "4",
                        from: "2022-03-01T12:00:00.000Z",
                        to: "2022-03-10T23:59:59.999Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 4",
                        percantage: "8",
                        minimumOrderAmmount: "15",
                        maximumDiscountLimit: "40",
                        maximumNumberOfUse: "2",
                        from: "2024-03-15T15:30:00.000Z",
                        to: "2024-03-25T18:45:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 5",
                        percantage: "5",
                        minimumOrderAmmount: "10",
                        maximumDiscountLimit: "30",
                        maximumNumberOfUse: "1",
                        from: "2024-04-01T08:00:00.000Z",
                        to: "2024-04-10T20:00:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 6",
                        percantage: "12",
                        minimumOrderAmmount: "40",
                        maximumDiscountLimit: "80",
                        maximumNumberOfUse: "6",
                        from: "2024-04-12T10:00:00.000Z",
                        to: "2024-04-20T22:00:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 7",
                        percantage: "18",
                        minimumOrderAmmount: "35",
                        maximumDiscountLimit: "65",
                        maximumNumberOfUse: "5",
                        from: "2024-05-01T12:00:00.000Z",
                        to: "2024-05-10T23:59:59.999Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 8",
                        percantage: "7",
                        minimumOrderAmmount: "18",
                        maximumDiscountLimit: "45",
                        maximumNumberOfUse: "3",
                        from: "2024-05-15T15:30:00.000Z",
                        to: "2024-05-25T18:45:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 9",
                        percantage: "14",
                        minimumOrderAmmount: "28",
                        maximumDiscountLimit: "55",
                        maximumNumberOfUse: "4",
                        from: "2024-06-01T08:00:00.000Z",
                        to: "2024-06-10T20:00:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 10",
                        percantage: "22",
                        minimumOrderAmmount: "50",
                        maximumDiscountLimit: "90",
                        maximumNumberOfUse: "7",
                        from: "2024-06-12T10:00:00.000Z",
                        to: "2024-06-20T22:00:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 11",
                        percantage: "9",
                        minimumOrderAmmount: "22",
                        maximumDiscountLimit: "48",
                        maximumNumberOfUse: "2",
                        from: "2024-07-01T12:00:00.000Z",
                        to: "2024-07-10T23:59:59.999Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 12",
                        percantage: "17",
                        minimumOrderAmmount: "38",
                        maximumDiscountLimit: "68",
                        maximumNumberOfUse: "5",
                        from: "2024-07-15T15:30:00.000Z",
                        to: "2024-07-25T18:45:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 13",
                        percantage: "25",
                        minimumOrderAmmount: "60",
                        maximumDiscountLimit: "100",
                        maximumNumberOfUse: "8",
                        from: "2023-08-01T08:00:00.000Z",
                        to: "2023-08-10T20:00:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 14",
                        percantage: "11",
                        minimumOrderAmmount: "33",
                        maximumDiscountLimit: "58",
                        maximumNumberOfUse: "3",
                        from: "2023-08-12T10:00:00.000Z",
                        to: "2024-08-20T22:00:00.000Z",
                    },
                    {
                        _id: "43058934",
                        name: "Coupon 15",
                        percantage: "19",
                        minimumOrderAmmount: "42",
                        maximumDiscountLimit: "75",
                        maximumNumberOfUse: "6",
                        from: "2024-09-01T12:00:00.000Z",
                        to: "2024-09-10T23:59:59.999Z",
                    },
                ]
            }


            return res.data;
        },

    });


    const getColor = (from, to) => {
        const currentTime = new Date().toISOString();
        if (currentTime >= from && currentTime <= to) {
            return { "text": "Active", "color": 'text-green-500' };
        } else if (currentTime > to) {
            return { "text": "Expired", "color": 'text-red-500' };
        } else {
            return { "text": "Future", "color": 'text-blue-500' };
        }
    };

    const handleDelete = (couponID) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/restaurant/${res_id}/branch/${branchID}/delete-coupon/${couponID}`)
                    .then(data => {
                        toast.success("Successfully deleted");
                        dataRefetch();
                    })
                    .catch((error) => {

                        Swal.fire({
                            icon: 'error',
                            title: error?.code + " " + error?.message,
                            text: error.response.data?.message
                        })
                    })
            }
        });

    }

    if (dataLoading) {
        return <LoadingPage />
    }

    if (dataError) {
        return <ErrorPage />
    }
    return (
        <section aria-label='coupons' className='py-3 max-w-7xl mx-auto'>

            <SetTitle title="Coupons" />
            <div className='flex  gap-3'>
                <div className='w-full '>
                    <SectionTitle h1="All Available Coupons" />
                </div>
                <div>
                    <Link to={`/restaurant/${res_id}/branch/${branchID}/add-coupon`} className='flex justify-center items-center gap-2 text-white font-medium  px-4 py-2 bg-green-400 rounded-md text-nowrap '>Add Coupon<IoAddOutline className='text-white' /></Link>

                </div>

            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 shaodow shadow-md">
                    <thead className="text-sm text-gray-700  bg-gray-50 ">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Coupon name
                            </th>
                            <th scope="col" className="px-2 py-3 text-center text-nowrap">
                                Discount <br /><span className='text-gray-400 text-[10px] font-normal'>(in percantage)</span>
                            </th>
                            <th scope="col" className="px-2 py-3 text-center text-nowrap">
                                Order Ammount <br /><span className='text-gray-400 text-[10px] font-normal'>(Minimum)</span>
                            </th>
                            <th scope="col" className="px-2 py-3 text-center text-nowrap">
                                Discount Limit <br /><span className='text-gray-400 text-[10px] font-normal'>( Maximum )</span>
                            </th>
                            <th scope="col" className="px-2 py-3 text-center text-nowrap">
                                Number of Use<br /><span className='text-gray-400 text-[10px] font-normal'>( Maximum )</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                From
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                To
                            </th>
                            <th scope="col" className="px-2 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && Array.isArray(data) && data.map((item, _idx) => {
                                const fieldsStatus = getColor(item.from, item.to);
                                return (
                                    <tr key={_idx}

                                        className={`bg-white border-b ${fieldsStatus?.color} hover:bg-gray-50 cursor-pointer`}>

                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap "
                                            data-tooltip-id={_idx + item?.name + item?.from + item?.to}
                                            data-tooltip-content={fieldsStatus?.text}
                                            data-tooltip-variant={fieldsStatus?.text == "Active" ? "success" : fieldsStatus?.text === "Expired" ? "error" : "info"}
                                            data-tooltip-place='bottom-start'>
                                            {item?.name}
                                            <Tooltip id={_idx + item?.name + item?.from + item?.to} />
                                        </th>
                                        <td className="px-1 py-4 text-center"
                                            data-tooltip-id={_idx + item?.name + item?.from + item?.to + 'percantage'}
                                            data-tooltip-content="Discount(in percantage)"
                                            data-tooltip-variant={fieldsStatus?.text == "Active" ? "success" : fieldsStatus?.text === "Expired" ? "error" : "info"}
                                            data-tooltip-place='bottom'>
                                            <Tooltip id={_idx + item?.name + item?.from + item?.to + 'percantage'} />
                                            {item?.percantage} %
                                        </td>
                                        <td className="px-1 py-4 text-center"
                                            data-tooltip-id={_idx + item?.name + item?.from + item?.to + 'minimumOrderAmmount'}
                                            data-tooltip-content="Order Ammount(Minimum)"
                                            data-tooltip-variant={fieldsStatus?.text == "Active" ? "success" : fieldsStatus?.text === "Expired" ? "error" : "info"}
                                            data-tooltip-place='bottom'>
                                            <Tooltip id={_idx + item?.name + item?.from + item?.to + 'minimumOrderAmmount'} />
                                            {item?.minimumOrderAmmount} tk
                                        </td>
                                        <td className="px-1 py-4 text-center"
                                            data-tooltip-id={_idx + item?.name + item?.from + item?.to + 'maximumDiscountLimit'}
                                            data-tooltip-content="Discount Limit(Maximum)"
                                            data-tooltip-variant={fieldsStatus?.text == "Active" ? "success" : fieldsStatus?.text === "Expired" ? "error" : "info"}
                                            data-tooltip-place='bottom'>
                                            <Tooltip id={_idx + item?.name + item?.from + item?.to + 'maximumDiscountLimit'} />
                                            {item?.maximumDiscountLimit} tk
                                        </td>
                                        <td className="px-1 py-4 text-center"
                                            data-tooltip-id={_idx + item?.name + item?.from + item?.to + 'maximumNumberOfUse'}
                                            data-tooltip-content="Number of Use(Maximum)"
                                            data-tooltip-variant={fieldsStatus?.text == "Active" ? "success" : fieldsStatus?.text === "Expired" ? "error" : "info"}
                                            data-tooltip-place='bottom'>
                                            <Tooltip id={_idx + item?.name + item?.from + item?.to + 'maximumNumberOfUse'} />
                                            {item?.maximumNumberOfUse}
                                        </td>
                                        <td className="px-1 py-4 text-center text-xs"
                                            data-tooltip-id={_idx + item?.name + item?.from + item?.to + 'from'}
                                            data-tooltip-content="From"
                                            data-tooltip-variant={fieldsStatus?.text == "Active" ? "success" : fieldsStatus?.text === "Expired" ? "error" : "info"}
                                            data-tooltip-place='bottom'>
                                            <Tooltip id={_idx + item?.name + item?.from + item?.to + 'from'} />
                                            <p>

                                                {
                                                    item?.from && new Date(item?.from).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                }
                                            </p>
                                            <p>
                                                {
                                                    item?.from && new Date(item?.from).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                                                }
                                            </p>


                                        </td>
                                        <td className="px-1 py-4 text-center text-xs"
                                            data-tooltip-id={_idx + item?.name + item?.from + item?.to + 'to'}
                                            data-tooltip-content="To"
                                            data-tooltip-variant={fieldsStatus?.text == "Active" ? "success" : fieldsStatus?.text === "Expired" ? "error" : "info"}
                                            data-tooltip-place='bottom'>
                                            <Tooltip id={_idx + item?.name + item?.from + item?.to + 'to'} />
                                            <p>

                                                {
                                                    item?.to && new Date(item?.to).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                }
                                            </p>
                                            <p>
                                                {
                                                    item?.to && new Date(item?.to).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                                                }
                                            </p>


                                        </td>

                                        <td className="flex items-center px-2 py-4">

                                            <button onClick={() => { handleDelete(item?._id) }} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }

                            )
                        }



                    </tbody>
                </table>
            </div>


        </section>
    );
};

export default CouponList;