import React from 'react';
import Swal from "sweetalert2";
import { Tooltip } from 'react-tooltip'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { useQuery } from 'react-query';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
const SubscriptionsPurchase = () => {
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID } = useRestauarantAndBranch();
    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError } = useQuery({
        queryKey: ['historyBill', res_id],
        enabled: true,
        cacheTime: 0,
        queryFn: async () => {


            // const res = await axiosSecure.get(`/restaurant/${res_id}/bill-history-list`);


            const res = {
                data: [
                    {
                        "res_id": 1,
                        "res_name": "Restaurant A",
                        "branch_name": "Main Branch",
                        "branchID": "B001",
                        "subscriptionStart": "2023-01-28T12:00:00Z",
                        "subscriptionEnd": "2025-01-30T12:00:00Z",
                    },
                    {
                        "res_id": 2,
                        "res_name": "Restaurant B",
                        "branch_name": "Downtown Branch",
                        "branchID": "B002",
                        "subscriptionStart": "2022-02-15T12:00:00Z",
                        "subscriptionEnd": "2025-02-15T12:00:00Z",
                    },
                    {
                        "res_id": 3,
                        "res_name": "Restaurant C",
                        "branch_name": "East Side Branch",
                        "branchID": "B003",
                        "subscriptionStart": "2024-03-10T12:00:00Z",
                        "subscriptionEnd": "2025-03-10T12:00:00Z",
                    },
                    // Add 12 more entries as needed
                    {
                        "res_id": 4,
                        "res_name": "Restaurant D",
                        "branch_name": "West Side Branch",
                        "branchID": "B004",
                        "subscriptionStart": "2022-04-05T12:00:00Z",
                        "subscriptionEnd": "2023-04-05T12:00:00Z",
                    },
                    {
                        "res_id": 5,
                        "res_name": "Restaurant E",
                        "branch_name": "Uptown Branch",
                        "branchID": "B005",
                        "subscriptionStart": "2024-05-20T12:00:00Z",
                        "subscriptionEnd": "2025-05-20T12:00:00Z",
                    },
                    // Continue adding entries...
                ]
            }


            return res.data;
        },

    });

    const getColor = (from, to) => {
        const currentTime = new Date().toISOString();
        if (new Date(to).getMonth() + 1 === new Date().getMonth() + 1) {
            return { "text": "Extend", "color": 'warning', "status": 'Expire Soon' };
        } if (currentTime >= from && currentTime <= to) {
            return { "text": "Extend", "color": 'success', "status": 'Continuing' };
        } else if (currentTime > to) {
            return { "text": "Renew", "color": 'danger', "status": "Expired" };
        } else {
            return { "text": "Paid", "color": 'blue-500', "status" : "Paid" };
        }
    };

    if (dataLoading) {
        return  <ScaleLoader size={100} color='#36d7b7' />
    }

    if (dataError) {
        return <ErrorPage />
    }
    return (
        <section>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 ">
                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 shaodow shadow-md">
                    <thead className="text-sm text-gray-700  bg-gray-50 border-b">
                        <tr>

                            <th scope="col" className="px-3 ">
                                Name
                            </th>
                            <th scope="col" className="px-3">
                                Status
                            </th>


                            <th scope="col" className="px-1 text-center">
                                From
                            </th>
                            <th scope="col" className="px-1 text-center">
                                To
                            </th>

                            <th scope="col" className="px-1 text-center">
                                Transaction ID
                            </th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && Array.isArray(data) && data.map((item, _idx) => {
                                const fieldsStatus = getColor(item?.subscriptionStart, item?.subscriptionEnd);

                                return (
                                    <tr key={_idx}

                                        className={`bg-white border-b text-${fieldsStatus?.color} hover:bg-gray-50 cursor-pointer`}>

                                        <td scope="row" className="px-3 py-4 font-medium whitespace-nowrap ">
                                            {item?.branch_name}({item?.branchID}) <br />
                                            <span className='text-gray-400 text-[10px] font-normal'> {item?.res_name}</span>
                                        </td>
                                        <td scope="row" className="px-3 py-4 font-medium whitespace-nowrap text-left">
                                            {fieldsStatus?.status} <br />

                                        </td>


                                        <td className="px-1 py-4 text-center text-xs" >

                                            <p>

                                                {
                                                    item?.subscriptionStart && new Date(item?.subscriptionStart).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                }
                                            </p>
                                            <p>
                                                {
                                                    item?.subscriptionStart && new Date(item?.subscriptionStart).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                                                }
                                            </p>


                                        </td>
                                        <td className="px-1 py-4 text-center text-xs " >

                                            <p>

                                                {
                                                    item?.subscriptionEnd && new Date(item?.subscriptionEnd).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                }
                                            </p>
                                            <p>
                                                {
                                                    item?.subscriptionEnd && new Date(item?.subscriptionEnd).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                                                }
                                            </p>


                                        </td>
                                        <td scope="row" className="px-1 py-4 font-medium whitespace-nowrap text-center  ">

                                            {
                                                fieldsStatus?.status !=="Paid" ?
                                                    <Link to='/payments' className={`cursor-pointer rounded-md px-3 py-2 bg-${fieldsStatus?.color} text-white`}> {fieldsStatus?.text}</Link>
                                                    :
                                                    <p className='cursor-text'>Paid</p>
                                            }

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

export default SubscriptionsPurchase;