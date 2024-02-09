import React from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import useAuthProvider from '../../Hooks/useAuthProvider';
import { PiBowlFoodBold } from "react-icons/pi";

import { IoFastFoodOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";


const SideNav = ({ isChecked, setChecked }) => {

    const { provideSignOut } = useAuthProvider();


    const location = useLocation();




    return (
        <>
            <aside
                id="default-sidebar"
                className={`shadow-md bg-white border-r-2 select-none cursor-pointer fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isChecked ? '' : '-translate-x-full sm:translate-x-0'
                    }`}
                aria-label="Sidebar"
            >

                <div className="h-full px-3 py-4 overflow-y-auto  relative">
                    <button className='absolute md:hidden top-2 right-1 z-[5000] bg-slate-500 p-1 rounded' onClick={() => setChecked(false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00098 5L19 18.9991" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.99996 18.9991L18.999 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>
                    <ul>












                    <ul className='border-t py-2'>
                            <li>
                                <NavLink
                                    to='/'
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                            : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                    }

                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex-shrink-0 w-5 h-5 mr-2 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>

                                    <span className="text-sm font-medium">My Restaurants </span>
                                </NavLink>
                            </li>
                            <li >
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
                                    >
                                        <div className="flex items-center gap-2">

                                            <svg className="w-4 h-4 mb-1 text-gray-500  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                                            </svg>
                                            <span className="text-sm font-medium">My Account </span>
                                        </div>

                                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </summary>

                                    <ul className="mt-2 space-y-1 px-4 border-l">

                                        <li>
                                            <NavLink to='my-profile'
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-300 hover:text-gray-700"

                                                        : "flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 "
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="flex-shrink-0 w-4 h-4 mr-2 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                My Profile
                                            </NavLink>
                                        </li>
                                        <li>

                                            <button
                                                onClick={() => provideSignOut()}
                                                className="w-full flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 ">
                                                <svg className="flex-shrink-0 w-4 h-4 mr-2 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                                </svg>
                                                Sign Out
                                            </button>

                                        </li>

                                    </ul>
                                </details>
                            </li>

                        </ul>

                    </ul>
                </div>
            </aside>
        </>
    );
};

export default SideNav;