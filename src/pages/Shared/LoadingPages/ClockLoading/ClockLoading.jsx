import React from 'react';
import {ClockLoader} from 'react-spinners'

const ClockLoading = () => {
    return (
        <div className='max-w-screen h-screen flex justify-center items-center z-[100] overflow-hidden'  aria-label='loading-icon'>
           <ClockLoader size={100} color='#36d7b7'  />
        </div>
    );
};

export default ClockLoading;