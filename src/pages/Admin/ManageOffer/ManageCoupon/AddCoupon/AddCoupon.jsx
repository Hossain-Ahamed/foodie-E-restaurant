import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import SetTitle from '../../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../../components/SectionTitle/SectionTitle';

import { useForm, Controller } from 'react-hook-form';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../../Hooks/useRestauarantAndBranch';

import { Button } from "@nextui-org/react";

const AddCoupon = () => {

    const { handleSubmit, control, setValue, register, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID, res_name } = useRestauarantAndBranch();

    const today = new Date();
    today.setHours(0, 1, 0, 0); // Set to 12:01 AM

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 10); // Add 10 days
    endDate.setHours(23, 59, 0, 0)

    const [state, setState] = useState([
        {
            startDate: today,
            endDate: endDate,
            key: 'selection'
        }
    ]);

    const minPercantage = 0;
    const maxPercantage = 100;
    const minOrderAmmount = 0;
    const minDiscountLimit = 0;
    const minNumberOfUse = 0;

    // Validation rules for fields
    const percantageValidation = {
        required: "*percantage is Required",
        validate: {
            isNumber: (value) => !isNaN(value),
            minValue: (value) => value >= minPercantage,
            maxValue: (value) => value <= maxPercantage,
        },
    };

    const minOrderAmmountValidation = {
        required: "*minimum Order Ammount is Required",
        validate: {
            isNumber: (value) => !isNaN(value),
            minValue: (value) => value >= minOrderAmmount,
        },
    };

    const maxDiscountLimitValidation = {
        required: "*Maximum Discount Limit is Required",
        validate: {
            isNumber: (value) => !isNaN(value),
            minValue: (value) => value >= minDiscountLimit,
        },
    };

    const maxNumberOfUseValidation = {
        required: "*Maximum Number of Use is Required",
        validate: {
            isNumber: (value) => !isNaN(value),
            minValue: (value) => value >= minNumberOfUse,
        },
    };

    useEffect(() => {

        setValue('from', state[0].startDate.toISOString())
        setValue('to', state[0].endDate.toISOString())
    }, [state, setValue])

    // Function to handle form submission
    const onSubmit = async (data) => {
        console.log(data)

    };

    return (
        <section aria-label='coupon  add' className='mt-5'>
            <SetTitle title="Add Coupon" />
            <SectionTitle h1="Add Coupon" />

            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[500px] mx-auto  p-4' autoComplete='off'>

                <div className="flex flex-wrap pb-3">
                    <div className="w-full">
                        <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Coupon Name</p>
                        <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="Front, row-2 col-1"
                            {...register("name", {
                                required: "*name  is Required",
                            })} />
                        {errors.name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.name?.message}</p>)}

                    </div>
                </div>


                <div className="w-full relative">
                    <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Percantage</p>
                    <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="number" placeholder="2"
                        {...register("percantage", percantageValidation)} />
                    {errors.percantage?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.percantage?.message}</p>)}
                    {errors.percantage?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}
                    {errors.percantage?.type === "minValue" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*minimum value must be 0</p>)}
                    {errors.percantage?.type === "maxValue" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*Maximum value is 100</p>)}
                    <p className='absolute right-3 text-xl top-10'> %</p>
                </div>

                {/* minimum order ammount  */}
                <div className="w-full relative">
                    <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Minimum Order Ammount</p>
                    <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="number" placeholder="8"
                        {...register("minimumOrderAmmount", minOrderAmmountValidation)} />
                    {errors.minimumOrderAmmount?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.minimumOrderAmmount?.message}</p>)}
                    {errors.minimumOrderAmmount?.type === "minValue" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*minimum value must be 0</p>)}
                    {errors.minimumOrderAmmount?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}
                    <p className='absolute right-3 text-xl top-10'> tk</p>
                </div>

                {/* Maximum Discount Limit  */}
                <div className="w-full relative">
                    <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Maximum Discount Limit</p>
                    <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="number" placeholder="8"
                        {...register("maximumDiscountLimit", maxDiscountLimitValidation)} />
                    {errors.maximumDiscountLimit?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.maximumDiscountLimit?.message}</p>)}
                    {errors.maximumDiscountLimit?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}
                    {errors.maximumDiscountLimit?.type === "minValue" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*minimum value must be 0</p>)}
                    <p className='absolute right-3 text-xl top-10'> tk</p>
                </div>

                {/* Maximum number of use   */}
                <div className="w-full ">
                    <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Maximum Number of Use</p>
                    <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="number" placeholder="8"
                        {...register("maximumNumberOfUse", maxNumberOfUseValidation)} />
                    {errors.maximumNumberOfUse?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.maximumNumberOfUse?.message}</p>)}
                    {errors.maximumNumberOfUse?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}
                    {errors.maximumNumberOfUse?.type === "minValue" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*minimum value must be 0</p>)}
                </div>

                <div className='mt-4 w-full flex flex-col items-center justify-center'>
                    <SectionTitle h3="Coupon Active Days" />
                    <DateRange

                        editableDateInputs={true}
                        onChange={item => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                    />
                </div>
                <br />
                <div className='w-full border-t pt-2 flex justify-center '>

                    <Button color="success" type='submit'>
                        <span className='text-white px-4'>Save</span>
                    </Button>
                </div>

            </form>

        </section>
    );
};

export default AddCoupon;