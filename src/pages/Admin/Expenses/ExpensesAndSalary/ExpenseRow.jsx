import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ExpenseRow = ({expense}) => {
    const handleDeleteOrder = id => {
        console.log(id)
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
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className='text-gray-900 whitespace-no-wrap block'><p className="whitespace-nowrap text-sm text-center">{expense?.title}</p></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className='text-gray-900 whitespace-no-wrap block'><p className="whitespace-nowrap text-sm text-center">{expense?.expenseType}</p></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className='text-gray-900 whitespace-no-wrap block'><p className="whitespace-nowrap text-sm text-center">{expense?.billDate}</p></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{expense?.paidDate}</span></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{expense?.vendor}</span></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span
                    className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${expense?.status ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                >

                    {expense?.status ? "Paid" : "Due"}
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{expense?.billAmount}</span></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <span className='text-gray-900 whitespace-no-wrap block'><span className="text-gray-900">{expense?.dueBill}</span></span>
            </td>
            {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${paymentStatus}`}><p className="whitespace-nowrap text-sm text-center">{order?.payment_status}</p></span>
            </td> */}
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span title="Edit Order" className="inline-flex ml-3 cursor-pointer text-gray-500"><BiEditAlt size={25} /></span>
                <span title="Delete category" onClick={() => handleDeleteOrder(expense.id)} className="inline-flex ml-3 cursor-pointer text-red-500"><FaTrashAlt size={25} /></span>
            </td>
        </tr>
    )
}


export default ExpenseRow;