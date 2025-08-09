/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import PaymentFilter from './PaymentFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCertificate, faCheck, faFile, faFileExcel, faFilePdf, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddPayment from './AddPayment';
import { fetcher } from '../../util/axios.instance';
import moment from 'moment';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';

const InvoicePayments = ({ page }: { page: string }) => {
    const [open, setOpen] = React.useState(false)
    const [filters, setFilters] = useState<any>({
        invoice_number: "",
        agent: "",
        payment_method: "",
        stateDate: "",
        endDate: "",
    })
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)
    const [fetch, setFetch] = useState(73)
    const refetch = () => (
        setFetch(fetch + 1)
    )
    const fetchData = async () => {
        try {
            setIsLoading(true)
            if (page === 'unauthorized') {
                fetcher({
                    path: `/payment`,
                    params: {
                        authorized: false,
                        ...filters
                    }
                }).then((res: any) => {
                    setData(res)
                })
            }
            else if (page === 'authorized') {
                fetcher({
                    path: `/payment`,
                    params: {
                        authorized: true,
                        ...filters
                    }
                }).then((res: any) => {
                    setData(res)
                })
            }
            else {
                fetcher({
                    path: `/payment`,
                    params: {
                        ...filters
                    }
                }).then((res: any) => {
                    setData(res)
                })
            }
        } catch (error) {
            toast.error(errorMessage(error))
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [page, fetch])
    const authorizePayment = async (id: string) => {
        try {
            await fetcher({
                path: `/payment/${id}/authorize`,
                method: 'PUT',
            })
            refetch()
            toast.success('Payment authorized successfully')
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
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
            render: (_: any, record: any) => {
                return record?.agent?.name || 'N/A'
            },
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
            render: (authorized: boolean, record: any) => record?.authorized ? <button className='bg-green-500 py-[3px] px-4 rounded-md text-xs text-white'>Yes</button> : <button className='bg-primary py-[3px] px-4 rounded-md text-xs text-white'>No</button>,
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
                            style: {
                                display: (page === 'unauthorized' || page === 'authorized') ? 'none' : 'block'
                            }
                        },
                        {
                            key: "5",
                            type: "divider",
                            style: {
                                display: page === 'unauthorized' ? 'none' : 'block'
                            }
                        },
                        {
                            key: '2',
                            onClick: () => console.log(record),
                            label: <button>
                                <FontAwesomeIcon icon={faFilePdf} /> Receipt
                            </button>,
                            style: {
                                display: page === 'unauthorized' ? 'none' : 'block'
                            }
                        },
                        {
                            key: "5",
                            type: "divider",
                            style: {
                                display: page === 'unauthorized' ? 'none' : 'block'
                            }
                        },
                        {
                            key: '33',
                            onClick: () => console.log(record),
                            label: <button>
                                <FontAwesomeIcon icon={faCertificate} /> Tax Certificate
                            </button>,
                            style: {
                                display: page === 'unauthorized' ? 'none' : 'block'
                            }
                        },

                        {
                            key: '4',
                            onClick: () => authorizePayment(record?._id),
                            label: <button>
                                <FontAwesomeIcon icon={faCheck} /> Make Authorize
                            </button>,
                            style: {
                                display: page === 'unauthorized' ? 'block' : 'none'
                            }
                        },
                        {
                            key: "554",
                            type: "divider",
                            style: {
                                display: page === 'unauthorized' ? 'block' : 'none'
                            }
                        },
                        {
                            key: '434',
                            onClick: () => console.log(record),
                            label: <button className='text-red-500'>
                                <FontAwesomeIcon icon={faBan} /> Reject Payment
                            </button>,
                            style: {
                                display: page === 'unauthorized' ? 'block' : 'none'
                            }
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
            <PaymentFilter refetch={refetch} filters={filters} setFilters={setFilters} />
            {
                page === 'payments' &&
                <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                    <FontAwesomeIcon icon={faFileExcel} />   Download Excel
                </button>
            }
            <Modal open={open} onCancel={() => setOpen(false)} footer={null} title="Add Payment"
                width={1000}
            >
                <AddPayment refetch={refetch} />
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