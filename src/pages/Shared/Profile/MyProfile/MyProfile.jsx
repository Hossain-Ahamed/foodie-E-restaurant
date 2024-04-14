import React from 'react';
import SetTitle from '../../SetTtitle/SetTitle';
import male from '../../../../assets/images/icons/male.webp'
import female from '../../../../assets/images/icons/female.webp'
import othergender from '../../../../assets/images/icons/othergender.webp'
import { MdOutlineLocationCity, MdCall, MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useProfile from '../../../../Hooks/useProfile';
import LoadingPage from '../../LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../ErrorPage/ErrorPage';
import useAuthProvider from '../../../../Hooks/useAuthProvider';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectCards } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import './style.css'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
const MyProfile = () => {
    const { profile, profileLoading, profileError } = useProfile();



    const { user } = useAuthProvider();
    const axiosSecure = useAxiosSecure();



    const { refetch, data, isLoading, error, } = useQuery({
        queryKey: ['get-my-membership', user?.email],

        queryFn: async () => {
            const res = await axiosSecure.get(`/get-my-membership/${user?.email}`);
            return res.data;
        },
    });


    if (profileLoading || isLoading) {
        return <LoadingPage />

    }

    if (profileError || error) {
        return <ErrorPage />
    }
    return (
        <>
            <SetTitle title="Profile" />
            <div className='w-full p-3 lg:pl-24 mb-0 bg-gray-200 user-select-none'>
                <h2 className='inline '>Your Profile</h2>
                <p className='inline px-3'>
                    |
                </p>
                <Link to='/edit-profile' className='text-blue-600 font-medium hover:underline active:bg-transparent text-sm'>Edit</Link>
            </div>
            <div className=' user-select-none w-full md:w-[520px] lg:w-[780px] xl:w-[950px] 2xl:w-[1200px] 3xl:w-[1380px] 4xl:w-[1600px] 5xl:w-[1850px] mx-auto  px-2 md:px-4 mb-28 md:mb-40'>

                {/*  */}
                <div className="mx-auto mt-10 mb-10 md:flex block items-center">
                    {
                        profile?.imgURL ?
                            <img className='rounded-xl md:mr-8 w-20 h-20 object-cover mx-auto md:mx-0' src={profile?.imgURL} />
                            :
                            <>
                                <img className='rounded-xl md:mr-8 w-20 h-20 object-cover bg-white mx-auto md:mx-0' src={
                                    profile?.gender === "Female" ?
                                        female :
                                        profile?.gender === "Others" ?
                                            othergender
                                            :
                                            male
                                } />
                            </>
                    }



                    <div className='text-center md:text-start md:mt-0 mt-6'>
                        <p>{profile?.name}</p>
                        <p className='text-sm hover:underline cursor-pointer text-gray-400'>@{profile?._id.slice(-8)}</p>
                    </div>
                </div>
                <div className=' my-12'>
                    <div className='grid grid-cols-12 items-start'>
                        <div className='col-span-3 lg:col-span-2 flex justify-start items-center'>
                            <MdOutlineLocationCity className='text-[25px] pr-1' />
                            <p className='text-lg'>Address:</p>
                        </div>
                        <div className='col-span-9 lg:col-span-10'>
                            <p className='text-lg  text-gray-500'>{profile?.address?.streetAddress}, <br /> {profile?.address?.city}, {profile?.address?.stateProvince}, {profile?.address?.postalCode}  <Link to='/edit-profile#update-address' className='text-blue-500 font-medium hover:underline active:bg-transparent text-sm pl-3'>{profile?.address ? "Change" : "Add Address"}</Link></p>



                        </div>
                    </div>

                    <div className='grid grid-cols-12 items-start mt-3'>
                        <div className='col-span-3 lg:col-span-2 flex justify-start items-center'>
                            <MdCall className='text-[25px] pr-2' />
                            <p className='text-lg'>Phone:</p>
                        </div>
                        <div className='col-span-9 lg:col-span-10'>
                            <p className='text-lg'><span className='text-gray-500'>{profile?.phone && "+"}{profile?.phone}</span></p>
                            <Link to='/update-profile' className='text-blue-500 font-medium hover:underline active:bg-transparent text-sm pl-3'>{!profile?.phone && "Add Phone Number"}</Link>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 items-start'>
                        <div className='col-span-3 lg:col-span-2 flex justify-start items-center'>
                            <MdEmail className='text-[25px] pr-2' />
                            <p className='text-lg'>Email:</p>
                        </div>
                        <div className='col-span-9 lg:col-span-10'>
                            <p className='text-lg'><span className='text-gray-500 text-base truncate '>{profile?.email}</span></p>
                        </div>
                    </div>

                </div>
                <SectionTitle h2="My Membership" />
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper mt-6 w-[240px] h-[320px]"
                >
                    {
                        data && Array.isArray(data) && data.map((i, _idx) => <SwiperSlide key={_idx} className='
                       flex
                      relative
                        items-center
                        justify-center
                        rounded-xl
                        
                        font-semibold
                         text-white
                         border-1
                       '>
                            <img className='rounded-xl w-full h-full object-cover bg-white mx-auto md:mx-0' src={i?.res_img} />
                            <div className="bg-text px-4 py-1 rounded-lg w-[80%] text-center absolute bottom-2 left-6">
                                {i?.res_name}
                            </div>
                        </SwiperSlide>)
                    }





                </Swiper>
            </div>


        </>
    );
};

export default MyProfile;