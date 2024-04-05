import React from 'react';
import useCart from '../../../Hooks/useCart';
import SetTitle from '../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import LoadingPage from '../../Shared/LoadingPages/LoadingPage/LoadingPage';
import ErrorPage from '../../Shared/ErrorPage/ErrorPage';

const OnsiteCart = () => {
    const { CartData, CartFetchLoading, CartRefetch, CartFetchError } = useCart();


    if (CartFetchLoading) {
        return <LoadingPage />
    }

    if (CartFetchError) {
        return <ErrorPage />
    }
    return (
        <>
            <SetTitle title="Cart" />
            <SectionTitle h1="My Cart" />
            {console.log(CartData)}
        </>
    );
};

export default OnsiteCart;