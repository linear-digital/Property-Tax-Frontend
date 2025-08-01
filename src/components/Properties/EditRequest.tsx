import React from 'react';
import RequestFilter from './RequestFilter';
import { Table } from 'antd';

const EditRequest = () => {
    return (
        <div className='py-5'>
            <h3 className='text-xl dark:text-white text-dark font-semibold'>Pending Property Edit Requests</h3>
            <RequestFilter />
            <Table
                className='mt-5'
                scroll={{ x: 'max-content' }}
                columns={[
                    {
                        title: 'Property Code',
                        dataIndex: 'propertyCode',
                        key: 'propertyCode',
                    },
                    {
                        title: 'Requested By',
                        dataIndex: 'requestedBy',
                        key: 'requestedBy',
                    },
                    {
                        title: 'Changes',
                        dataIndex: 'changes',
                        key: 'changes',
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
                    }
                ]}
            />
        </div>
    );
};

export default EditRequest;