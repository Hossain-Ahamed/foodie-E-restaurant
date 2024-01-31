import React from 'react';
import useProfile from '../../../Hooks/useProfile';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MyRestaurantCard from '../../Others/MyRestaurantCard/MyRestaurantCard';
import useRestauarantAndBranch from '../../../Hooks/useRestauarantAndBranch';


const MyRestaurants = () => {
    const { profile, permitted } = useProfile();

    const {setBranchAndRestaurantName} = useRestauarantAndBranch();

 
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back, {profile?.f_name}!</h1>

                        <p className="mt-1.5 text-sm text-gray-500">Get ready to manage orders and menus for our restaurant! 🍽️📊 🎉</p>
                    </div>

                </div>
            </div>


            {/* cards  */}
            <div className='mt-10 md:mt-15 border border-slate-400 rounded-md p-3 '>
                <SectionTitle h1="Your Restaurants" />
                <div className='mt-10 flex flex-wrap justify-center items-center gap-3'>
                    {
                        permitted && Array.isArray(permitted) && permitted.map((data, _idx) => <MyRestaurantCard key={_idx} data={data} setBranchAndRestaurantName={setBranchAndRestaurantName} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default MyRestaurants;