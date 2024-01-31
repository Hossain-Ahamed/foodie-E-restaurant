import { MdOutlineCheckCircle, MdClear, MdPendingActions, MdCheck } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";
import { TbMoneybag } from "react-icons/tb";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
const statusColorMap = {
    active: "success",


    vacation: "secondary",
    leave: 'secondary',
    probation: 'secondary',
    training: 'secondary',

    trial: 'primary',
    upgrading: 'primary',



    suspension: 'danger',
    terminated: 'danger',
    renewalPending: 'danger',
    paymentExpired: 'danger',




    hold: "warning",
    paused: "warning",
    downgrading: 'warning',
    paymentIssue: 'warning',
    paymentPending: 'warning',
    gracePeriod: 'warning',


};

const TableRow = ({ order }) => {
    let statusStyle, paymentStatus, icon;
    switch (order.status) {
        case 'Pending':
            statusStyle = 'bg-amber-100 text-amber-700'
            icon = <MdPendingActions className="-ms-1 me-1.5 h-4 w-4" />
            break
        case 'Confirmed':
            statusStyle = 'bg-emerald-100 text-emerald-700'
            icon = <MdOutlineCheckCircle className="-ms-1 me-1.5 h-4 w-4" />
            break
        case 'Canceled':
            statusStyle = 'bg-red-100 text-red-700'
            icon = <MdClear className="-ms-1 me-1.5 h-4 w-4" />
            break
    }
    switch (order.payment_status) {
        case 'Pending':
            paymentStatus = 'bg-blue-100 text-blue-700'
            break
        case 'Paid':
            paymentStatus = 'bg-emerald-100 text-emerald-700'
            break
        case 'Refunded':
            paymentStatus = 'bg-amber-100 text-amber-700'
            
            break
        case 'Not Refunded':
            paymentStatus = 'bg-purple-100 text-purple-700'
            
            break
    }

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
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex items-center gap-5 flex-col md:flex-row'>
                        <div className=''>
                            <img
                                alt='profile'
                                src={order?.profilePhoto}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                        <div>
                            <span className='text-gray-900 whitespace-no-wrap block'>{order?.customer_name}</span>
                            <span className='text-gray-900 whitespace-no-wrap block'>{order?.customer_phone}</span>
                        </div>
                    </div>
                    <div className='ml-3'>
                        {/* <p className='text-gray-900 whitespace-no-wrap'>{order?.orderID}</p> */}
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center '>
                <p className='text-gray-900 whitespace-no-wrap'>#{order?.orderID} ({order.order_site})</p>
                <span className='text-gray-600 whitespace-no-wrap block'><span className="text-gray-900">Branch:</span> {order?.branch} {order?.order_site === "Onsite" && <span><span className="text-gray-900">table:</span> {order?.table}</span>}</span>
                {order?.order_site === "Offsite" && <span className='text-gray-900 whitespace-no-wrap'>{order?.location}</span>}
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span
                    className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${statusStyle}`}
                >
                    {
                        icon
                    }

                    <p className="whitespace-nowrap text-sm text-center">{order?.status}</p>
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span className={`inline-flex items-center justify-center rounded-full  px-2.5 py-0.5 ${paymentStatus}`}><p className="whitespace-nowrap text-sm text-center">{order?.payment_status}</p></span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-center'>
                <span title="View Details" className="inline-flex ml-3 cursor-pointer text-blue-500"><LuEye size={25} /></span>
                <span title="Confirm Order" className="inline-flex ml-3 cursor-pointer text-emerald-500"><MdCheck size={25} /></span>
                <span title="Edit Order" className="inline-flex ml-3 cursor-pointer text-gray-500"><BiEditAlt size={25} /></span>
                <span title="Refund Order" className="inline-flex ml-3 cursor-pointer text-amber-500"><TbMoneybag size={25} /></span>
                <span title="Delete category" onClick={() => handleDeleteOrder(order.id)} className="inline-flex ml-3 cursor-pointer text-red-500"><FaTrashAlt size={25} /></span>
            </td>
        </tr>
    )
}

export default TableRow