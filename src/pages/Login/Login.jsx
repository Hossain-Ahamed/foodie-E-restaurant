import React, { useState } from 'react';
import SetTitle from '../Shared/SetTtitle/SetTitle';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuthProvider from '../../Hooks/useAuthProvider';
import { getPcInfo, SwalErrorShow, validateEmail } from '../../assets/scripts/Utility';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import ForgetPasswordForm from './ForgetPasswordForm';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import OtherSignInMethod from './OtherSignInMethod';

const Login = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [showPass, setShowPass] = useState(false); //password hidden an show

    /**
     * ----------- store Location from which user redirected to login page 
     */

    const navigate = useNavigate();
    //pass the previous location
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    // console.log(from)    

    // ------------------------------------------------------------------------
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    // ------------------------------ SIGN IN -------------------------------------
    const { provideSignInWithEmailAndPassword, setLoading } = useAuthProvider();
    const axiosSecure = useAxiosSecure();
    const onSubmit = data => {
        const email = data.email;
        const password = data?.password;
        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'Provide Necessaary Data',

            })
            return;
        }

        // console.log({ email, password })


        provideSignInWithEmailAndPassword(email, password)
            .then(result => {

                // axiosSecure.post(`/sign-in`, { email, password })
                //     .then(res => {
                //         navigate(from, { replace: true });
                //     }).catch((e) => SwalErrorShow(e))
                navigate(from, { replace: true });

            }).catch(e => { setLoading(false) })
    }


    return (
        <>

            <SetTitle title="Login" />

            <div id="signin auth" aria-label='Login-Form' >
                <div className=" ">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Welcome to Foodie</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Never share your confidential information & stay vigilant to keep your login details safe.
                    </p>



                    {/* login form  */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-0 mt-6 space-y-4  rounded-lg p-4 sm:p-6 lg:p-8 pb-0">
                        <p className="text-center text-lg font-medium">Sign in to your account</p>


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
                                {errors.email?.type === "required" && (<p className='m-0 p-0 pl-1  pt-1 text-red-500 text-xs' role="alert">{errors.email.message}</p>)}
                                {errors.email?.type === "notEmail" && (<p className='m-0 p-0 pl-1  pt-1 text-red-500 text-xs' role="alert">*not valid E-mail</p>)}
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
                                {errors.password?.type === "required" && (<p className='m-0 p-0 pl-1  pt-1 text-red-500 text-xs' role="alert">*Enter password</p>)}
                            </div>
                        </div>
                        <button className='flex justify-between text-xs cursor-pointer hover:text-danger border-0 ring-0' onClick={(e)=>{
                            e.preventDefault();
                            onOpen();
                        }}>
                            Forget Password?
                        </button>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-green-500 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>

                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>

                                        <ModalBody>
                                            <ForgetPasswordForm onOpenChange={onOpenChange} />
                                        </ModalBody>

                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </form>
                    <OtherSignInMethod />
                </div>
            </div>
        </>
    );
};

export default Login;