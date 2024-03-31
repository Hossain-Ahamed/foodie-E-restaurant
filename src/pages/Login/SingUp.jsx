import React, { useState } from 'react';
import SetTitle from '../Shared/SetTtitle/SetTitle';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuthProvider from '../../Hooks/useAuthProvider';
import { getPcInfo, SwalErrorShow, validateEmail } from '../../assets/scripts/Utility';


import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const SignUp = () => {
    const axiosSecure = useAxiosSecure();

    const [phone, setPhone] = useState('');
    const [phoneNumError, setphoneNumError] = useState(false);

    const [showPass, setShowPass] = useState(false); //password hidden an show

    /**
     * ----------- store Location from which user redirected to login page 
     */

    const navigate = useNavigate();
    //pass the previous location
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // ------------------------------------------------------------------------
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    // ------------------------------ SIGN IN -------------------------------------
    const { provideCreateUserWithEmailAndPassword } = useAuthProvider();

    const onSubmit = data => {
        setphoneNumError(false);

        const displayName = data.displayName;
        const email = data.email;
        const password = data?.password;
        if (!email || !password || !phone ) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'Provide Necessaary Data',

            })
            return;
        }

        const bdNumberRegex = /^8801[3-9]\d{8}$/;


        if (bdNumberRegex.test(phone)) {
            setphoneNumError(false)
        } else {
            setphoneNumError(true)

        }




       
        provideCreateUserWithEmailAndPassword(email, password)
            .then(result => {

                const userData = {
                    name: displayName,
                    password : password,
                    phone: phone, 

                    email: result?.user.email,
                    // photoURL: result?.user?.photoURL,
                    firebase_UID: result?.user?.uid,


                }
               axiosSecure.post(`/create-new-user-by-sign-up`,userData)
               .then(res=>{
                   navigate(from, { replace: true });
               }).catch((e)=>SwalErrorShow(e))

            }).catch(e => console.log(e))
    }
    const customInputStyle = {
        width: '100%', // Set width to 100%
        borderRadius: '0.375rem', // Add border radius
        border: '1px solid #E5E7EB', // Add border
        fontSize: '0.875rem', // Set font size

        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Add box shadow
        
    };
    

    return (
        <>

            <SetTitle title="Login" />

            <div id="signin auth" aria-label='Login-Form' >
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Never share your confidential information & stay vigilant to keep your login details safe.
                    </p>



                    {/* login form  */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-0 mt-6 space-y-4 h-fit min-h-[50vh] rounded-lg p-4 sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Sign in to your account</p>


                    
                        <PhoneInput
                            inputStyle={customInputStyle}
                            enableSearch={true}
                            country={'bd'}

                            autoFormat={false}
                            countryCodeEditable={false}
                            value={phone}
                            onChange={value => { setPhone(value); setphoneNumError(false) }}
                            isValid={() => {

                                if (phoneNumError) {
                                    return 'Invalid';
                                }
                
                                return true;
                            }}

                        />
                        {/* name  */}
                        <div>
                            <label htmlFor="email" className="sr-only">Your Name</label>

                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Your Name"
                                    {...register("displayName", {
                                        required: "*Name is required",
                                    })}
                                />

                                
                                {errors.displayName?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.displayName.message}</p>)}
                            </div>
                        </div>
                        {/* email  */}
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                    {...register("email", {
                                        required: "*Email is required",

                                        validate: {
                                            notEmail: (value) => validateEmail(value)
                                        },
                                    })}
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                                {errors.email?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.email.message}</p>)}
                                {errors.email?.type === "notEmail" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*not valid E-mail</p>)}
                            </div>
                        </div>


                        {/* password  */}
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                    {...register("password", { required: true })}
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer" onClick={() => setShowPass(!showPass)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                                {errors.password?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Enter password</p>)}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign Up
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;