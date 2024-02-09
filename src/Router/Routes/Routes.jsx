import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../../pages/Shared/ErrorPage/ErrorPage";
import PreventLogIn from './../PreventLogin/PreventLogIn';
import Login from "../../pages/Login/Login";
import Main from './../../Layouts/Main';
import ImagesStories from "../../pages/Stories/Stories";
import Shorts from "../../pages/Shorts/Shorts";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage />,
        children: [
           {
            path : '/',
            element : <>hello</>
           },
           {
            path : '/story',
            element : <ImagesStories/>
           },
           {
            path : '/shorts',
            element : <Shorts/>
           }


        ]

    },
    {
        path: '/login',
        element: <PreventLogIn><Login /></PreventLogIn>
    },

])
