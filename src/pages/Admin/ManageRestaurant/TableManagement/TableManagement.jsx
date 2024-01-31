// TableManagement.js
import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQuery, useMutation } from 'react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import ErrorPage from '../../../Shared/ErrorPage/ErrorPage';
import LoadingPage from '../../../Shared/LoadingPages/LoadingPage/LoadingPage';
import QRCode from 'qrcode.react';
import { Tooltip } from 'react-tooltip'
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import toast from 'react-hot-toast'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { IoAddOutline } from "react-icons/io5";
const TableManagement = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { handleSubmit, control, setValue, register, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { res_id, branchID, res_name } = useRestauarantAndBranch();

    // Fetch existing table data
    const { data: existingTableData = [], isLoading: existingTableLoading, error: existingTableError, refetch: tableRefetch } = useQuery(
        ['tabledata', res_id, branchID],
        {
            enabled: true,
            cacheTime: 0,
            queryFn: async () => {
                // const res = await axiosSecure.get(`/restaurant/${res_id}/branch/${branchID}/tables`);
                return [
                    { number: "1", capacity: "4", location: 'Window', qrCodeData: 'https://www.foodie.com/restaurant/743ndsa8t43/branch/3485jdsfu?table=1' },
                    { number: "2", capacity: "6", location: 'Center', qrCodeData: 'https://www.foodie.com/restaurant/743ndsa8t43/branch/3485jdsfu?table=2' },
                    // Add more tables as needed
                ];
            },
        }
    );

    // Mutation for adding a new table
    const addTableMutation = useMutation(
        async (newTableData) => {
            const res = await axiosSecure.post(`/restaurant/${res_id}/branch/${branchID}/tables`, newTableData);
            return res?.data;
        },
        {
            onSuccess: () => {
                // Refetch existing table data after a new table is added
                tableRefetch();
                // Show success message using SweetAlert
                Swal.fire('Success', 'Table added successfully!', 'success');
            },
            onError: () => {
                // Show error message using SweetAlert
                Swal.fire('Error', 'An error occurred. Please try again.', 'error');
            },
        }
    );

    // Mutation for updating existing table data
    const updateTableMutation = useMutation(
        async (updatedTableData) => {
            const res = await axiosSecure.put(`/restaurant/${res_id}/branch/${branchID}/tables`, updatedTableData);
            return res?.data;
        },
        {
            onSuccess: () => {
                // Show success message using SweetAlert
                Swal.fire('Success', 'Table data updated successfully!', 'success');
            },
            onError: () => {
                // Show error message using SweetAlert
                Swal.fire('Error', 'An error occurred. Please try again.', 'error');
            },
        }
    );

    // Mutation for deleting a table
    const deleteTableMutation = useMutation(
        async (tableNo) => {
            const res = await axiosSecure.delete(`/restaurant/${res_id}/branch/${branchID}/tables/${tableNo}`);
            return res?.data;
        },
        {
            onSuccess: () => {
                // Refetch existing table data after a table is deleted
                tableRefetch();
                // Show success message using SweetAlert
                Swal.fire('Success', 'Table deleted successfully!', 'success');
            },
            onError: () => {
                // Show error message using SweetAlert
                Swal.fire('Error', 'An error occurred. Please try again.', 'error');
            },
        }
    );



    // download QR code
    const downloadQRCode = (id, number) => {
        const qrCodeDataURL = document.getElementById(id).toDataURL("image/png");

        const canvas = document.createElement('canvas');
        const canvasWidth = 3 * 96; // 4 inches width at 96 DPI
        const canvasHeight = 4 * 96; // 3 inches height at 96 DPI
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext('2d');

        // Set white background
        ctx.fillStyle = '#ffffff'; // White background
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Add padding and calculate QR code size
        const padding = 20;
        const qrCodeSize = 2 * 96; // 2 inches by 2 inches at 96 DPI

        // Draw QR code at the center with padding
        const qrCodeX = (canvasWidth - qrCodeSize) / 2;
        const qrCodeY = (canvasHeight - qrCodeSize) / 2 - padding / 2;
        ctx.drawImage(document.getElementById(id), qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

        // Customize the appearance (res_id at the bottom)
        const resIdText = res_name + " | Table : " + number; // Replace with the actual res_id
        const resIdFontSize = 12;
        const resIdY = canvasHeight - padding - 20; // Adjust the Y position for more space
        ctx.fillStyle = '#666'; // Lighter dark text color
        ctx.font = `${resIdFontSize}px Arial`; // Font size and family
        ctx.textAlign = 'center'; // Center align the text
        ctx.fillText(resIdText, canvasWidth / 2, resIdY);

        // Customize the appearance (Powered by line at the bottom center)
        const poweredByText = 'Powered by: Foodie';
        const poweredByFontSize = 12;
        const poweredByY = canvasHeight - padding; // Adjust the Y position for more space
        ctx.fillStyle = '#666'; // Lighter dark text color
        ctx.font = `${poweredByFontSize}px Arial`; // Font size and family
        ctx.textAlign = 'center'; // Center align the text
        ctx.fillText(poweredByText, canvasWidth / 2, poweredByY);

        // Convert the customized canvas to data URL
        const customQRCodeDataURL = canvas.toDataURL('image/png');

        let aEl = document.createElement("a");
        aEl.href = customQRCodeDataURL;
        aEl.download = `table-${number}-qr-code.png`;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    };




    // Function to handle table deletion
    const onDeleteTable = async (tableNo) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmDelete.isConfirmed) {
            await deleteTableMutation.mutateAsync(tableNo);
        }
    };

    // Function to handle form submission
    const onSubmit = async (formData) => {

        const existingTableIndex = existingTableData.findIndex((table) => table?.number.toString() === formData?.number);


        if (existingTableIndex !== -1) {
            // Table with the same ID exists, update its data
            // const updatedData = [...existingTableData];
            // updatedData[existingTableIndex] = formData;
            // await updateTableMutation.mutateAsync(updatedData);

            Swal.fire({
                icon: 'error',
                text: 'Table number exists'
            })
            reset();
            return;

        } else {
            // Table with the given ID doesn't exist, add a new table
            await addTableMutation.mutateAsync([...existingTableData, formData]);
            reset();
            onOpenChange(); //close the modal after upload
            toast.success('saved successfully')
        }

    };


    if (existingTableError) {
        return <ErrorPage />;
    }

    if (existingTableLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="container mx-auto mt-8">
            <SetTitle title="Table" />
            <SectionTitle h1={"Manage Tables"} />

            {/* table add  */}
            <>
                <div className='w-full flex justify-end pr-6'>

                    <Button color='success' variant='solid' onPress={onOpen} endContent={<IoAddOutline className='text-white' />}><span className='text-white'>Add Table</span></Button>
                </div>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}
                    radius="lg"
                    classNames={{
                        body: "py-6 bg-slate-100", // Change to light gray background
                        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                        base: "border-[#292f46] bg-white text-[#19172c] ",
                        header: "border-b-[1px] border-slate-200 bg-slate-100", // Change to light gray background
                        footer: "border-t-[1px] border-[#292f46] bg-gray-200", // Change to light gray background
                        closeButton: "bg-red-50 hover:bg-red-100 text-red-300 active:bg-red-100 rounded-md",
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Table Data Form</ModalHeader>
                                <ModalBody>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="w-full  p-3">
                                            <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Table No</p>
                                            <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="number" placeholder="2"
                                                {...register("number", {
                                                    required: "*number  is Required",
                                                    validate: {
                                                        isNumber: (value) => !isNaN(value)
                                                    },
                                                })} />
                                            {errors.number?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.number?.message}</p>)}
                                            {errors.number?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}
                                        </div>

                                        {/* capacity  */}
                                        <div className="w-full  p-3">
                                            <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Table Capacity</p>
                                            <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="number" placeholder="8"
                                                {...register("capacity", {
                                                    required: "*capacity  is Required",
                                                    validate: {
                                                        isNumber: (value) => !isNaN(value)
                                                    },
                                                })} />
                                            {errors.capacity?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.capacity?.message}</p>)}
                                            {errors.capacity?.type === "isNumber" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">*is not a number</p>)}
                                        </div>


                                        <div className="flex flex-wrap pb-3">
                                            <div className="w-full  p-3">
                                                <p className="mb-1.5 font-medium text-base text-gray-800" data-config-id="auto-txt-3-3">Table location</p>
                                                <input className="w-full px-4 py-2.5 text-base text-gray-900 font-normal outline-none focus:border-green-500 border border-gray-300 rounded-lg shadow-input" type="text" placeholder="Front, row-2 col-1"
                                                    {...register("location", {
                                                        required: "*location  is Required",
                                                    })} />
                                                {errors.location?.type === "required" && (<p className='m-0 p-0 pl-1  text-base text-red-500 text-[9px]' role="alert">{errors?.location?.message}</p>)}

                                            </div>
                                        </div>

                                        <Button color="success" type='submit'>
                                            <span className='text-white'>Save</span>
                                        </Button>

                                    </form>
                                </ModalBody>




                            </>
                        )}
                    </ModalContent>
                </Modal>

            </>




            {/* Display existing table data */}
            <div className="mt-8">

                <div className='flex flex-wrap gap-3'>
                    {existingTableData.map((table, _idx) => (
                        <div key={_idx} className="relative max-w-80 flex flex-col items-center rounded-lg p-4 border-slate-950 shadow-sm shadow-indigo-300">
                            <QRCode value={table?.qrCodeData} id={table?.qrCodeData + _idx + table?.number} className="h-56 w-full rounded-md object-cover" />

                            <div className="mt-2">

                                <p
                                    className='w-full overflow-hidden whitespace-preWrap select-none cursor-pointer text-xs text-center '

                                    data-tooltip-id={_idx + table?.qrCodeData}
                                    data-tooltip-content={table?.qrCodeData}
                                >
                                    {table?.qrCodeData.slice(0, 40)}
                                </p>
                                {
                                    table?.qrCodeData.length > 40 && <Tooltip id={_idx + table?.qrCodeData} />
                                }


                                <div className="mt-6 flex items-center gap-8 text-xs">
                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                        <svg className='w-4 h-4 text-gray-900' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.40524 15.5264L8.93524 20.0564C10.7952 21.9164 13.8152 21.9164 15.6852 20.0564L20.0752 15.6664C21.9352 13.8064 21.9352 10.7864 20.0752 8.91637L15.5352 4.39637C14.5852 3.44637 13.2752 2.93637 11.9352 3.00637L6.93524 3.24637C4.93524 3.33637 3.34524 4.92637 3.24524 6.91637L3.00524 11.9164C2.94524 13.2664 3.45524 14.5764 4.40524 15.5264Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.73535 12.2264C11.1161 12.2264 12.2354 11.1071 12.2354 9.72638C12.2354 8.34567 11.1161 7.22638 9.73535 7.22638C8.35464 7.22638 7.23535 8.34567 7.23535 9.72638C7.23535 11.1071 8.35464 12.2264 9.73535 12.2264Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M13.2354 17.2264L17.2354 13.2264" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>


                                        <div className="mt-1.5 sm:mt-0">
                                            <p className="text-gray-500">Table No</p>

                                            <p className="font-medium">{table?.number}</p>
                                        </div>
                                    </div>

                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                        <svg className='w-4 h-4 text-gray-900' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.9702 22C17.4931 22 21.9702 17.5228 21.9702 12C21.9702 6.47715 17.4931 2 11.9702 2C6.44737 2 1.97021 6.47715 1.97021 12C1.97021 17.5228 6.44737 22 11.9702 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.20996 16C8.25996 17.51 10.02 18.5 12 18.5C13.98 18.5 15.73 17.51 16.79 16" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>


                                        <div className="mt-1.5 sm:mt-0">
                                            <p className="text-gray-500">Location</p>

                                            <p className="font-medium">{table?.location}</p>
                                        </div>
                                    </div>

                                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                        <svg className='w-4 h-4 text-gray-900' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>


                                        <div className="mt-1.5 sm:mt-0">
                                            <p className="text-gray-500">Capacity</p>

                                            <p className="font-medium">{table?.capacity}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className=' absolute top-0 right-5 flex flex-col gap-5 border-t pt-4'>


                                    <div className="inline-flex self-center items-center">
                                        <button
                                            data-tooltip-id='download-button' data-tooltip-content="Download"
                                            onClick={() => downloadQRCode(table?.qrCodeData + _idx + table?.number, table?.number)}
                                            className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none  focus:ring-gray-50 " type="button">
                                            <svg className="w-4 h-4 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                            </svg>
                                        </button>
                                        <Tooltip id='download-button' />
                                    </div>
                                    <div className="inline-flex self-center items-center">
                                        <button
                                            data-tooltip-id='delete-button' data-tooltip-content="Delete"
                                            onClick={() => onDeleteTable(table?.number)}
                                            className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-red-50 rounded-lg hover:bg-red-100 focus:ring-4 focus:outline-none  focus:ring-red-50 " type="button">
                                            <svg className="w-4 h-4 text-red-500 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.2099 21.9999H8.7899C5.9999 21.9999 5.9099 20.7799 5.7999 19.2099L5.1499 9.13989" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M18.8502 9.13989L18.2002 19.2099" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10.3301 16.5H13.6601" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12.8198 12.5H14.4998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M9.5 12.5H10.33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </button>
                                        <Tooltip id='delete-button' />
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default TableManagement;
