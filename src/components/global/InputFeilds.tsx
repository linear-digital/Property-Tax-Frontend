/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Input as InputAnt, DatePicker } from "antd";

export const Input = ({ placeholder, label, onChange, value, type }: { placeholder?: string, label?: string, onChange?: any, value?: any, type?: string, defaultValue?: any }) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={label} className='text-sm text-gray-600 dark:text-gray-300 mb-1'>
                {label}
            </label>
            <InputAnt
                defaultValue={value}
                type={type ? type : "text"}
                value={value}
                size="large" name={label} id={label}
                onChange={onChange}
                className='w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm py-2 px-3'
                placeholder={placeholder || `Enter ${label}`}
            />

        </div>
    );
}
export const TextArea = ({ placeholder, label, onChange, value }: { placeholder?: string, label?: string, onChange?: any, value?: any,  defaultValue?: any }) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={label} className='text-sm text-gray-600 dark:text-gray-300 mb-1'>
                {label}
            </label>
            <InputAnt.TextArea
                defaultValue={value}
                value={value}
                size="large" name={label} id={label}
                onChange={onChange}
                className='w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm py-2 px-3'
                placeholder={placeholder || `Enter ${label}`}
            />

        </div>
    );
}
export const Date = ({ placeholder, label, onChange, value, type }: { placeholder?: string, label?: string, onChange?: any, value?: any, type?: string, defaultValue?: any }) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={label} className='text-sm text-gray-600 dark:text-gray-300 mb-1'>
                {label}
            </label>
            <DatePicker
                defaultValue={value}
                type={type ? type : "text"}
                value={value}
                size="large"
                name={label}
                id={label}
                onChange={onChange}
                className='w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm py-2 px-3'
                placeholder={placeholder || `Enter ${label}`}
            />

        </div>
    );
}
export const InputSelect = ({ label, options }: { label: string, options: any, placeholder?: string }) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={label} className='text-sm text-gray-600 dark:text-gray-300 mb-1'>
                {label}
            </label>
            <Select
                id={label}
                className="custom-select"
                size="large"
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