import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import useAuthProvider from "../../../Hooks/useAuthProvider";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const FormModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, formState: { errors }, setValue, getValues, resetField, control } = useForm({
        defaultValues: {

        },
    });

    const { user } = useAuthProvider();
    const location = useLocation()
    if (!user?.email) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    return (
        <div>
            <form>
                <div className="w-full p-3">
                    <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">User Name</p>
                    <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="John Doe"
                        {...register("user_name", {
                            required: "*User Name is Required",
                        })} />
                    {errors.user_name?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.user_name?.message}</p>)}
                </div>
                <div className="w-full p-3">
                    <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Phone</p>
                    <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="1000"
                        {...register("expense", {
                            required: "*Expense amount is Required",
                            validate: {
                                isNumber: (value) => !isNaN(value)
                            },
                        })} />
                    {errors.expense?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.expense?.message}</p>)}
                    {errors.expense?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}
                </div>
            </form> 
        </div>
    );
};

export default FormModal;