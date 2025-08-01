import { Button, Table } from 'antd';
import React from 'react';
import PaymentFilter from './PaymentFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPlus } from '@fortawesome/free-solid-svg-icons';

const InvoicePayments = ({ page }: { page: string }) => {

    const columns = [
        {
            title: 'Invoice Number',
            dataIndex: 'invoiceNumber',
            key: 'invoiceNumber',
        },
        {
            title: 'Property Code',
            dataIndex: 'propertyCode',
            key: 'propertyCode',
        },
        {
            title: 'Annual Tax ($)',
            dataIndex: 'annualTax',
            key: 'annualTax',
        },
        {
            title: 'Admin Fee ($)',
            dataIndex: 'adminFee',
            key: 'adminFee',
        },
        {
            title: 'Total Due ($)',
            dataIndex: 'totalDue',
            key: 'totalDue',
        },
        {
            title: 'Total Overdue ($)',
            dataIndex: 'totalOverdue',
            key: 'totalOverdue',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
        },
        {
            title: 'Agent',
            dataIndex: 'agent',
            key: 'agent',
        },
        {
            title: 'Disputed',
            dataIndex: 'disputed',
            key: 'disputed',
            render: (disputed: boolean) => (disputed ? 'Yes' : 'No'),
        },
    ];
    return (
        <div className='py-5'>
            <h3 className='text-xl dark:text-white text-dark font-semibold mb-4'>
                {
                    page === 'unauthorized' ? 'Unauthorized Payments' : page === "authorised" ? 'Authorised Payments' : "Invoice Payments"
                }
            </h3>
            {
                page === 'payments' && <Button type="primary" size="large" className="mb-4">
                    <FontAwesomeIcon icon={faPlus} />  Add Payment
                </Button>
            }
            <PaymentFilter />
            {
                page === 'payments' &&
                <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                    <FontAwesomeIcon icon={faFileExcel} />   Download Excel
                </button>
            }


            <Table
                scroll={{ x: 'max-content' }}
                className='mt-5'
                bordered={false}
                columns={columns}
            />
        </div>
    );
};

export default InvoicePayments;