import React from 'react';
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
const DishCard = ({ dishData }) => {
    return (

        <div className="w-full flex flex-col items-center bg-white border border-gray-400 rounded-lg shadow md:flex-row  hover:bg-gray-100 cursor-pointer">
            <img className="object-cover w-full  h-96 md:h-auto md:w-48  p-3 rounded-xl" src={dishData?.img} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{dishData?.title}</h5>
                <div className="mb-3">
                    <span dangerouslySetInnerHTML={{ __html: dishData?.description }}  style={{ all: 'unset', color: 'inherit !important' }}></span>
                </div>

            </div>
        </div>

    );
};

export default DishCard;