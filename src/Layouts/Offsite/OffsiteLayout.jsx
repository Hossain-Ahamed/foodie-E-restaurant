import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button, Link as NextUILink } from "@nextui-org/react";
import useAuthProvider from '../../Hooks/useAuthProvider';
import { getAllDistricts } from '../../assets/scripts/Utility';
import logo from "../../assets/images/brand-icon.png";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import useProfile from '../../Hooks/useProfile';
import LoadingPage from '../../pages/Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../pages/Shared/ErrorPage/ErrorPage';
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
const OffsiteLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user, provideSignOut } = useAuthProvider();






    const { profile, profileLoading, profileError } = useProfile();

    if (profileLoading) {
        return <LoadingPage />
    }
    if (profileError) {
        return <ErrorPage />
    }
    return (
        <>
            <Navbar
                className='shadow  max-w-[1800px] mx-auto gap-0'

                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
            >
                <NavbarContent className="sm:hidden px-0 gap-0 " justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className='p-0 m-0' />
                </NavbarContent>



                <NavbarContent className="flex gap-4" justify="center">
                    <NavbarBrand>
                        <Link href="/" className="flex items-center gap-2">
                            <img className="w-[50px] h-[50px]" src={logo} alt="" />
                            <p className="text-xl font-bold text-[#F69449]">Foodie</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <div className="hidden md:flex w-full   justify-end md:justify-start  px-4"  >
                    <div className='flex items-center gap-2 justify-start hover:ring-1 ring-yellow-200 rounded-md px-4 py-2'>
                        <svg className='h-4 w-4 text-gray-500' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9999 13.4299C13.723 13.4299 15.1199 12.0331 15.1199 10.3099C15.1199 8.58681 13.723 7.18994 11.9999 7.18994C10.2768 7.18994 8.87988 8.58681 8.87988 10.3099C8.87988 12.0331 10.2768 13.4299 11.9999 13.4299Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M3.6202 8.49C5.5902 -0.169998 18.4202 -0.159997 20.3802 8.5C21.5302 13.58 18.3702 17.88 15.6002 20.54C13.5902 22.48 10.4102 22.48 8.3902 20.54C5.6302 17.88 2.4702 13.57 3.6202 8.49Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>

                        <p className='text-gray-500 text-lg cursor-pointer flex'><span className='hidden md:block'>Address </span><span className='pl-3 font-medium text-yellow-400 hidden md:block '>{profile?.address?.streetAddress},</span><span className='pl- font-medium text-yellow-400  '>{profile?.address?.city}</span> </p>

                    </div>
                </div>





                <NavbarContent justify="end">

                    {
                        user ?
                            <NavbarItem className="hidden sm:flex">
                                <Dropdown placement="bottom-start">
                                    <DropdownTrigger>
                                        <User
                                            as="button"
                                            avatarProps={{
                                                isBordered: true,
                                                src: profile?.imgURL || ""
                                            }}
                                            className="transition-transform"
                                        // description={profile?.email && `@${profile?.email.split('@')[0]}` || ""}
                                        // name={profile?.name || ""}
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="User Actions" variant="flat">
                                        <DropdownItem key="qrscanner">

                                            <Link to='/qr-scanner' className='flex items-center gap-x-2'>

                                                <MdOutlineQrCodeScanner />
                                                <p>Qr Scanner</p>
                                            </Link>
                                        </DropdownItem>

                                        <DropdownItem key="cart">

                                            <Link to='/cart' className='flex items-center gap-x-2'>

                                                <HiOutlineShoppingBag />
                                                <p>Cart</p>
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem key="profile">

                                            <Link to='/profile' className='flex items-center gap-x-2'>
                                                <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                                                </svg>

                                                <p>My profile</p>
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem key="order">

                                            <Link to='/orders' className='flex items-center gap-x-2'>
                                                <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 6L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M11 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M11 18L21 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>


                                                <p>Orders</p>
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem key="membership">

                                            <Link to='/my-embership' className='flex items-center gap-x-2'>
                                                <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22 3.5L18.5896 5.73307C17.7772 6.26496 16.8 6.4985 15.8297 6.39261L14.5265 6.25039C13.3423 6.12117 12.1587 6.49814 11.2771 7.28532L8.75986 9.5329C7.77913 10.4086 7.74271 11.9117 8.67993 12.8322C9.48235 13.6203 10.7473 13.7231 11.6707 13.0753L13.3355 11.9074C13.5688 11.7437 13.8607 11.6821 14.1419 11.7374L14.4754 11.8029C15.6329 12.0303 16.8344 11.7626 17.7788 11.0669L18.3693 10.6319" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M14.1419 11.7374C14.7613 12.9916 15.6 15.9 18 17.5C16.8333 18.8333 13.6 20.5 10 20.5C5.5 20.5 2 15.5 2 15.5M12 6.76781C11.2126 6.28417 9.0206 5.58265 6.03154 5.50673C5.68359 5.49789 5.34105 5.40917 5.03885 5.23649L2 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M18 17.5C18 17.5 20.5 17 22 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>


                                                <p>My Membership</p>
                                            </Link>
                                        </DropdownItem>




                                        <DropdownItem key="logout" color="danger" onPress={provideSignOut}>
                                            <span className='flex items-center gap-x-2'>
                                                <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>


                                                <p>Log Out</p>
                                            </span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavbarItem>
                            :
                            <NavbarItem>

                                <Button
                                    href="/login"
                                    as={NextUILink}
                                    color="success"

                                    variant="solid"
                                    className='text-white'
                                >
                                    LogIn
                                </Button>


                            </NavbarItem>
                    }


                </NavbarContent>

                <NavbarMenu className='pt-7'>

                    <NavbarMenuItem key="qrscanner">

                        <Link to='/qr-scanner' className='flex items-center gap-x-2'>

                            <MdOutlineQrCodeScanner />
                            <p>Qr Scanner</p>
                        </Link>
                    </NavbarMenuItem>

                    <NavbarMenuItem key="cart">

                        <Link to='/cart' className='flex items-center gap-x-2'>

                            <HiOutlineShoppingBag />
                            <p>Cart</p>
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="profile">

                        <Link to='/profile' className='flex items-center gap-x-2'>
                            <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>

                            <p>My profile</p>
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="order">

                        <Link to='/orders' className='flex items-center gap-x-2'>
                            <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 6L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M11 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M11 18L21 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>


                            <p>Orders</p>
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="membership">

                        <Link to='/my-embership' className='flex items-center gap-x-2'>
                            <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 3.5L18.5896 5.73307C17.7772 6.26496 16.8 6.4985 15.8297 6.39261L14.5265 6.25039C13.3423 6.12117 12.1587 6.49814 11.2771 7.28532L8.75986 9.5329C7.77913 10.4086 7.74271 11.9117 8.67993 12.8322C9.48235 13.6203 10.7473 13.7231 11.6707 13.0753L13.3355 11.9074C13.5688 11.7437 13.8607 11.6821 14.1419 11.7374L14.4754 11.8029C15.6329 12.0303 16.8344 11.7626 17.7788 11.0669L18.3693 10.6319" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M14.1419 11.7374C14.7613 12.9916 15.6 15.9 18 17.5C16.8333 18.8333 13.6 20.5 10 20.5C5.5 20.5 2 15.5 2 15.5M12 6.76781C11.2126 6.28417 9.0206 5.58265 6.03154 5.50673C5.68359 5.49789 5.34105 5.40917 5.03885 5.23649L2 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 17.5C18 17.5 20.5 17 22 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>


                            <p>My Membership</p>
                        </Link>
                    </NavbarMenuItem>




                    <NavbarMenuItem key="logout" color="danger" onPress={provideSignOut}>
                        <span className='flex items-center gap-x-2'>
                            <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>


                            <p>Log Out</p>
                        </span>
                    </NavbarMenuItem>

                </NavbarMenu>
            </Navbar>


            {/* page content  */}
            <main className='max-w-[1800px] mx-auto'>

                <Outlet />
            </main>
        </>
    );
};

export default OffsiteLayout;





