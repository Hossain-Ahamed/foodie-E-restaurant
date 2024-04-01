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

const OffsiteLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user ,provideSignOut} = useAuthProvider();


    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

   


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
                className='shadow  max-w-screen-[1800px] mx-auto gap-0'

                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
            >
                <NavbarContent className="sm:hidden px-0 gap-0 " justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className='p-0 m-0'/>
                </NavbarContent>

             

                <NavbarContent className="flex gap-4" justify="center">
                    <NavbarBrand>
                       <Link href="/"  className="flex items-center gap-2">
                            <img className="w-[50px] h-[50px]" src={logo} alt="" />
                            <p className="text-xl font-bold text-[#F69449]">Foodie</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <div className="w-full flex  justify-end md:justify-start  px-4"  >
                <div  className='flex items-center gap-2 justify-start hover:ring-1 ring-yellow-200 rounded-md px-4 py-2'>
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
                                            description={profile?.email && `@${profile?.email.split('@')[0]}` || ""}
                                            name={profile?.name || ""}
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="User Actions" variant="flat">
                                        <DropdownItem key="settings">
                                            My Settings
                                        </DropdownItem>
                                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                        <DropdownItem key="analytics">
                                            Analytics
                                        </DropdownItem>
                                        <DropdownItem key="system">System</DropdownItem>
                                        <DropdownItem key="configurations">Configurations</DropdownItem>
                                        <DropdownItem key="help_and_feedback">
                                            Help & Feedback
                                        </DropdownItem>
                                        <DropdownItem key="logout" color="danger" onPress={provideSignOut}>
                                            Log Out
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

                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                color={
                                    index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>


            {/* page content  */}
            <main className='max-w-screen-[1800px] mx-auto'>

                <Outlet />
            </main>
        </>
    );
};

export default OffsiteLayout;





