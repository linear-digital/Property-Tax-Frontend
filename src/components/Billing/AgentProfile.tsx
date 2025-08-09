/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { fetcher } from '../../util/axios.instance';
import { Button, Card, Spin, Table } from 'antd';
import type { User } from '../../types/user';
import moment from 'moment';

const AgentProfile = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['agent-profile'],
        queryFn: async () => {
            const res = await fetcher({
                path: `/user/single/${id}`,
                method: 'GET',
            });
            return res;
        }
    });
    const { data: earnings, isLoading: isLoadingEarnings } = useQuery({
        queryKey: ['agent-commissions', id],
        queryFn: async () => {
            const res = await fetcher({
                path: `/commission/user/${id}`,
                method: 'GET',
            });
            return res;
        },
        enabled: !!id
    });
    const [totalEarnings, setTotalEarnings] = React.useState(0);
    useEffect(() => {
        const earningsTotal = earnings?.reduce((acc: any, curr: any) => acc + curr.amount, 0);
        setTotalEarnings(earningsTotal);
    }, [earnings])
    const user: User = data;

    if (isLoading || isLoadingEarnings) {
        return <Spin fullscreen />
    }
    return (
        <div className='py-5'>
            <h2 className='dark:text-white text-dark text-xl font-semibold mb-5'>
                Agent Profile - {user?.name}
            </h2>
            <Card >
                <h4 className="mb-2">
                    <strong>Email</strong> : {user?.email}
                </h4>
                <h4 className="mb-2">
                    <strong>Float Balance</strong> : ${user?.float_balance}
                </h4>
                <h4 className="">
                    <strong>Total Earnings: </strong> : ${totalEarnings}
                </h4>

            </Card>
            <div className="bg-white dark:bg-dark py-4 mt-5 rounded-lg">
                <h2 className='dark:text-white text-dark text-lg font-semibold mb-5 px-4'>
                    Commission Earnings
                </h2>
                <Table
                    pagination={false}
                    dataSource={earnings}
                    loading={isLoadingEarnings}
                    columns={[
                        {
                            title: "Date Earned",
                            dataIndex: "createdAt",
                            key: "createdAt",
                            render: (text) => moment(text).format('YYYY-MM-DD')
                        }, {
                            title: "Transaction Reference",
                            dataIndex: "reference",
                            key: "reference",
                        }, {
                            title: "Commission Amount ($)",
                            dataIndex: "amount",
                            key: "amount",
                            render: (text) => <span className='font-semibold'>${text}</span>
                        }, {
                            title: "Invoice Paid",
                            dataIndex: "Invoice Paid",
                            key: "Invoice Paid",
                            render: (text, data: any) => {
                                return data?.invoice_id ? <Link to={`/billing/invoice/${data?.invoice_id}`}><Button >View Invoice</Button></Link> : null
                            }
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default AgentProfile;