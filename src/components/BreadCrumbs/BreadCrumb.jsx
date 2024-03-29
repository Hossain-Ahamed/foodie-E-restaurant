import React, { useEffect, useState } from 'react';

const BreadCrumb = ({ data ,className = "", id=""}) => {

    const [array,setArray] = useState([]);

    useEffect(()=>{
        if (data && Array.isArray(data)) {
            setArray(data);
        }
    },[data])

    
    return (
        <>

            <nav aria-label="Breadcrumb" className={className} id={id}>
                <ol className="flex items-center gap-1 text-sm ">
                    {
                        array.map((i, _idx) => (
                            <React.Fragment key={_idx}>
                                {
                                    (_idx==0 || array.length === _idx) || <li className="rtl:rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </li>
                                }
                                
                                <li className='text-yellow-400 last:text-gray-700'>
                                    <a href="#" className="block transition "> {i} </a>
                                </li>
                            </React.Fragment>
                        ))
                            }
                </ol>
            </nav>

        </>
    );
};

export default BreadCrumb;
