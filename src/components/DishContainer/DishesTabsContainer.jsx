import React from 'react';
import DishTabContainer_OF_A_Category from './DishTabContainer_OF_A_Category';
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from "@nextui-org/react";

const DishesTabsContainer = ({ dishes,  isSelected, setIsSelected  }) => {

    return (

            <div className='  my-5'>
                 <div className={`text-center text-yellow-500 py-3 pb-5 `}><h1 className='text-3xl font-bold'>All Dishes</h1></div>
                <Tabs
                    fullWidth

                    aria-label="Tabs form"
                    selectedKey={isSelected}
                    onSelectionChange={setIsSelected}
                   

                >

                    {
                        dishes && Array.isArray(dishes) && dishes.map((i, _idx) =>
                            <Tab className='px-0 md:px-6 py-4  ' key={i?.category?.title || Date.now()} title={i?.category?.title || ""}>
                            

                                    <DishTabContainer_OF_A_Category data={i?.dishes} />
                             
                            </Tab>)
                    }
                </Tabs>

            </div>
       
    );
};

export default DishesTabsContainer;