/* eslint-disable @typescript-eslint/no-explicit-any */
// UsersListExcel.tsx
import React from 'react';
import * as XLSX from 'xlsx';

import toast from 'react-hot-toast';
import moment from 'moment';
import { fetcher } from '../../../util/axios.instance';
import { errorMessage } from '../../../util/errorMessage';

interface UsersListExcelProps {
    query: any
}

const CommissionsListExcel: React.FC<UsersListExcelProps> = ({
    query
}) => {
    const filename = `all-commissions-${moment().format('YYYY-MM-DD')}.xlsx`;
    const [loading, setLoading] = React.useState(false);
    const [downloading, setDownloading] = React.useState(false);
    const exportToExcel = async () => {
        try {
            setLoading(true);
            setDownloading(true);
            const invoices: any = await fetcher({
                path: '/commission?all=true',
                params: query
            }) || []
            setDownloading(false);
            // Prepare worksheet data
            const worksheetData = [
                // Headers
                [
                    'Agent Name',
                    'Invoice Number',
                    'Commission Amount($)',
                    'Description ',
                    'Earned At',
                ],
                // User data
                ...invoices.map((inv: any) => [
                    inv.user?.name || '-',
                    inv.invoice_number || '-',
                    inv.amount || '-',
                    inv.reference || '-',
                    inv.createdAt || '-',
                ])
            ];

            // Create workbook and worksheet
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Commission List');
            // add font 
            // Generate Excel file and trigger download
            XLSX.writeFile(workbook, filename, {
                bookType: 'xlsx',
                type: 'array'
            });
            setLoading(false);
            toast.success('Commission list exported successfully');
        } catch (error) {
            setDownloading(false);
            setLoading(false);
            toast.error(errorMessage(error))
        }
    };

    return (
        <button
            className='cursor-pointer'
            disabled={loading || downloading}
            onClick={exportToExcel}
        >
            {
                downloading ? "Downloading..." : loading ? 'Generating...' : "Download Excel"
            }
        </button>
    );
};

export default CommissionsListExcel;