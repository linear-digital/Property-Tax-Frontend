/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "antd";
import { Date, InputSelect } from "../global/InputFeilds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faFilePdf, faFilter, faRefresh } from "@fortawesome/free-solid-svg-icons";
import type { User } from "../../types/user";
import dayjs from "dayjs";
import CommissionsListExcel from "./BillingTemplate/CommissionsExcel";

interface Props {
    filters: any,
    agents: User[],
    setFilters: any,
    refetch: any
}
const ACom_ReportGen = ({ filters, agents = [], setFilters, refetch }: Props) => {
    return (
        <div className="p-4 bg-white dark:bg-background-dark mt-5 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <InputSelect
                    value={filters.agent}
                    onChange={(value) => setFilters({ ...filters, agent: value })}
                    label="Filter By Agent" options={[
                        { value: '', label: 'All' },
                        ...agents.map((agent: any) => ({ value: agent._id, label: agent.name }))
                    ]} />
                <Date
                    label="Start Date"
                    value={filters.startDate ? dayjs(filters.startDate) : null}
                    onChange={(value: any) => setFilters({ ...filters, startDate: value })}

                />
                <Date
                    label="End Date"
                    value={filters.endDate ? dayjs(filters.endDate) : null}
                    onChange={(value: any) => setFilters({ ...filters, endDate: value })}
                />
            </div>
            <div className="flex justify-end mt-3 gap-x-3 items-center">

                <Button
                    onClick={() => refetch()}
                    type="primary" size="large" className="mt-[22px]">
                    <FontAwesomeIcon icon={faFilter} />   Filters
                </Button>
                <Button
                    onClick={() => {
                        setFilters({
                            agent: '',
                            startDate: '',
                            endDate: ''
                        })
                        refetch()
                    }}
                    danger type="primary" size="large" className="mt-[22px]">
                    <FontAwesomeIcon icon={faRefresh} />   Reset
                </Button>
            </div>
            <div className="flex items-center justify-end gap-x-3">
                <button title="Export" className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                    <FontAwesomeIcon icon={faFileExcel} />  <CommissionsListExcel query={filters}/>
                </button>
                <button className="bg-error py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
                    <FontAwesomeIcon icon={faFilePdf} />   Download PDF
                </button>
            </div>
        </div>
    );
};

export default ACom_ReportGen;

