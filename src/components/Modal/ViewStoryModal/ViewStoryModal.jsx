import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ViewStoryModal({ image }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <img
                className='object-cover h-72 w-full group-hover:scale-110 transition cursor-pointer'
                src={image}
                alt='story-img'
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-0 m-0">
                                <img
                                    className='object-cover w-full'
                                    src={image}
                                    alt='story-img'
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
