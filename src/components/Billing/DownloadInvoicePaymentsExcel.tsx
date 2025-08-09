/* eslint-disable @typescript-eslint/no-explicit-any */
// UsersListExcel.tsx
import React from 'react';
import * as XLSX from 'xlsx';

import type { InvoiceType } from '../../types/invoice';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import moment from 'moment';

interface UsersListExcelProps {
    filename?: string;
}

const InvoiceListExcel: React.FC<UsersListExcelProps> = ({

    filename = 'all-payments.xlsx'
}) => {
    const [loading, setLoading] = React.useState(false);
    const [downloading, setDownloading] = React.useState(false);
    const exportToExcel = async () => {
        try {
            setLoading(true);
            setDownloading(true);
            const invoices: InvoiceType[] = await fetcher({
                path: '/invoice/all/invoice'
            })
            setDownloading(false);
            // Prepare worksheet data
            const worksheetData = [
                // Headers
                [
                    'Invoice Number',
                    'Property Code',
                    "Owner Name",
                    'Amount Paid($)',
                    'Payment Method',
                    'Transaction Reference',
                    'Date Paid',
                    'Agent',
                    "Authorized",
                ],
                // User data
                ...invoices.map(inv => [
                    inv.invoice_id || '-',
                    inv.property_id?.code || '-',
                    inv.tax || '-',
                    inv.admin_fee || '-',
                    inv.total_due || '-',
                    inv.overdue || '-',
                    inv.status || '-',
                    inv.agent || 'N/A',
                    moment(inv.due_date).format('YYYY-MM-DD') || '-',
                ])
            ];

            // Create workbook and worksheet
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice List');
            // add font 
            // Generate Excel file and trigger download
            XLSX.writeFile(workbook, filename, {
                bookType: 'xlsx',
                type: 'array'
            });
            setLoading(false);
            toast.success('Invoice list exported successfully');
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
                downloading ? "Downloading..." : loading ? 'Generating...' : "Export to Excel"
            }
        </button>
    );
};

export default InvoiceListExcel;