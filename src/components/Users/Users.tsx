import { faEye, faFileExcel, faFilePdf, faKey, faPen, faPlus, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, Input, Popconfirm, Spin, Table, Tag } from 'antd';
import React from 'react';
import CreateNewUser from './CreateNewUser';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import type { User } from '../../types/user';
import type { Role } from '../../types/role';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import { useUser } from '../../contexts/UserContext';
import NoPermission from '../global/NoPermission';
import DownloadUserList from './PdfDownload';
import UsersListExcel from './DownloadAsExcel';
import { Link } from 'react-router';


const Users = () => {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);
    const [query, setQuery] = React.useState<string>('');
    const { permissions } = useUser();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users', query],
        queryFn: async () => {
            const res = await fetcher({
                path: `/user${query ? `?query=${query}` : ''}`
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
    const deleteUser = async (id: string) => {
        try {
            await fetcher({
                path: `/user/${id}`,
                method: 'DELETE'
            })
            refetch()
            toast.success('User deleted successfully')
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    const resetPassword = async (id: string) => {
        try {
            await fetcher({
                path: `/user/reset/${id}`,
                method: 'POST'
            });
            toast.success('Password reset mail sent Check mail')
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    const date = new Date();
    const filename = `users_list_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xlsx`;
    if (
        !permissions.includes('user-Manage')
    ) {
        return <NoPermission />;
    }

    if (isLoading) {
        return <Spin fullscreen />
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
                    onSearch={(e) => setQuery(e)}
                    allowClear
                    className='max-w-[700px]'
                    size='large'
                    placeholder='Search By name, email, role, state, region, district, village or branch'
                />
                <div className="flex items-center gap-3 justify-end flex-wrap">
                    {
                        permissions.includes('user-create') &&
                        <Button size='large' type='primary'
                            onClick={() => setOpen(true)}
                        >
                            <FontAwesomeIcon icon={faPlus} />   Create New User
                        </Button>
                    }
                    <Button size='large' >
                        <FontAwesomeIcon icon={faFilePdf} />
                        <DownloadUserList users={data as User[]} />
                    </Button>
                    <Button size='large' >
                        <FontAwesomeIcon icon={faFileExcel} />
                        {/* Download All In Excel */}
                        <UsersListExcel
                            users={data}
                            filename={filename}
                        />
                    </Button>
                </div>
            </div>
            {
                permissions.includes('user-view') &&
                <Table
                    dataSource={data}
                    loading={isLoading}
                    className='mt-5'
                    rowKey={'_id'}
                    bordered
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
                                                style: {
                                                    display: permissions.includes('user-view') ? 'block' : 'none'
                                                },
                                                
                                                label: <Link to={`/users/list/${record._id}`}>
                                                    <FontAwesomeIcon icon={faEye} />                                                Show
                                                </Link>,
                                            },
                                            {
                                                key: '3',
                                                onClick: () => disableUser(record._id, record.disabled),
                                                label: <button
                                                    className={record.disabled ? 'text-red-500' : 'text-green-500'}

                                                >
                                                    <FontAwesomeIcon icon={faPowerOff} />                                                {
                                                        record.disabled ? 'Disabled' : 'Enabled'
                                                    }
                                                </button>,
                                            },
                                            {
                                                key: '4',
                                                onClick: () => resetPassword(record._id),
                                                label: <button>
                                                    <FontAwesomeIcon icon={faKey} />                                                Reset Password
                                                </button>,
                                            },
                                            {
                                                key: 'Edit',
                                                style: {
                                                    display: permissions.includes('user-edit') ? 'block' : 'none'
                                                },
                                                onClick: () => {
                                                    setUser(record)
                                                    setOpen(true)
                                                },
                                                label: <button

                                                >
                                                    <FontAwesomeIcon icon={faPen} />                                                Edit
                                                </button>,
                                            },
                                            {
                                                key: 'Delete',
                                                style: {
                                                    display: permissions.includes('user-delete') ? 'block' : 'none'
                                                },
                                                label: <Popconfirm
                                                    title="Are you sure to delete this user?"
                                                    onConfirm={() => deleteUser(record._id)}
                                                >

                                                </Popconfirm>,
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
            }
        </div>
    );
};

export default Users;