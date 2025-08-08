/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Modal, Table } from 'antd';
import React from 'react';
import PaymentFilter from './PaymentFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faEye, faFile, faFileExcel, faFilePdf, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddPayment from './AddPayment';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import moment from 'moment';

const InvoicePayments = ({ page }: { page: string }) => {
    const [open, setOpen] = React.useState(false)
    const { data, isLoading } = useQuery({
        queryKey: ['invoice-payments'],
        queryFn: async () => {
            const data = await fetcher({
                path: `/payment`
            })
            return data
        }
    });

    const columns = [
        {
            title: 'Invoice Number',
            dataIndex: 'invoiceNumber',
            key: 'invoiceNumber',
            render: (invoiceNumber: string, record: any) => record?.invoice_id?.invoice_id,
        },
        {
            title: 'Property Code',
            dataIndex: 'property_code',
            key: 'property_code',
        },
        {
            title: 'Invoice Amount ($)',
            dataIndex: 'amount',
            key: 'amount',
            render: (text: string) => `$${text}`,
        },
        {
            title: 'Discount ($',
            dataIndex: 'discount',
            key: 'discount',
            render: (text: string) => `$${text}`,
        },
        {
            title: 'Amount Paid ($)',
            dataIndex: 'paid_amount',
            key: 'paid_amount',
            render: (text: string) => `$${text}`,
        },
        {
            title: 'Difference ($)',
            dataIndex: 'discount',
            key: 'discount',
            render: (text: string) => `$${text}`,
        },
        {
            title: 'Payment Method',
            dataIndex: 'payment_method',
            key: 'payment_method',
        },
        {
            title: 'Transaction Reference',
            dataIndex: 'reference',
            key: 'reference',
        },
        {
            title: 'Date Paid',
            dataIndex: 'payment_date',
            key: 'payment_date',
            render: (text: string) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Agent',
            dataIndex: 'agent',
            key: 'agent',
            render: (agent: boolean) => agent || "N/A",
        },
        {
            title: "Discounted?",
            dataIndex: 'discounted',
            key: 'discounted',
            render: (discounted: boolean, record: any) => <div className='flex flex-col items-center'>
                {discounted ? <button className='bg-green-500 py-[3px] px-4 rounded-md text-xs text-white'>Discounted</button> : <button className='bg-primary py-[3px] px-4 rounded-md text-xs text-white'>Not Discounted</button>}
                {
                    discounted && <span className='text-xs'>
                        Discount: ${record?.discount}
                    </span>
                }
            </div>,
        },
        {
            title: "Authorized?",
            dataIndex: 'authorized',
            key: 'authorized',
            render: (discounted: boolean) => discounted ? <button className='bg-green-500 py-[3px] px-4 rounded-md text-xs text-white'>Yes</button> : <button className='bg-primary py-[3px] px-4 rounded-md text-xs text-white'>No</button>,
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (text: string, record: any) => <Dropdown
                trigger={['click']}
                menu={{
                    items: [
                        {
                            key: '1',
                            onClick: () => console.log(record),
                            label: <button>
                                <FontAwesomeIcon icon={faFile} /> Generate Discount Topup Invoice
                            </button>,
                        },
                        {
                            key: '2',
                            onClick: () => console.log(record),
                            label: <button>
                                <FontAwesomeIcon icon={faFilePdf} /> Receipt
                            </button>,
                        }, {
                            key: '3',
                            onClick: () => console.log(record),
                            label: <button>
                                <FontAwesomeIcon icon={faCertificate} /> Tax Certificate
                            </button>,
                        },
                    ],
                }}
            >
                <Button type='primary'>Action</Button>
            </Dropdown>
        }
    ];

    return (
        <div className='py-5'>
            <h3 className='text-xl dark:text-white text-dark font-semibold mb-4'>
                {
                    page === 'unauthorized' ? 'Unauthorized Payments' : page === "authorised" ? 'Authorised Payments' : "Invoice Payments"
                }
            </h3>
            {
                page === 'payments' && <Button type="primary" size="large" className="mb-4"
                    onClick={() => setOpen(true)}
                >
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
            <Modal open={open} onCancel={() => setOpen(false)} footer={null} title="Add Payment"
                width={1000}
            >
                <AddPayment />
            </Modal>

            <Table
                size="middle"
                dataSource={data?.data}
                loading={isLoading}
                scroll={{ x: 'max-content' }}
                className='mt-5'
                bordered={false}
                columns={columns}
                pagination={false}
            />
        </div>
    );
};

export default InvoicePayments;