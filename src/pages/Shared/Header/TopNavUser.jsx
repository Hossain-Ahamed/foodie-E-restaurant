import React from "react";
import logo from '../../../assets/images/brand-icon.png'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, DropdownMenu, DropdownItem, Dropdown, DropdownTrigger, Avatar } from "@nextui-org/react";
import useProfile from "../../../Hooks/useProfile";
import useAuthProvider from "../../../Hooks/useAuthProvider";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function TopNavUser() {
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
 const {profile,role} = useProfile();
 const {provideSignOut} = useAuthProvider()

    const menuItem = [
        { name: 'Home', to: '/' },
        { name: 'Pricings', to: '/pricing' },
        { name: 'Forms', to: '/registration-form' },
        { name: 'Policy', to: '/privacy-policy' },
    ]
    return (
        <Navbar isBordered  className="max-w-full" maxWidth="full">
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>


            <NavbarBrand >
                {/* <AcmeLogo /> */}
                <Avatar  radius="sm" color="default" src={logo} />
  
                <Link className="font-bold text-inherit text-red-500 cursor-pointer pl-2" href="/">Foodie</Link>
            </NavbarBrand>


            <NavbarContent className="hidden sm:flex gap-4" justify="center" >



                {
                    menuItem.map((item, index) => (
                        <NavbarItem key={`${item}-${index}`}>
                            <Link color="foreground" href={`${item?.to}`} className="cursor-pointer">
                                {item?.name}
                            </Link>
                        </NavbarItem>

                    ))}

            </NavbarContent>


            <NavbarMenu>
                {menuItem.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href={`${item?.to}`}
                            size="lg"
                        >
                            {item?.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
{
    profile && ['Admin','Accounts','Developer'].includes(role) && <>
    
    <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="danger"
                            name={(profile?.f_name + " "+profile?.l_name).toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase())}
                            size="sm"
                            src={profile?.profilePhoto}
                            title={(profile?.f_name + " "+profile?.l_name).toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase())}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{profile?.email}</p>
                        </DropdownItem>
                        <DropdownItem key="dahboard" href="/admin">Dashboard</DropdownItem>
                        <DropdownItem key="settings">Settings</DropdownItem>
                        
                        <DropdownItem key="logout" color="danger"onClick={()=>provideSignOut()}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
    </>
}
        </Navbar>
    );
}
