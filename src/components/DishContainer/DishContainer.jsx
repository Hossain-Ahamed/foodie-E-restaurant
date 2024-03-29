import React, { useState } from 'react';
import CategoryCards from './CategoryCards';
import DishesTabsContainer from './DishesTabsContainer';

const DishContainer = ({ dishes }) => {
    const [isSelected, setIsSelected] = useState(dishes[0]?.category?.title)
    return (
        <div className='my-5 px-1'>
            <CategoryCards categories={dishes} isSelected={isSelected} setIsSelected={setIsSelected} />
            <DishesTabsContainer dishes={dishes} isSelected={isSelected} setIsSelected={setIsSelected} />
        </div>
    );
};

export default DishContainer;