/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "antd";
import { Date, Input, InputSelect } from "../global/InputFeilds";


const PaymentFilter = () => {
    return (
        <div className="p-4 bg-white dark:bg-background-dark mt-5 rounded-lg">
            <div className="lg:col-span-4 md:col-span-2 col-span-1">
                <h4 className="text-lg dark:text-white text-dark">
                    Search & Filter Invoices
                </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <Input
                    label="Invoice Number"
                />
                <InputSelect label="Agent" options={[
                    { value: '', label: 'All' },
                    { value: 'agent1', label: 'Agent 1' },
                    { value: 'agent2', label: 'Agent 2' },
                    { value: 'agent3', label: 'Agent 3' },
                ]} />
                <InputSelect label="Payment Method" options={[
                    { value: '', label: 'All' },
                    { value: 'Bank', label: 'Bank Transfer' },
                    { value: 'cash', label: 'Cash' },
                    { value: 'mobile', label: 'Mobile Transfer' },

                ]} />
                <InputSelect label="Authorization" options={[
                    { value: '', label: 'All' },
                    { value: 'Authorized', label: 'Authorized' },
                    { value: 'not_authorized', label: 'Not Authorized' },
                    { value: 'mobile', label: 'Mobile Transfer' },

                ]} />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <Date
                    label="Start Date"
                    type="date"
                />
                <Date
                    label="End Date"
                    type="date"
                />
                <Button type="primary" size="large" className="mt-[22px]">
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default PaymentFilter;

