/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,

} from '@react-pdf/renderer';
import moment from 'moment';
import { Table, TD, TH, TR } from '@ag-media/react-pdf-table';
import generateBarcodeBase64 from './BarcodeGenerate';


// Register fonts for better text rendering
Font.register({
    family: 'Helvetica',
    src: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 20,
        fontSize: 9,
        fontFamily: 'Helvetica',
        lineHeight: 1.2,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        borderBottom: '1px solid #000',
    },
    logo: {
        width: 60,
        height: 60,
    },
    headerCenter: {
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: "center",
        width: "100%"
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    headerSubtitle: {
        fontSize: 9,
        fontWeight: 'semibold',
        marginTop: 3,
    },
    invoiceTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    barcodeSection: {
        textAlign: 'right',
        minWidth: 120,
    },
    barcodeText: {
        fontSize: 8,
        marginBottom: 3,
    },
    barcodeBox: {
        border: '1px solid #000',
        height: 40,
        width: 120,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
    },
    referenceText: {
        fontSize: 8,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'semibold',
        paddingTop: 10,
        paddingBottom: 6,
        textAlign: 'center',
    },
    detailsContainer: {
        border: '1px solid #000',
    },
    detailRow: {
        flexDirection: 'row',
    },
    detailLabel: {
        width: '50%',
        paddingHorizontal: 3,
        paddingVertical: 2,
        fontSize: 8,
        fontWeight: 'semibold',
    },
    detailValue: {
        width: '50%',
        paddingHorizontal: 3,
        paddingVertical: 2,
        fontSize: 8,
    },
    taxSection: {
        marginTop: 10,
    },
    taxRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
        backgroundColor: '#f9f9f9',
    },
    taxLabel: {
        width: '70%',
        padding: 4,
        borderRight: '1px solid #000',
        fontSize: 9,
        fontWeight: 'bold',
    },
    taxAmount: {
        width: '30%',
        padding: 4,
        fontSize: 9,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    totalRow: {
        flexDirection: 'row',
        backgroundColor: '#d9d9d9',
        border: '2px solid #000',
    },
    paymentSection: {
        border: '1px solid #000',
    },
    paymentHeader: {
        backgroundColor: '#e6e6e6',
        padding: 4,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
        borderBottom: '1px solid #000',
    },
    bankDetails: {
        padding: 4,
        fontSize: 7,
    },
    paymentTerms: {
        padding: 4,
        border: '1px solid #000',
    },
    paymentTermsTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    paymentTermsText: {
        fontSize: 8,
    },
    footer: {
        marginTop: 15,
        paddingTop: 10,
        borderTop: '1px solid #000',
        fontSize: 8,
        textAlign: 'center',
    },
    tableHeader: {
        padding: 3,
        fontSize: 8,
        textAlign: 'center',
    },
    tableRowValue: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 9,
    },
    tableRowValue2: {
        paddingLeft: 3,
        paddingRight: 3,
        fontSize: 9,
    }
});

interface InvoicePDFProps {
    data: any;
}

const TaxCertificatePDF: React.FC<InvoicePDFProps> = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.logo}>

                    <Image
                        src={data.branch.logo}
                        style={{
                            width: 60,
                            height: 60,
                        }} />
                </View>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Yearly Tax Clearance Certificate</Text>
                </View>
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderBottom: "1px solid #000",
                paddingBottom: 5,
                marginTop: 20
            }}>
                <View style={styles.barcodeSection}>

                    {/* <View style={styles.barcodeBox} /> */}
                   
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                        marginBottom: 3
                    }}>
                        <Text style={{
                            ...styles.referenceText,
                            fontWeight: "semibold"
                        }}>
                            Governor Office:
                        </Text>
                        <Text style={styles.referenceText}>
                            +252-617955055 | +252-617955055
                        </Text>
                    </View>

                    <Text style={styles.referenceText}>
                        Email: {data.branch?.name?.toLowerCase()}.taxoffice@swspropertytaxpro.com
                    </Text>
                </View>
                <View style={{
                    ...styles.barcodeSection,
                    alignItems: "flex-end"
                }}>

                    {/* <View style={styles.barcodeBox} /> */}
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                        marginBottom: 3
                    }}>
                        <Text style={{
                            ...styles.referenceText,
                            fontWeight: "semibold"
                        }}>
                            Certificate Ref:
                        </Text>
                        <Text style={styles.referenceText}>
                            {data?.branch?.name?.toUpperCase()}/YTCC/{new Date().getFullYear()}/{data.propertyDetails.propertyCode}
                        </Text>
                    </View>

                    <Text style={styles.referenceText}>
                        Date of Issue: {data.issueDate}
                    </Text>
                </View>
            </View>
            <View style={{
                ...styles.sectionTitle,
                marginTop: 8
            }}>
                <Text>Property Details</Text>
            </View>
            <View style={{
                borderBottom: "1px solid #000",
                paddingBottom: 5,
                marginTop: 5
            }}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        Magaca Milkiilaha (Owner's Name)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.ownerName}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        Ciwaanka Guri/Darta (Property Address)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.location}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        Guri/Darta No. (Property Code)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.propertyCode}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        Nooca Dhismo/Guri/Darta (Property Type)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.propertyType}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        Boda Jukhurafi Guir/Darta (GPS Location)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.gpsLocation}
                    </Text>
                </View>
            </View>

            <View style={{
                ...styles.sectionTitle,
                marginTop: 8
            }}>
                <Text>Maclumad Kooban Lacag Bixinta</Text>
                <Text style={{
                    fontSize: 9,
                    fontWeight: "normal",
                    marginTop: 8
                }}>(Payment Summary)</Text>
            </View>
            <Table>
                <TH >
                    <TD style={styles.tableHeader}>Faahfaahinta – (Description)</TD>
                    <TD style={styles.tableHeader}>Cadadka Qidmada – (Rate)</TD>
                    <TD style={styles.tableHeader}>Cadadka Lacagta (Amount USD/Sh.So)</TD>
                </TH>
                <TR>
                    <TD style={styles.tableRowValue}>
                        <Text style={{
                            fontWeight: "semibold"
                        }}>
                            Sanadle Canshurta Guri/Daraha
                        </Text> (Annual Property
                        Tax) </TD>
                    <TD style={styles.tableRowValue2}>${data.taxCalculation.propertyTax}</TD>
                    <TD style={styles.tableRowValue2}>${data.taxCalculation.propertyTax}</TD>
                </TR>
                <TR>
                    <TD style={styles.tableRowValue}>
                        <Text style={{
                            fontWeight: "semibold"
                        }}>
                            Khidmo Adeeg fulin
                        </Text> (Administrative Fee)</TD>
                    <TD style={styles.tableRowValue2}>Flat Fee </TD>
                    <TD style={styles.tableRowValue2}>${data.taxCalculation.administrativeFee}</TD>
                </TR>
                <TR>
                    <TD style={styles.tableRowValue}>
                        <Text style={{
                            fontWeight: "semibold"
                        }}>
                            Wadarta Guud la bixiyey (Total Amount Paid)
                        </Text></TD>
                    <TD style={styles.tableRowValue2}></TD>
                    <TD style={styles.tableRowValue2}>${data.taxCalculation.totalAmount}</TD>
                </TR>
            </Table>

            <Text style={{
                fontSize: 11,
                fontWeight: "normal",
                marginTop: 15,
                marginBottom: 10
            }}>
                This is to certify that Abdirizak Yusuf (ID: 567891234), property code {data.propertyDetails.propertyCode}, located at Waaxda Jabad Gele, {data?.branch?.name} District, and registered as Tin Building (Cariish/ Hut), has fully paid the annual property tax for year ending 2025. Details as follows;
            </Text>


            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "space-between",
                marginTop: 10
            }}>
                <Text style={{
                    ...styles.paymentTermsText,
                    fontWeight: 'semibold'
                }}>
                    TAARIKH: {moment().format('MM/DD/YYYY')}
                </Text>
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        src={generateBarcodeBase64(`${data?.branch?.name?.toUpperCase()}/YTCC/${new Date().getFullYear()}/${data.propertyDetails.propertyCode}`)}
                        style={{
                            width: 150,
                        }}
                    />
                </View>
            </View>
        </Page>
    </Document>
);

export default TaxCertificatePDF;