import { CardElement } from '@stripe/react-stripe-js';
import React from 'react';
const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#333', // Change the icon color to a darker color for better visibility on white background
        color: '#333', // Change the text color to a darker color for better visibility on white background
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#333', // Change autofill color to a darker color
        },
        '::placeholder': {
          color: '#555', // Change the placeholder text color to a slightly darker color
        },
      },
      invalid: {
        iconColor: '#ff0000', // Change the invalid icon color to red
        color: '#ff0000', // Change the invalid text color to red
      },
    },
  };
  
const CardField =  ({onChange}) => {
    return (
        <div className="FormRow">
        <CardElement options={CARD_OPTIONS} onChange={onChange} />
      </div>
    );
};

export default CardField;