import React from 'react';


const CategoryCard = ({ category, setSelected }) => {

    return (
        <>
            <button onClick={() => { setSelected(category?.title) }} className="relative w-36 h-16 md:w-64 md:h-32">
                <img className="h-full w-full object-cover rounded-md" src={category?.img} alt="Random image" />
                <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-white text-xl md:text-2xl font-bold">{category?.title}</h2>
                </div>
            </button>

        </>
    );
};

export default CategoryCard;