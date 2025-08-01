
import { Date, InputSelect } from '../global/InputFeilds';
import { Button } from 'antd';
import { DollarSign } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faBuildingColumns, faChartBar, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import SummaryTable from './SummaryTable';
const TaxSummary = () => {
    const years = Array.from({ length: 10 }, (_, i) => new window.Date().getFullYear() - i).map(year => ({ value: year.toString(), label: year.toString() }));
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
                    <Date
                        label="Start Date"
                        type="date"
                    />
                    <Date
                        label="End Date"
                        type="date"
                    />
                    <InputSelect label="Filter by Year (Optional)" options={years} />
                    <div>
                        <Button type="primary" size="large" className="text-sm">
                            Generate Report <FontAwesomeIcon icon={faChartBar} />
                        </Button>
                    </div>
                </div>
            </div>
            <Result />

        </div>
    );
};

export default TaxSummary;


const Result = () => {
    return <div>
        <div className="flex items-center gap-x-3">
            <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                <FontAwesomeIcon icon={faFileExcel} />  Download Excel
            </button>
            <button className="bg-error py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                <FontAwesomeIcon icon={faFilePdf} />   Download PDF
            </button>
        </div>

        <div className="dark:bg-[#274C62] bg-white rounded-md p-4 mt-5">
            <h3 className='text-lg dark:text-white text-primary font-semibold'>
                Report Period: Jul 01, 2025 to Jul 31, 2025
            </h3>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 mt-5">
            <ReportCard border='border-primary' />
            <ReportCard border='border-accent' />
            <ReportCard border='border-secondary' />
            <ReportCard border='border-error' />
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
            <SummaryTable />
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
                            $5,901.00
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
                            $3,934.00
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

const ReportCard = ({ border }: { border?: string }) => {
    return <div className={`${border} dark:bg-[#262840] bg-white text-white rounded-lg border-t-3 border-b-3 border-r-3 border-l-1  px-4 py-6 w-full shadow-md relative overflow-hidden`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm dark:text-[#A0A3BD] text-dark">Total Collected</p>
                <h2 className="text-2xl font-semibold mt-1 dark:text-white text-dark">$9,835.00</h2>
                <p className="text-sm text-accent mt-1">352 Payments</p>
            </div>
            <div className="bg-[#3E3F58] p-2 rounded-md text-white">
                <DollarSign size={18} />
            </div>
        </div>
    </div>
}