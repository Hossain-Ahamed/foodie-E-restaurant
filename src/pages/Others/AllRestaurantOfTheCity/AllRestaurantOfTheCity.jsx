import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import LoadingPage from '../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../Shared/ErrorPage/ErrorPage';
import restaurentBackground from '../../../assets/images/Background/restaurant.jpg'
import Footer from '../../../components/Footer/Footer';
import { Link, useParams } from 'react-router-dom';
import SetTitle from '../../Shared/SetTtitle/SetTitle';

const AllRestaurantOfTheCity = () => {
    const {city} = useParams();
   
    const axiosSecure = useAxiosSecure();



    const { refetch, data: data, isLoading, error, } = useQuery({
        queryKey: ['all_restaurant_of_the_city',city],
       
        queryFn: async () => {
            const res = await axiosSecure.get(`/city/${city}`);
            console.log(res.data)
            return res.data;
        },
    });

    const backgroundStyle = {
        backgroundImage: `url(${restaurentBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'noRepeat',
        backgroundPosition: 'center',
    };

    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        return <ErrorPage/>
    }
    return (
        <>
        <SetTitle title={city.charAt(0).toUpperCase() +city.slice(1)}/>
        <div style={backgroundStyle} className='h-[200px] md:h-[400px] xl:h-[500px] w-full bg-fixed relative'>
            <h3 className='text-lg md:text-2xl lg:text-3xl xl:text-4xl absolute top-10 left-10 md:top-28 lg:top-40 xl:left-40 text-white capitalize'>Food delivery from {city}’s best restaurants</h3>
        </div>
        <div className='my-10 lg:my-20'>
            <h3 className='font-semibold text-2xl lg:text-4xl pl-10 lg:pl-80'>All restaurants</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 w-[300px] md:w-[700px] lg:w-[900px] xl:w-[1200px] mx-auto my-10 lg:my-20 gap-3 md:gap-5'>
            {data?.restaurants?.map(restaurant => (
                    <div key={restaurant?.branchID} className='h-auto'>
                     
                        <div className='border rounded-2xl shadow-md h-full'>
                            <Link to={`/restaurant/${restaurant?.res_id}/branch/${restaurant?.branchID}`}>
                                <img className='w-[200px] h-[100px] md:w-[250px] md:h-[150px] lg:w-[300px] lg:h-[220px] xl:w-[400px] rounded-t-2xl object-cover' src={restaurant?.img} alt="" loading='lazy' />
                                <div className='p-4 grid md:flex justify-between'>
                                <p className='font-semibold capitalize'>{restaurant?.res_name} - {restaurant?.branch_name}</p>
                                <p className='flex items-center gap-1 text-sm text-gray-600'><svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" data-testid="RIDER"><path fillRule="evenodd" clipRule="evenodd" d="M9.23752 3.28752C9.23752 3.95027 8.70027 4.48752 8.03752 4.48752C7.37478 4.48752 6.83752 3.95027 6.83752 3.28752C6.83752 2.62478 7.37478 2.08752 8.03752 2.08752C8.70027 2.08752 9.23752 2.62478 9.23752 3.28752ZM6.14386 9.14592C6.00445 8.96508 5.94904 8.72306 6.01506 8.48618L6.86505 5.43618C6.97625 5.03718 7.38985 4.80386 7.78886 4.91506C7.91357 4.94981 8.02209 5.01411 8.10897 5.09826L9.67246 6.11242L11.5377 6.11242C11.8829 6.11242 12.1627 6.39224 12.1627 6.73742C12.1627 7.0826 11.8829 7.36242 11.5377 7.36242H9.48751C9.3668 7.36242 9.24867 7.32746 9.14739 7.26177L8.10235 6.58391L7.63531 8.2598L9.66925 8.36322C9.87995 8.37393 10.071 8.49022 10.1773 8.67244C10.2837 8.85467 10.2909 9.07823 10.1965 9.26693L10.0965 9.46693L10.0947 9.47057L8.54468 12.5206C8.38829 12.8283 8.01206 12.951 7.70434 12.7946C7.39662 12.6382 7.27394 12.262 7.43032 11.9543L8.64567 9.56279L6.65576 9.46161C6.43443 9.45035 6.24586 9.32527 6.14386 9.14592ZM2.53752 4.68752C1.87478 4.68752 1.33752 5.22478 1.33752 5.88752V7.48752C1.33752 8.15027 1.87478 8.68752 2.53752 8.68752H4.13752C4.80027 8.68752 5.33752 8.15027 5.33752 7.48752V5.88752C5.33752 5.22478 4.80027 4.68752 4.13752 4.68752H2.53752ZM4.33752 10.5125C3.74382 10.5125 3.26252 10.9938 3.26252 11.5875C3.26252 12.1812 3.74382 12.6625 4.33752 12.6625C4.93123 12.6625 5.41252 12.1812 5.41252 11.5875C5.41252 10.9938 4.93123 10.5125 4.33752 10.5125ZM2.01252 11.5875C2.01252 10.3035 3.05346 9.26252 4.33752 9.26252C5.62159 9.26252 6.66252 10.3035 6.66252 11.5875C6.66252 12.8716 5.62159 13.9125 4.33752 13.9125C3.05346 13.9125 2.01252 12.8716 2.01252 11.5875ZM11.2625 11.5875C11.2625 10.9938 11.7438 10.5125 12.3375 10.5125C12.9312 10.5125 13.4125 10.9938 13.4125 11.5875C13.4125 12.1812 12.9312 12.6625 12.3375 12.6625C11.7438 12.6625 11.2625 12.1812 11.2625 11.5875ZM12.3375 9.26252C11.0535 9.26252 10.0125 10.3035 10.0125 11.5875C10.0125 12.8716 11.0535 13.9125 12.3375 13.9125C13.6216 13.9125 14.6625 12.8716 14.6625 11.5875C14.6625 10.3035 13.6216 9.26252 12.3375 9.26252Z"></path></svg>Tk {restaurant?.deliveryCharge}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <Footer />
            
        </>
    );
};

export default AllRestaurantOfTheCity;