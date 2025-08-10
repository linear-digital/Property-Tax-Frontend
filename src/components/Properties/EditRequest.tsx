/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import RequestFilter from './RequestFilter';
import { Button, Popover, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import { useUser } from '../../contexts/UserContext';
import NoPermission from '../global/NoPermission';

const EditRequest = () => {
    const [filters, setFilters] = React.useState({
        property_code: '',
        user: '',
        startDate: '',
        endDate: ''
    })
    const { permissions } = useUser();
    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ['edit-requests'],
        queryFn: async () => {
            const res = await fetcher({
                path: '/property/edit-request',
                params: filters
            })
            return res
        }
    });
    const acceptRequest = async (id: string) => {
        try {
            await fetcher({
                path: `/property/accept-request/${id}`,
                method: 'PUT',
            })
            refetch()
            toast.success('Request accepted successfully')
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    const rejectEditRequest = async (id: string) => {
        try {
            await fetcher({
                path: `/property/edit-request/${id}`,
                method: 'DELETE',
            })
            refetch()
            toast.success('Request rejected successfully')
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    if (!permissions.includes('property-edit')) {
        return <NoPermission />
    }
    return (
        <div className='py-5'>
            <h3 className='text-xl dark:text-white text-dark font-semibold'>Pending Property Edit Requests</h3>
            <RequestFilter refetch={refetch} filters={filters} setFilters={setFilters} />
            <Table
                dataSource={data?.data}
                loading={isLoading}
                className='mt-5'
                scroll={{ x: 'max-content' }}
                columns={[
                    {
                        title: 'Property Code',
                        dataIndex: 'property_code',
                        key: 'property_code',
                    },
                    {
                        title: 'Requested By',
                        dataIndex: 'requestedBy',
                        key: 'requestedBy',
                        render: (text, record: any) => record?.user?.name
                    },
                    {
                        title: 'Changes',
                        dataIndex: 'changes',
                        key: 'changes',
                        render: (text, record: any) => {
                            const mapped = Object.keys(record?.changes || {}).map(key => {
                                return {
                                    key: key,
                                    value: record?.changes[key],
                                };
                            });
                            return <Popover title="Changes"
                                content={
                                    <ul>
                                        {
                                            mapped.map((item: any) => {
                                                return <li
                                                    className='capitalize'
                                                >{item.key}: {item.value}</li>
                                            })
                                        }
                                    </ul>
                                }
                            >
                                <Button size='small'>See Changes</Button>
                            </Popover>
                        }
                    },
                    {
                        title: 'Justification Images',
                        dataIndex: 'images',
                        key: 'images',
                    },
                    {
                        title: 'Actions',
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (_: any, record: any) => (
                            <div className='flex gap-2'>
                                <Button loading={isFetching} type='primary' size='small' onClick={() => acceptRequest(record?._id)}>Accept</Button>
                                <Button danger loading={isFetching} type='primary' size='small' onClick={() => rejectEditRequest(record?._id)}>Reject</Button>
                            </div>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default EditRequest;