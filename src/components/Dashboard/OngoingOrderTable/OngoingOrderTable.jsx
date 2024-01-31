import { useQuery } from "react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TableRow from "./TableRow";
import SetTitle from "../../../pages/Shared/SetTtitle/SetTitle";
import SectionTitle from "../../SectionTitle/SectionTitle";

const OngoingOrderTable = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch, data: OngoingOrders =[], isLoading, error} = useQuery({
        queryKey: ['ongoing-orders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/ongoing-orders`);
            return [
                {
                    id: "234783bfc",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    customer_name: "Farhan Hasan Nilok",
                    branch: "19/7 chasara",
                    table: "4",
                    status: "Pending",
                    payment_status: "Paid",
                    order_site: "Onsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj"
                },
                {
                    id: "234763bfc",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    customer_name: "Farhan Hasan Nilok",
                    branch: "19/7 chasara",
                    table: "4",
                    status: "Canceled",
                    payment_status: "Pending",
                    order_site: "Onsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj"
                },
                {
                    id: "234483bfc",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    customer_name: "Farhan Hasan Nilok",
                    branch: "19/7 chasara",
                    table: "4",
                    status: "Confirmed",
                    payment_status: "Paid",
                    order_site: "Onsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj"
                },
                {
                    id: "294783bfc",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    customer_name: "Farhan Hasan Nilok",
                    branch: "19/7 chasara",
                    table: "4",
                    status: "Canceled",
                    payment_status: "Refunded",
                    order_site: "Onsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj"
                },
                {
                    id: "834783bfc",
                    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKjKSD7xxcI8hEoNgPnsxZ632hSVJFspYJNcAAmPKc39g=s360-c-no",
                    customer_name: "Farhan Hasan Nilok",
                    branch: "19/7 chasara",
                    table: "4",
                    status: "Confirmed",
                    payment_status: "Not Refunded",
                    order_site: "Offsite",
                    customer_phone: "018838229933",
                    location: "Narayanganj"
                },
            ]
        }
    });
    // console.log(OngoingOrders)
    return (
        <div className='container mx-auto px-4 sm:px-8 select-none'>
            <SetTitle title="Ongoing Order"/>
            <SectionTitle h1='Ongoing Orders'/>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'
                                    >
                                        Customer
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Order ID
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Payment Status
                                    </th>
                                    {/* <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        To
                                    </th> */}
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-sm uppercase font-normal text-center'
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{OngoingOrders.map(order => <TableRow key={order.id} order={order}/>)}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OngoingOrderTable