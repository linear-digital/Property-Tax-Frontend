/* eslint-disable @typescript-eslint/no-explicit-any */
// UsersListExcel.tsx
import React from 'react';
import * as XLSX from 'xlsx';


import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import moment from 'moment';

interface UsersListExcelProps {
    query: any
}

const InvoiceListExcel: React.FC<UsersListExcelProps> = ({
    query
}) => {
    const filename = `all-payments-${moment().format('YYYY-MM-DD')}.xlsx`;
    const [loading, setLoading] = React.useState(false);
    const [downloading, setDownloading] = React.useState(false);
    const exportToExcel = async () => {
        try {
            setLoading(true);
            setDownloading(true);
            const invoices: any = await fetcher({
                path: '/payment?all=true',
                params: query
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
                ...invoices.map((inv: any) => [
                    inv.invoice_number || '-',
                    inv.property_code?.code || '-',
                    inv.property_code?.owner_name || '-',
                    inv.paid_amount || '-',
                    inv.payment_method || '-',
                    inv.reference || '-',
                    moment(inv.payment_date).format('YYYY-MM-DD') || '-',
                    inv.agent?.name || 'N/A',
                    inv.authorized ? "Yes" : "No",
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