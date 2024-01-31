import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { Link } from 'react-router-dom';
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = <>
        <li><Link>Admin</Link></li>
        <li><Link>Home</Link></li>
        <li><Link to='/pricing'>Pricing</Link></li>
        <li><Link to='/registration-form'>Register Forms</Link></li>
    </>
    return (
        <div>
            {/* mobile responsive navbar start*/}
            <div className='fixed z-10 bg-white w-full shadow-sm px-3 md:px-0'>
                <div className='flex flex-row justify-between items-center md:hidden'>
                    <div className='text-3xl font-semibold text-[#F6866A]'>
                        Foodie
                    </div>
                    <div>
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <FiMenu size={26} className='text-gray-600' />
                        </button>
                    </div>
                    {/* nav items */}
                </div>
                <div className={`${isOpen ? 'block' : 'hidden'}`}>
                    <ul className='space-y-1 py-4 transition duration-300 ease-in'>
                        {
                            navItems
                        }
                    </ul>
                </div>
            </div>
            {/* mobile responsive navbar end*/}

            <div className='py-3 fixed z-10 bg-white w-full shadow-sm hidden md:block'>
                <div className='flex flex-row items-center justify-around'>
                    <div className='text-3xl font-semibold text-[#F6866A]'>
                        Foodie
                    </div>
                    <div>
                        <ul className='flex flex-row items-center space-x-4'>
                            {
                                navItems
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;