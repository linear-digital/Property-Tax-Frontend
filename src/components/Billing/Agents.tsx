/* eslint-disable @typescript-eslint/no-explicit-any */
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Popconfirm, Table } from 'antd';
import React from 'react';
import { Input, InputSelect } from '../global/InputFeilds';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import type { User } from '../../types/user';
import EditAgent from './EditAgent';
import { Link } from 'react-router';
import { useUser } from '../../contexts/UserContext';
import NoPermission from '../global/NoPermission';

const Agents = () => {
    const [open, setOpen] = React.useState(false);
    const {permissions} = useUser();
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await fetcher({
                path: `/user`
            })
            return data
        }
    });
    const { data: agents = [], isLoading: agentsLoading, refetch } = useQuery({
        queryKey: ['Agents'],
        queryFn: async () => {
            const data = await fetcher({
                path: `/user/agents`
            })
            return data
        }
    });
    const [selectedUser, setSelectedUser] = React.useState<string>("");
    const [floatBalance, setFloatBalance] = React.useState<number>(500);
    const createAgent = async () => {
        try {
            await fetcher({
                path: '/user/create-agent',
                method: "POST",
                body: {
                    uid: selectedUser,
                    float_balance: floatBalance
                }
            })
            refetch();
            toast.success("Agent created successfully")
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    const [edit, setEdit] = React.useState(false);
    const [target, setTarget] = React.useState<User | null>(null);
    const deleteAgent = async (id: string) => {
        try {
            await fetcher({
                path: `/user/agent/${id}`,
                method: "DELETE",
            })
            toast.success("Agent deleted successfully")
            refetch();
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    if (!permissions?.includes('agent-Manage')) {
        return  <NoPermission />
    }
    return (
        <div className='py-5'>
            <EditAgent open={edit} setOpen={setEdit} agent={target as User} refetch={refetch}/>
            <h3 className='text-xl dark:text-white text-dark font-semibold'>Agents</h3>
            <Button
                onClick={() => setOpen(true)}
                type="primary" size="large" className="my-4 ">
                <span className='text-sm'>
                    <FontAwesomeIcon icon={faPlus} />  Add New Agent
                </span>
            </Button>
            <Table
                dataSource={agents}
                loading={agentsLoading}
                scroll={{ x: 'max-content' }}
                columns={[
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                    }, {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    }, {
                        title: 'Phone Number',
                        dataIndex: 'mobile',
                        key: 'mobile',
                    }, {
                        title: 'Float Balance',
                        dataIndex: 'float_balance',
                        key: 'float_balance',
                    }, {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: (status: string) => {
                            return <span className='capitalize'>{status}</span>
                        }
                    }, {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        render: (_: any, record: any) => {
                            return <div className='flex gap-x-2'>
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        setEdit(true)
                                        setTarget(record)
                                    }}
                                >
                                    Edit
                                </Button>
                                <Link to={`/billing/agents/${record._id}`}>
                                <Button
                                >
                                    View
                                </Button>
                                </Link>
                                <Popconfirm
                                    title="Are you sure to delete this agent?"
                                    onConfirm={() => deleteAgent(record._id)}
                                >
                                    <Button
                                >
                                    Delete
                                </Button>
                                </Popconfirm>
                            </div>
                        }
                    },
                ]}
            />
            <Modal
                title="Add New Agent"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width={800}
            >
                <form action="" className='mt-5 flex flex-col gap-y-4'>
                    <InputSelect
                        value={selectedUser}
                        onChange={setSelectedUser}
                        loading={isLoading} label="Agent"
                        options={users.map((user: any) => ({ value: user._id, label: user.name }))} />
                    <Input
                        value={floatBalance}
                        onChange={(e) => {
                            setFloatBalance(Number(e.target.value))
                        }}
                        label='Initial Float Balance' type='number' />
                    <div>
                        <Button type="primary"
                            onClick={createAgent}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Agents;