import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop';
import { useLocation } from 'react-router-dom';

const SetTitle = ({ title }) => {
    const path = useLocation();
    useEffect(()=>{
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  
    },[path])
    return (
        <>
        <ScrollToTop/>
            <Helmet>
                <title>{title} | Foodie </title>
            </Helmet>
        </>
    );
};

export default SetTitle;