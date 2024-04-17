import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button, Link as NextUILink } from "@nextui-org/react";
import useAuthProvider from '../../Hooks/useAuthProvider';
import logo from "../../assets/images/brand-icon.png";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import useProfile from '../../Hooks/useProfile';


const OnsiteLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user, provideSignOut } = useAuthProvider();

    const {profile} = useProfile()

    return (
        <>
            <Navbar
                className='shadow  max-w-[1800px] mx-auto h-16'

                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <div className="flex items-center gap-2">
                            <img className="w-[50px] h-[50px]" src={logo} alt="" />
                            <p className="text-xl font-bold text-[#F69449]">Foodie</p>
                        </div>
                    </NavbarBrand>
                </NavbarContent>


                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand>
                        <div className="flex items-center gap-2">
                            <img className="w-[50px] h-[50px]" src={logo} alt="" />
                            <p className="text-xl font-bold text-[#F69449]">Foodie</p>
                        </div>
                    </NavbarBrand>
                </NavbarContent>


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
                                            <Link to='/profile'>My profile</Link>
                                        </DropdownItem>
                                        <DropdownItem key="shorts">
                                            <Link to='/shorts'>Shorts</Link>

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

                    <NavbarMenuItem key="prfoileMenu">
                        <Link to='/profile'>My profile</Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem key="shorts">
                        <Link to='/shorts'>Shorts</Link>

                    </NavbarMenuItem>
                    <NavbarMenuItem key="LogoutMenu" >
                        <p className='text-red-400' onClick={provideSignOut}> Log Out</p>
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

export default OnsiteLayout;





