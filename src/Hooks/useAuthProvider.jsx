import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';

const useAuthProvider = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuthProvider;