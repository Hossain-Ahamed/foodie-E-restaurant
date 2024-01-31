import React from "react";
// import { Pagination } from "@nextui-org/react";

export default function CategoryPagination({size, currentPage, setCurrentPage}) {
    const handlePrevPage = () => {
        if(currentPage < 0){
            setCurrentPage(size.length - 1)
        } else if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if(currentPage !== size.length - 1){
            setCurrentPage(currentPage + 1)
        }
    }
    return (
       <div>
            <ol className="flex justify-center gap-1 text-xs font-medium">
                <li>
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        onClick={handlePrevPage}
                    >
                        <span className="sr-only">Prev Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>
                {
                    size.map(number => <li key={number}>
                        <button
                            className={`block h-8 w-8 rounded border border-gray-100 text-center
                             leading-8 text-gray-900 ${currentPage === number ? 'border-blue-600 bg-blue-600 text-white' : 'bg-white' }`}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number + 1}
                        </button>
                    </li>)
                }
                <li>
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        onClick={handleNextPage}
                    >
                        <span className="sr-only">Next Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>
                {/* <li>
                    <a
                        href="#"
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                        <span className="sr-only">Prev Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                    >
                        1
                    </a>
                </li>

                <li className="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
                    2
                </li>

                <li>
                    <a
                        href="#"
                        className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                    >
                        3
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                    >
                        4
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                    >
                        <span className="sr-only">Next Page</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </li> */}
            </ol>
       </div>
    );
}
