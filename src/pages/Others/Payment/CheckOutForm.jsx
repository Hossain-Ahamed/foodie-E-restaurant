import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
// import './Checkoutform.css'
import Field from './Field';
import CardField from './CardField';
import SuccessfullPage from './SuccessfullPage';
import PaymentError from './PaymentError';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';



const CheckOutForm = ({ price, priceDetails }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [transactionID, setTransactionID] = useState(null);
    const [billingDetails, setBillingDetails] = useState({
        email: '',
        phone: '',
        name: '',
    });

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {

        if (price > 0) {

            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data?.clientSecret);
                    setClientSecret(res.data?.clientSecret)
                })
                .catch(e => {

                })
        }


    }, [price, axiosSecure])



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        if (error) {
            card.focus();
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        if (cardComplete) {
            setProcessing(true);
        }


        // Use your card Element with other Stripe.js APIs
        const payload = await stripe.createPaymentMethod(
            {
                type: 'card',
                card,
                billing_details: billingDetails,
            });

        const { paymentIntent, error: confirmCardPaymentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: billingDetails,
                },
            },
        );

        setProcessing(false);

        if (confirmCardPaymentError) {
            setError(confirmCardPaymentError)
        }

        if (payload.error) {
            setError(payload.error);
        } else {
            // console.log("Method", payload.paymentMethod)
            // console.log("intent", paymentIntent)
            setPaymentMethod(payload.paymentMethod);



            if (paymentIntent.status === "succeeded") {
                // const transactionID = paymentIntent.id;
                setTransactionID(paymentIntent.id);

                const data = {
                  

                   
                    orderID: priceDetails?._id,
                    

                    transaction_method_email: payload.paymentMethod?.billing_details?.email,
                    transaction_method_name: payload.paymentMethod?.billing_details?.name,
                    transaction_method_phone: payload.paymentMethod?.billing_details?.phone,
                    transactionID: paymentIntent?.id,
                    intent_methodID: paymentIntent?.payment_method,
                    methodID: payload.paymentMethod?.id,
                    price: parseFloat((paymentIntent?.amount / 100.00).toFixed(2)),

                }

                axiosSecure.post('/pay-my-bill', data)
                    .then(res => {

                        toast.success('Payment Completed');
                        navigate('/orders',{replace:true})
                    })
                    .catch(e => {
                        console.error(e);
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: `${e?.response?.status} ${e?.response?.data?.message}`,
                            showConfirmButton: false,
                            timer: 1500
                        })

                        // navigate('/dashboard/carts');
                    })

            }
        }
    };

    const reset = () => {
        setError(null);
        setProcessing(false);
        setPaymentMethod(null);
        setBillingDetails({
            email: '',
            phone: '',
            name: '',
        });
    };

    if (paymentMethod && transactionID) {
        return <SuccessfullPage transactionID={transactionID} id={paymentMethod.id} reset={reset} paymentDetails={priceDetails} price={price} />
    }

    return <>
        <form className="Form" onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <Field label="Name" id="name" type="text" placeholder="Jane Doe" required autoComplete="name" value={billingDetails.name}
                    onChange={(e) => {
                        setBillingDetails({ ...billingDetails, name: e.target.value });
                    }}
                />
                < Field label="Email" id="email" type="email" placeholder="janedoe@gmail.com" required autoComplete="email" value={billingDetails.email}
                    onChange={(e) => {
                        setBillingDetails({ ...billingDetails, email: e.target.value });
                    }}
                />
                < Field label="Phone" id="phone" type="tel" placeholder="(941) 555-0123" required autoComplete="tel" value={billingDetails.phone}
                    onChange={(e) => {
                        setBillingDetails({ ...billingDetails, phone: e.target.value });
                    }}
                />
            </fieldset >
            <fieldset className="FormGroup mt-5">
                <CardField
                    onChange={(e) => {
                        setError(e.error);
                        setCardComplete(e.complete);
                    }}
                />
            </fieldset>
            {error && <PaymentError message={error.message} />}
            <button type="submit" disabled={processing || !stripe || !clientSecret} className={`SubmitButton ${error ? 'SubmitButton--error' : ''} disabled:bg-slate-400 disabled:cursor-not-allowed mt-8 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex  items-center gap-2 mr-2 mb-2`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9105 14.6925C18.9105 15.9825 19.9705 17.0325 21.2605 17.0325C21.2605 20.7825 20.3205 21.7225 16.5705 21.7225H7.19049C3.44049 21.7225 2.50049 20.7825 2.50049 17.0325V16.5725C3.79049 16.5725 4.85049 15.5125 4.85049 14.2225C4.85049 12.9325 3.79049 11.8725 2.50049 11.8725V11.4125C2.51049 7.66247 3.44049 6.72247 7.19049 6.72247H16.5605C20.3105 6.72247 21.2505 7.66247 21.2505 11.4125V12.3525C19.9605 12.3525 18.9105 13.3925 18.9105 14.6925Z" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.2116 6.7225H7.12158L10.0516 3.7925C12.4416 1.4025 13.6416 1.4025 16.0316 3.7925L16.6316 4.3925C16.0016 5.0225 15.8516 5.9525 16.2116 6.7225Z" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.87939 6.72266L9.8794 21.7227" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />
                </svg>

                {processing ? 'Processing...' : `Pay Now $${price}`}
            </button>

        </form >
    </>
};

export default CheckOutForm;