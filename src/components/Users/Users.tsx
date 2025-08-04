import { faEye, faFileExcel, faFilePdf, faKey, faPen, faPlus, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, Input, Table, Tag } from 'antd';
import React from 'react';
import CreateNewUser from './CreateNewUser';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import type { User } from '../../types/user';
import type { Role } from '../../types/role';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';

const Users = () => {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetcher({
                path: '/user'
            })
            return res
        }
    });
    const disableUser = async (id: string, status: boolean) => {
        try {
            await fetcher({
                path: `/user/${id}`,
                method: 'PUT',
                body: {
                    disabled: !status
                }
            })
            refetch()
            toast.success('User updated successfully')
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    return (
        <div className='py-5'>
            <CreateNewUser
                refetch={refetch}
                open={open}
                setOpen={setOpen}
                tergetUser={user as User}
            />
            <div className="flex items-center justify-between flex-wrap gap-5">
                <Input.Search
                    className='max-w-[700px]'
                    size='large'
                    placeholder='Search By name, email, role, state, region, district, village or branch'
                />
                <div className="flex items-center gap-3 justify-end flex-wrap">
                    <Button size='large' type='primary'
                        onClick={() => setOpen(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} />   Create New User
                    </Button>
                    <Button size='large' >
                        <FontAwesomeIcon icon={faFilePdf} />
                        Download All  In PDF
                    </Button>
                    <Button size='large' >
                        <FontAwesomeIcon icon={faFileExcel} />
                        Download All In Excel
                    </Button>
                </div>
            </div>
            <Table
                dataSource={data}
                loading={isLoading}
                className='mt-5'
                columns={[
                    {
                        title: "Name",
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: "Email",
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: "State",
                        dataIndex: 'state',
                        key: 'state',
                    },
                    {
                        title: "Region",
                        dataIndex: 'region',
                        key: 'region',
                    },
                    {
                        title: "District",
                        dataIndex: 'district',
                        key: 'district',
                    },
                    {
                        title: "Village",
                        dataIndex: 'village',
                        key: 'village',
                    },
                    {
                        title: "Branch",
                        dataIndex: 'branch',
                        key: 'branch',
                    },
                    {
                        title: "Roles",
                        dataIndex: 'role',
                        key: 'role',
                        render: (text, record: User) => {
                            return (
                                <>
                                    {
                                        record.roles.map((role: Role) => (
                                            <Tag key={role._id}>{role.name}</Tag>
                                        ))
                                    }
                                </>
                            )
                        }
                    },
                    {
                        title: "Action",
                        dataIndex: 'Action',
                        key: 'Action',
                        render: (text, record: User) => {
                            return <Dropdown
                                trigger={['click']}
                                menu={{
                                    items: [
                                        {
                                            key: '1',
                                            label: <button>
                                                <FontAwesomeIcon icon={faEye} />                                                Show
                                            </button>,
                                        },
                                        {
                                            key: '2',
                                            label: <button>
                                                <FontAwesomeIcon icon={faFilePdf} />                                                Download PDF
                                            </button>,
                                        },
                                        {
                                            key: '3',
                                            label: <button
                                                className={record.disabled ? 'text-red-500' : 'text-green-500'}
                                                onClick={() => disableUser(record._id, record.disabled)}
                                            >
                                                <FontAwesomeIcon icon={faPowerOff} />                                                {
                                                    record.disabled ? 'Disabled' : 'Enabled'
                                                }
                                            </button>,
                                        },
                                        {
                                            key: '4',
                                            label: <button>
                                                <FontAwesomeIcon icon={faKey} />                                                Reset Password
                                            </button>,
                                        },
                                        {
                                            key: '3',
                                            label: <button
                                                onClick={() => {
                                                    setUser(record)
                                                    setOpen(true)
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPen} />                                                Edit
                                            </button>,
                                        },
                                    ],
                                }}
                            >
                                <Button>Action</Button>
                            </Dropdown>
                        }
                    }
                ]}
            />
        </div>
    );
};

export default Users;