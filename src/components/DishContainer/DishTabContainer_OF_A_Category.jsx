import React from 'react';
import DishCard from './DishCard';

const DishTabContainer_OF_A_Category = ({ data }) => {

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-2 justify-center'>


                {
                    data && Array.isArray(data) && data.map(i => <React.Fragment key={i?._id}><DishCard dishData={i} /></React.Fragment>)
                }
                {
                    data && Array.isArray(data) && data.map(i => <React.Fragment key={i?._id}><DishCard dishData={i} /></React.Fragment>)
                }
                {
                    data && Array.isArray(data) && data.map(i => <React.Fragment key={i?._id}><DishCard dishData={i} /></React.Fragment>)
                }
                {
                    data && Array.isArray(data) && data.map(i => <React.Fragment key={i?._id}><DishCard dishData={i} /></React.Fragment>)
                }
            </div>

        </>
    );
};

export default DishTabContainer_OF_A_Category;