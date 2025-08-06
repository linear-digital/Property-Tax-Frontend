/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "antd";
import { Input, InputSelect } from "../global/InputFeilds";
import { useLocation } from "../../contexts/LocationContext";

interface Props {
    filters: {
        code: string,
        state: string,
        region: string,
        district: string,
        village: string
        property_type: string
        property_status: string
    }
    setFilters: any
    refetch: any
}

const Filter = ({
    filters,
    setFilters,
    refetch
}: Props) => {
    const { states, regions, districts, villages, } = useLocation();
    return (
        <div className="p-4 bg-white dark:bg-background-dark mt-5 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-4 md:col-span-2 col-span-1">
                <h4 className="text-lg dark:text-white text-dark">
                    Filter Properties
                </h4>
            </div>
            <Input
                placeholder="Property Code"
                label="Property Code"
                value={filters.code}
                onChange={(e) => setFilters({ ...filters, code: e.target.value })}
            />

            <InputSelect
                value={filters.state}
                onChange={(value) => setFilters({ ...filters, state: value })}
                label="State" options={
                    states.map((state: any) => {
                        return {
                            value: state.name,
                            label: state.name
                        }
                    })
                } />
            <InputSelect
                value={filters.region}
                onChange={(value) => setFilters({ ...filters, region: value })}
                label="Region" options={regions.map((region: any) => { return { value: region.name, label: region.name } })} />
            <InputSelect label="District" options={districts.map((state: any) => {
                return {
                    value: state.name,
                    label: state.name
                }
            })} />
            <InputSelect
                value={filters.village}
                onChange={(value) => setFilters({ ...filters, village: value })}
                label="Village" options={villages.map((state: any) => {
                    return {
                        value: state.name,
                        label: state.name
                    }
                })} />
            <InputSelect
                value={filters.property_type}
                onChange={(value) => setFilters({ ...filters, property_type: value })}
                label="Property Type" options={[
                    { value: 'Commercial', label: 'Commercial' },
                    { value: 'Agricultural', label: 'Agricultural' },
                    { value: 'Mixed Use', label: 'Mixed Use' },
                    { value: 'Residential', label: 'Residential' },
                    { value: 'Other', label: 'Other' }
                ]} />
            <InputSelect
                value={filters.property_status}
                onChange={(value) => setFilters({ ...filters, property_status: value })}
                label="Property Status" options={[
                    { value: 'Leased', label: 'Leased' }, 
                    { value: 'Owned', label: 'Owned' }, 
                    { value: 'Rented', label: 'Rented' },
                    { value: 'Vacant', label: 'Vacant' },
                ]} />
            <Button
                onClick={refetch}
                type="primary" size="large" className="mt-[22px]">
                Apply Filters
            </Button>
        </div>
    );
};

export default Filter;

