/* eslint-disable @typescript-eslint/no-explicit-any */
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popconfirm, Table } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { fetcher } from '../../util/axios.instance';
import { useQuery } from '@tanstack/react-query';
import { errorMessage } from '../../util/errorMessage';

const Index = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            return await fetcher({
                path: '/location/district'
            })
        }
    });
    const deleteRegion = async (id: string) => {
        try {
            await fetcher({
                path: `/location/district/${id}`,
                method: 'DELETE'
            });
            refetch();
            toast.success('District deleted successfully');
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    return (
        <div className='py-5'>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl dark:text-white text-dark font-semibold ">Districts</h1>
                <Link to={'/locations/add-district'}>
                    <Button size='large' type='primary' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        <FontAwesomeIcon icon={faPlus} />  Add New District</Button>
                </Link>
            </div>
            <Table
                bordered
                dataSource={data}
                loading={isLoading}
                className='mt-5'
                columns={[
                    {
                        title: "District Name",
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: "Code",
                        dataIndex: 'code',
                        key: 'code',
                    }, {
                        title: "Region",
                        dataIndex: 'region',
                        key: 'region',
                    },
                    {
                        title: "Actions",
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (text, record: any) => (
                            <div className='flex gap-2'>
                                <Link to={`/locations/districts/${record?._id}`}>
                                    <Button type='primary' className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                                        <FontAwesomeIcon icon={faPen} />  Edit</Button>
                                </Link>
                                <Popconfirm title="Are you sure to delete this state?"
                                    onConfirm={() => deleteRegion(record?._id)}
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