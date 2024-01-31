import React from 'react';


function Paginator({ currentPage, totalPages, setCurrentPage }) {
    const displayRange = 4; // Number of pages to display on each side of the current page

    const onPageChange = (i) => {

        setCurrentPage(i);


    }


    const renderPageNumbers = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - displayRange && i <= currentPage + displayRange)
            ) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`${i === currentPage
                            ? 'bg-blue-500 dark:bg-blue-700 text-white'
                            : 'bg-gray-200 text-gray-700'
                            } px-3 py-1 mx-1 rounded-full focus:outline-none`}
                    >
                        {i}
                    </button>
                );
            } else if (
                i === currentPage - displayRange - 1 ||
                i === currentPage + displayRange + 1
            ) {
                pages.push(
                    <span key={i} className="mx-1 text-gray-700">
                        ...
                    </span>
                );
            }
        }

        return pages;
    };

    return (
        <div className="flex justify-center mt-10 pb-40 user-select-none cursor-pointer ">
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="bg-blue-500 dark:bg-blue-700 text-white px-3 py-1 mx-1 rounded-full focus:outline-none"
                >
                    Previous
                </button>
            )}

            {renderPageNumbers()}

            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="bg-blue-500 dark:bg-blue-700 text-white px-3 py-1 mx-1 rounded-full focus:outline-none"
                >
                    Next
                </button>
            )}


        </div>
    );
}

export default Paginator;