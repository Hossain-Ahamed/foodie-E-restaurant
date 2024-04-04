import React, { useEffect, useState } from 'react';
import useProfile from './../../../../Hooks/useProfile';
import LoadingPage from '../../LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from './../../ErrorPage/ErrorPage';
import { MdCall, MdEmail, MdOutlineDriveFileRenameOutline, MdCameraAlt, MdPeopleAlt, MdLocationPin, MdNearMe } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import SetTitle from '../../SetTtitle/SetTitle';
import { useForm } from 'react-hook-form';
import useAuthProvider from '../../../../Hooks/useAuthProvider';
import { useNavigate } from 'react-router-dom';
import { getAllDistricts, getProvinceOfSelectedCity, imageUpload, SwalErrorShow, validateEmail, validateMobileNumber } from '../../../../assets/scripts/Utility';
import Swal from 'sweetalert2';
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import AddressForm from './AddressForm';
import { Button } from "@nextui-org/react";
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const EditProfile = () => {
    const { profile, profileLoading, profileError, profileRefetch } = useProfile();
    const [isOpen, setOpen] = useState(false);

    const setisOpen = (value) => {

        setOpen(value)
    }

    // useEffect(() => {
    //     if (!profile?.address) {
    //         console.log(object)
    //     }
    // }, [profile])



    const [imgUpload, setImageUpload] = useState(null);

    const [loadingOnSave, setloadingOnSave] = useState(false);

    const { register, formState: { errors }, handleSubmit, setValue } = useForm({ mode: "onChange" });

    const { user } = useAuthProvider();







    const handleImageUpload = (event) => {

        const file = event.target.files[0];
        setImageUpload(URL.createObjectURL(file));

        setValue("img", file);

    }

    useEffect(() => {
        setImageUpload(profile?.imgURL)
    }, [profile])




    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const uploadtoDB = (data) => {

        axiosSecure.patch(`/edit-my-profile/${profile?.email}`, data)
            .then(data => {

                profileRefetch();
                toast.success('Profile Updated')
                navigate(`/profile`, { replace: true });
            })
            .catch(err => SwalErrorShow(err))
            .finally(() => setloadingOnSave(false))
    }

    const onSubmit = async (data) => {

        console.log(data);
        setloadingOnSave(true);
        if (data?.img) {

            imageUpload(data?.img)
                .then(res => {
                    data.img = res?.data?.display_url;
                    uploadtoDB(data)
                })
                .catch(err => SwalErrorShow(err))
                .finally(() => setloadingOnSave(false))
        } else {
            uploadtoDB(data)
        }


    };





    const [nearestDistrict, setNearestDistrict] = useState(null);
    const [districts, setDistricts] = useState(getAllDistricts());
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        // Function to calculate the distance between two points using Haversine formula
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Radius of the earth in km
            const dLat = deg2rad(lat2 - lat1);
            const dLon = deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c; // Distance in km
            return d;
        }

        const deg2rad = (deg) => {
            return deg * (Math.PI / 180)
        }

        // Function to find the nearest district based on browser location
        const findNearestDistrict = (latitude, longitude) => {
            let minDistance = Infinity;
            let nearest = null;

            districts.forEach(district => {
                const dist = calculateDistance(
                    latitude,
                    longitude,
                    parseFloat(district.lat),
                    parseFloat(district.long)
                );

                if (dist < minDistance) {
                    minDistance = dist;
                    nearest = district;
                }
            });


            setNearestDistrict(nearest);
            setDistance((minDistance * 1000).toFixed(2));
            // console.log(nearest, "   ",(minDistance * 1000).toFixed(2))
        };

        // Get browser's geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    findNearestDistrict(latitude, longitude);
                },
                error => {
                    console.error(error);
                    // Handle error when getting user's location
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            // Handle case where geolocation is not supported
        }
    }, [districts, profile]);


    useEffect(() => {

        //if there is no address , then ask for address
        if (!profile?.address?.city) {
            setisOpen(true)
        }


        //if curent browser adress and profile address not same ask them
        if (profile?.address?.city && nearestDistrict?.name && nearestDistrict?.name !== profile?.address?.city) {

            Swal.fire({
                // title: "Chnage Address?",
                text: `Current location is ${nearestDistrict?.name}. Want to update?`,

                showCancelButton: true,
                confirmButtonColor: "success",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then((result) => {
                if (result.isConfirmed) {
                    setisOpen(true)
                }
            });
        }

    }, [profile, nearestDistrict]) //giving setis open in dependency causes lots of re render // so dont add that




    if (profileLoading) {
        return <LoadingPage />
    }
    if (profileError) {
        return <ErrorPage />
    }



    return (
        <>
            <SetTitle title="Edit-Profile" />
            <div className='w-full lg:w-[900px] mx-auto border p-2 mt-5 md:px-10 rounded shadow'>
                <SectionTitle h1="Edit Profile" />

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="relative cursor-pointer w-20 mx-auto h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500 mt-8 mb-4 md:mx-0">
                        {
                            imgUpload ? <img src={imgUpload} className='object-cover w-full h-full' alt="" /> : <div><svg className="absolute w-20 h-20 text-gray-400 top-2 left-0  md:mr-8 md:mx-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg></div>
                        }
                    </div>
                    <div>
                        <div className='relative'>
                            <label htmlFor="image-upload" className='absolute -top-12 left-[52%] bg-gray-400 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer md:left-12'>
                                <MdCameraAlt size={25} className='text-white top-8' />
                            </label>
                        </div>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            name='image'
                            onChange={handleImageUpload}
                            className='hidden'

                        />

                    </div>
                    <div className='grid grid-cols-1 justify-center gap-6 mb-6 md:grid-cols-2 md:justify-start'>
                        <div className=''>
                            <div className='flex items-center'>
                                <MdOutlineDriveFileRenameOutline className='text-lg mr-3' />
                                <label htmlFor="first_name" className="block my-2 mb-2 text-md font-medium">Name</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="block input-field w-full md:max-w-xs p-2 text-gray-900  rounded-lg border border-gray-300 text-base  read-only:bg-gray-100 read-only:border-0 read-only:cursor-not-allowed"
                                    defaultValue={profile?.name}
                                    {...register("name", {
                                        required: "*Name required",
                                        maxLength: {
                                            value: 40,
                                            message: "Max length is 40"
                                        }
                                    })} />
                                {errors.name && <p className='p-1 text-xs text-red-600'>{errors.name.message}</p>}
                            </div>
                        </div>



                        {/* phone  */}
                        <div>
                            <div className='flex items-center'>
                                <MdCall className='text-lg mr-3' />
                                <label htmlFor="first_name" className="block my-2 mb-2 text-md font-medium">Phone</label>
                            </div>


                            {
                                profile ?
                                    <>
                                        <div>

                                            <input
                                                type="tel"
                                                name='phone'
                                                placeholder="Type here"
                                                className="block input-field w-full md:max-w-xs p-2 text-gray-900  rounded-lg border border-gray-300 text-base  read-only:bg-gray-100 read-only:border-0 read-only:cursor-not-allowed"
                                                readOnly
                                                defaultValue={profile?.phone}
                                                {...register("phone")}
                                            />

                                        </div>
                                    </>
                                    :
                                    <>
                                        <div>
                                            <input
                                                type="tel"
                                                placeholder="Type here"
                                                defaultValue={profile?.phone}
                                                className="block input-field w-full md:max-w-xs p-2 text-gray-900  rounded-lg border border-gray-300 text-base  read-only:bg-gray-100 read-only:border-0 read-only:cursor-not-allowed"
                                                {...register("phone", {
                                                    required: "*Phone No required",
                                                    validate: {
                                                        notPhone: (value) => validateMobileNumber(value)
                                                    },
                                                })} />
                                            {errors.phone && errors.phone.type === "notPhone" && <p className='p-1 text-xs text-red-600'>*Invalid</p>}
                                            {errors.phone && <p className='p-1 text-xs text-red-600'>{errors.phone.message}</p>}
                                        </div>
                                    </>
                            }



                        </div>


                        {/* email  */}
                        <div>
                            <div className='flex items-center'>
                                <MdEmail className='text-lg mr-3' />
                                <label htmlFor="first_name" className="block my-2 mb-2 text-md font-medium">Email Address</label>
                            </div>

                            {
                                profile?.email ?
                                    <>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="Type here"
                                                className="block input-field w-full md:max-w-xs p-2 text-gray-900  rounded-lg border border-gray-300 text-base  read-only:bg-gray-100 read-only:border-0 read-only:cursor-not-allowed"
                                                readOnly
                                                defaultValue={profile?.email}
                                                {...register("email")}
                                            />

                                        </div>
                                    </>
                                    :
                                    <>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="Type here"
                                                className="block input-field w-full md:max-w-xs p-2 text-gray-900  rounded-lg border border-gray-300 text-base  read-only:bg-gray-100 read-only:border-0 read-only:cursor-not-allowed"
                                                {...register("email", {
                                                    validate: {
                                                        notemail: (value) => validateEmail(value)
                                                    },
                                                })} />
                                            {errors.email && errors.email.type === "notemail" && <p className='p-1 text-xs text-red-600'>*Invalid</p>}
                                            {errors.email && <p className='p-1 text-xs text-red-600'>{errors.email.message}</p>}
                                        </div>
                                    </>
                            }

                        </div>


                        {/* gender  */}
                        <div>
                            <div className='flex items-center'>
                                <MdPeopleAlt className='text-lg mr-3' />
                                <label htmlFor="gender" className="block my-2 mb-2 text-md font-medium">Gender</label>
                            </div>
                            <div>



                                <select
                                    id="gender"
                                    name='gender'
                                    className="bg-gray-50 border w-full md:max-w-xs border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block h-10 p-1 m-0"
                                    defaultChecked={profile?.gender}
                                    {...register("gender", { required: '*Select One' })}
                                >

                                    <option value='Male'>Male</option>
                                    <option value='Female' >Female</option>
                                    <option value='Others'>Others</option>
                                </select>
                            </div>
                        </div>
                    </div>





                    <div className='my-6 w-full flex justify-center'>


                        <Button color="success" type='submit' isLoading={loadingOnSave} className='text-white px-6 text-lg'>
                            Update My Profile
                        </Button>




                    </div>


                </form>


                {/* address book  */}
                <div className='mt-4 mb-11 max-w-[500px]' id='update-address'>
                    <div className='border border-gray-400 text-gray-700 rounded-md'>


                        <div className='flex items-center bg-gray-200 p-2 rounded-t-md'>
                            <MdLocationPin className='text-[25px] mr-1' />
                            <h3>Address</h3>
                        </div>




                        {/* add address  */}
                        <div className='p-2'>
                            {/* modal trigger  */}
                            <button onClick={() => setisOpen(true)} htmlFor='address-update-modal' className=' flex rounded-md border border-gray-300 items-center p-1.5 justify-center cursor-pointer w-full '>
                                <AiOutlinePlus className='text-2xl mr-3' />
                                <p>{profile?.address && Object.keys(profile?.address) > 0 ? "Change" : "Add"} Address</p>
                            </button>
                            <Modal isOpen={isOpen} >
                                <ModalContent >
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1 text-center">Address Form</ModalHeader>
                                            <AddressForm nearestDistrict={nearestDistrict} onClose={setisOpen} />
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>



                        </div>





                        {/* existed address show bar  */}
                        {
                            profile?.address && <>
                                <div className='flex rounded-md justify-between items-center m-2 p-2 text-gray-600  bg-light-100'>
                                    <div className='flex  justify-between items-center gap-2'>
                                        <MdNearMe className='text-2xl pt-1' />
                                        <div className="flex flex-col items-start">

                                            <p>{profile?.address?.streetAddress}, <br /> {profile?.address?.city}, {profile?.address?.stateProvince}, {profile?.address?.postalCode}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>


            </div >
        </>
    );
};

export default EditProfile;