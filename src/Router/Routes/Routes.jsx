import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../../pages/Shared/ErrorPage/ErrorPage";
import PreventLogIn from './../PreventLogin/PreventLogIn';
import Login from "../../pages/Login/Login";
import ImagesStories from "../../pages/Stories/Stories";
import Shorts from "../../pages/Shorts/Shorts";
import OffsiteLayout from "../../Layouts/Offsite/OffsiteLayout";
import OnsiteLayout from "../../Layouts/Onsite/OnsiteLayout";
import OnsiteRestaurantHomePage from "../../pages/Onsite/RestuarantContainer/RestaurantHomePage/OnsiteRestaurantHomePage";
import AllRestaurantOfTheCity from "../../pages/Others/AllRestaurantOfTheCity/AllRestaurantOfTheCity";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <OffsiteLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <>hello</>
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
            }


        ]

    },
    {
        path: '/onsite-order',
        element: <OnsiteLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'hello',
                element: <>hello</>
            },
            {
                path: 'restaurant/:res_id/branch/:branchID/table/:tableID',
                element: <OnsiteRestaurantHomePage />   
            },


        ]

    },

    {
        path: '/login',
        element: <PreventLogIn><Login /></PreventLogIn>
    },

])
