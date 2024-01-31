import React from 'react';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import BillingHistory from './BillingHistory';
import SubscriptionsPurchase from './SubscriptionsPurchase';
import RefundRequest from './RefundRequest';
const BillingOverview_MyRestaurant = () => {
    return (
        <section>
           
            <SetTitle title="Billing Overview" />
            <Tabs  aria-label="Disabled Options" className='w-full justify-center'>
                
                <Tab key="Subscriptions" title="Subscriptions">
                    <SubscriptionsPurchase/>
                </Tab>
                <Tab key="billingHistory" title="Billing History">
                   <BillingHistory/>
                </Tab>
                <Tab key="Refund" title="Refund">
                    <RefundRequest/>
                </Tab>
            </Tabs>
        </section>
    );
};

export default BillingOverview_MyRestaurant;