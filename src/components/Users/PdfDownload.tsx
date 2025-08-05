import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import UserListPDF from './UserListPDF';
import type { User } from '../../types/user';


const DownloadUserList = ({ users }: { users: User[] }) => {
    const date = new Date();
    const filename = `users_list_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.pdf`;
    return (
    <PDFDownloadLink
        document={<UserListPDF users={users} />}
        fileName={filename}
    >
        {({ loading }) =>
            loading ? 'Generating PDF' : 'Download Users PDF'
        }
    </PDFDownloadLink>
);
}

export default DownloadUserList;