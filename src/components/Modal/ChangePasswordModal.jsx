import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa6";
import toast from "react-hot-toast";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon'
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { MailIcon } from "./MailIcon";
// import { LockIcon } from "./LockIcon";
// import ToasterProvider from "../Toastprovider/ToastProvider";
export default function ChangePasswordModal({ userEmail }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isVisible, setIsVisible] = useState(false);
    const axiosSecure = useAxiosSecure()
    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = (data) => {
        verifyEmailPassword(data, data.email, data.password, data.confirmPass)
    }

    const verifyEmailPassword = (data, email, password, confirmPass) => {
        if (userEmail === email) {
            if (password === confirmPass) {
                axiosSecure.post(`/change-passwords`, data)
                    .then(data => {
                        toast.success('Password Change successfully')
                        onOpenChange();
                    })
                    .catch(err => {
                        console.log(err)
                        toast.error(err?.response?.data?.message)
                        onOpenChange();
                    })
            } else {
                toast.error("Password didn't matched, Try again.")
            }
        } else {
            toast.error("Email didn't matched.")
        }
    }
    return (
        <>
            <Button onPress={onOpen}>Change Password</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col md:flex-row items-center gap-1">Change Password <FaKey /></ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Input
                                        autoFocus
                                        // endContent={
                                        //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        // }
                                        label="Email"
                                        placeholder="Enter your email"
                                        variant="bordered"
                                        {...register("email", {
                                            required: "*Email is Required",
                                        })}
                                    />
                                    {errors.email?.type === "required" && (<p className='m-0 p-0 text-base text-red-500 text-[9px]' role="alert">{errors.email.message}</p>)}
                                    <Input
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                        label="Password"
                                        placeholder="Enter your password"
                                        variant="bordered"
                                        {...register("password", {
                                            required: "*Password is Required",
                                        })}
                                        className="mt-4"
                                    />
                                    {errors.password?.type === "required" && (<p className='m-0 p-0 text-base text-red-500 text-[9px]' role="alert">{errors.password.message}</p>)}
                                    <Input
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                        label="Confirm Password"
                                        placeholder="Confirm your password"
                                        variant="bordered"
                                        {...register("confirmPass", {
                                            required: "*Confirm Password is Required",
                                        })}
                                        className="mt-4"
                                    />
                                    {errors.confirmPass?.type === "required" && (<p className='m-0 p-0 text-base text-red-500 text-[9px]' role="alert">{errors.confirmPass.message}</p>)}
                                    <ModalFooter>
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button type="submit" color="primary">
                                            Confirm
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
