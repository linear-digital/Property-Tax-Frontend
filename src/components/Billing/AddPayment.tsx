/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { fetcher } from '../../util/axios.instance';
import { Button, Checkbox } from 'antd';
import { Date as DateInput, Input, InputSelect } from '../global/InputFeilds';
import type { InvoiceType } from '../../types/invoice';
import type { Property } from '../../types/property';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import { useUser } from '../../contexts/UserContext';
import Waafipay from './Waafipay';

const AddPayment = ({ refetch }: { refetch: any }) => {
    const [property, setProperty] = React.useState<string>("");
     const [openWaafipay, setOpenWaafipay] = useState(false);
    const { user } = useUser();
    const { data, isLoading } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const data = await fetcher({
                path: "/property/all",
                method: "POST",
                body: { all: true, notpaid: true }
            });
            return data;
        },
        refetchOnMount: false
    });
    const [invoice, setInvoice] = React.useState<InvoiceType>({
        _id: '',
        invoice_id: '',
        property_id: null,
        property_code: '',
        createdAt: '',
        payment_date: '',
        tax: 0,
        admin_fee: 0,
        total_due: 0,
        overdue: 0,
        status: '',
        due_date: '',
        agent: '',
        dispute: false
    });
    const [newPaymant, setNewPayment] = useState<any>({
        property_code: '',
        invoice_id: '',
        invoice_number: '',
        amount: 0,
        discount: 0,
        paid_amount: 0,
        difference: 0,
        payment_method: "",
        reference: "",
        payment_date: new Date().toISOString(),
        discounted: false,
    })
    useEffect(() => {
        if (invoice) {
            setNewPayment({
                property_code: property,
                invoice_number: invoice.invoice_id,
                invoice_id: invoice?._id as string,
                amount: (invoice.total_due + invoice.overdue),
                discount: 0,
                paid_amount: (invoice.total_due + invoice.overdue),
                difference: 0,
                payment_method: "",
                reference: "",
                payment_date: new Date().toISOString(),
                discounted: false
            })

        }
    }, [invoice, property])

    const { data: invoices } = useQuery({
        queryKey: ['invoices', property],
        queryFn: async () => {
            const data = await fetcher({
                path: `/invoice/property/${property}`,
                body: { all: true }
            });
            return data;
        },
        enabled: !!property
    });
    const submitPayment = async () => {
        try {
            if (!invoice || !property || !newPaymant.invoice_id || !newPaymant.amount || !newPaymant.payment_method || !newPaymant.reference) {
                toast.error("Please fill all the fields");
                return
            }
            const newData = {
                ...newPaymant,
            }
            if (user?.agent) {
                newData.agent = user._id
            }
            await fetcher({
                path: "/payment/create",
                method: "POST",
                body: newData
            });
            toast.success("Payment created successfully");
            refetch();
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
   
    return (
        <div className='flex flex-col gap-4'>
            <Waafipay open={openWaafipay} setOpen={setOpenWaafipay} refetch={refetch} payment={newPaymant}/>
            <InputSelect
                label='Select Property'
                value={property}
                onChange={setProperty}
                options={data?.data?.map((property: Property) => {
                    return {
                        value: property._id,
                        label: `${property.code}-${property.owner_name}-${property.owner_phone}`
                    }
                })}
                loading={isLoading}
            />
            <InputSelect
                label='Select Invoice'
                options={invoices?.map((invoice: InvoiceType) => {
                    return {
                        value: invoice.invoice_id,
                        label: `${invoice.invoice_id} - $${invoice.total_due}`,
                    }
                })}
                onChange={(e) => {
                    setInvoice(invoices?.find((invoice: InvoiceType) => invoice.invoice_id === e))
                }}
                loading={isLoading}
            />
            <Input
                label='Invoice Amount'
                value={`$${invoice?.total_due}`}
                disabled
            />
            <Input
                label='Over Due Amount'
                value={`$${invoice?.overdue}`}
                disabled
            />
            <Input
                label='Total Payable ($)'
                value={`$${invoice.total_due + invoice.overdue}`}
                disabled
            />
            <Checkbox
                checked={newPaymant.discounted}
                onChange={(e) => {
                    setNewPayment({ ...newPaymant, discounted: e.target.checked })
                }}
            >
                Mark as Discounted
            </Checkbox>
            {newPaymant.discounted &&
                <>
                    <Input
                        label='Discount Amount ($)'
                        value={newPaymant.discount}
                        type='number'
                        onChange={(e) => {
                            setNewPayment({ ...newPaymant, discount: Number(e.target.value), paid_amount: (invoice.total_due + invoice.overdue) - Number(e.target.value) })
                        }}
                    />
                </>
            }

            <Input
                label='Amount Paid ($)'
                value={`$${newPaymant.paid_amount}`}
                disabled
            />
            <InputSelect
                options={[
                    {
                        value: "",
                        label: "Select Payment Method"
                    },
                    {
                        value: "Cash",
                        label: "Cash"
                    }, {
                        value: "Bank Transfer",
                        label: "Bank Transfer"
                    }, {
                        value: "Mobile Money",
                        label: "Mobile Money"
                    },
                    {
                        value: "Cradit Card",
                        label: "Cradit Card"
                    },

                ]}
                label="Payment Method"
                value={newPaymant.payment_method}
                onChange={(e) => {
                    setNewPayment({ ...newPaymant, payment_method: e })
                }}
            />
            <div className="flex items-center gap-x-2">
                <Input
                    label='Reference'
                    value={newPaymant.reference}
                    onChange={(e) => {
                        setNewPayment({ ...newPaymant, reference: e.target.value })
                    }}
                />
                <Button 
                    className='self-end mt-6'
                    onClick={() => setOpenWaafipay(true)}
                    disabled={newPaymant.paid_amount <= 0}
                >
                    Waafipay
                </Button>
            </div>
            <DateInput
                label="Payment Date"
                value={dayjs(newPaymant.payment_date)}
                onChange={(e: any) => {
                    setNewPayment({ ...newPaymant, payment_date: e.toISOString() })
                }}
            />
            <Button
                className='self-start'
                onClick={submitPayment}
                loading={isLoading}
            >
                Submit Payment
            </Button>
        </div>
    );
};

export default AddPayment;