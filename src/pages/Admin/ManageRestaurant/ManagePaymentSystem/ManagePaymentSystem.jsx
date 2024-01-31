import React from 'react';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import useProfile from '../../../../Hooks/useProfile';
import useRestauarantAndBranch from '../../../../Hooks/useRestauarantAndBranch';
import PaymentType from './PaymentType';
import PrintingSetup from './PrintingSetup';
import BillingOverview_MyRestaurant from './BillingOverview_MyRestaurant';
const ManagePaymentSystem = () => {
    const { branchID, res_id } = useRestauarantAndBranch();
    const { permitted } = useProfile();

    const disabledbuttons = [];


    const { role } = permitted.find(res => res.branchID === branchID && res.res_id === res_id)


    if (!(role === "Super-Admin")) {
        disabledbuttons.push("MyBilling");
    }

    return (
        <section className='max-w-4xl mx-auto'>
            <div className="flex w-full flex-col">
                <Tabs disabledKeys={disabledbuttons} aria-label="Disabled Options" className='w-full justify-center'>
                    <Tab key="PaymentMethod" title="Payment Method">
                        <Card>
                            <CardBody>
                                <PaymentType />
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab key="printingSetup" title="Printing Set up">
                        <Card>
                            <CardBody>
                                <PrintingSetup />
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab key="MyBilling" title="Billing overview">
                        <Card>
                            <CardBody>
                                <BillingOverview_MyRestaurant />
                            </CardBody>
                        </Card>
                    </Tab>

                </Tabs>
            </div>
        </section>
    );
};

export default ManagePaymentSystem;