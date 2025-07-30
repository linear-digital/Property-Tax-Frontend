import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table } from 'antd';
import React from 'react';
import { Link } from 'react-router';

const Index = () => {
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
                    },
                    {
                        title: "Actions",
                        dataIndex: 'actions',
                        key: 'actions',
                    }
                ]}
            />
        </div>
    );
};

export default Index;