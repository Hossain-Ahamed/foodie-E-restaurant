import React from 'react';
import NonLogInNav from '../NonLogInNav/NonLogInNav';
import { useQuery } from 'react-query';

const NonLogInCityPage = () => {
//     const axiosSecure = useAxiosSecure()
//   const { refetch, data: restaurants = [] } = useQuery({
//     queryKey: ['restaurants'],
//     queryFn: async () => {
//         const res = await axiosSecure.get(`localhost:8080/api/v1/auth/all-restaurant/city/narayanganj`)
//         //console.log(res.data)
//         return res.data;
//     },
//       });
    return (
        <>
        <NonLogInNav />
        <div className='my-10 lg:my-20'>
            <h3 className='font-semibold text-2xl lg:text-4xl pl-10 lg:pl-80'>All restaurants</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-[300px] md:w-[700px] lg:w-[900px] xl:w-[1200px] mx-auto my-10 lg:my-20 gap-3 md:gap-5'>
                {/* {
                    DistricImage.map(distric => (<div key={distric.id}>
                        <div className='relative'>

                            <Link>
                            <img className='w-[200px] h-[100px] md:w-[250px] md:h-[150px] lg:w-[300px] lg:h-[220px] rounded-2xl ' src={distric.img} alt="" />
                            <p className='bg-white rounded-md md:rounded-xl text-sm md:text-base p-1 px-2 md:p-2 md:px-4 absolute bottom-2 left-2'>{distric.name}</p>
                            </Link>
                        
                        
                        </div>
                        
                    </div>))
                } */}
            </div>
        </div>
        </>
    );
};

export default NonLogInCityPage;