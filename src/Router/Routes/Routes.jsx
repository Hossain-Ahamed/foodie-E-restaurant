import { createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Admin/Login/Login";
import PreventLogIn from "../PreventLogin/PreventLogIn";
import AdminSite from "../../Layouts/AdminSite/AdminSite";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyRestaurants from "../../pages/Admin/MyRestaurant/MyRestaurant";
// import Statistics from "../../pages/Admin/Statistics/Statistics";
import ErrorPage from "../../pages/Shared/ErrorPage/ErrorPage";
import ViewAsMyProfile from "../../pages/Admin/ViewEmployee/ViewAsMyProfile";
// import OngoingOrders from "../../pages/Admin/Orders/OngoingOrders/OngoingOrders";
// import DishCategory_Add from "../../pages/Admin/Dish_Category/DishCategory_Add/DishCategory_Add";
// import DishCategory_List from "../../pages/Admin/Dish_Category/DishCategory_List/DishCategory_List";
// import DishCategory_Edit from "../../pages/Admin/Dish_Category/DishCaregory_Edit/DishCatgory_Edit";
// import AddEmployee from "../../pages/Admin/Employee/AddEmployee/AddEmployee";
// import Dish_Add from "../../pages/Admin/DishManage/Dish_Add/Dish_Add";
// import Dish_Edit from "../../pages/Admin/DishManage/DishEdit/Dish_Edit";
// import EditRestaurant from "../../pages/Admin/EditRestaurant/EditRestaurant";
// import AddBranch from "../../pages/Admin/EditRestaurant/AddBranch/AddBranch";
// import TimeTable from "../../pages/Admin/ManageRestaurant/TimeTable/TimeTable";
// import TableManagement from "../../pages/Admin/ManageRestaurant/TableManagement/TableManagement";
// import EmployeeList from "../../pages/Admin/Employee/EmployeeList/EmployeeList";
// import CouponList from "../../pages/Admin/ManageOffer/ManageCoupon/CouponList/CouponList";
// import AddCoupon from "../../pages/Admin/ManageOffer/ManageCoupon/AddCoupon/AddCoupon";
// import ManagePaymentSystem from "../../pages/Admin/ManageRestaurant/ManagePaymentSystem/ManagePaymentSystem";

// import Dish_List from "../../pages/Admin/DishManage/Dish_List/Dish_List";

// import Test from "../../pages/Shared/VideoPlayer/Test";
// import ViewAsAdmin from "../../pages/Admin/ViewEmployee/ViewAsAdmin";
// import ExpenseAndSalary from "../../pages/Admin/Expenses/ExpensesAndSalary/ExpenseAndSalary";




export const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><AdminSite /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MyRestaurants />
            },
            {
                path: '/my-profile',
                element: <ViewAsMyProfile />
            },
            // {
            //     path: '/edit-restaurant/:res_id',
            //     element: <EditRestaurant />
            // },
            // {
            //     path: '/edit-restaurant/:res_id/add-new-branch',
            //     element: <AddBranch />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID',
            //     element: <Statistics />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/manage-shifts',
            //     element: <TimeTable />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/manage-tables',
            //     element: <TableManagement />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/manage-payment-system',
            //     element: <ManagePaymentSystem />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/coupon-list',
            //     element: <CouponList />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/expenses',
            //     element: <ExpenseAndSalary />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/add-coupon',
            //     element: <AddCoupon />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/category',
            //     element: <DishCategory_List />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/add-category',
            //     element: <DishCategory_Add />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/edit-category/:categoryID',
            //     element: <DishCategory_Edit />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/dish-list',
            //     element: <Dish_List />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/add-dish',
            //     element: <Dish_Add />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/edit-dish/:id',
            //     element: <Dish_Edit />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/add-employee',
            //     element: <AddEmployee />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/view-employee/:employeeID',
            //     element: <ViewAsAdmin />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/ongoing-orders',
            //     element: <OngoingOrders />
            // },
            // {
            //     path: '/restaurant/:res_id/branch/:branchID/employee-list',
            //     element: <EmployeeList />
            // },


        ]

    },
    {
        path: '/login',
        element: <PreventLogIn><Login /></PreventLogIn>
    },
    // {
    //     path: '/test',
    //     element: <Test/>
    // }


])
