import React from 'react';

const SectionTitle = ({ h1, h2, h3, p, bg, padding }) => {
    return (
        <>
            {h1 && <div className={`text-center ${padding} text-slate-700 ${bg ? 'bg-white' : ''}`}><h1 className='text-3xl font-bold'>{h1}</h1></div>}
            {h2 && <div className={`text-center ${padding} text-slate-700 ${bg ? 'bg-white' : ''}`}><h2 className='text-2xl font-semibold'>{h2}</h2></div>}
            {h3 && <div className={`text-center ${padding} text-slate-700 ${bg ? 'bg-white' : ''}`}><h3 className='text-xl font-medium'>{h3}</h3></div>}
            {p &&  <div className={`text-center ${padding} text-slate-700 ${bg ? 'bg-white' : ''}`}><p className='text-base'>{p}</p></div>}
        </>
    );
};

export default SectionTitle;