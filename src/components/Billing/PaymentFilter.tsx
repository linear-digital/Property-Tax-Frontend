/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "antd";
import { Date, Input, InputSelect } from "../global/InputFeilds";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../util/axios.instance";


const PaymentFilter = ({ filters, setFilters, refetch }: { filters: any, setFilters: any, refetch: any }) => {
    const { data } = useQuery({
        queryKey: ['agents'],
        queryFn: async () => fetcher({
            path: `/user?query=Agent`
        })
    })
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
                    value={filters.invoice_number}
                    onChange={(e) => setFilters({ ...filters, invoice_number: e.target.value })}
                />
                <InputSelect 
                value={filters.agent}
                onChange={(value) => setFilters({ ...filters, agent: value })}
                label="Agent" options={
                    data?.map((agent: any) => ({ value: agent._id, label: agent.name }))
                } />
                <InputSelect
                    value={filters.payment_method}
                    onChange={(value) => setFilters({ ...filters, payment_method: value })}
                    label="Payment Method" options={[
                        { value: '', label: 'All' },
                        { value: 'Cash', label: 'Cash' },
                        { value: 'Bank Transfer', label: 'Bank Transfer' },
                        { value: 'Mobile Money', label: 'Mobile Money' },
                        { value: 'Cradit Card', label: 'Cradit Card' },

                    ]} />
                <InputSelect
                    value={filters.authorized ? 'Authorized' : filters.authorized === undefined ? 'all' : 'not_authorized'}
                    onChange={(value) => setFilters({ ...filters, authorized: value === 'Authorized' ? true : value === "all" ? undefined : false })}
                    label="Authorization" options={[
                        { value: 'all', label: 'All' },
                        { value: 'Authorized', label: 'Authorized' },
                        { value: 'not_authorized', label: 'Not Authorized' },

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
                    onClick={() => refetch()}
                >
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default PaymentFilter;

