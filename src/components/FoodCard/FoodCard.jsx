import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import OrderOnsiteModal from '../OrderOnsiteModal/OrderOnsiteModal';

const FoodCard = ({ order }) => {

    const { Items, _id, token, subTotalPrice } = order;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div className='border shadow-md shadow-[#cae1dd] rounded-lg p-6 my-10 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-lg'>
                <div onClick={onOpen}>
                    <p className='text-gray-700'><span className='font-bold text-black'>ID:</span> {_id}</p>
                    <p className='text-gray-700'><span className='font-bold text-black'>Token Number:</span> {token}</p>
                    <p className='text-gray-700'><span className='font-bold text-black'>Total Price:</span> ৳ {subTotalPrice}</p>
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
