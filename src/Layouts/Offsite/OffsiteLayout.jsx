import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button, Link as NextUILink } from "@nextui-org/react";
import useAuthProvider from '../../Hooks/useAuthProvider';
import { getAllDistricts } from '../../assets/scripts/Utility';
import logo from "../../assets/images/brand-icon.png";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

const OffsiteLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user ,provideSignOut} = useAuthProvider();

    const [nearestDistrict, setNearestDistrict] = useState(null);
    const [districts, setDistricts] = useState(getAllDistricts());

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

    const [distance, setDistance] = useState(null);

    useEffect(() => {
        // Function to calculate the distance between two points using Haversine formula
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Radius of the earth in km
            const dLat = deg2rad(lat2 - lat1);
            const dLon = deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c; // Distance in km
            return d;
        }

        const deg2rad = (deg) => {
            return deg * (Math.PI / 180)
        }

        // Function to find the nearest district based on browser location
        const findNearestDistrict = (latitude, longitude) => {
            let minDistance = Infinity;
            let nearest = null;

            districts.forEach(district => {
                const dist = calculateDistance(
                    latitude,
                    longitude,
                    parseFloat(district.lat),
                    parseFloat(district.long)
                );

                if (dist < minDistance) {
                    minDistance = dist;
                    nearest = district;
                }
            });

            setNearestDistrict(nearest);
            setDistance((minDistance * 1000).toFixed(2));
            // console.log(nearest, "   ",(minDistance * 1000).toFixed(2))
        };

        // Get browser's geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    findNearestDistrict(latitude, longitude);
                },
                error => {
                    console.error(error);
                    // Handle error when getting user's location
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            // Handle case where geolocation is not supported
        }
    }, [districts]);


    return (
        <>
            <Navbar
                className='shadow  max-w-screen-2xl mx-auto'

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
                <NavbarContent className="sm:hidden pr-3" justify="end">
                    <NavbarBrand>
                        <div className="flex items-center gap-2">
                            <img className="w-[50px] h-[50px]" src={logo} alt="" />

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
                                                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                            }}
                                            className="transition-transform"
                                            description="@tonyreichert"
                                            name="Tony Reichert"
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
            <main className='max-w-screen-2xl mx-auto'>

                <Outlet />
            </main>
        </>
    );
};

export default OffsiteLayout;





