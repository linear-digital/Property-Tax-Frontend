/* eslint-disable @typescript-eslint/no-explicit-any */
// UsersListExcel.tsx
import React from 'react';
import * as XLSX from 'xlsx';
import type { User } from '../../types/user';

interface UsersListExcelProps {
    users: User[];
    filename?: string;
}

const UsersListExcel: React.FC<UsersListExcelProps> = ({
    users,
    filename = 'users_list.xlsx'
}) => {
    const exportToExcel = () => {
        // Prepare worksheet data
        const worksheetData = [
            // Headers
            [
                'Name',
                'Email',
                'Mobile Number',
                'Designation',
                'National ID',
                'Roles',
                'State',
                'Region',
                'District',
                'Village',
                'Branch',
                "Status",
                "Created At",
            ],
            // User data
            ...users.map(user => [
                user.name || '-',
                user.email || '-',
                user.mobile || '-',
                user.designation || '-',
                user.nid || '-',
                user.roles.map((role: any) => role.name).join(', ') || '-',
                user.state || '-',
                user.region || '-',
                user.district || '-',
                user.village || '-',
                user.branch || '-',
                user.disabled ? 'Disabled' : 'Enabled',
                user.createdAt || '-'
            ])
        ];

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, filename, {
            bookType: 'xlsx',
            type: 'array'
        });
    };

    return (
        <button
            onClick={exportToExcel}
        >
            Export to Excel
        </button>
    );
};

export default UsersListExcel;