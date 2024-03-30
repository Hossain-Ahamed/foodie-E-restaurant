import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-20">
            <div className="container mx-auto flex flex-wrap justify-center">
                <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 md:mb-0">
                    <h3 className="text-xl lg:text-2xl font-semibold mb-4">Services</h3>
                    <ul className="text-sm">
                        <li className='mb-2'><a>Branding</a></li>
                        <li className='mb-2'><a>Design</a></li>
                        <li className='mb-2'><a>Marketing</a></li>
                        <li className='mb-2'><a>Advertisement</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 md:mb-0">
                    <h3 className="text-xl lg:text-2xl font-semibold mb-4">Legal Pages</h3>
                    <ul className="text-sm">
                        <li className='mb-2'><a>Terms of use</a></li>
                        <li className='mb-2'><a>Privacy policy</a></li>
                        <li className='mb-2'><a>Cookie policy</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 md:mb-0">
                    <h3 className="text-xl lg:text-2xl font-semibold mb-4">Subscribe</h3>
                    <form className="flex flex-col">
                        <input type="email" placeholder="Your Email Address" className="bg-gray-700 text-white py-2 px-4 mb-2 rounded-md" />
                        <button type="submit" className="bg-[#F69449] hover:bg-[#c99e7d] text-white py-2 rounded-md transition-colors duration-300">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="container mx-auto flex justify-center items-center mt-10">
                <p className="text-xs lg:text-sm">&copy; 2024 Script Horizon. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
