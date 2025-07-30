/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "antd";
import { Input, InputSelect } from "../global/InputFeilds";


const Filter = () => {
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
            />

            <InputSelect label="State" options={[
                { value: 'residential', label: 'Residential' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'industrial', label: 'Industrial' },
                { value: 'land', label: 'Land' }
            ]} />
            <InputSelect label="Region" options={[
                { value: 'north', label: 'North' },
                { value: 'south', label: 'South' },
                { value: 'east', label: 'East' },
                { value: 'west', label: 'West' }
            ]} />
            <InputSelect label="District" options={[
                { value: 'district1', label: 'District 1' },
                { value: 'district2', label: 'District 2' },
                { value: 'district3', label: 'District 3' },
                { value: 'district4', label: 'District 4' }
            ]} />
            <InputSelect label="Village" options={[
                { value: 'village1', label: 'Village 1' },
                { value: 'village2', label: 'Village 2' },
                { value: 'village3', label: 'Village 3' },
                { value: 'village4', label: 'Village 4' }
            ]} />
            <InputSelect label="Property Type" options={[
                { value: 'apartment', label: 'Apartment' },
                { value: 'house', label: 'House' },
                { value: 'office', label: 'Office' },
                { value: 'shop', label: 'Shop' }
            ]} />
            <InputSelect label="Property Status" options={[
                { value: 'available', label: 'Available' },
                { value: 'sold', label: 'Sold' },
                { value: 'rented', label: 'Rented' },
                { value: 'under_maintenance', label: 'Under Maintenance' }
            ]} />
            <Button type="primary" size="large" className="mt-[22px]">
                Apply Filters
            </Button>
        </div>
    );
};

export default Filter;

