import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop';

const SetTitle = ({ title }) => {
    return (
        <>
        <ScrollToTop/>
            <Helmet>
                <title>{title} | RMS </title>
            </Helmet>
        </>
    );
};

export default SetTitle;