/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "antd";
import { Date, Input, InputSelect } from "../global/InputFeilds";
import dayjs from "dayjs";



const Filter = ({
    filters,
    setFilters,
    refetch
}: {
    refetch: any
    filters: {
        invoice_id: string,
        property_code: string,
        status: string,
        agent: string,
        stateDate: string,
        endDate: string
    },
    setFilters: any
}) => {
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
                    value={filters.invoice_id}
                    onChange={(e) => setFilters({ ...filters, invoice_id: e.target.value })}
                />
                <Input
                    label="Property Code"
                    value={filters.property_code}
                    onChange={(e) => setFilters({ ...filters, property_code: e.target.value })}
                />
                <InputSelect label="Invoice Status"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e })}
                    options={[
                        { value: '', label: 'All' },
                        { value: 'paid', label: 'Paid' },
                        { value: 'not-paid', label: 'Not Paid' },
                        { value: 'pending', label: 'Pending Approval' },

                    ]} />
                <InputSelect label="Agent" options={[
                    { value: '', label: 'All' },
                    { value: 'agent1', label: 'Agent 1' },
                    { value: 'agent2', label: 'Agent 2' },
                    { value: 'agent3', label: 'Agent 3' },
                ]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <Date
                    label="Start Date"
                    value={filters.stateDate ? dayjs(filters.stateDate) : null}
                    onChange={(e: any) => {
                        setFilters({ ...filters, stateDate: e.format('YYYY-MM-DD') })
                    }}
                />
                <Date
                    label="End Date"
                    value={filters.endDate ? dayjs(filters.endDate) : null}
                    onChange={(e: any) => {
                        setFilters({ ...filters, endDate: e.format('YYYY-MM-DD') })
                    }}
                />
                <Button type="primary" size="large" className="mt-[22px]"
                    onClick={() => {
                        refetch();
                    }}
                >
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default Filter;

