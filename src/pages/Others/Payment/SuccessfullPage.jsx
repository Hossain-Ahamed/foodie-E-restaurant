import React from 'react';
import ResetButton from './ResetButton';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { IoMdCopy } from 'react-icons/io';
import successfulGif from '../../../assets/images/Gif/paymentSuccessful.gif'
const SuccessfullPage = ({ id, reset, transactionID, price }) => {

  const handleCopyClick = (data) => {
    if (navigator.clipboard) {
      if (data) {
        navigator.clipboard
          .writeText(data)
          .then(() => {
            toast.success("Copied to clipboard");
          })
          .catch((error) => {
            console.error("Failed to copy : ", error);
          });
      }
    } else {
      console.error("Clipboard API is not available in this environment");
    }
  };

  return (
    <section className='w-screen  max-w-[500px] mx-auto min-h-[900px]'>
      <div className="w-full flex flex-col items-start justify-center my-8  select-none">
        <div className="w-full pb-3 border-b-2 font-extrabold text-3xl flex" role="alert">
          <div className='w-3/4'>
            <h1>Paid  ৳ {price}</h1>
            <h1>to Foodie&#39;s Account</h1>
          </div>
          <div className='w-1/2 flex justify-end'>
            <img src={successfulGif} alt="" className='w-24 h-20' />
          </div>


        </div>

        <div className="mt-3 ">
          {/* Thanks for trying Stripe Elements. <br /> */}
          {/* No money was charged, but we generated a <br /> */}
          <p className='font-extrabold text-lg pb-0 mb-0'>Reference</p>
          <p className='text-slate-500 py-0 my-0'>Payment via Stripe</p>


          <p className='font-extrabold text-lg pb-0 mb-0 mt-3'>Transaction ID</p>
          <p className='text-slate-500 py-0 my-0'><span onClick={() => handleCopyClick(transactionID)} className='cursor-pointer flex gap-2 items-center' title='click to copy'>{transactionID}<IoMdCopy /></span></p>

          <p className='font-extrabold text-lg pb-0 mb-0 mt-3'>Transaction Date</p>
          <p className='text-slate-500 py-0 my-0'>{new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Dhaka' })} (Asia/Dhaka time)</p>

          <p className='font-extrabold text-lg pb-0 mb-0 mt-3'>Payment Method ID</p>
          <p className='text-slate-500 py-0 my-0'><span onClick={() => handleCopyClick(id)} className='cursor-pointer flex gap-2 items-center' title='click to copy'>{id} <IoMdCopy /></span></p>


          <p className='text-slate-500 py-0 mt-6 text-xs'>For security, payment to new payees may be held for 24 hours.</p>

          <p className='text-slate-700 mt-1'>E-mail and password is sent to you E-mail. <Link to={import.meta.env.VITE_RMS_ADDRESS} target='_blank' className='hover:underline text-blue-300 '>Click to RMS Login</Link></p>
        </div>



        <ResetButton onClick={reset} />
      </div>
    </section>
  );
};

export default SuccessfullPage;