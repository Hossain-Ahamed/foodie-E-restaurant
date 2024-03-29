import React from 'react';
import CategoryCard from './CategoryCard';
import SectionTitle from './../SectionTitle/SectionTitle';

const CategoryCards = ({ categories, isSelected, setIsSelected }) => {

    return (
        <>
            <div className={`text-center text-yellow-500 py-3 pb-5 `}><h1 className='text-3xl font-bold'>All Categories</h1></div>
            <div className='flex flex-wrap justify-center gap-3'>
                {
                    categories && Array.isArray(categories) && categories.map((i, _idx) => <CategoryCard key={_idx} category={i?.category}  setSelected={setIsSelected}/>)
                }

            </div>
        </>
    );
};

export default CategoryCards;