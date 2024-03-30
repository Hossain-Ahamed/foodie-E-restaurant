import React from 'react';
import backgroundImage from "../../../assets/images/Background/backgroundimg.png"
import chefBackgroundImage from "../../../assets/images/Background/chefBackground.png"
import NonLogInNav from '../NonLogInNav/NonLogInNav';
import { getAllDistrictsWithImage } from '../../../assets/scripts/Utility';

const NonLogInHomePage = () => {
    const DistricImage = getAllDistrictsWithImage();
    console.log(DistricImage)
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '700px', // Ensure the background covers the entire viewport height
    };
    const chefBackgroundStyle = {
        backgroundImage: `url(${chefBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '400px', // Ensure the background covers the entire viewport height
    };
    return (
        <>
        <NonLogInNav />
           <div style={backgroundStyle}>
            <div className="">
                <p>welcome</p>
            </div>
        </div>
        <div className='my-10 mt-20'>
            <h3 className='text-3xl font-semibold pl-40 my-10'>You prepare the food, we handle the rest</h3>
            <div style={chefBackgroundStyle} className='mb-20 relative'>
            <div className='bg-white w-[700px] absolute left-40 -bottom-20 p-5 shadow-md rounded-2xl'> 
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati laborum voluptates maxime recusandae repudiandae quaerat consectetur porro. Doloremque voluptates sint, esse dicta nam sequi voluptatum, deserunt suscipit voluptatibus placeat facere cupiditate officia quas aliquam enim quaerat impedit iusto veniam! Vitae illum voluptate officiis. Iure libero nisi, voluptatibus nihil inventore incidunt!</p>
            </div>
        </div>
        </div>

        <div className='my-20'>
            wetfwertgwer
        </div>
        
        </>
    );
};

export default NonLogInHomePage;