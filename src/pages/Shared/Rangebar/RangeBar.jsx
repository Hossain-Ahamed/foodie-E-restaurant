import React from 'react';
import toast from 'react-hot-toast';


const RangeBar = (
    {
        numberOfSizeInTableData,
        setNumberOfSizeInTable,
        setCurrentPage,
        placeholder,
        pageTitle,
        searchValue,
        setPageSearchValue
    }
) => {


    const numberOfSizeInTableDataArray = ["5","15", "30", "50", "100", "500"];


    const handletypeOfSizeChange = (e) => {
        if (numberOfSizeInTableDataArray.includes(e.target.value)) {
            setCurrentPage(1);
            setNumberOfSizeInTable(parseInt(e.target.value));
        } else {
            setCurrentPage(1);
            setNumberOfSizeInTable(30);
        }
    }






    const handleSearchValueChange = e => {
        setCurrentPage(1);
        setPageSearchValue(e.target.value);
    }

    return (
        <>

            <div className='px-4 flex justify-between flex-wrap items-center mb-2 border-b '>

                <p aria-label='title' className='text-3xl font-extrabold text-gray-700 dark:text-gray-100 '>{pageTitle}</p>
                <div className="w-full  max-w-[400px] my-3 flex  justify-start md:justify-end ">
                    <form className="w-full  max-w-md relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"  >
                                <path d="M9.8055 17.296C13.9424 17.296 17.296 13.9424 17.296 9.80549C17.296 5.66862 13.9424 2.31503 9.8055 2.31503C5.66863 2.31503 2.31503 5.66862 2.31503 9.80549C2.31503 13.9424 5.66863 17.296 9.8055 17.296Z" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.0153 15.4043L17.9519 18.3333" stroke="#A9A9A9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input
                            type="text"
                            id="search"
                            value={searchValue}
                            onChange={handleSearchValueChange}
                            autoComplete="off"
                            name="name"
                            className="input-field block w-full h-10 p-2 pl-10 text-base rounded-xl bg-gray-100 dark:bg-slate-600 dark:border"
                            placeholder={placeholder}
                        />
                    </form>
                </div>
            </div>
            <div className='flex justify-between flex-wrap mt-4 mb-1 user-select-none'>

                <div className='flex items-center gap-3 mb-5 md:mb-1' aria-label='dropdown'>


                    {/* number of size in table  */}
                    <div aria-label='number of size in tabel dropdwnn'>
                        <select
                            name="numberOfSizeInTableData"
                            value={numberOfSizeInTableData.toString()}
                            onChange={handletypeOfSizeChange}
                            id="numberOfSizeInTableData" className=" border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2 cursor-pointer bg-white dark:bg-slate-600 dark:border dark:text-white">
                            <option value="5">5</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                        </select>

                    </div>

                   
                    
                </div>
                



            </div >
        </>
    );
};

export default RangeBar;