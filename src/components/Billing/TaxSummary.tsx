/* eslint-disable @typescript-eslint/no-explicit-any */

import { Date as DateInp, InputSelect } from '../global/InputFeilds';
import { Button } from 'antd';
import { DollarSign } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faBuildingColumns, faChartBar, faClock, faFileExcel, faFileInvoiceDollar, faFilePdf, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import SummaryTable from './SummaryTable';
import React from 'react';
import dayjs from 'dayjs';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import moment from 'moment';
import TaxSummeryListExcel from './BillingTemplate/SummeryExcelExport';
const TaxSummary = () => {
    const years = Array.from({ length: 10 }, (_, i) => new window.Date().getFullYear() - i).map(year => ({ value: year.toString(), label: year.toString() }));
    const currDate = new Date();
    const [year, setYear] = React.useState(currDate.getFullYear());
    // First day of month
    const monthStart = new Date(currDate.getFullYear(), currDate.getMonth(), 1);

    // Last day of month
    const monthEnd = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);

    const [startDate, setStartDate] = React.useState(monthStart);
    const [endDate, setEndDate] = React.useState(monthEnd);
    const [result, setResult] = React.useState<any>(null);
    const getResult = async () => {
        try {
            const res = await fetcher({
                path: `/payment/tax-summary`,
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            });
            toast.success('Report generated successfully')
            setResult(res?.summary)
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    return (
        <div className='py-5'>
            <h3 className='text-xl dark:text-white text-dark font-semibold mb-4'>
                Property Tax Collection Report
            </h3>

            <div className="p-4 bg-white dark:bg-background-dark mt-5 rounded-lg">
                <div className="flex justify-between">
                    <h2 className="text-lg dark:text-white text-dark mb-4">
                        Generate Report
                    </h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Select date range to generate report
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  mt-4">
                    <DateInp
                        label="Start Date"
                        value={dayjs(startDate)}
                        onChange={(date: any) => {
                            if (date) {
                                setStartDate(date.toDate());
                            }
                        }}
                    />
                    <DateInp
                        label="End Date"
                        value={dayjs(endDate)}
                        onChange={(date: any) => {
                            if (date) {
                                setEndDate(date.toDate());
                            }
                        }}
                    />
                    <InputSelect
                        value={year}
                        onChange={(value) => setYear(value)}
                        label="Filter by Year (Optional)" options={years} />
                    <div>
                        <Button type="primary" size="large" className="text-sm"
                            onClick={getResult}
                        >
                            Generate Report <FontAwesomeIcon icon={faChartBar} />
                        </Button>
                    </div>
                </div>
            </div>
            {
                result &&
                <Result query={{ startDate, endDate, year }} dates={{ startDate, endDate }} summary={result} />
            }

        </div>
    );
};

export default TaxSummary;

interface ReportCardProps {
    dates: {
        startDate: Date,
        endDate: Date
    },
    summary: any,
    query: any
}

const Result = ({ dates, summary, query }: ReportCardProps) => {


    return <div>

        <div className="flex items-center gap-x-3">
            <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                <FontAwesomeIcon icon={faFileExcel} />  <TaxSummeryListExcel query={query} />
            </button>
            <button className="bg-error py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                <FontAwesomeIcon icon={faFilePdf} />   Download PDF
            </button>
        </div>

        <div className="dark:bg-[#274C62] bg-white rounded-md p-4 mt-5">
            <h3 className='text-lg dark:text-white text-primary font-semibold'>
                Report Period: {moment(dates.startDate).format('MMM DD, YYYY')} to {moment(dates.endDate).format('MMM DD, YYYY')}
            </h3>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 mt-5">
            <ReportCard
                border='border-primary'
                label='Total Collected'
                summary={summary?.totalTaxCollected}
                subtitle={`${summary?.totalTaxCollected?.count || 0} Payments`}
            />
            <ReportCard border='border-accent'
                label='Total Generated'
                summary={summary?.totalInvoicesGenerated}
                subtitle={<span className='dark:text-gray-400 text-dark'>{summary?.totalInvoicesGenerated?.count || 0} Invoices</span>}
                icon={<FontAwesomeIcon icon={faFileInvoiceDollar}
                    className='text-accent'
                />}
            />
            <ReportCard border='border-secondary'
                label='Pending'
                summary={summary?.pendingInvoices}

                subtitle={<span className='text-secondary'>{summary?.pendingInvoices?.count || 0} Invoices</span>}
                icon={<FontAwesomeIcon
                    className='text-secondary'
                    icon={faClock} />}
            />
            <ReportCard border='border-error'
                label='Disputed'
                summary={summary?.disputedInvoices}
                subtitle={<span className='text-error'>{summary?.disputedInvoices?.count || 0} Case</span>}
                icon={<FontAwesomeIcon
                    className='text-error'
                    icon={faTriangleExclamation} />}
            />
        </div>
        <div className="pt-4 bg-white dark:bg-background-dark mt-5 rounded-lg">
            <div className="flex justify-between px-4">
                <h2 className="text-lg dark:text-white text-dark mb-4">
                    Property Tax Collection Summary
                </h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Detailed breakdown of tax collection
                </p>
            </div>
            <SummaryTable data={summary} />
        </div>
        <div className="pt-4 bg-white dark:bg-background-dark mt-5 rounded-lg">
            <div className="flex justify-between px-4">
                <h2 className="text-lg dark:text-white text-dark mb-4">
                    Revenue Distribution
                </h2>
            </div>
            <table className='w-full text-white  summary-table'>
                <thead className='bg-gray-200 text-black '>
                    <th className='border-r border-gray-300 py-3 font-medium'>
                        Recipient
                    </th>
                    <th className='border-r border-gray-300 py-3 font-medium'>
                        % Share
                    </th>
                    <th className='border-r border-gray-300 py-3 font-medium'>
                        Amount (USD)
                    </th>
                    <th className=' py-3 font-medium'>
                        Remarks
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td className='t-data border-r text-start'>
                            <FontAwesomeIcon icon={faBuilding}
                                className='text-primary'
                            /> Matalan ICT
                        </td>
                        <td className='t-data text-center border-r'>
                            60%
                        </td>
                        <td className='t-data text-center border-r'>
                            ${((summary?.paidInvoices?.amount) / 100 * 60).toFixed(2) || 0}
                        </td>
                        <td className='t-data text-center border-r'>
                            Total tax levied
                        </td>
                    </tr>
                    <tr>
                        <td className='t-data border-r text-start'>
                            <FontAwesomeIcon
                                className='text-accent'
                                icon={faBuildingColumns} /> Government
                        </td>
                        <td className='t-data text-center border-r'>
                            40%
                        </td>
                        <td className='t-data text-center border-r'>
                            ${((summary?.paidInvoices?.amount) / 100 * 40).toFixed(2) || 0}
                        </td>
                        <td className='t-data text-center border-r'>
                            Successfully collected
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}

const ReportCard = ({ border, label, summary, subtitle, icon }: { border?: string, label: string, summary?: any, subtitle?: any, icon?: any }) => {
    return <div className={`${border} dark:bg-[#262840] bg-white text-white rounded-lg border-t-3 border-b-3 border-r-3 border-l-1  px-4 py-6 w-full shadow-md relative overflow-hidden`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm dark:text-[#A0A3BD] text-dark">{label}</p>
                <h2 className="text-2xl font-semibold my-2 dark:text-white text-dark">${summary?.amount}</h2>
                <p className="text-sm text-accent mt-1">
                    {subtitle}
                </p>
            </div>
            <div className="bg-[#3E3F58] p-2 rounded-md text-white">
                {icon || <DollarSign size={18} />}
            </div>
        </div>
    </div>
}