/* eslint-disable @typescript-eslint/no-explicit-any */
import { faCheckCircle, faClock, faCoins, faFile, faTag, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const SummaryTable = ({ data }: { data: any }) => {
    return (
        <div className=''>
            <table className='w-full text-white  summary-table'>
                <thead className='bg-gray-200 text-black '>
                    <th className='border-r border-gray-300 py-3 font-medium'>
                        Category
                    </th>
                    <th className='border-r border-gray-300 py-3 font-medium'>
                        Amount (USD)
                    </th>
                    <th className='border-r border-gray-300 py-3 font-medium'>
                        Properties
                    </th>
                    <th className=' py-3 font-medium'>
                        Remarks
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td className='t-data border-r text-start'>
                            <FontAwesomeIcon icon={faFile}
                                className='text-primary'
                            /> Total Invoices Generated
                        </td>
                        <td className='t-data text-right border-r'>
                            ${data?.totalInvoicesGenerated?.amount || 0}
                        </td>
                        <td className='t-data text-center border-r'>
                            {data?.totalInvoicesGenerated?.count || 0}
                        </td>
                        <td className='t-data text-center border-r'>
                            Total tax levied
                        </td>
                    </tr>
                    <tr>
                        <td className='t-data border-r text-start'>
                            <FontAwesomeIcon
                                className='text-accent'
                                icon={faCheckCircle} /> Total Invoices Paid
                        </td>
                        <td className='t-data text-right border-r'>
                            ${data?.paidInvoices?.amount || 0}
                        </td>
                        <td className='t-data text-center border-r'>
                            {data?.paidInvoices?.count}
                        </td>
                        <td className='t-data text-center border-r'>
                            Successfully collected
                        </td>
                    </tr>
                    <tr>
                        <td className='t-data border-r text-start'>
                            <FontAwesomeIcon
                                className='text-secondary'
                                icon={faClock} /> Pending Invoices
                        </td>
                        <td className='t-data text-right border-r'>
                            ${data?.pendingInvoices?.amount || 0}
                        </td>
                        <td className='t-data text-center border-r'>
                            {data?.pendingInvoices?.count}
                        </td>
                        <td className='t-data text-center border-r'>
                            Awaiting payment
                        </td>
                    </tr>
                    <tr>
                        <td className='t-data border-r text-start'>
                            <FontAwesomeIcon
                                className='text-error'
                                icon={faTriangleExclamation} /> Disputed Invoices
                        </td>
                        <td className='t-data text-right border-r'>
                            ${data?.disputedInvoices?.amount || 0}
                        </td>
                        <td className='t-data text-center border-r'>
                            {data?.disputedInvoices?.count}
                        </td>
                        <td className='t-data text-center border-r'>
                            Under review
                        </td>
                    </tr>
                    <tr>
                        <td className='t-data border-r text-start'>
                            <FontAwesomeIcon
                                className='text-[#32CFE8]'
                                icon={faTag} /> Discounted Invoices
                        </td>
                        <td className='t-data text-right border-r'>
                            ${data?.discountedInvoices?.amount || 0}
                        </td>
                        <td className='t-data text-center border-r'>
                            {data?.discountedInvoices?.count}
                        </td>
                        <td className='t-data text-center border-r'>
                            Approved discounts
                        </td>
                    </tr><tr>
                        <td className='t-data border-r text-start font-semibold'>
                            <FontAwesomeIcon
                                className='text-[#9dc1f3] mr-1'
                                icon={faCoins} />Total Tax Revenue Collected
                        </td>
                        <td className='t-data text-right border-r'>
                            ${data?.paidInvoices?.amount || 0}
                        </td>
                        <td className='t-data text-center border-r'>
                            -
                        </td>
                        <td className='t-data text-center border-r'>
                            Final collected amount
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SummaryTable;