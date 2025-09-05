/* eslint-disable @typescript-eslint/no-explicit-any */
// components/PropertyTaxInvoice.tsx
import moment from 'moment';
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
// types/invoice.ts
export type PropertyDetails = {
    ownerName: string;
    nationalId: string;
    propertyCode: string;
    location: string;
    type: string;
    dimensions: string;
    area: string;
    landmark: string;
};

export type TaxDetails = {
    annualTax: number;
    adminFee: number;
    discount: number;
};

export type InvoiceData = {
    invoiceNumber: string;
    issueDate: string;
    deadline: string;
    property: PropertyDetails;
    tax: TaxDetails;
    surchargePercentage: number;
    contactEmail: string;
    contactPhone: string;
    payableTo: string;
    bankAccount: string;
};

interface Props {
    data: InvoiceData;
    invoice: any
}

const PropertyTaxInvoice: React.FC<Props> = ({ data }) => {
    const {branch}= useTheme();
    const totalDue = data.tax.annualTax + data.tax.adminFee;
    const surcharge = parseFloat((totalDue * data.surchargePercentage).toFixed(2));
    const date = new Date(data.deadline);
    date.setDate(1);
    date.setMonth(date.getMonth() + 4);
    const dueDate = moment(date).format('YYYY-MM-DD');
    return (
        <div className="max-w-[80%] mx-auto mt-10 p-8 bg-white shadow-md  rounded-md font-sans  dark:bg-dark dark:text-[#B6BEE3] text-dark">
            {/* Header */}
            <div className="text-center mb-6 border-b border-gray-300 pb-4">
               <div className="flex items-center justify-center ">
                <img src={branch.logo} alt="" className='w-20 h-20 rounded-full object-cover'/>
               </div>
                <h2 className="text-xl font-medium text-gray-600 mt-2 dark:text-[#CFD3EC]">Property Tax Invoice</h2>
            </div>

            {/* Invoice Meta */}
            <div className="text-sm mb-6 space-y-1">
                <p className="font-semibold text-lg">Property Tax Invoice</p>
                <p className='leading-7 text-sm'><span className='text-base'>{branch.name} Municipality</span><br />
                    Finance Revenue Dept.<br />
                    District Governor Office:<br />
                    +252-617447777 / +252-616311777<br />
                    Email: XXXX@hotmail.com
                </p>
                <p className='my-2 text-base'><strong>Invoice Reference:</strong> {data.invoiceNumber}</p>
                <p><strong>Date of Issue:</strong> {data.issueDate}</p>
                <p><strong>Payment Deadline:</strong> {data.deadline}</p>
            </div>

            {/* Property Details */}
            <div className="border border-gray-300 rounded-sm mt-6">
                <div className="bg-gray-100 dark:bg-dark px-4 py-2 font-medium text-base border-b border-gray-300">Property Details</div>
                <div className="divide-y text-sm">
                    {[
                        ['Owner Name', data.property.ownerName],
                        ['National ID/Passport', data.property.nationalId],
                        ['Property Code', data.property.propertyCode],
                        ['Property Location', data.property.location],
                        ['Property Type', data.property.type],
                        ['Property Dimensions', data.property.dimensions],
                        ['Total Area', data.property.area],
                        ['Nearby Landmark', data.property.landmark],
                    ].map(([label, value], i) => (
                        <div key={i} className="grid grid-cols-6 px-4 py-2">
                            <div className="font-medium col-span-2">{label}</div>
                            <div className='col-span-4'>{value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tax Details */}
            <div className="border border-gray-300 rounded-sm mt-6">
                <div className="bg-gray-100 dark:bg-dark px-4 py-2 font-medium text-base border-b border-gray-300">Tax Details</div>
                <div className="text-sm divide-y">
                    <div className="grid grid-cols-6 px-4 py-2">
                        <span className='col-span-2'>Annual Property Tax</span>
                        <span className='col-span-4'>${data.tax.annualTax.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-6 px-4 py-2">
                        <span className='col-span-2'>Administrative Fee</span>
                        <span className='col-span-4'>${data.tax.adminFee.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-6 px-4 py-2 font-semibold">
                        <span className='col-span-2'>Total Amount Due</span>
                        <span className='col-span-4'>${data?.tax.discount || totalDue.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Payment Terms */}
            <div className="mt-6">
                <h3 className="font-medium text-sm mb-2">Payment Terms</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Payment must be made no later than <strong>{data.deadline}</strong>.</li>
                    <li>A {data.surchargePercentage * 100}% surcharge will be applied to overdue payments starting from <strong>{
                        moment(new Date(dueDate)).format('YYYY-MM-DD')}</strong>.</li>
                </ul>
            </div>

            {/* Overdue Calculation */}
            <div className="border border-gray-300 rounded-sm mt-6">
                <div className="bg-gray-100 dark:bg-dark px-4 py-2 font-medium text-base border-b border-gray-300">Overdue Calculation Example</div>
                <div className="text-sm divide-y">
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Original Amount</span>
                        <span>${data?.tax.discount || totalDue.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2">
                        <span>Surcharge (5%)</span>
                        <span>${(data?.tax.discount * data.surchargePercentage) || surcharge.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-2 px-4 py-2 font-semibold">
                        <span>Total Overdue</span>
                        <span>$0.00</span>
                    </div>
                </div>
            </div>

            {/* Payment Info */}
            <div className="mt-6">
                <h3 className="font-medium text-base mb-2">Payment Information</h3>
                <p className="text-sm">
                    <strong>Payable to:</strong> {data.payableTo}<br />
                    <strong>Bank Account Number:</strong> {data.bankAccount}
                </p>
            </div>

            {/* Contact */}
            <div className="mt-6">
                <h3 className="font-medium  mb-2 text-base">Contact Information</h3>
                <p className="text-sm">
                    For inquiries, please contact the {branch.name} Municipality Tax Office at <br />
                    {data.contactPhone} or email at <a href={`mailto:${data.contactEmail}`} className="text-blue-600 underline">{data.contactEmail}</a>
                </p>
            </div>
        </div>
    );
};

export default PropertyTaxInvoice;