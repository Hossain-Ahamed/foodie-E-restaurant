import React from 'react';
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import { TbCurrencyTaka } from "react-icons/tb";
import DishForm from './DishForm';
const DishCard = ({ dishData }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // console.log(dishData)
    return (
        <>
            <div className="relative w-full flex items-center bg-white border border-gray-400 rounded-lg shadow flex-row hover:bg-gray-100 cursor-pointer">
                <img className="object-cover w-32 md:w-48 h-24 md:h-32 p-3 rounded-xl" src={dishData?.img} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal" style={{ all: 'unset' }}>
                    <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">{dishData?.title}</h5>
                    <div className="mb-3 inline-flex items-center">

                        <div className='flex items-center'>

                            <TbCurrencyTaka className='text-base md:text-xl ' />
                            <p className='text-base md:text-xl '>

                                {dishData.offerPrice}
                            </p>
                        </div>
                        {
                            dishData?.price !== dishData?.offerPrice &&
                            <div className='flex items-center'>
                          
                            <p className='text-base md:text-xl pl-2'>
                                <span className="line-through text-gray-500">{dishData.price}</span>
                            </p>
                        </div>

                        }
                       
                    </div>
                </div>
                <div className='absolute right-5 bottom-5'>
                    <Button isIconOnly color="success" variant="light" aria-label="See Detail" onPress={onOpen}>
                        <PlusIcon />
                    </Button>

                </div>
            </div>
            <Modal
                isOpen={isOpen}
                placement="auto"
                onOpenChange={onOpenChange}

            >
                <ModalContent>
                    {(onClose) => (
                        <>

                            <ModalBody className='h-fit max-h-[85vh]  overflow-scroll pt-0 mx-0 px-0 scrollbar-hide'>
                            <DishForm dish={dishData} onClose={onClose}/>
                            </ModalBody>
                         
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    );
};

export default DishCard;


export const PlusIcon = ({
    fill = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
}) => {
    return (
        <svg
            width={size || width || 28}
            height={size || height || 28}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="25" cy="25" r="25" fill="#43B05C" />
            <line
                x1="25"
                y1="13"
                x2="25"
                y2="38"
                stroke="#FFFFFF"
                strokeWidth="3.15"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <line
                x1="37.5"
                y1="25"
                x2="12.5"
                y2="25"
                stroke="#FFFFFF"
                strokeWidth="3.15"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

