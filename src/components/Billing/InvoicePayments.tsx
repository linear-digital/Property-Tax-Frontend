/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import PaymentFilter from './PaymentFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCertificate, faCheck, faFile, faFileExcel, faPlus, faRotateBack } from '@fortawesome/free-solid-svg-icons';
import AddPayment from './AddPayment';
import { fetcher } from '../../util/axios.instance';
import moment from 'moment';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import InvoiceListExcel from './DownloadInvoicePaymentsExcel';
import PaymentReceiptDowload from './BillingTemplate/PaymentReceipt';
import { Link } from 'react-router';
import TaxCertificate from './BillingTemplate/TaxCertificate';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../../contexts/UserContext';

const InvoicePayments = ({ page }: { page: string }) => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = useState("");
    const { data: properties, refetch: refetchProperties } = useQuery({
        queryKey: ['properties', query],
        queryFn: async () => {
            const data = await fetcher({
                path: "/property/all",
                method: "POST",
                body: { notpaid: true, search: query, limit: 50 }
            });
            return data.data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
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
    const refetch = () => {
        setFetch(fetch + 1);
        refetchProperties();
    }

    const fetchData = async () => {
        try {
            setIsLoading(true)
            if (page === 'unauthorized') {
                fetcher({
                    path: `/payment`,
                    params: {
                        authorized: false,
                        payment_status: 'unauthorize',
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
                        payment_status: 'Approved',
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
                        ...filters,
                        payment_status: 'pending'
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
    const [loading, setLoading] = useState(false)
    const authorizePayment = async (id: string) => {
        try {
            setLoading(true)
            await fetcher({
                path: `/payment/${id}/authorize`,
                method: 'PUT',
            })
            refetch()
            toast.success('Payment authorized successfully')
        } catch (error) {
            toast.error(errorMessage(error))
        }
        finally {
            setLoading(false)
        }
    }
    const rejectPayment = async (id: string) => {
        try {
            setLoading(true)
            await fetcher({
                path: `/payment/${id}/unauthorize`,
                method: 'PUT',
            })
            refetch()
            toast.success('Payment unauthorize successfully')
        } catch (error) {
            toast.error(errorMessage(error))
        }
        finally {
            setLoading(false)
        }
    }
    const regeneratePayment = async (id: string) => {
        try {
            setLoading(true)
            await fetcher({
                path: `/payment/${id}/regenerate`,
                method: 'PUT',
            })
            refetch()
            toast.success('Payment unauthorize successfully')
        } catch (error) {
            toast.error(errorMessage(error))
        }
        finally {
            setLoading(false)
        }
    }
    const [openCertificate, setOpenCertificate] = useState(false);
    const [certificateData, setCertificateData] = useState<any>(null);
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
            render: (property_code: string, record: any) => record?.property_code?.code,
        },
        {
            title: 'Invoice Amount ($)',
            dataIndex: 'amount',
            key: 'amount',
            render: (text: string) => `$${text}`,
            hidden: page === 'authorized'
        },
        {
            title: 'Discount ($',
            dataIndex: 'discount',
            key: 'discount',
            render: (text: string) => `$${text}`,
            hidden: page === 'authorized'
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
            hidden: page === 'authorized'
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
            hidden: page === 'authorized'
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
                            style: {
                                display: record?.discounted ? 'block' : "none"
                            },
                            label: <Link
                                to={`/billing/payments/discounted/${record?._id}`}
                            >
                                <FontAwesomeIcon icon={faFile} /> Generate Discount Topup Invoice
                            </Link>,

                        },
                        {
                            key: '2',
                            label: <PaymentReceiptDowload payment={record} />,

                        },

                        {
                            key: '33',
                            onClick: () => {
                                setCertificateData(record);
                                setOpenCertificate(true);
                            },
                            label: <button title='Download Tax Certificate'>
                                <FontAwesomeIcon icon={faCertificate} /> Download Tax Certificate
                            </button>,
                            style: {
                                display: record?.authorized ? 'block' : 'none'
                            }
                        },
                        {
                            key: '4',

                            style: {
                                display: record?.authorized ? 'none' : 'block'
                            },
                            onClick: () => authorizePayment(record?._id),
                            label: <button disabled={loading}>
                                <FontAwesomeIcon icon={faCheck} /> Make Authorize
                            </button>,
                        },

                        {
                            key: '4454we',

                            style: {
                                display: record?.payment_status === "unauthorize" ? 'block' : 'none'
                            },
                            onClick: () => regeneratePayment(record?._id),
                            label: <button disabled={loading}
                                className='text-red-500'
                            >
                                <FontAwesomeIcon icon={faRotateBack} /> Regenerate
                            </button>,
                        },
                        {
                            key: '434',
                            onClick: () => rejectPayment(record?._id),
                            label: <button className='text-red-500'>
                                <FontAwesomeIcon icon={faBan} /> Reject Payment
                            </button>,
                            style: {
                                display: record?.payment_status === 'pending' ? 'block' : 'none'
                            }
                        },
                    ],
                }}

            >
                <Button type='primary'>Action</Button>
            </Dropdown>
        }
    ];
    const { user } = useUser();
    const addPaymentHandler = () => {
        if (user?.agent) {
            const floatBalance = user?.float_balance || 0;
            if (floatBalance < 0) {
                toast.error("You don't have enough float balance to add a payment");
                return;
            }
            else {
                setOpen(true);
            }
        }
        else {
            setOpen(true);
        }

    }
    return (
        <div className='py-5'>
            <Modal
                open={openCertificate}
                onCancel={() => setOpenCertificate(false)}
                footer={null}
                width={800}
                title="Tax Certificate"
                centered
                destroyOnHidden
            >
                <TaxCertificate payment={certificateData || {}} />
            </Modal>
            <h3 className='text-xl dark:text-white text-dark font-semibold mb-4'>
                {
                    page === 'unauthorized' ? 'Unauthorized Payments' : page === "authorised" ? 'Authorised Payments' : "Invoice Payments"
                }
            </h3>
            {
                page === 'payments' && <Button type="primary" size="large" className="mb-4"
                    onClick={() => {
                        addPaymentHandler()
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />  Add Payment
                </Button>
            }
            <PaymentFilter refetch={refetch} filters={filters} setFilters={setFilters} />
            {
                page === 'payments' &&
                <button title='Export File to excel formate' className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                    <FontAwesomeIcon icon={faFileExcel} />   <InvoiceListExcel query={filters} />
                </button>
            }
            <Modal open={open} centered onCancel={() => setOpen(false)} footer={null} title="Add Payment"
                width={1000}
                destroyOnHidden
            >
                <AddPayment setQuery={setQuery} setOpen={setOpen} data={properties} refetch={refetch} />
            </Modal>

            <Table
                rowKey="_id"
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
