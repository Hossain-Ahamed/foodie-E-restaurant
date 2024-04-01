import React, { useEffect, useState } from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { getAllDistricts, getCountries, getDivisions, getProvinceOfSelectedCity, SwalErrorShow } from '../../../../assets/scripts/Utility';
import useProfile from '../../../../Hooks/useProfile';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const AddressForm = ({ nearestDistrict, onClose }) => {
    const { profile } = useProfile();

    const { register, handleSubmit, formState: { errors }, setValue, control, getValues } = useForm();
    const countries = getCountries();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const AllDistricts = getAllDistricts();
    const AllDivisions = getDivisions();
    const navigate = useNavigate();


    /**
             * --------------------------------------------------------
             *    set city and province if location permitteed
             * -------------------------------------------------------
             */
    useEffect(() => {

        if (!profile?.address && nearestDistrict?.name) {
            setValue(`city`, nearestDistrict?.name)
            setValue(`stateProvince`, getProvinceOfSelectedCity(nearestDistrict?.name))
        }

    }, [nearestDistrict, profile, setValue])
    //-------------------------------------------------------------------   

    const onSubmit = (data) => {

        console.log(data)

        setLoading(true);
        axiosSecure.post(`/user-profile-update-address/${profile?.email}`, data)
            .then((res) => {
                navigate(`/profile`, { replace: true })
                toast.success("Successfully Updated")
                onClose(false);
            })
            .catch(e => {
                SwalErrorShow(e)
            })
            .finally(() => {
                setLoading(false);

            });
    }

    // ________________________________________________________________________________




    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                {
                    nearestDistrict?.name &&
                    <div className='flex items-center gap-2 justify-start px-6 '>
                        <svg className='h-3 w-3 text-gray-500' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9999 13.4299C13.723 13.4299 15.1199 12.0331 15.1199 10.3099C15.1199 8.58681 13.723 7.18994 11.9999 7.18994C10.2768 7.18994 8.87988 8.58681 8.87988 10.3099C8.87988 12.0331 10.2768 13.4299 11.9999 13.4299Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M3.6202 8.49C5.5902 -0.169998 18.4202 -0.159997 20.3802 8.5C21.5302 13.58 18.3702 17.88 15.6002 20.54C13.5902 22.48 10.4102 22.48 8.3902 20.54C5.6302 17.88 2.4702 13.57 3.6202 8.49Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>

                        <p className='text-gray-500'><span className='font-medium text-gray-700 '>{nearestDistrict?.name}</span><span className=' pl-3 text-xs text-gray-400'> *possibly incorrect</span> </p>

                    </div>
                }


                <ModalBody>

                    <div className="flex flex-wrap items-center  select-none ">

                        <div className="w-full  py-3 relative">
                            <label htmlFor={`streetAddress`} className="mb-1.5 font-medium text-sm text-coolGray-800">
                                Street Address
                            </label>
                            <input
                                id={`streetAddress`}
                                {...register(`streetAddress`, {
                                    required: '*Required',
                                })}
                                defaultValue={profile?.address?.streetAddress || ""}
                                className={`w-full px-4 py-2.5 text-sm text-coolGray-900 font-normal outline-none focus:border-green-500 border ${errors?.streetAddress && 'border-danger-400'} rounded-lg shadow-input`}
                                type="text"
                                placeholder="Enter your street address"
                            />
                            {errors?.streetAddress && (
                                <p className='m-0 p-0 pl-1 text-red-500 text-xs absolute' role="alert">
                                    {errors.streetAddress.message}
                                </p>
                            )}
                        </div>


                        <div className="w-full md:w-1/2 py-3 pr-1">
                            <label htmlFor={`city`} className="mb-1.5 font-medium text-sm text-coolGray-800 relative">
                                City/Town
                            </label>
                            <select


                                className={`w-full text-sm px-2 py-2.5 text-coolGray-900 font-normal outline-none focus:border-green-500 border ${errors?.city ? 'border-danger-400' : 'border-gray-300'} rounded-lg h-10  m-0`}
                                defaultValue={profile?.address?.city || ""}
                                {...register(`city`, { required: '*Required' })}
                                onChange={(e) => { setValue(`city`, e.target.value); setValue(`stateProvince`, getProvinceOfSelectedCity(e.target.value)) }}
                            >
                                <option value="" disabled>
                                    Select City
                                </option>

                                {AllDistricts.map((item, _idx) => (
                                    <option key={item?.name} value={item?.name}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>

                            {errors?.city && (
                                <p className='m-0 p-0 pl-1  text-red-500 text-xs absolute' role="alert">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>


                        <div className="w-full md:w-1/2 py-3 pl-1 relative">
                            <label htmlFor={`city`} className="mb-1.5 font-medium text-sm text-coolGray-800">
                                State / Province
                            </label>
                            <select
                                label="Select Dish Category"
                                className={`w-full px-2 py-2.5 text-sm text-coolGray-900 font-normal outline-none focus:border-green-500 border ${errors?.stateProvince ? 'border-danger-400' : 'border-gray-300'} rounded-lg h-10 p-1 m-0`}
                                defaultValue={profile?.address?.stateProvince || ""}
                                {...register(`stateProvince`, { required: '*Required' })}
                            >
                                <option value="" disabled>
                                    Select Province/State
                                </option>

                                {AllDivisions.map((item, _idx) => (
                                    <option key={item?.name} value={item?.name}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>


                            {errors?.stateProvince && (
                                <p className='m-0 p-0 pl-1  text-red-500 text-xs absolute' role="alert">
                                    {errors.stateProvince.message}
                                </p>
                            )}
                        </div>

                        <div className="w-full md:w-1/2 py-3 pr-1 relative">
                            <label htmlFor={`postalCode`} className="mb-1.5 font-medium text-sm text-coolGray-800">
                                ZIP / Postal code
                            </label>
                            <input
                                {...register(`postalCode`, { required: '*Required' })}
                                defaultValue={profile?.address?.postalCode || ""}
                                className={`w-full px-4 py-2.5 text-sm text-coolGray-900 font-normal outline-none focus:border-green-500 border ${errors?.postalCode && 'border-danger-400'} rounded-lg shadow-input`}
                                type="text"
                                placeholder="ZIP / Postal code"
                            />
                            {errors?.postalCode && (<p className='m-0 p-0 pl-1  text-red-500 text-xs absolute' role="alert">{errors.postalCode.message}</p>
                            )}
                        </div>


                        <div className="w-full md:w-1/2 py-3 pl-1">
                            <label htmlFor={`country`} className="mb-1.5 font-medium text-sm text-coolGray-800">
                                Country
                            </label>
                            <div className="relative">
                                <svg className="absolute right-4 top-1/2 transhtmlForm -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-2-3">
                                    <path d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z" fill="#8896AB"></path>
                                </svg>
                                <select
                                    {...register(`country`, { required: 'Country is required' })}
                                    defaultValue={profile?.address?.country || "Bangladesh"}
                                    className="w-full px-4  h-10 p-1 m-0 text-sm text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg appearance-none"
                                >
                                    <option value="" disabled>Select Country</option>
                                    {countries.map((country, i) => (
                                        <option key={i + 0} value={country?.en_short_name} className='text-black'>
                                            {country?.en_short_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors?.country && (
                                <p className='m-0 p-0 pl-1  text-red-500 text-xs' role="alert">
                                    {errors.country.message}
                                </p>
                            )}


                        </div>





                    </div>











                </ModalBody>
                <ModalFooter className='flex justify-center'>


                    <Button color="success" variant='shadow' isLoading={loading} type='submit' fullWidth className='text-success-800'>
                        {loading ? "Updating Address" : "Update Address"}
                    </Button>
                    {
                        profile?.address &&
                        <Button color="danger" variant='solid' onPress={()=>onClose(false)} >
                            Cancel
                        </Button>
                    }

                </ModalFooter>
            </form>
        </>
    );
};

export default AddressForm;