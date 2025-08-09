/* eslint-disable @typescript-eslint/no-explicit-any */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Popconfirm, Spin, Table, Tag } from 'antd';
import React from 'react';
import { Input, InputSelect, TextArea } from '../global/InputFeilds';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import moment from 'moment';
import { errorMessage } from '../../util/errorMessage';

const AgentFloat = () => {
    const approve = async (id: string) => {
        try {
            await fetcher({
                path: `/float/approve/${id}`,
                method: 'PUT',
            });
            refetch()
            toast.success('Transaction approved successfully')
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }

    const reject = async (id: string) => {
        try {
            await fetcher({
                path: `/float/reject/${id}`,
                method: 'PUT',
            });
            refetch()
            toast.success('Transaction rejected successfully')
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    const columns = [
        {
            title: 'Agent Name',
            dataIndex: 'agentName',
            key: 'agentName',
            render: (_: any, record: any) => {
                return `${record?.agent?.name}`
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_: any, record: any) => {
                return `${record?.agent?.email}`
            },
        },
        {
            title: 'Float Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (_: any, record: any) => {
                return `$${record?.amount}`
            },
        },
        {
            title: 'Transaction Type',
            dataIndex: 'trx_type',
            key: 'trx_type',
            render: (_: any, record: any) => {
                return <span className="capitalize">
                    {record?.trx_type}
                </span>
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => {
                return <span className="capitalize">
                    {text || "N/A"}
                </span>
            }
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_: any, record: any) => {
                return <span >
                    {moment(record?.createdAt).format("DD-MM-YYYY")}
                </span>
            }
        },
        {
            title: 'Approved',
            dataIndex: 'approved',
            key: 'approved',
            render: (_: any, record: any) => {
                return <Tag color={record?.approved ? "green" : "red"}>
                    {record?.approved ? "Yes" : "No"}
                </Tag>
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: any, record: any) => {
                return <div className='flex gap-2'>
                    <Button type='primary' size='small'
                        onClick={() => approve(record?._id)}
                    >Approve</Button>
                    <Popconfirm title="Are you sure to reject this transaction?"
                        onConfirm={() => reject(record?._id)}
                    >
                        <Button danger type='primary' size='small'>Reject</Button>
                    </Popconfirm>
                </div>
            }
        },
    ];
    const [open, setOpen] = React.useState(false);
    const { data, isLoading } = useQuery({
        queryKey: ['agents'],
        queryFn: async () => {
            const res = await fetcher({
                path: `/user?query=Agent`,
                method: 'GET',
            });
            return res;
        }
    });
    const [newTrx, setNewTrx] = React.useState({
        agent: "",
        amount: 0,
        trx_type: "",
        description: "",
    })
    const createTrx = async () => {
        try {
            if (!newTrx.agent || !newTrx.amount || !newTrx.trx_type) {
                return toast.error("Please fill all the fields")
            }
            await fetcher({
                path: '/float',
                method: "POST",
                body: newTrx
            })
            toast.success("Transaction created successfully")
            refetch()
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }
    const { data: transactions, isLoading: isLoadingTransactions, refetch } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const res = await fetcher({
                path: '/float',
                method: 'GET',
            });
            return res;
        }
    })
    if (isLoading || isLoadingTransactions) {
        return <Spin fullscreen />
    }
    return (
        <div className='py-5'>
            <h3 className='text-xl dark:text-white text-dark font-semibold mb-5'>
                Agent Float Transactions
            </h3>
            <Button
                onClick={() => setOpen(true)}
                type="primary" size="large" className="mb-4">
                <div className="text-sm">
                    <FontAwesomeIcon icon={faPlus} />  Process Float
                </div>
            </Button>
            <Table
                rowKey={'_id'}
                dataSource={transactions}
                loading={isLoadingTransactions}
                columns={columns}
                scroll={{ x: 'max-content' }}
            />
            <Modal
                title="Process Agent Float"
                open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} footer={false}>
                <form action="" className='mt-5 flex flex-col gap-y-4'>
                    <InputSelect
                        value={newTrx.agent}
                        onChange={(value) => setNewTrx({ ...newTrx, agent: value })}
                        label="Agent" options={
                            data?.map((agent: any) => ({ value: agent._id, label: agent.name }))
                        } />
                    <Input label='Amount' type='number'
                        value={newTrx.amount}
                        onChange={(e) => setNewTrx({ ...newTrx, amount: Number(e.target.value) })}
                    />
                    <InputSelect
                        value={newTrx.trx_type}
                        onChange={(value) => setNewTrx({ ...newTrx, trx_type: value })}
                        label="Transaction Type" options={[
                            { value: 'deposit', label: 'Deposit' },
                            { value: 'withdraw', label: 'Withdraw' },
                            { value: 'reload', label: 'Reload' },

                        ]} />
                    <TextArea label='Description' />
                    <div>
                        <Button
                            onClick={createTrx}
                            type="primary">
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AgentFloat;