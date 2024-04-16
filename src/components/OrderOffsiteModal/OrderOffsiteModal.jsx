import React from 'react';

const OrderOffsiteModal = ({order}) => {
    return (
        <>

            {/* Information code inside gray area */}
            {/* <div className="w-full flex flex-col gap-y-4 text-center md:text-start bg-gray-100 rounded-lg p-4 my-8">


                <div className="mb-5 md:mb-0">

                    <p className='text-lg text-blue-400 font-semibold'>{order?.user_id?.name}</p>
                    <p className='font-semibold text-sm text-gray-500'>{order?.user_id?.email}</p>
                    <p className='font-semibold text-sm text-gray-500'>Phone: {order?.phone}</p>
                    <p className='text-sm font-semibold text-gray-700'>
                        Address :  {order?.address?.streetAddress}<br /> {order?.address?.city}, {order?.address?.stateProvince}{" "}
                        {order?.address?.postalCode}
                    </p>
                </div>

                <div className='text-sm'>

                    <p>OrderID: #{order?._id.slice(-8)} - ({order?.order_from}) {order?.orderNote && <>- {order?.orderNote}</>}</p>
                    <p>Token : {order?.token}</p>
                    <p>PromoCode : {order?.vouchers}</p>
                    <div className="flex items-center justify-center md:justify-start">
                        <span>Total Amount: </span>
                        <span>
                            <TbCurrencyTaka />
                        </span>
                        <span className='font-semibold text-amber-800'>{order?.finalPrice}</span>
                    </div>
                    <p>  Status : {order?.status} </p>
                    <div className='flex gap-4'>
                        <p>  Payment Status : {order?.cash_status} </p>
                        <p> Payment Method :{" "}<span className={`${order?.type_of_payment ===
                            "Cash On Delivery (COD)" && "text-red-500 font-semibold"
                            }`}
                        >
                            {order?.type_of_payment}
                        </span></p>

                    </div>
                    <p>

                    </p>
                    {order?.type_of_payment !== "Cash On Delivery (COD)" && <p> Transaction ID : {order?.transactionId}</p>}
                </div>
            </div> */}


            <div className="px-2 md:px-5  pt-3 rounded-md text-md grid gap-1 ">
                {/* timeline  */}
                <ol className="relative border-l border-gray-200 user-select-none">

                    {order?.orderStatus &&
                        Array.isArray(order?.orderStatus) &&
                        order?.orderStatus.map((i, index) => (
                            <li key={index} className="mb-3 ml-4">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                                <time className="flex items-center gap-1 mb-1 text-sm font-normal leading-none text-gray-400 ">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <path d="M8 2V5" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 2V5" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3.5 9.08997H20.5" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.6947 13.7H15.7037" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.6947 16.7H15.7037" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.9955 13.7H12.0045" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.9955 16.7H12.0045" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8.29431 13.7H8.30329" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8.29431 16.7H8.30329" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", }).format(new Date(i?.time))}{" "}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {new Date(i?.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", })}
                                </time>
                                <h3 className="text-sm font-semibold text-gray-900 ">  {i?.name} </h3>
                                <p className="mb-4 text-sm font-normal text-gray-500 "> {i?.message} </p>
                            </li>
                        ))}
                </ol>
            </div>


            {/* dish  */}
            <div className='p-3 mb-4'>

                <div className="text-xs ">
                    <div className="grid grid-cols-5 border-black border-b border-dashed">

                        <span className='col-span-2'>Item</span>
                        <span className="text-right">Qty</span>
                        <span className="text-right">Options</span>
                        <span className="text-right">Total</span>
                    </div>
                    <div className="">
                        {order &&
                            order?.Items && Array.isArray(order?.Items) && order?.Items.map(item => (
                                <div key={item?._id} className='grid grid-cols-5 py-1'>
                                    <div className='flex col-span-2 justify-center items-center'>
                                        <img className='w-20 object-cover' src={item?.img} alt="" />
                                        <div className='grid'>
                                            <p className=' font-bold'>{item?.title}</p>
                                            <p className='text-[#F69449]'>{item?.dishStatus}</p>
                                        </div>
                                    </div>
                                    <p className="text-right">{item?.quantity}</p>


                                    <p className='text-right'>{item?.options} <br/> {item?.addOn && Array.isArray(item?.addOn) && item?.addOn.length >0 && <>+{item?.addOn.join(", ")}</>}</p>

                                    <p className='text-gray-900 text-right'>৳ {item?.totalPrice}</p>


                                </div>
                            ))}
                 
                    </div>


                </div>

                <div className=" text-xs border-t border-black border-dashed">
                    <div className="grid grid-cols-2  text-left py-1">
                        <span>Subtotal</span>
                        <span className="text-right">৳ {order?.subTotalPrice}</span>
                    </div>


                    <div className="grid grid-cols-2  text-left py-1">
                        <span>Discounts</span>
                        <span className="text-right">(-) ৳ {order?.discountedPrice}</span>
                    </div>
                    <div className="grid grid-cols-2  text-left py-1 font-semibold">
                        <span>Total</span>
                        <span className="text-right"> ৳ {order?.finalPrice}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderOffsiteModal;