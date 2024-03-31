import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, updateProfile, FacebookAuthProvider, GithubAuthProvider, sendPasswordResetEmail } from "firebase/auth";

import axios from 'axios';
import Cookies from 'js-cookie';
import { app } from '../../Firebase/firebase.config';
import LoadingPage from '../../pages/Shared/LoadingPages/LoadingPage/LoadingPage';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {


    /**
     * -----------------------------------------------------------------
     *                       Screen width
     */
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => { setScreenWidth(window.innerWidth) };

        window.addEventListener('resize', handleResize);

        return () => { window.removeEventListener('resize', handleResize); };
    }, []);

    /**
     * ----------------------------------------------------------------
     * ----------------------------------------------------------------
     * ----------------------------------------------------------------
     */

    const googleAuthprovider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const provideCreateUserWithEmailAndPassword = (email, password) => {
        setLoading(true);

        return createUserWithEmailAndPassword(auth, email, password);
    }



    const provideSignInWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }



    const provideSignInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthprovider);
    }




    // logout 
    const provideSignOut = () => {
        setUser(null)
        return signOut(auth);
    }

    const providerUpdateuserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const providerPasswordReset = (email) => {
        return sendPasswordResetEmail(auth, email);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
       
           
            
            if (currentUser) {
                
                console.log('current user cred : ', currentUser?.email);
                
                const userData = {
                    name: currentUser?.displayName,
                    email: currentUser.email,
                    photoURL: currentUser?.photoURL,
                    phone: currentUser?.phoneNumber,
                    firebase_UID: currentUser?.uid,
                    
                    
                }
                setUser(userData);
                
                // const user
                // axios.post(`${import.meta.env.VITE_serverAddress}/jwt`, userData, { withCredentials: true })
                //     .then(data => {
                //         console.log("Token :  ", data.data.token);

                //         Cookies.set('access-token', data.data.token, { expires: 7 });
                //         setLoading(false);
                //     })
                //     .catch(e => { console.error(e); setLoading(false) })


                 setLoading(false) //todo delete this line

            } else {
                localStorage.removeItem('access-token');
                Cookies.remove('access-token');
                setLoading(false)
            }

        });

        return () => {
            return unSubscribe()
        };
    }, [])



    const authInfo = {
        screenWidth,
        
        user,
        loading,
        setLoading,
        provideCreateUserWithEmailAndPassword,
        provideSignInWithEmailAndPassword,
        provideSignInWithGoogle,

        providerUpdateuserProfile,
        providerPasswordReset,
        provideSignOut,

    }

    if (loading) {
        return <LoadingPage />
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;