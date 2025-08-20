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

const AddPayment = ({ refetch, properties: data , setOpen}: { refetch: any, properties: any, setOpen: any }) => {
    const [property, setProperty] = React.useState<string>("");
    const { user } = useUser();

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
    const [errorFeilds, seterrorFeilds] = useState<any>([])
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
            const requiredFields: any = {
                property: property,
                invoice_id: newPaymant.invoice_id,
                amount: newPaymant.amount,
                payment_method: newPaymant.payment_method,
                reference: newPaymant.reference
            };

            const errors: any = Object.keys(requiredFields).filter(key => !requiredFields[key]);

            if (errors.length > 0) {
                seterrorFeilds(errors);
                toast.error("Please fill all the required fields.");
                return;
            }

            // Rest of your submission logic...
            const newData = { ...newPaymant };
            if (user?.agent) {
                newData.agent = user._id;
            }
            await fetcher({
                path: "/payment/create",
                method: "POST",
                body: newData
            });
            toast.success("Payment created successfully");
            refetch();
            setOpen(false);
            seterrorFeilds([]); // Clear errors on success
        } catch (error) {
            toast.error(errorMessage(error));
        }
    };

    return (
        <div className='flex flex-col gap-4'>
            <InputSelect
                label='Select Property'
                value={property}
                onChange={setProperty}
                options={data?.data?.filter((property: any) =>
  property.invoices.some((invoice: any) => invoice.status === "Not Paid")
).map((property: Property) => {
                    return {
                        key: property._id,
                        value: property._id,
                        label: `${property.code}-${property.owner_name}-${property.owner_phone}`
                    }
                })}
                loading={!data}
            />
            {
                errorFeilds.includes("property") && <p className='text-red-500 text-sm'>Please select an invoice</p>
            }
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
                loading={!invoices}
            />
            {
                errorFeilds.includes("property") && <p className='text-red-500 text-sm'>Please select a property</p>
            }
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
            {
                errorFeilds.includes("payment_method") && <span className='text-red-500'>Please select payment method</span>
            }
            <Input
                label='Reference'
                value={newPaymant.reference}
                onChange={(e) => {
                    setNewPayment({ ...newPaymant, reference: e.target.value })
                }}
            />
            {
                errorFeilds.includes("reference") && <span className='text-red-500'>Please enter reference</span>
            }
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
            >
                Submit Payment
            </Button>
        </div>
    );
};

export default AddPayment;
