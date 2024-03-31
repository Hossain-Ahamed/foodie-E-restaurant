import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import OtpInput from 'react-otp-input';
import './forgetPass.css'
import { Button } from '@nextui-org/react';
import { toast } from 'react-hot-toast';
const ForgetPasswordForm = ({onOpenChange}) => {

    const [Loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false); //password hidden an show

    const [{ otp, numInputs, separator, minLength, maxLength, placeholder, inputType }, setConfig] = React.useState({
        otp: '',
        numInputs: 4,
        separator: '-',
        minLength: 0,
        maxLength: 40,
        placeholder: '',
        inputType: 'text',
    });

    const handleOTPChange = (otp) => {
        setConfig((prevConfig) => ({ ...prevConfig, otp }));
    };







    const axiosSecure = useAxiosSecure();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [ReadyToFillOTP, setReadyToFillOTP] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [error, setError] = useState(null);

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // const handleOTPChange = (e) => {
    //     setOtp(e.target.value);
    // };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleOTPRequest = async () => {

        if (!email || !phoneNumber) {
            toast.error("Enter Necessary Information");
            return;
        }
        setOtpSent(true);
        setReadyToFillOTP(true);

    };

    const handleVerifyOTP = () => {
        try {
            setLoading(true)
            setError("")
            // Verify OTP with the server
            //  axiosSecure.post('/verify-otp', { otp, phoneNumber, email })
            //  .then(res=>{
            //     if(res.data.success){

            //             setOtpVerified(true);

            //     }
            //  }).catch(e=>setError("Verify User Failed")).finally(()=>setLoading(false))


            // todo 
            setLoading(false);
            setOtpVerified(true);
            //  todo end 

        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError('Failed to verify OTP. Please try again.');
        }
    };

    const handleChangePassword = async () => {
        try {
            
            // Change password request to the server
            const response = await axiosSecure.post('/change-password', { newPassword, email });
            if (response.data.success) {
                setPasswordChanged(true);
                toast.success("Password Chnaged")
            } else {
                setError(response.data.message);
            }
            onOpenChange()
        } catch (error) {
          
            console.error('Error changing password:', error);
            setError('Failed to change password. Please try again.');
        }
    };

    if (!ReadyToFillOTP && !otpSent) {
        return (
            <>
                <SectionTitle h3="Fill up the information below" />
                <div className='flex flex-col gap-2 py-5'>


                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="tel"
                                className="w-full rounded-lg border-gray-600 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter Phone Number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange} required
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 11.03V17C20 21 19 22 15 22H9C5 22 4 21 4 17V7C4 3 5 2 9 2H15C19 2 20 3 20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 5.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 19.1C12.856 19.1 13.55 18.406 13.55 17.55C13.55 16.694 12.856 16 12 16C11.144 16 10.45 16.694 10.45 17.55C10.45 18.406 11.144 19.1 12 19.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </span>

                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter email"
                                value={email}
                                onChange={handleEmailChange} required
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

                        </div>
                    </div>
                    <Button color="primary" isLoading={false} onPress={handleOTPRequest}>
                        Request OTP
                    </Button>

                </div>
            </>
        );
    } else if (ReadyToFillOTP && !otpVerified) {
        return (
            <div >

                <form >
                    <SectionTitle h3="Enter Verification Code" />
                    <div className=" select-none pl-6 pt-8">
                        <OtpInput
                            inputStyle="inputStyle"
                            numInputs={4}
                            onChange={handleOTPChange}
                            renderSeparator={<span> - </span>}
                            value={otp}
                            placeholder={placeholder}
                            inputType={inputType}
                            renderInput={(props) => <input {...props} />}
                            shouldAutoFocus

                        />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center mt-10">
                        <Button color={error ? "danger" : "primary"} isLoading={Loading} onPress={handleVerifyOTP} isDisabled={otp.length < 4 || error}>
                            {error ? "Deneid" : Loading ? "Loading" : "Verify"}
                        </Button>
                        <p className='pt-2 text-xs text-danger'>{error}</p>
                    </div>
                </form>
            </div>

        );
    } else if (otpVerified && !passwordChanged) {
        return (
            <div>
             
             <SectionTitle h3="Never share your password" />
                {/* password  */}
                <div className='pt-5'>
                    <label htmlFor="password" className="sr-only">Password</label>

                    <div className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            className="w-full rounded-lg border border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter password"

                        />

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer" onClick={() => setShowPass(!showPass)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
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

                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center mt-10">
                        <Button color={error ? "danger" : "success"} isLoading={Loading} onPress={handleChangePassword} isDisabled={otp.length < 4 || error}>
                          <span className='text-white'> {error ? "Failed" : Loading ? "Loading" : "Change Password"}</span> 
                        </Button>
                        <p className='pt-2 text-xs text-danger'>{error}</p>
                    </div>
          
            </div>
        );
    } else {
        // Password changed successfully
        return (
            <div>
                <p>Password changed successfully!</p>
            </div>
        );
    }
};

export default ForgetPasswordForm;
