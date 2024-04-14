import React from 'react';

const Field = ({ label, id, type, placeholder, required, autoComplete, value, onChange, }) => {
    return (
        <>


            <div className="mb-2 ">
                <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}/>
            </div>
        </>
    );
};

export default Field;