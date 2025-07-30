import { faFileExcel, faFilePdf, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Table } from 'antd';
import React from 'react';
import CreateNewUser from './CreateNewUser';

const Users = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div className='py-5'>
            <CreateNewUser
                open={open}
                setOpen={setOpen}
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
                        dataIndex: 'Branch',
                        key: 'Branch',
                    },
                    {
                        title: "Roles",
                        dataIndex: 'Roles',
                        key: 'Roles',
                    },
                    {
                        title: "Action",
                        dataIndex: 'Action',
                        key: 'Action',
                    }
                ]}
            />
        </div>
    );
};

export default Users;