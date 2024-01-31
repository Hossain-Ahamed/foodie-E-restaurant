import { Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

const RefundRequest = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const onSubmit = (data) => {

        console.log(data);
        // Now `formData` contains all the fields with the same names as in the `data` object
        // Continue with the rest of your submission logic
    };
    return (
        <div>
            <div className="container mx-auto my-8">
                <h1 className="text-3xl font-bold mb-4">Return Policy</h1>
                <p className="text-gray-700 mb-4">
                    Thank you for shopping at Foodie. We appreciate the trust you have placed in us. If you are not satisfied with your purchase, we are here to help.
                </p>

                <h2 className="text-xl font-semibold mb-2">Returns</h2>
                <p className="text-gray-700 mb-4">
                    To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging.
                </p>

                <h2 className="text-xl font-semibold mb-2">Refunds</h2>
                <p className="text-gray-700 mb-4">
                    Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you of the status of your refund after inspecting the item.
                </p>

                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                    If you have any questions on how to return your item to us, contact us at:
                    <br />
                    Foodie<br />
                    Jamtola<br />
                    Narayanganj,Dhaka,Bangladesh<br />
                    Email: support@foodie.com<br />
                    Phone: +1 (123) 456-7890
                </p>

                <p className="text-gray-700">
                    This Return Policy was last updated on 20/01/2004.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-5 rounded-lg mt-4">

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Input type="email" label="Enter your email" 
                                {...register("email", {
                                    required: "*Email is Required",
                                })}
                            />
                            {errors.email?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.email.message}</p>)}
                        </div>

                        <div>
                            <Input type="text" label="Enter your phone"
                                {...register("phone", {
                                    required: "*Phone number is Required",
                                })}
                            />
                            {errors.phone?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.phone.message}</p>)}
                        </div>
                    </div>
                    <div>
                        <Textarea
                            variant= 'bordered'
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Compose a detailed refund claim message."
                            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                            minRows={4}
                            {...register("message", {
                                required: "*Detailed message is Required",
                            })}
                        />
                        {errors.message?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors.message.message}</p>)}
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                        >
                            Send Enquiry
                        </button>
                    </div>
                </form>
            </div> 
        </div>
    );
};

export default RefundRequest;