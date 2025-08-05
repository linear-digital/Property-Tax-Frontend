/* eslint-disable @typescript-eslint/no-explicit-any */
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { Button, Popconfirm, Table } from 'antd';
import React from 'react';
import { Link } from 'react-router';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import { useUser } from '../../contexts/UserContext';
import NoPermission from '../global/NoPermission';

const Index = () => {
    const { permissions } = useUser();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['regions'],
        queryFn: async () => {
            return await fetcher({
                path: '/location/region'
            })
        }
    });
    const deleteRegion = async (id: string) => {
        try {
            await fetcher({
                path: `/location/region/${id}`,
                method: 'DELETE'
            });
            refetch();
            toast.success('Region deleted successfully');
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    if (!permissions.includes('region-Manage')) {
        return <NoPermission />
    }
    return (
        <div className='py-5'>
            <div className="flex justify-between items-center">
                <h1 className="text-xl dark:text-white text-dark font-semibold mb-4">Regions</h1>
                <Link to={'/locations/add-region'}
                    style={{
                        display: permissions.includes('region-create') ? 'block' : 'none'
                    }}
                >
                    <Button size='large' type='primary' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        <FontAwesomeIcon icon={faPlus} />  Add New Region</Button>
                </Link>
            </div>
            <Table
                style={{
                    display: permissions.includes('region-view') ? 'block' : 'none'
                }}
                bordered
                loading={isLoading}
                dataSource={data}
                className='mt-5'
                columns={[
                    {
                        title: "Region Name",
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: "Code",
                        dataIndex: 'code',
                        key: 'code',
                    }, {
                        title: "State",
                        dataIndex: 'state',
                        key: 'state',
                    },
                    {
                        title: "Actions",
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (text, record: any) => (
                            <div className='flex gap-2'>
                                <Link to={`/locations/regions/${record?._id}`}
                                    style={{
                                        display: permissions.includes('region-edit') ? 'block' : 'none'
                                    }}
                                >
                                    <Button type='primary' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                                        <FontAwesomeIcon icon={faPen} />  Edit</Button>
                                </Link>
                                <Popconfirm title="Are you sure to delete this region?"
                                    onConfirm={() => deleteRegion(record?._id)}
                                    style={{
                                        display: permissions.includes('region-delete') ? 'block' : 'none'
                                    }}
                                >
                                    <Button

                                        danger type='primary' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                                        <FontAwesomeIcon icon={faTrash} />  Delete</Button>
                                </Popconfirm>
                            </div>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default Index;