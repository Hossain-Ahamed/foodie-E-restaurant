import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc'
import useAuthProvider from '../../Hooks/useAuthProvider';
const OtherSignInMethod = () => {
    const {provideSignInWithGoogle,setLoading} = useAuthProvider();

    const handleClick = ()=>{
        setLoading(true)
        provideSignInWithGoogle()
        .then(res=>{})
        .catch(e=>{})
        .finally(()=>setLoading(false))
    }

    return (
        <>
    
            <div className='px-4 sm:px-6 lg:px-8'>
           
                <button
                    onClick={handleClick}
                    aria-label='sign-in-with-gmail'
                    className=" w-full rounded-lg border  px-5 py-3 text-sm font-medium text-black flex justify-center items-center">
                    <div className="mr-5 ">
                        <FcGoogle alt="google icon" className='text-2xl font-medium ' />
                    </div>
                    <p>Sign in with Google</p>
                </button>

            </div>

        </>
    );
};

export default OtherSignInMethod;