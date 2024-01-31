import React from 'react';
import SetTitle from '../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { MdOutlineDriveFileRenameOutline, MdEmail, MdPhone, MdCalendarMonth, MdPermContactCalendar } from "react-icons/md";
import { FaAddressCard, FaBriefcase } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { IoIosTransgender } from "react-icons/io";
import user from '../../../assets/images/Home/user.png';
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop';
import { Link } from 'react-router-dom';
import ChangePasswordModal from '../../../components/Modal/ChangePasswordModal';
const ViewEmployee = ({ title, data, editable }) => {
    return (
        <>
            <ScrollToTop />
            <SetTitle title={title} />
            <div className='max-w-7xl mx-auto flex flex-col items-center py-12 select-none '>
            <SectionTitle h1={title} />
                {/* personal info */}
                <div className="w-full md:w-3/4 p-3 mt-8">
                    <div className='p-6 h-full border border-coolGray-100 overflow-hidden bg-white rounded-md shadow-dashboard'>
                        <div className='flex flex-col md:flex-row justify-between items-center'>
                            <img className='w-12 h-12 rounded-full object-cover ring ring-red-500 mb-4 mx-auto md:mx-0' src={data?.profilePhoto} alt="" />
                            {
                                editable && <Link to={`/admin/employee-list/edit/${data?.id}`} className="inline-flex items-center rounded-md bg-blue-50 px-4 cursor-pointer py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Edit</Link>

                            }
                            <ChangePasswordModal userEmail={data?.email}/>
                        </div>
                        <p className='text-lg font-semibold'>Personal Information</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            <div className='flex gap-3 items-center mb-4 mt-3'>
                                {/* icon */}
                                <div><MdOutlineDriveFileRenameOutline size={20} /></div>
                                <div className='flex flex-col'>
                                    <p className='text-gray-500'>Full Name</p>
                                    <p>{data?.f_name} {data?.l_name}</p>
                                </div>
                            </div>
                        
                            <div className='flex gap-3 items-center mb-4'>
                                {/* icon */}
                                <div><MdEmail size={20} /></div>
                                <div className='flex flex-col'>
                                    <p className='text-gray-500'>Email</p>
                                    <p>{data?.email}</p>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center mb-4'>
                                {/* icon */}
                                <div><MdPhone size={20} /></div>
                                <div className='flex flex-col'>
                                    <p className='text-gray-500'>Phone Number</p>
                                    <p>{data?.mobile}</p>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center mb-4'>
                                {/* icon */}
                                <div><MdCalendarMonth size={20} /></div>
                                <div className='flex flex-col'>
                                    <p className='text-gray-500'>Date of Birth</p>
                                    <p>{data?.DOB}</p>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center mb-4'>
                                {/* icon */}
                                <div><FaAddressCard size={20} /></div>
                                <div className='flex flex-col'>
                                    <p className='text-gray-500'>NID</p>
                                    <p>{data?.nid}</p>
                                </div>
                            </div>

                            <div className='flex gap-3 items-center mb-4'>
                                {/* icon */}
                                <div><IoIosTransgender size={20} /></div>
                                <div className='flex flex-col'>
                                    <p className='text-gray-500'>Gender</p>
                                    <p>{data?.gender}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* address */}
                <div className="w-full md:w-3/4 p-3 mt-8 relative">
                    {
                        editable && <Link to={`/admin/employee-list/edit/${data?.id}`} className="inline-flex absolute right-10 top-8 items-center rounded-md bg-blue-50 px-4 cursor-pointer py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Edit</Link>

                    }
                    <div className='w-full p-6 h-full flex flex-wrap border border-coolGray-100 overflow-hidden bg-white rounded-md shadow-dashboard'>
                        <div className='w-full md:w-1/2 flex gap-3 items-center mb-4 mt-3'>
                            {/* icon */}
                            <div><FaLocationArrow size={20} /></div>
                            <div className='flex flex-col'>
                                <p className='text-gray-500'>Street Address</p>
                                <p>{data?.streetAddress}</p>
                                <p>{data?.city},{data?.stateProvince}</p>
                                <p>
                                    {data?.country}, {data?.postalCode}
                                </p>
                            </div>
                        </div>
                        <div className='w-full md:w-1/2 flex gap-3 items-center mb-4'>
                            {/* icon */}
                            <div><MdPermContactCalendar size={22} /></div>
                            <div className='flex flex-col'>
                                <p className='text-gray-500'>Emergency Contact</p>
                                <p>Name: {data?.emergencyName}</p>
                                <p>Phone: {data?.emergencyPhoneNumber}</p>
                                <p>Email: {data?.emergencyEmail}</p>
                                <p>Address: {data?.emergencyAddress}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewEmployee;