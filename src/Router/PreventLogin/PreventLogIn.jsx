import React from 'react';
import useAuthProvider from '../../Hooks/useAuthProvider';
import { Navigate } from 'react-router-dom';

const PreventLogIn = ({children}) => {
    const {user} = useAuthProvider();

    if(!user){
       return children;
    }
    return <Navigate to="/" replace></Navigate>
};

export default PreventLogIn;