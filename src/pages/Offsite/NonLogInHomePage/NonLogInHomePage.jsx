import React from 'react';
import backgroundImage from "../../../assets/images/Background/backgroundimg.png"
import chefBackgroundImage from "../../../assets/images/Background/skillful-asian-chef-prepares-mea.png"
import NonLogInNav from '../NonLogInNav/NonLogInNav';
import { getAllDistrictsWithImage } from '../../../assets/scripts/Utility';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';
import useAuthProvider from '../../../Hooks/useAuthProvider';
import SetTitle from '../../Shared/SetTtitle/SetTitle';

const NonLogInHomePage = () => {
    const DistricImage = getAllDistrictsWithImage();
    // console.log(DistricImage)
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    const chefBackgroundStyle = {
        backgroundImage: `url(${chefBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    const {user} = useAuthProvider();

    if(user){
        return <Navigate  to="/" replace/>
    }
    return (
        <div className='max-h-fit'>
            <SetTitle title="Home"/>
        <NonLogInNav />
           <div className='relative h-[200px] md:h-[400px] lg:h-[500px] xl:h-[700px]' style={backgroundStyle}>
            <div className="md:w-[500px] lg:w-[700px] absolute top-10 left-10 md:top-28 lg:top-40 xl:top-60 xl:left-40 text-black">
                <p className='text-lg md:text-2xl lg:text-3xl '>Discover a seamless dining experience with our food ordering website </p>
                <p className='text-sm md:text-lg lg:text-xl pt-2 md:pt-4 lg:pt-8'>– order your favorite dishes online and enjoy the convenience of dining in or takeout with just a few clicks.</p>
            </div>
        </div>

        <div className='my-10 lg:my-20'>
            <h3 className='font-semibold text-2xl lg:text-4xl pl-10 lg:pl-80'>Find Us In Your Place!</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-[300px] md:w-[700px] lg:w-[900px] xl:w-[1200px] mx-auto my-10 lg:my-20 gap-3 md:gap-5'>
                {
                    DistricImage?.map(distric => (<div key={distric.id}>
                        <div className='relative'>

                            <Link to={`/city/${distric?.name}`}>
                            <img className='w-[200px] h-[100px] md:w-[250px] md:h-[150px] lg:w-[300px] lg:h-[220px] rounded-2xl object-cover' src={distric?.img} alt="" loading='eager'/>
                            <p className='bg-white rounded-md md:rounded-xl text-sm md:text-base p-1 px-2 md:p-2 md:px-4 absolute bottom-2 left-2'>{distric?.name}</p>
                            </Link>
                        
                        
                        </div>
                        
                    </div>))
                }
            </div>
        </div>

        <div className='my-10 lg:mt-20'>
            
            <div style={chefBackgroundStyle} className='relative bg-fixed h-[200px] md:h-[400px] xl:h-[600px]'>
            <h3 className='md:text-2xl lg:text-3xl xl:text-4xl text-white uppercase font-semibold my-10 absolute left-5 top-10 md:left-20 md:top-20 lg:left-40 lg:top-6 xl:right-10'>You prepare the food, we handle the rest</h3>
            {/* <div className='bg-white w-[700px] absolute left-40 -bottom-20 p-5 shadow-md rounded-2xl'> 
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati laborum voluptates maxime recusandae repudiandae quaerat consectetur porro. Doloremque voluptates sint, esse dicta nam sequi voluptatum, deserunt suscipit voluptatibus placeat facere cupiditate officia quas aliquam enim quaerat impedit iusto veniam! Vitae illum voluptate officiis. Iure libero nisi, voluptatibus nihil inventore incidunt!</p>
            </div> */}
        </div>
        </div>
        
        <Footer />
        </div>
    );
};

export default NonLogInHomePage;