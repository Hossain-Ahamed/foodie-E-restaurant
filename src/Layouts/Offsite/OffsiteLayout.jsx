import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import useAuthProvider from '../../Hooks/useAuthProvider';
import { getAllDistricts } from '../../assets/scripts/Utility';

const OffsiteLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <>logo</>
                        <p className="font-bold text-inherit">ACME</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand>
                        <>logo</>
                        <p className="font-bold text-inherit">ACME</p>
                    </NavbarBrand>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Features
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page">
                            Customers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Integrations
                        </Link>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="#">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="warning" href="#" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
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
            <Outlet />
        </>
    );
};

export default OffsiteLayout;





