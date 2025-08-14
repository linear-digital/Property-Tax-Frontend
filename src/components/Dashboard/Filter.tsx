import { Button } from 'antd';
import React from 'react';

const Filter = ({
    dates,
    setDates,
    refetch
}: {
    dates: {
        year: number,
        month: number
    },
    refetch:    () => void,
    setDates: React.Dispatch<React.SetStateAction<{ year: number, month: number }>>
}) => {
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return (
        <div className=' gap-4 mt-5 flex items-end justify-between'>
            <div className="flex flex-col w-full">
                <label htmlFor="year" className='text-sm text-gray-600 dark:text-gray-300 mb-1'>
                    Select Year
                </label>
                <select name="month" id="month"
                    value={dates.year}
                    onChange={(e) => setDates({ ...dates, year: parseInt(e.target.value) })}
                    className='w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-gray-700 dark:border-gray-600'
                >
                    {
                        years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="flex flex-col  w-full">
                <label htmlFor="month" className='text-sm text-gray-600 dark:text-gray-300 mb-1'>
                    Select Month
                </label>

                <select
                    value={dates.month}
                    onChange={(e) => setDates({ ...dates, month: parseInt(e.target.value) })}
                    name="month" id="month" defaultValue={months[new Date().getMonth()]}
                    className='w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-gray-700 dark:border-gray-600'
                >
                    {
                        months.map((month, index) => (
                            <option key={index} value={index}>
                                {month}
                            </option>
                        ))
                    }
                </select>
            </div>
            <Button className='w-full bg-primary' type='primary'
           onClick={()=> refetch()}
            >
                Filter Charts
            </Button>
        </div>
    );
};

export default Filter;