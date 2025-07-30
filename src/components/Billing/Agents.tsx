import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Table } from 'antd';
import React from 'react';
import { Input, InputSelect } from '../global/InputFeilds';

const Agents = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div className='py-5'>
            <h3 className='text-xl dark:text-white text-dark font-semibold'>Agents</h3>
            <Button
                onClick={() => setOpen(true)}
                type="primary" size="large" className="my-4 ">
                <span className='text-sm'>
                    <FontAwesomeIcon icon={faPlus} />  Add New Agent
                </span>
            </Button>
            <Table
                columns={[
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                    }, {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    }, {
                        title: 'Phone Number',
                        dataIndex: 'phone',
                        key: 'phone',
                    }, {
                        title: 'Float Balance',
                        dataIndex: 'floatBalance',
                        key: 'floatBalance',
                    }, {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                    }, {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                    },
                ]}
            />
            <Modal
                title="Add New Agent"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width={800}
            >
                <form action="" className='mt-5 flex flex-col gap-y-4'>
                    <InputSelect label="Agent" options={[
                        { value: 'agent1', label: 'Agent 1' },
                        { value: 'agent2', label: 'Agent 2' },
                        { value: 'agent3', label: 'Agent 3' },
                    ]} />
                    <Input label='Initial Float Balance' type='number' />
                    <div>
                        <Button type="primary">
                        Submit
                    </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Agents;