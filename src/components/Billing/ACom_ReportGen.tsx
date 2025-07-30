/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "antd";
import { Date, InputSelect } from "../global/InputFeilds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faFilePdf, faFilter } from "@fortawesome/free-solid-svg-icons";


const ACom_ReportGen = () => {
    return (
        <div className="p-4 bg-white dark:bg-background-dark mt-5 rounded-lg">
            <div className="lg:col-span-4 md:col-span-2 col-span-1">
                <h4 className="text-lg dark:text-white text-dark">
                    Search & Filter Invoices
                </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <InputSelect label="Filter By Agent" options={[
                    { value: '', label: 'All' },
                    { value: 'agent1', label: 'Agent 1' },
                    { value: 'agent2', label: 'Agent 2' },
                    { value: 'agent3', label: 'Agent 3' },
                ]} />
                <Date
                    label="Start Date"
                    type="date"
                />
                <Date
                    label="End Date"
                    type="date"
                />
            </div>
            <div className="flex justify-end mt-3 gap-x-3 items-center">

                <Button type="primary" size="large" className="mt-[22px]">
                    <FontAwesomeIcon icon={faFilter} />   Filters
                </Button>
                <Button danger type="primary" size="large" className="mt-[22px]">
                    <FontAwesomeIcon icon={faFilter} />   Filters
                </Button>
            </div>
            <div className="flex items-center justify-end gap-x-3">
                <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                    <FontAwesomeIcon icon={faFileExcel} />  Download Excel
                </button>
                <button className="bg-error py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                    <FontAwesomeIcon icon={faFilePdf} />   Download PDF
                </button>
            </div>
        </div>
    );
};

export default ACom_ReportGen;

