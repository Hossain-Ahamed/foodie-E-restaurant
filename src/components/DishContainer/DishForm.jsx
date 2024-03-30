import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Button } from '@nextui-org/react';

const DishForm = ({ dish, onOpenChange }) => {

    const [quantity, setQuantity] = useState(1);



    const [extraPrice, setExtraPrice] = useState(0);
    // console.log(dish)
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
    const [selectedOptions, setSelectedOptions] = useState("");
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [errorNotify, setErrorNotify] = useState(false);
    const handleOptionChange = (e) => {
        setErrorNotify(false);
        const optionPrice = dish.options.find(option => option.name === e.target.value)?.price || 0;
        const addonPrices = selectedAddons.reduce((total, addon) => total + addon.price, 0);
        setSelectedOptions(e.target.value);
        setExtraPrice(optionPrice + addonPrices);
    };

    const handleAddonChange = (e) => {
        const addonName = e.target.value;
        const addonPrice = dish.addOn.find(addon => addon.name === addonName)?.price || 0;

        // Check if the addon is already selected
        const isAddonSelected = selectedAddons.some(addon => addon.name === addonName);

        // Update state based on whether the addon is checked or unchecked
        if (e.target.checked && !isAddonSelected) {
            setSelectedAddons([...selectedAddons, { name: addonName, price: addonPrice }]);
            setExtraPrice(prevPrice => prevPrice + addonPrice);
        } else if (!e.target.checked && isAddonSelected) {
            const filteredAddons = selectedAddons.filter(addon => addon.name !== addonName);
            setSelectedAddons(filteredAddons);
            setExtraPrice(prevPrice => prevPrice - addonPrice);
        }
    };

    useEffect(() => {
        setValue('quantity', quantity)

    }, [quantity, setValue])


    const increaseQuantity = () => { setQuantity(quantity + 1) }
    const decreaseQuantity = () => { if (quantity > 1) setQuantity(quantity - 1) }


    const onSubmit = (formData) => {

        // console.log(formData?.quantity)
        if (dish?.options && Array.isArray(dish.options) && dish.options.length > 0 && !selectedOptions) {
            setErrorNotify(true);
            return;

        }

        // console.log('Selected Options:', selectedOptions);
        // console.log('Selected Addons:', selectedAddons);

        const optionsPrice = dish.options.find(option => option.name === selectedOptions)?.price || 0;
        const totalPrice = dish.offerPrice + optionsPrice + extraPrice + parseFloat(((dish.offerPrice + extraPrice) * (dish?.supplementary_duty / 100 + dish?.sales_tax / 100)).toFixed(1));
        // console.log('Total Price:', totalPrice);

        const data = {
            dish_id: dish?._id,
            quantity: formData?.quantity,
            options: selectedOptions,
            addOn: selectedAddons.map(i => i?.name),
        }
        console.log(data)
        // onOpenChange()
    };

    return (

        <div className="container mx-auto " >
       
            <form onSubmit={handleSubmit(onSubmit)}>
                <img src={dish?.img} className="w-full h-auto" alt="" />
                <div className="px-1">
                    <h1 className="text-xl font-bold">{dish?.title}</h1>
                    <span dangerouslySetInnerHTML={{ __html: dish?.description }} className="text-gray-500"></span>
                    <p className="py-3 font-semibold text-lg">TK {dish.offerPrice + extraPrice}  <span className='text-xs text-gray-400 font-normal'>± {Math.ceil((dish.offerPrice + extraPrice) * (dish?.supplementary_duty / 100 + dish?.sales_tax / 100))} VAT</span></p>


                    {dish?.options && Array.isArray(dish.options) && dish.options.length > 0 &&
                        <>
                            <hr />
                            <fieldset className={`grid grid-cols-1 gap-2 my-2 px-4 py-2 border ${errorNotify ? "border-danger-500" : "border-gray-300"} rounded-lg`}>
                                <div className='flex justify-between'>
                                    <p className="text-sm font-medium pl-2">Options</p>
                                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg dark:bg-red-900 dark:text-red-300">Required</span>
                                </div>
                                {dish.options.sort((a, b) => a.priority - b.priority).map(option => (
                                    <div key={option._id}>
                                        <input
                                            type="radio"

                                            name="options"
                                            id={option._id}
                                            value={option.name}
                                            onChange={handleOptionChange}
                                            checked={selectedOptions === option.name}
                                            className="peer hidden [&:checked_+_label_svg]:block"
                                        />
                                        <label
                                            htmlFor={option._id}
                                            className="select-none flex justify-between cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                        >
                                            <span>
                                                {option.name}
                                            </span>
                                            <span>
                                                +   {option.price} ৳
                                            </span>

                                        </label>
                                    </div>
                                ))}
                            </fieldset>
                        </>
                    }
                    {dish?.addOn && Array.isArray(dish.addOn) && dish.addOn.length > 0 &&
                        <>

                            <fieldset className="grid grid-cols-1 gap-2 my-4 p-4 border border-gray-300 rounded-lg">
                                <div className='flex justify-between'>
                                    <p className="text-sm font-medium pl-2">Add-ons</p>
                                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg dark:bg-red-900 dark:text-red-300">Optional</span>
                                </div>
                                {dish.addOn.map(addon => (
                                    <div key={addon._id}>
                                        <input
                                            type="checkbox"
                                            name="addons"
                                            id={addon._id}
                                            value={addon.name}
                                            className="peer hidden [&:checked_+_label_svg]:block"
                                            onChange={handleAddonChange}
                                        />
                                        <label
                                            htmlFor={addon._id}
                                            className="select-none flex justify-between cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                        >
                                            <span>
                                                {addon.name}
                                            </span>
                                            <span>
                                                +   {addon.price} ৳
                                            </span>

                                        </label>
                                    </div>
                                ))}
                            </fieldset>
                        </>
                    }
                </div>

                <div className='px-2 grid grid-cols-3 gap-2 items-center mb-2'>
                    <div className='col-span-1'>
                        <div className="relative flex items-center justify-between w-full">
                            <button onClick={decreaseQuantity} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" disabled={quantity <= 1} className={`${quantity <= 1 ? "bg-gray-100  hover:bg-gray-200 text-gray-500" : "bg-yellow-300  hover:bg-yello-200 text-white"} disabled:cursor-not-allowed border border-gray-300 rounded-full p-3 focus:ring-gray-100  focus:ring-2 focus:outline-none`}>
                                <svg className="w-3 h-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <p data-input-counter aria-describedby="helper-text-explanation" className="absolute left-1/2 transform -translate-x-1/2 text-xl border-gray-500 text-center text-gray-90 px-2 md:px-4 py-2.5">{quantity}</p>
                            <button onClick={increaseQuantity} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-yellow-300 hover:bg-yello-200 text-white border border-gray-300 rounded-full p-3 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className='col-span-2'>

                        {
                            dish?.options && Array.isArray(dish.options) && dish.options.length > 0 ?
                                !selectedOptions ?
                                    <Button color="default" className='w-full' type='submit'>
                                        Add to Cart
                                    </Button>
                                    :
                                    <Button color="success" className='w-full' type='submit'>
                                        Add to Cart
                                    </Button>

                                :
                                // for those which doesnt have option direct get
                                <Button color="success" className='w-full' type='submit'>
                                    Add to Cart
                                </Button>
                        }
                    </div>


                </div>
            </form>
        </div>
    );
};

export default DishForm;
