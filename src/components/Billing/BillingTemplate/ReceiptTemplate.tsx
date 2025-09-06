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
        alignItems: "flex-end"
    },
    headerTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 15,
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
        fontSize: 9,
        fontWeight: 'semibold',
        paddingTop: 6,
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
        fontSize: 7,
        fontWeight: 'semibold',
    },
    detailValue: {
        width: '50%',
        paddingHorizontal: 3,
        paddingVertical: 2,
        fontSize: 7,
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
        fontSize: 9,
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
});

interface InvoicePDFProps {
    data: any;
}

const ReceiptPDFTemplate: React.FC<InvoicePDFProps> = ({ data }) => (
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
                    <Text style={styles.headerTitle}> Payment Receipt Voucher
                    </Text>
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
                            Invoice Ref:
                        </Text>
                        <Text style={styles.referenceText}>
                            {data?.branch?.name?.toUpperCase()}/PRV/{new Date().getFullYear()}/{data.propertyDetails.propertyCode}
                        </Text>
                    </View>

                    <Text style={styles.referenceText}>
                        Payment Date: {moment(data?.payment?.payment_date).format('DD/MM/YYYY')}
                    </Text>
                </View>
            </View>
            {/* Property Details Section */}
            <View style={styles.sectionTitle}>
                <Text>MACLUUMAADKA GURIGADARAHA</Text>
                <Text style={{
                    fontSize: 7,
                    fontWeight: "normal",
                    marginTop: 2
                }}>(PROPERTY DETAILS)</Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={{
                    ...styles.detailRow,
                    backgroundColor: "#efefef"
                }}>
                    <Text style={styles.detailLabel}>
                        XOGTA (DESCRIPTION)
                    </Text>
                    <Text style={styles.detailLabel}>
                        MACLUUMAADKA (DETAILS)
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        MAGACA MILKIILAHA (OWNER NAME)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.ownerName}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        TELEFONKA MILKIILAHA (OWNER CONTACT TELEPHONE NO.)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.contactNumber}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        GURI/DEGANKA NO. (PROPERTY CODE)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.propertyCode}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        CIWANKA GURIGA/DEGANKA (PROPERTY LOCATION)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.location}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        ISTICMAALKA/NOOCA GURIGA/DEGANKA (PROPERTY TYPE)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.propertyType}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        WADARTA GUUD CABIRKA GURI/DARTA (TOTAL AREA)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.totalArea}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        TILMAAN CAAN GURI/DARTU DHOW (NEARBY LANDMARK)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.landmark}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        BODA JUKHURAFT GURI/DARTA (GPS LOCATION)
                    </Text>
                    <Text style={styles.detailValue}>
                        {data.propertyDetails.gpsLocation}
                    </Text>
                </View>
            </View>

            <View style={styles.sectionTitle}>
                <Text>MACLUUMAADKA CANSHUURTA</Text>
                <Text style={{
                    fontSize: 7,
                    fontWeight: "normal",
                    marginTop: 2
                }}>(TAX DETAILS)</Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={{
                    ...styles.detailRow,
                    backgroundColor: "#efefef"
                }}>
                    <Text style={styles.detailLabel}>
                        FAAHFAAHINTA – (DESCRIPTION)
                    </Text>
                    <Text style={styles.detailLabel}>
                        CADADKA QIIDMADA –(RATE)
                    </Text>
                    <Text style={styles.detailLabel}>
                        CADADKA LACAGTA – (AMOUNT)(USD/SH.SO)
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        MAGACA MILKIILAHA (OWNER NAME)
                    </Text>
                    <Text style={styles.detailValue}>
                        ${data.taxCalculation.propertyTax}
                    </Text>
                    <Text style={styles.detailValue}>
                        ${data.taxCalculation.propertyTax}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        KHIDMO ADEEG FULIN (ADMINISTRATIVE FEE)
                    </Text>
                    <Text style={styles.detailValue}>
                        Flat Fee $
                    </Text>
                    <Text style={styles.detailValue}>
                        ${data.taxCalculation.administrativeFee}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        WADARTA GUUD LA BIXIYEY (TOTAL AMOUNT PAID)
                    </Text>
                    <Text style={styles.detailValue}>

                    </Text>
                    <Text style={styles.detailValue}>
                        ${data.payment?.amount}
                    </Text>
                </View>


            </View>


            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                    alignItems: 'center'
                }}
            >
                <View>
                    <Text style={styles.paymentTermsText}>
                        TAARIKH: {moment().format('MM/DD/YYYY')}
                    </Text>
                    <Text style={styles.paymentTermsText}>
                        Payment Method: {data.payment?.payment_method}
                    </Text>

                    <Text style={styles.paymentTermsText}>
                        Transaction Id: {data.payment?.reference}
                    </Text>
                </View>

                <View style={{
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>

                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            src={generateBarcodeBase64(`${data?.branch?.name?.toUpperCase()}/PRV/${new Date().getFullYear()}/${data?.propertyDetails.propertyCode}`)}
                            style={{
                                width: 150,
                            }}
                        />
                    </View>
                </View>
            </View>

            <Text style={{
                ...styles.paymentTermsText,
                fontWeight: 'semibold',
                marginTop: 10
            }}>
                FADLAN LA KEEHI:
            </Text>
            <Text style={styles.paymentTermsText}>
                {data.branch?.title} XAFIISKA HUBINTA CANSHURAHA & XILINTA CABASHADA DADWEYNAHA GOBOLKA SH. HOOSE
            </Text>
            <Text style={styles.paymentTermsText}>
                MUD. MOHAMED NUR OSMAN (GABOW) +252-615343064 | +252-6644490
            </Text>
            <Text style={styles.paymentTermsText}>
                Email: cabasho@dhisomtax.so
            </Text>
        </Page>
    </Document>
);

export default ReceiptPDFTemplate;