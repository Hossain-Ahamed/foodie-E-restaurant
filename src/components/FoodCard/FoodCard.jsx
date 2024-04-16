import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import OrderOnsiteModal from '../OrderOnsiteModal/OrderOnsiteModal';

const FoodCard = ({ order }) => {

    const { Items, _id, token, subTotalPrice, res_img, res_name } = order;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div className=' bg-black opacity-80 border shadow-md shadow-[#cae1dd] rounded-lg my-10 cursor-pointer w-96'>
                <div onClick={onOpen} className='flex'>
                    {
                        res_img ? <><img className='rounded-l-lg object-cover w-2/5' src={res_img} alt="" /></> : <></>
                    }
                    <div className='px-2 md:px-6 py-3'>
                        <p className='text-white text-sm md:text-xl pb-1'>{res_name}</p>
                    <p className='text-white text-xs md:text-base '><span className='md:font-bold text-white'>OrderID: </span>#{_id.slice(-8)}</p>
                    {token?.length !== 0 && <p className='text-white text-xs md:text-base'><span className='md:font-bold text-white'>Token Number:</span> {token}</p>}
                    <p className='text-white text-xs md:text-base'><span className='md:font-bold text-white'>Total Price:</span> ৳ {subTotalPrice?.toFixed(1)}</p>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                    <ModalBody>
                        <OrderOnsiteModal order={order} item={Items} />
                    </ModalBody>
                </ModalContent>
            </Modal>

            
        </>
    );
};

export default FoodCard;
