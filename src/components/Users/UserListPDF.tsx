// UserListPDF.tsx
import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import type { User } from '../../types/user';
import { Table, TR, TH, TD } from '@ag-media/react-pdf-table';

const styles = StyleSheet.create({
    page: {
        padding: 10,
        fontSize: 8,
    },
    title: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    table: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        backgroundColor: '#f2f2f2',
        padding: 5,
        fontWeight: 'bold',
        fontSize: 8,
        borderRightWidth: 1,
        borderRightColor: '#dddddd',
        textAlign: 'left',
    },
    tableCol: {
        padding: 5,
        fontSize: 8,
        borderRightWidth: 1,
        borderRightColor: '#dddddd',
        textAlign: 'left',
        flexWrap: 'wrap',
    },
    // Column widths
    colName: { width: '18%' },
    colEmail: { width: '22%' },
    colMobile: { width: '12%' },
    colDesignation: { width: '15%' },
    colNationalId: { width: '10%' },
    colRole: { width: '8%' },
    colDistrict: { width: '7%' },
    colRegion: { width: '7%' },
    colBranch: { width: '5%' },
});

type Props = {
    users: User[];
};

const headers = [
    { label: 'Name', style: styles.colName },
    { label: 'Email', style: styles.colEmail },
    { label: 'Mobile Number', style: styles.colMobile },
    { label: 'Designation', style: styles.colDesignation },
    { label: 'National ID', style: styles.colNationalId },
    { label: 'Roles', style: styles.colRole },
    { label: 'District', style: styles.colDistrict },
    { label: 'Region', style: styles.colRegion },
    { label: 'Branch', style: styles.colBranch },
];

const UserListPDF: React.FC<Props> = ({ users }) => (
    <Document>
        <Page size="A4" style={styles.page} orientation="landscape">
            <Text style={styles.title}>Users List</Text>

            <Table style={styles.table}>
                <TH style={styles.tableRow}>
                    {headers.map((header, index) => (
                        <TD key={index} style={[styles.tableColHeader, header.style]}>
                            {header.label}
                        </TD>
                    ))}
                </TH>
                {users.map((user, userIndex) => (
                    <TR key={userIndex} style={styles.tableRow}>
                        <TD style={[styles.tableCol, styles.colName]}>{user.name || '-'}</TD>
                        <TD style={[styles.tableCol, styles.colEmail]}>{user.email || '-'}</TD>
                        <TD style={[styles.tableCol, styles.colMobile]}>{user.mobile || '-'}</TD>
                        <TD style={[styles.tableCol, styles.colDesignation]}>{user.designation || '-'}</TD>
                        <TD style={[styles.tableCol, styles.colNationalId]}>{user.nid || '-'}</TD>
                        <TD style={[styles.tableCol, styles.colRole]}>{user.roles.map((role) => role.name).join(', ') || '-'}</TD>
                        <TD style={[styles.tableCol, styles.colDistrict]}>{user.district || '-'}</TD>
                        <TD style={[styles.tableCol, styles.colRegion]}>{user.region || '-'}</TD>
                        <TD style={[styles.tableCol, styles.colBranch]}>{user.branch || '-'}</TD>
                    </TR>
                ))}
            </Table>
        </Page>
    </Document>
);

export default UserListPDF;