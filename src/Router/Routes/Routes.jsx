import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../../pages/Shared/ErrorPage/ErrorPage";
import PreventLogIn from './../PreventLogin/PreventLogIn';
import Login from "../../pages/Login/Login";
import ImagesStories from "../../pages/Stories/Stories";
import Shorts from "../../pages/Shorts/Shorts";
import OffsiteLayout from "../../Layouts/Offsite/OffsiteLayout";
import OnsiteLayout from "../../Layouts/Onsite/OnsiteLayout";
import NonLogInHomePage from "../../pages/Offsite/NonLogInHomePage/NonLogInHomePage";
import NonLogInCityPage from "../../pages/Offsite/NonLogInCityPage/NonLogInCityPage";
import AllRestaurantOfTheCity from "../../pages/Others/AllRestaurantOfTheCity/AllRestaurantOfTheCity";
import LoginContainer from "../../pages/Login/LoginContainer";
import RestaurantHomePage from "../../pages/Shared/RestaurantHomePage/RestaurantHomePage";
import Home from "../../pages/Others/Home/Home";
import NearbyRestaurant from "../../pages/Offsite/NearbyRestaurant/NearbyRestaurant";
import PrivateRoute from './../PrivateRoute/PrivateRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <OffsiteLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'story',
                element: <ImagesStories />
            },
            {
                path: 'shorts',
                element: <Shorts />
            },
            {
                path: '/city/:city',
                element: <AllRestaurantOfTheCity />
            },
            {
                path: '/nearby-restaurant',
                element: <NearbyRestaurant/>
            },
            {
                path: 'restaurant/:res_id/branch/:branchID',
                element: <RestaurantHomePage />
            },
            {
                path: '/profile',
                element:<>profile</>
            },
            {
                path: '/edit-profile',
                element: <>edit profile</>
            },



        ]

    },
    {
        path: '/onsite-order',
        element: <PrivateRoute><OnsiteLayout /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'restaurant/:res_id/branch/:branchID/table/:tableID',
                element: <RestaurantHomePage />
            }


        ]

    },

    {
        path: '/login',
        element: <PreventLogIn><LoginContainer /></PreventLogIn>
    },
    {
        path: '/home',
        element: <NonLogInHomePage />
    },
   

])
