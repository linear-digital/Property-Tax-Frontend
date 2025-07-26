/* eslint-disable @typescript-eslint/no-explicit-any */

import { Select } from "antd";


const Filter = () => {
    return (
        <div className="p-4 bg-white dark:bg-background-dark mt-5 rounded-lg grid grid-cols-4 gap-4">
            <div className="col-span-4">
                <h4 className="text-lg dark:text-white text-dark">
                    Filter Properties
                </h4>
            </div>
            <Input />
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
        </div>
    );
};

export default Filter;


const Input = () => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor="Property Code" className='text-sm text-gray-600 dark:text-gray-300 mb-1'>
                Property Code
            </label>
            <input name="Property Code" id="Property Code"
                className='w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm py-2 px-3'
                placeholder="Enter Property Code"
            />

        </div>
    );
}

export const InputSelect = ({ label, options }: { label: string, options: any, placeholder?: string }) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor="Property Code" className='text-sm text-gray-600 dark:text-gray-300 mb-1'>
                {label}
            </label>
            {/* <select name={label} id={label}
                className='w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm py-2 px-3'
            >
                {options.map((option: any, index: number) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select> */}
            <Select
                className='w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm py-2 px-3 no-outline '
                size="large"
                suffixIcon={null}
                prefix={null}
                showSearch
                placeholder={`Select ${label}`}
                filterOption={(input, option) => {
                    const label = typeof option?.label === 'string' ? option.label : '';
                    return label.toLowerCase().includes(input.toLowerCase());
                }}
                options={options}
            />
        </div>
    );
}