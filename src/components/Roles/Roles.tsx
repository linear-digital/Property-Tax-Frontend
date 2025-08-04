/* eslint-disable @typescript-eslint/no-explicit-any */
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { Button, Popconfirm, Table } from 'antd';
import { Link } from 'react-router';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';

const Roles = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['roles'],
        queryFn: async () => {
            const res = await fetcher({
                path: '/role'
            })
            return res
        }
    })
    const deleteRole = async (id: string) => {
        try {
            await fetcher({
                path: `/role/${id}`,
                method: 'DELETE'
            })
            refetch()
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    return (
        <div className='py-5'>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl dark:text-white text-dark font-semibold ">Roles</h1>
                <Link to={'/roles/create'}>
                    <Button size='large' type='primary' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        <FontAwesomeIcon icon={faPlus} />  Add New Role</Button>
                </Link>
            </div>

            <Table
                dataSource={data || []}
                loading={isLoading}
                className='mt-5'
                columns={[
                    {
                        title: "No.",
                        dataIndex: 'name',
                        key: 'name',
                        render: (name, record, index) => index + 1
                    }, {
                        title: "Role Name",
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: "Actions",
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (text, record: any) => (
                            <div className="flex justify-start items-center gap-x-2">
                                <Link to={`/roles/${record?._id}`}>
                                    <Button type='primary' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                                        <FontAwesomeIcon icon={faPen} />  Edit</Button>
                                </Link>
                                <Popconfirm title="Are you sure to delete this role?"
                                    onConfirm={() => deleteRole(record?._id)}
                                >
                                    <Button danger>
                                        <FontAwesomeIcon icon={faTrash} />          Delete
                                    </Button>
                                </Popconfirm>
                            </div>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default Roles;