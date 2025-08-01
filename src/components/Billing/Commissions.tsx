import React from 'react';
import ACom_ReportGen from './ACom_ReportGen';
import { Table } from 'antd';

const Commissions = () => {
    return (
        <div className='py-5'>
            <h3 className='text-xl dark:text-white text-dark font-semibold mb-4'>
                Agent Commissions Report
            </h3>
            <ACom_ReportGen />
            <div className='mt-5 dark:bg-dark bg-white  rounded-md'>
                <h3 className='text-lg p-4 dark:text-white text-primary font-medium'>
                    Agent Commissions
                </h3>
                <Table
                 scroll={{ x: 'max-content' }}
                    columns={[
                        {
                            title: 'Agent Name',
                            dataIndex: 'agentName',
                            key: 'agentName',
                        },
                        {
                            title: 'Invocie Number',
                            dataIndex: 'invoiceNumber',
                            key: 'invoiceNumber',
                        },
                        {
                            title: "Commission Amount ($)",
                            dataIndex: 'commissionAmount',
                            key: 'commissionAmount',
                        },
                        {
                            title: "Description",
                            dataIndex: 'description',
                            key: 'description',
                        },
                        {
                            title: "Earned At",
                            dataIndex: 'date',
                            key: 'date',
                        }
                    ]}
                />
            </div>
        </div>
    );
};

export default Commissions;