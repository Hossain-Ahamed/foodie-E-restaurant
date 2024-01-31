import React from 'react';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import ExpenseRow from './ExpenseRow';
import { Link } from 'react-router-dom';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import { IoAddOutline } from 'react-icons/io5';

const ExpenseAndSalary = () => {
    const { branchID, res_id }= useRestauarantAndBranch();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: expenses = [], isLoading, error } = useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/expenses`);
            return [
                {
                    id: "3020fdk",
                    title: "Electricity",
                    expenseType: "Utility / Service bill",
                    billDate: "24-01-2024",
                    paidDate: "26-01-2024",
                    vendor: "Ma er Doa",
                    status: true,
                    billAmount: 1000,
                    dueBill: 100,
                },
                {
                    id: "3020fdk",
                    title: "Stuff Wage",
                    expenseType: "Utility / Service bill",
                    billDate: "24-01-2024",
                    paidDate: "26-01-2024",
                    vendor: "Ma er Doa",
                    status: true,
                    billAmount: 1000,
                    dueBill: 0,
                },
                {
                    id: "3020fdk",
                    title: "Electricity",
                    expenseType: "Utility / Service bill",
                    billDate: "24-01-2024",
                    paidDate: "26-01-2024",
                    vendor: "Ma er Doa",
                    status: false,
                    billAmount: 1000,
                    dueBill: 100,
                },
                {
                    id: "3020fdk",
                    title: "Electricity",
                    expenseType: "Utility / Service bill",
                    billDate: "24-01-2024",
                    paidDate: "26-01-2024",
                    vendor: "Ma er Doa",
                    status: true,
                    billAmount: 1000,
                    dueBill: 0,
                },
                {
                    id: "3020fdk",
                    title: "Electricity",
                    expenseType: "Utility / Service bill",
                    billDate: "24-01-2024",
                    paidDate: "26-01-2024",
                    vendor: "Ma er Doa",
                    status: false,
                    billAmount: 1000,
                    dueBill: 100,
                },
            ]
        }
    });
    return (
        <div className='container mx-auto px-4 sm:px-8 select-none'>
            <SetTitle title="Expense & Salary" />
            <div className='flex  gap-3 '>
                <div className='w-full '>
                    <SectionTitle h1="Employee List" />
                </div>
                <div>
                    <Link to={`/restaurant/${res_id}/branch/${branchID}/add-expense`} className='flex justify-center items-center gap-2 text-white font-medium  px-4 py-2 bg-green-400 rounded-md text-nowrap '>Add Expense<IoAddOutline className='text-white' /></Link>

                </div>

            </div>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Bill Date
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Paid Date
                                    </th>
                                   
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Vendor / Supplier
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Amount
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Due
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{expenses.map((expense, id) => <ExpenseRow key={id} expense={expense} />)}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseAndSalary;