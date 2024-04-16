import React from "react";
import useAuthProvider from "../../../../Hooks/useAuthProvider";
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingPage from "../../../Shared/LoadingPages/LoadingPage/LoadingPage";
import ErrorPage from "../../../Shared/ErrorPage/ErrorPage";
import FoodCard from "../../../../components/FoodCard/FoodCard";
import backgroundImage from "../../../../assets/images/Background/blur-coffee-cafe-shop-restaurant.png";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import SetTitle from "../../../Shared/SetTtitle/SetTitle";
const ShowingOngoingOrders = () => {
  const { user } = useAuthProvider();
  const { res_id, branchID, tableID } = useParams();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const { refetch, data, isLoading, error } = useQuery({
    queryKey: ["data", res_id, branchID, user?.email],

    queryFn: async () => {
      let fetchRoute = "";
      if (location.pathname.includes("/ongoing-orders/")) {
        fetchRoute = `/ongoing-orders/restaurant/${res_id}/branch/${branchID}/email/${user?.email}`;
      } else if (location.pathname.includes("/recent-orders/")) {
        fetchRoute = `/recent-orders/restaurant/${res_id}/branch/${branchID}/email/${user?.email}`;
      }

      const res = await axiosSecure.get(fetchRoute);
      console.log(res.data);
      return res?.data;
    },
  });

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <div className="h-screen" style={backgroundStyle}>
        {location.pathname.includes("/ongoing-orders/") ? (
          <>
            
           <p className="text-center text-3xl font-bold text-white pt-20">Ongoing Order</p>
            
            <SetTitle title="Ongoing Orders" />
          </>
        ) : (
          <>
            <p className="text-center text-3xl font-bold text-white pt-20">Recent Order</p>
            <SetTitle title="Recent Orders" />
          </>
        )}

        <div className="mx-auto p-5 flex flex-wrap items-center justify-center">
          {data?.map((order) => (
            <FoodCard key={order?._id} order={order}></FoodCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowingOngoingOrders;
