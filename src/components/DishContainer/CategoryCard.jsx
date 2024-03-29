import React from 'react';


const CategoryCard = ({ category, setSelected }) => {
    
    return (
        <>
            <button onClick={()=>{setSelected(category?.title)}} className="relative w-64 h-36">
                <img className="h-full w-full object-cover rounded-md" src={category?.img} alt="Random image"/>
                    <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
                    <div className="absolute inset-[80px] flex items-center justify-center">
                        <h2 className="text-white text-2xl font-bold">{category?.title}</h2>
                    </div>
            </button>
         
        </>
    );
};

export default CategoryCard;