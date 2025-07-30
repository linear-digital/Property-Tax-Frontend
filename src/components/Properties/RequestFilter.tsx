import React from 'react';
import { Date, Input, InputSelect } from '../global/InputFeilds';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faRefresh } from '@fortawesome/free-solid-svg-icons';

const RequestFilter = () => {
    return (
        <div className='p-4 bg-white dark:bg-background-dark mt-5 rounded-lg '>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input label='Property Code' />
                <InputSelect
                    label='User'
                    options={[
                        { value: 'user1', label: 'User 1' },
                        { value: 'user2', label: 'User 2' },
                        { value: 'user3', label: 'User 3' },
                        { value: 'user4', label: 'User 4' },
                    ]}
                />
                <Date label='Start Date' />
                <Date label='End Date' />
            </div>
            <div className="flex items-center justify-center mt-5 gap-x-3">
                <Button type='primary' size='large'>
                    <div className="text-sm">
                        <FontAwesomeIcon icon={faFilter} />   Filter
                    </div>
                </Button>
                <Button type='primary' size='large'>
                    <div className="text-sm">
                        <FontAwesomeIcon icon={faRefresh} />   Clear Filter
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default RequestFilter;