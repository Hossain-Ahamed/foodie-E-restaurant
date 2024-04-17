import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import ComponentStories from "../../../pages/Stories/Stories";

export default function ViewStoryModal({ image, imgList }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <img
                className='object-cover w-20 h-20 rounded-full ring-2 ring-blue-500 group-hover:scale-110 transition cursor-pointer mt-5 mb-5'
                src={image}
                alt='story-img'
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-screen h-screen bg-slate-300">
                    {(onClose) => (
                        <>
                            <ModalBody className="p-0 m-0 relative">
                                {/* <img
                                    className='object-cover w-full'
                                    src={image}
                                    alt='story-img'
                                /> */}
                                <ComponentStories imgList={imgList} onOpenChange={onOpenChange} />
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
