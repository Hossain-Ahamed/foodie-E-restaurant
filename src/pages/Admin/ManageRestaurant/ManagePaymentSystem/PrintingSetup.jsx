import React, { useState } from 'react';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import useRestauarantAndBranch from './../../../../Hooks/useRestauarantAndBranch';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Checkbox } from "@nextui-org/react";
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import { ScaleLoader } from 'react-spinners';
const PrintingSetup = () => {
    const [headerText, setHeaderText] = useState("");
    const [greetingText, setGreetingText] = useState("");
    const [print_res_email, setprint_res_email] = useState(true);
    const [printLogo, setprintLogo] = useState(true);
    const [print_res_mobile, setprint_res_mobile] = useState(true);
    const [print_address, setprint_address] = useState(true);
    const [print_kitchen_print, setprint_kitchen_print] = useState(true);

    const axiosSecure = useAxiosSecure();
    const { branch_name, res_name, res_img, res_id, branchID } = useRestauarantAndBranch();

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

    const { refetch: dataRefetch, data: data = {}, isLoading: dataLoading, error: dataError } = useQuery({
        queryKey: ['data', res_id, branchID],
        enabled: true,
        cacheTime: 0,
        queryFn: async () => {


            let res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/payment-slip-format`);


            res = {
                data: {
                    "res_name": "Fuoco",

                    "headerText": "Welcome to Fuoco",
                    "greetingText": "Thank you!",

                    "streetAddress": "45 New Chasara",
                    "city": "Narayangnaj",
                    "stateProvince": "Dhaka",
                    "postalCode": "1400",
                    "print_address": true,

                    "print_logo": true,
                    "img": "https://images.unsplash.com/photo-1682685797660-3d847763208e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

                    "res_email": "hossainahamed6872@gmail.com",
                    "print_res_email": false,

                    "res_mobile": "01868726172",
                    "print_res_mobile": false,


                    "print_kitchen_print" : true,



                }
            }

            const values = res.data;

            setHeaderText(values.headerText);
            setGreetingText(values.greetingText);
            setprintLogo(values.print_logo);
            setprint_res_email(values.print_res_email);
            setprint_res_mobile(values.print_res_mobile);
            setprint_address(values?.print_address);
            setprint_kitchen_print(values?.print_kitchen_print);

            setValue("print_res_email", res.data?.print_res_email)
            setValue("print_res_mobile", res.data?.print_res_mobile)
            setValue("print_address", res.data?.print_address);
            setValue("print_logo", res.data?.print_logo);
            setValue("print_kitchen_print", res.data?.print_kitchen_print);
            setValue('headerText', res.data?.headerText);
            setValue('greetingText', res.data?.greetingText);

            return res?.data;
        },

    });
    const onSubmit = (data) => {
        console.log(data)
    }

    if (dataLoading) {
        return  <ScaleLoader size={100} color='#36d7b7' style={{margin:'auto',"height": '50px'}} />;
    }
    if (dataError) {
        return <ErrorPage />
    }
    return (
        <section className='flex gap-7 justify-between'>
            <SetTitle title="Printing setup" />
            <div className='w-full md:w-1/2'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 " autoComplete="off">
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Header Text</label>
                        <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs appearance-none "  {...register("headerText")} maxLength={40} onChange={(e) => setHeaderText(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Greeting Text</label>
                        <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs " {...register("greetingText")} maxLength={40} onChange={(e) => setGreetingText(e.target.value)} />
                    </div>

                    <div className='flex flex-col'>
                        <Checkbox className='p-4' defaultSelected={data?.print_logo} onValueChange={(e) => { setValue('print_logo', e); setprintLogo(e) }} >Print Logo</Checkbox>
                        <Checkbox className='p-4' defaultSelected={data?.print_address} onValueChange={(e) => { setValue('print_address', e); setprint_address(e) }} >Print Address</Checkbox>

                        <Checkbox className='p-4' defaultSelected={data?.print_res_email} onValueChange={(e) => { setValue('print_res_email', e); setprint_res_email(e) }} >Print Email address</Checkbox>
                        <Checkbox className='p-4' defaultSelected={data?.print_res_mobile} onValueChange={(e) => { setValue('print_res_mobile', e); setprint_res_mobile(e) }} >Print Mobile Number</Checkbox>
                       
                        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>

                        <Checkbox className='p-4' defaultSelected={data?.print_kitchen_print} onValueChange={(e) => { setValue('print_kitchen_print', e); setprint_kitchen_print(e) }} >Print for Kitchen </Checkbox>

                    </div>



                    <div className="mt-6">
                        <button
                            type="submit"
                            className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 font-medium text-white sm:w-auto"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <div className='w-full md:w-1/2  filter grayscale select-none cursor-move'>
              
                <div className="w-80 h-fit min-h-[300px] bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-4">
                    <div className='flex justify-center items-center flex-col'>
                    <p className='p-0 m-0 mb-1 text-xs'>&#34;{headerText}&#34;</p>
                        {
                            printLogo && <img className="w-20" src={data?.img} alt="" />
                        }
                        <p>{data?.res_name}</p>
                  
                        {
                            print_address && <>
                                <p className='p-0 m-0 text-xs'>{data?.streetAddress}</p>
                                <p className='p-0 m-0 text-xs'>{data?.city}, {data?.stateProvince}, {data?.postalCode}</p>
                            </>
                        }
                        {
                            print_res_mobile && <>
                            <p className='p-0 m-0 text-xs'>{data?.res_mobile}</p>
                           
                        </>

                        }
                        {
                            print_res_email && <>
                            <p className='p-0 m-0 text-xs'>{data?.res_email}</p>
                           
                        </>

                        }

                    </div>
                    <div className='mt-3 flex justify-between'>
                    <p className='p-0 m-0 text-xs'>Order # xxxxxxx</p> 
                    <p className='p-0 m-0 text-xs'>{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    </div>


                    <div className="mt-4 text-xs">
                        <div className="grid grid-cols-4  text-left border-black border-b border-dashed">
                            <span >Qty</span>
                            <span >Item</span>
                           
                            <span className='text-right'>Price</span>
                            <span className='text-right'>Total</span>
                        </div>

                        <div className="grid grid-cols-4  text-left py-1">
                            <span>1x</span>
                            <span>Item Name</span>
                            <span className='text-right'>৳14.00</span>
                            <span className='text-right'>৳14.00</span>
                        </div>
                        <div className="grid grid-cols-4  text-left py-1">
                            <span>3x</span>
                            <span>Item Name</span>
                            <span className='text-right'>৳40.00</span>
                            <span className='text-right'>৳120.00</span>
                        </div>
                        <div className="grid grid-cols-4  text-left py-1">
                            <span>8x</span>
                            <span>Item Name</span>
                            <span className='text-right'>৳7.00</span>
                            <span className='text-right'>৳56.00</span>
                        </div>
                      
                    </div>

                    <div className=" text-xs border-t border-black border-dashed">
                       

                        <div className="grid grid-cols-2  text-left py-1">
                            
                            <span>Subtotal</span>
                            <span className='text-right'>৳190.00</span>
                            
                        </div>
                        <div className="grid grid-cols-2  text-left py-1">
                            
                            <span>Discounts</span>
                            <span className='text-right'>(-) ৳15.00</span>
                            
                        </div>
                        <div className="grid grid-cols-2  text-left py-1">
                            
                            <span>Net Sales</span>
                            <span className='text-right'>৳175.00</span>
                            
                        </div>
                        <div className="grid grid-cols-2  text-left py-1">
                            
                            <span>Service Charge</span>
                            <span className='text-right'>(+) ৳5.00</span>
                            
                        </div>
                        <div className="grid grid-cols-2  text-left py-1">
                            
                            <span>VAT & Taxes</span>
                            <span className='text-right'>(+) ৳10.00</span>
                            
                        </div>
                        <div className="grid grid-cols-2  text-left py-1 font-semibold">
                            
                            <span>Total</span>
                            <span className='text-right'> ৳ 190.00</span>
                            
                        </div>
                        
                      
                    </div>

                    
                    <div className="text-xs text-gray-500 text-center mt-3 ">
                        <p>{greetingText}</p>
                        <p className='mt-2'>Powered By : Foodie</p>
                    </div>
                </div>

            </div>





        </section>
    );
};

export default PrintingSetup;