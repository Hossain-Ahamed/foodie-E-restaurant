import React from 'react';
import { ScaleLoader } from 'react-spinners'


const LoadingPage = () => {
    return (
        <div className='max-w-screen h-screen flex justify-center items-center z-[100] overflow-hidden'  aria-label='loading-icon'>
           <ScaleLoader size={100} color='#36d7b7' />
        </div>
    );
};

export default LoadingPage;