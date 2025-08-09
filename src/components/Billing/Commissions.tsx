/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ACom_ReportGen from './ACom_ReportGen';
import { Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import moment from 'moment';

const Commissions = () => {
    const { data: agents } = useQuery({
        queryKey: ['agents'],
        queryFn: async () => {
            const res = await fetcher({
                path: `/user?query=Agent`,
                method: 'GET',
            });
            return res;
        }
    })
    const [filters, setFilters] = React.useState({
        agent: '',
        startDate: '',
        endDate: ''
    })
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['all-commissions'],
        queryFn: async () => {
            const res = await fetcher({
                path: `/commission`,
                method: 'GET',
                params: {
                    user: filters.agent,
                    startDate: filters.startDate,
                    endDate: filters.endDate
                }
            });
            return res;
        }
    });
    return (
        <div className='py-5'>
            <h3 className='text-xl dark:text-white text-dark font-semibold mb-4'>
                Agent Commissions Report
            </h3>
            <ACom_ReportGen
                refetch={refetch}
                filters={filters}
                setFilters={setFilters}
                agents={agents} />
            <div className='mt-5 dark:bg-dark bg-white  rounded-md'>
                <h3 className='text-lg p-4 dark:text-white text-primary font-medium'>
                    Agent Commissions
                </h3>
                <Table
                    dataSource={data?.data}
                    loading={isLoading}
                    scroll={{ x: 'max-content' }}
                    columns={[
                        {
                            title: 'Agent Name',
                            dataIndex: 'agentName',
                            key: 'agentName',
                            render: (_: any, record: any) => `${record?.user?.name}`,
                        },
                        {
                            title: 'Invoice Number',
                            dataIndex: 'invoice_number',
                            key: 'invoice_number',
                        },
                        {
                            title: "Commission Amount ($)",
                            dataIndex: 'amount',
                            key: 'amount',
                            render: (text) => `$${text}`,
                        },
                        {
                            title: "Description",
                            dataIndex: 'invoice_number',
                            key: 'invoice_number',
                            render: (text) => `10% commission for processing invoice payment for invoice number: ${text}`,
                        },
                        {
                            title: "Earned At",
                            dataIndex: "createdAt",
                            key: "createdAt",
                            render: (text) => moment(text).format('YYYY-MM-DD')
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Commissions;