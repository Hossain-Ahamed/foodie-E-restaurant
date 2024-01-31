import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import swal from 'sweetalert2';
import { getDivisions, getDistricts, getUpazillas, getPostcode, isValidAddress, getPostOffices } from '../../../assets/scripts/Utility';

const Test = () => {
    const { control, handleSubmit, setValue, watch, reset, register } = useForm();

    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [postOffices, setPostOffices] = useState([]);
    const [selectedPostcode, setSelectedPostcode] = useState('');

    useEffect(() => {
        // Fetch divisions initially
        setDivisions(getDivisions());
    }, []);

    const onSubmit = (data) => {
      
        const address = getTheValidFullAddress(data.division, data.district, data.upazilla,data.postOffice, data.postcode);

        // Perform additional validation if needed
        if (!address) {
            // Reset the form
            reset();

            // Fetch initial divisions data again
            setDivisions(getDivisions());
            setValue('division', '');

            // Reset districts, upazillas, postOffices, and selectedPostcode
            setDistricts([]);
            setUpazillas([]);
            setPostOffices([]);
            setSelectedPostcode('');

            // Display warning
            showMismatchWarning();
            return;
        }

        // Proceed with the form submission logic
        console.log(address);
    };

    const getTheValidFullAddress = (divisionId, districtId, upazillaId,postOfficeID,PostCode) => {
        // Add your validation logic here
        // For example, check if the IDs are valid and exist
        // Return true if the data is valid, false otherwise

        return isValidAddress(divisionId, districtId, upazillaId,postOfficeID,PostCode);
    };

    const showMismatchWarning = () => {
        swal.fire({
            icon: 'warning',
            title: 'Data Mismatch',
            text: 'Please re-enter the data as there is a mismatch.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
        });
    };

    const handleDivisionChange = (e) => {
        setSelectedPostcode('');
        const selectedDivisionId = e.target.value;
        setValue('district', ''); // Reset district when division changes
        setValue('upazilla', ''); // Reset upazilla when division changes
        setValue('postOffice', ''); // Reset postoffice when division changes
        setValue('postcode', ''); // Reset postcode when post office changes
        setDistricts(getDistricts(selectedDivisionId));
    };

    const handleDistrictChange = (e) => {
        setSelectedPostcode('');
        const selectedDistrictId = e.target.value;
        setValue('upazilla', ''); // Reset upazilla when district changes
        setValue('postOffice', ''); // Reset postoffice when division changes
        setValue('postcode', ''); // Reset postcode when post office changes
        setUpazillas(getUpazillas(selectedDistrictId));
        setPostOffices(getPostOffices(selectedDistrictId));

    };


    const handleUpazillaChange = (e) => {
        setSelectedPostcode('');
        const selectedUpazillaID = e.target.value;

        setValue('postOffice', ''); // Reset postoffice when division changes
        setValue('postcode', ''); // Reset postcode when post office changes
    };

    const handlePostOfficeChange = (e) => {
        const selectedPostOffice = e.target.value;
        setValue('postcode', ''); // Reset postcode when post office changes

        setSelectedPostcode(getPostcode(selectedPostOffice));

        // Set the postcode value
        setValue('postcode', getPostcode(selectedPostOffice));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="division" className="block text-sm font-medium text-gray-600">
                    Division
                </label>
                <Controller
                    name="division"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            onChange={(e) => {
                                handleDivisionChange(e);
                                field.onChange(e);
                            }}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>Select Division</option>
                            {divisions.map((division) => (
                                <option key={division.id} value={division.id}>
                                    {division.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="district" className="block text-sm font-medium text-gray-600">
                    District
                </label>
                <Controller
                    name="district"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            disabled={!watch('division')} // Disable district select when no division is selected
                            onChange={(e) => {
                                handleDistrictChange(e);
                                field.onChange(e);
                            }}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>Select District</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="upazilla" className="block text-sm font-medium text-gray-600">
                    Upazilla
                </label>
                <Controller
                    name="upazilla"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            disabled={!watch('district')} // Disable upazilla select when no district is selected
                            onChange={(e) => {
                                handleUpazillaChange(e);
                                field.onChange(e);
                            }}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>Select Upazilla</option>
                            {upazillas.map((upazilla) => (
                                <option key={upazilla.id} value={upazilla.id}>
                                    {upazilla.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="postOffice" className="block text-sm font-medium text-gray-600">
                    Post Office
                </label>
                <Controller
                    name="postOffice"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            disabled={!watch('upazilla')} // Disable post office select when no upazilla is selected
                            onChange={(e) => {
                                handlePostOfficeChange(e);
                                field.onChange(e);
                            }}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>Select Post Office</option>
                            {postOffices.map((office) => (
                                <option key={office.postCode} value={office.id}>
                                    {office.postOffice}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-600">
                    Postcode
                </label>
                <input
                    {...register('postcode')}
                    value={selectedPostcode}
                    readOnly
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                Submit
            </button>
        </form>
    );
};

export default Test;
