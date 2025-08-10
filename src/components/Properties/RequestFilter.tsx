/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Date, Input, InputSelect } from '../global/InputFeilds';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import dayjs from 'dayjs';

const RequestFilter = ({ filters, setFilters, refetch }: { filters: any, setFilters: any, refetch: any }) => {
    const { data = [] } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetcher({
            path: '/user'
        })
    })
    return (
        <div className='p-4 bg-white dark:bg-background-dark mt-5 rounded-lg '>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input label='Property Code' 
                    value={filters.property_code}
                    onChange={(e) => setFilters({ ...filters, property_code: e.target.value })}
                />
                <InputSelect
                    value={filters.user}
                    onChange={(value) => setFilters({ ...filters, user: value })}
                    label='User'
                    options={
                        data?.map((user: any) => {
                            return {
                                value: user._id,
                                label: user.name
                            }
                        })
                    }
                />
                <Date label='Start Date'
                    value={filters.startDate ? dayjs(filters.startDate) : null}
                    onChange={(e: any) => {
                        setFilters({ ...filters, startDate: e.format('YYYY-MM-DD') })
                    }}
                />
                <Date label='End Date'
                    value={filters.endDate ? dayjs(filters.endDate) : null}
                    onChange={(e: any) => {
                        setFilters({ ...filters, endDate: e.format('YYYY-MM-DD') })
                    }}
                />
            </div>
            <div className="flex items-center justify-center mt-5 gap-x-3"

            >
                <Button type='primary' size='large'
                    onClick={() => refetch()}
                >
                    <div className="text-sm">
                        <FontAwesomeIcon icon={faFilter} />   Filter
                    </div>
                </Button>
                <Button type='primary' size='large'

                    onClick={() => {
                        setFilters({
                            property_code: '',
                            user: '',
                            startDate: '',
                            endDate: ''
                        })
                        refetch()
                    }}>
                    <div className="text-sm">
                        <FontAwesomeIcon icon={faRefresh} />   Clear Filter
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default RequestFilter;