import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import useAuthProvider from "../../../Hooks/useAuthProvider";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import FormModal from "../../Modal/FormModal/FormModal";
export default function TableReservationModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // const { register, handleSubmit, formState: { errors }, setValue, getValues, resetField, control } = useForm({
    //     defaultValues: {

    //     },
    // });

    // const { user } = useAuthProvider();
    // const location = useLocation()
    // if(!user?.email){
    //     toast.error("Please Login")
    //     return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    // }
    return (
        <>
            <Button variant="bordered" color="primary" onPress={onOpen} className="flex items-center gap-1">Reserve Table</Button>
            <Modal placement="auto" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className='h-fit max-h-[85vh] overflow-scroll pt-0 mx-0 px-0 scrollbar-hide'>
                                <FormModal onOpenChange={onOpenChange}/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
