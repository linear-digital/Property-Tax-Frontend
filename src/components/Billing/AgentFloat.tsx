import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Table } from 'antd';
import React from 'react';
import { Input, InputSelect, TextArea } from '../global/InputFeilds';

const AgentFloat = () => {
    const columns = [
        {
            title: 'Agent Name',
            dataIndex: 'agentName',
            key: 'agentName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Float Amount',
            dataIndex: 'floatAmount',
            key: 'floatAmount',
        },
        {
            title: 'Transaction Type',
            dataIndex: 'transactionType',
            key: 'transactionType',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Approved',
            dataIndex: 'approved',
            key: 'approved',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
        },
    ];
    const [open, setOpen] = React.useState(false);
    return (
        <div className='py-5'>
            <h3 className='text-xl dark:text-white text-dark font-semibold mb-5'>
                Agent Float Transactions
            </h3>
            <Button
                onClick={() => setOpen(true)}
                type="primary" size="large" className="mb-4">
                <div className="text-sm">
                    <FontAwesomeIcon icon={faPlus} />  Process Float
                </div>
            </Button>
            <Table columns={columns}
                scroll={{ x: 'max-content' }}
            />
            <Modal
                title="Process Agent Float"
                open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} footer={false}>
                <form action="" className='mt-5 flex flex-col gap-y-4'>
                    <InputSelect label="Agent" options={[
                        { value: 'agent1', label: 'Agent 1' },
                        { value: 'agent2', label: 'Agent 2' },
                        { value: 'agent3', label: 'Agent 3' },
                    ]} />
                    <Input label='Amount' type='number' />
                    <InputSelect label="Transaction Type" options={[
                        { value: 'deposit', label: 'Deposit' },
                        { value: 'withdraw', label: 'Withdraw' },
                        { value: 'reload', label: 'Reload' },

                    ]} />
                    <TextArea label='Description' />
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

export default AgentFloat;