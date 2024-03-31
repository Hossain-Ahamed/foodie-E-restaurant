import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button } from "@nextui-org/react";

const OnsiteLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
    return (
        <>
            <Navbar
                className='shadow  max-w-screen-2xl mx-auto'
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}

            >
                <NavbarContent className="sm:hidden " justify="start" >
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>


                <nav className='w-screen max-w-2xl mx-auto'>
                    nav item
                </nav>


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

export default OnsiteLayout;





