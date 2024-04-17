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
                className='shadow  max-w-[1800px] mx-auto gap-0 h-16'

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
                                        <DropdownItem key="shorts">

                                            <Link to='/shorts' className='flex items-center gap-x-2'>
                                                <svg className='h-4 w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.5 10.5H17.9118C19.3676 10.5 20.0955 10.5 20.5477 10.9393C21 11.3787 21 12.0858 21 13.5V15C21 18.2998 21 19.9497 19.9447 20.9749C18.8894 22 17.191 22 13.7941 22H10.7059C7.309 22 5.61055 22 4.55528 20.9749C3.5 19.9497 3.5 18.2998 3.5 15V10.5Z" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M3.49827 10.5C3.14118 9.14207 2.96264 8.46311 3.00654 7.86611C3.08518 6.79682 3.63742 5.82221 4.50691 5.21816C4.99236 4.88092 5.6587 4.69899 6.99138 4.33514L14.7321 2.22172C15.0767 2.12763 15.2491 2.08058 15.3977 2.05386C17.0504 1.75694 18.6737 2.71192 19.2477 4.31874C19.2993 4.4633 19.3455 4.63888 19.4378 4.99006C19.4642 5.09039 19.4774 5.14056 19.4849 5.18385C19.5682 5.66498 19.3004 6.13757 18.8498 6.30467C18.8093 6.3197 18.7601 6.33314 18.6616 6.36003L3.49827 10.5Z" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M7 10L9 4" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M14 8L16 2" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M8 18H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>


                                                <p>Shorts</p>
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

                    <NavbarMenuItem key="qrscanner" onClick={()=>setIsMenuOpen(!isMenuOpen)} >

                        <Link to='/qr-scanner' className='flex items-center gap-x-2'>

                            <MdOutlineQrCodeScanner />
                            <p>Qr Scanner</p>
                        </Link>
                    </NavbarMenuItem>

                    <NavbarMenuItem key="cart" onClick={()=>setIsMenuOpen(!isMenuOpen)}>

                        <Link to='/cart' className='flex items-center gap-x-2'>

                            <HiOutlineShoppingBag />
                            <p>Cart</p>
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="profile" onClick={()=>setIsMenuOpen(!isMenuOpen)}>

                        <Link to='/profile' className='flex items-center gap-x-2'>
                            <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>

                            <p>My profile</p>
                        </Link>
                        
                    </NavbarMenuItem>
                    <NavbarMenuItem key="shorts" onClick={()=>setIsMenuOpen(!isMenuOpen)}>

                        <Link to='/shorts' className='flex items-center gap-x-2'>
                            <svg className='h-4 w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5 10.5H17.9118C19.3676 10.5 20.0955 10.5 20.5477 10.9393C21 11.3787 21 12.0858 21 13.5V15C21 18.2998 21 19.9497 19.9447 20.9749C18.8894 22 17.191 22 13.7941 22H10.7059C7.309 22 5.61055 22 4.55528 20.9749C3.5 19.9497 3.5 18.2998 3.5 15V10.5Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M3.49827 10.5C3.14118 9.14207 2.96264 8.46311 3.00654 7.86611C3.08518 6.79682 3.63742 5.82221 4.50691 5.21816C4.99236 4.88092 5.6587 4.69899 6.99138 4.33514L14.7321 2.22172C15.0767 2.12763 15.2491 2.08058 15.3977 2.05386C17.0504 1.75694 18.6737 2.71192 19.2477 4.31874C19.2993 4.4633 19.3455 4.63888 19.4378 4.99006C19.4642 5.09039 19.4774 5.14056 19.4849 5.18385C19.5682 5.66498 19.3004 6.13757 18.8498 6.30467C18.8093 6.3197 18.7601 6.33314 18.6616 6.36003L3.49827 10.5Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M7 10L9 4" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M14 8L16 2" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M8 18H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>


                            <p>Shorts</p>
                        </Link>
                        
                    </NavbarMenuItem>
                    <NavbarMenuItem key="order" onClick={()=>setIsMenuOpen(!isMenuOpen)}>

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

                    <NavbarMenuItem key="logout" color="danger" onPress={provideSignOut} onClick={()=>setIsMenuOpen(!isMenuOpen)}>
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





