import React from 'react';
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import { TbCurrencyTaka } from "react-icons/tb";

import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCart';
import useProfile from '../../../Hooks/useProfile';
import { toast } from 'react-hot-toast';
import { SwalErrorShow } from '../../../assets/scripts/Utility';
import Swal from 'sweetalert2';
import CartItemEdit_Form from './CartItemEditForm';

const CartItem = ({ dishData }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { CartRefetch } = useCart();
    const { profile, profileLoading, profileError } = useProfile();



    const axiosSecure = useAxiosSecure();


    const deleteItemFromCart = () => {
        Swal.fire({
            // title: "Are you sure?",
            text: "You want to remove from your cart?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/delete-cart-item/${profile?.email}/cart-id/${dishData?._id}`)
                    .then(res => {
                        toast.success('Deleted');
                        CartRefetch();
                    })
                    .catch(e => {
                        console.error(e);
                        SwalErrorShow(e);
                    })

            }
        });

    }



    return (
        <>
            <div className="relative w-full flex items-center bg-white border border-gray-400 rounded-lg shadow flex-row hover:bg-gray-100 cursor-pointer">
                <img className="object-cover w-32 md:w-48 h-24 md:h-32 p-3 rounded-xl" src={dishData?.img} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal" style={{ all: 'unset' }}>
                    <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">{dishData?.title}</h5>
                    <div className="mb-3 inline-flex items-center">

                        <div >
                            <div className='mb-4 flex justify-start'>
                                <p className="text-left text-blue-300 pr-2">Quantity :</p>
                                <p className="text-right pl-2 flex items-center font-semibold text-blue-500">{dishData?.quantity}</p>
                            </div>

                            {
                                dishData?.options && <> <p className='text-wrap font-medium text-gray-500'>Options :  <span className='pl-2 font-base text-gray-600'>{dishData?.options}</span> </p></>
                            }
                            {
                                dishData?.addOn && Array.isArray(dishData?.addOn) && dishData?.addOn.length > 0 && <> <p className='text-wrap font-medium text-gray-500'>Add-Ons :  <span className='pl-2 font-base text-gray-600'>{dishData.addOn.join(', ')}</span> </p></>
                            }


                        </div>


                    </div>
                </div>
                <div className='absolute right-3 bottom-5'>
                    <Button isIconOnly color="danger" variant="light" aria-label="See Detail" onPress={deleteItemFromCart} isLoading={profileLoading} isDisabled={profileError}>
                        <MinusIcon />
                    </Button>

                </div>
                <div className='absolute right-3 top-3'>
                    <Button isIconOnly color="primary" variant="light" aria-label="See Detail" onPress={onOpen} isLoading={profileLoading} isDisabled={profileError}>
                        Edit
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
                                <CartItemEdit_Form cartInfo={dishData} onOpenChange={onClose} profile={profile} cartrefetch={CartRefetch} />
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    );
};

export default CartItem;


export const MinusIcon = ({
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
            <circle cx="25" cy="25" r="25" fill="#FF0000" />

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

