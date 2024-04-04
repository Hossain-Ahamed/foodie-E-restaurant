import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc'
import useAuthProvider from '../../Hooks/useAuthProvider';
import { SwalErrorShow } from '../../assets/scripts/Utility';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
const OtherSignInMethod = () => {
    const { provideSignInWithGoogle, setLoading } = useAuthProvider();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
 const axiosSecure = useAxiosSecure();
    // console.log(from);s
    const navigate = useNavigate();
    const handleClick = () => {
      
        provideSignInWithGoogle()
            .then(currentUser => {

              
                navigate(from, { replace: true });
                 
                // const userData = {
                //     name: currentUser?.user?.displayName,
                //     email: currentUser.email,
                //     imgURL: currentUser?.user?.photoURL,
                //     phone: currentUser?.user?.phoneNumber,
                //     firebase_UID: currentUser?.user?.uid,
                    
                    
                // }
                // axiosSecure.post(`/create-new-user-by-sign-up`,userData)
                // .then(res=>{
                //     navigate(from, { replace: true });
                // }).catch((e)=>SwalErrorShow(e))

                // navigate(from, { replace: true });
            })
            .catch(e => {
                console.log(e);
                setLoading(false)
                SwalErrorShow(e);
            })
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