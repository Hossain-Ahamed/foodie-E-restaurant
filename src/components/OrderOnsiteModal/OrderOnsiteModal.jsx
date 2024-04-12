import React from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const OrderOnsiteModal = ({order, item}) => {
    const {subTotalPrice, finalPrice, discountedPrice} = order;
    const {quantity, title, addOn, options, totalPrice } = item;
    return (
        <div>
            
             <div className="text-xs">
                <div className="grid grid-cols-5 border-black border-b border-dashed">
                    
                    <span className='col-span-2'>Item</span>
                    <span className="text-right">Qty</span>
                    <span className="text-right">Options</span>
                    <span className="text-right">Total</span>
                </div>
                <div className="">
                {item?.map(item => (
                    <div key={item?._id} className='grid grid-cols-5 py-1'>
                                                    <div className='flex col-span-2 justify-center items-center'>
                            <img className='w-20 object-cover' src={item?.img} alt="" />    
                             <div className='grid'>
                             <p className=' font-bold'>{item?.title}</p>
                        <p className='text-[#F69449]'>{item?.dishStatus}</p>
                             </div>
                            </div>
                        <p className="text-right">{item?.quantity}</p>


                                <p className='text-right'>{item?.options}</p>
                            
                            <p className='text-gray-900 text-right'>৳ {item?.totalPrice}</p>
                        
                        
                    </div>   
                ))}
                {/* <span>{quantity}x</span>
                    <span className='col-span-2'>{title} <br/> {addOn && Array.isArray(addOn) && addOn.length >0 && <>+{addOn.join(", ")}</>} </span>
                    <span className="text-right"> {options && <>{options}</> || "Standard"}</span>
                    <span className="text-right">৳ {totalPrice}</span> */}
                    </div>

                
            </div>

            <div className=" text-xs border-t border-black border-dashed">
            <div className="grid grid-cols-2  text-left py-1">
              <span>Subtotal</span>
              <span className="text-right">৳ {subTotalPrice}</span>
            </div>
            
           
            <div className="grid grid-cols-2  text-left py-1">
              <span>Discounts</span>
              <span className="text-right">(-) ৳ {discountedPrice}</span>
            </div>
            <div className="grid grid-cols-2  text-left py-1 font-semibold">
              <span>Total</span>
              <span className="text-right"> ৳ {finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
    );
};

export default OrderOnsiteModal;