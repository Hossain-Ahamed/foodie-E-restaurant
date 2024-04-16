import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import OrderOnsiteModal from '../OrderOnsiteModal/OrderOnsiteModal';

const FoodCard = ({ order }) => {

    const { Items, _id, token, subTotalPrice } = order;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div className=' bg-black opacity-80 border shadow-md shadow-[#cae1dd] rounded-lg p-6 my-10 cursor-pointer md:w-72 xl:w-96'>
                <div onClick={onOpen}>
                    <p className='text-white'><span className='font-bold text-white'>OrderID: </span>#{_id.slice(-8)}</p>
                    {token?.length !== 0 && <p className='text-white'><span className='font-bold text-white'>Token Number:</span> {token}</p>}
                    <p className='text-white'><span className='font-bold text-white'>Total Price:</span> ৳ {subTotalPrice?.toFixed(1)}</p>
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
