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
import type { InvoiceData } from '../../types/invoice';

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10,
        // borderBottom: '1px solid #E6E6E6',
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
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 3,
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
        fontSize: 7,
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
        fontSize: 7,
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
    data: InvoiceData;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.logo}>

                    <Image
                        src={data?.branch?.logo}
                        style={{
                            width: 50,
                            height: 50,
                        }} />
                </View>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Canshuurta</Text>
                    <Text style={styles.headerTitle}>Guryaha/Daraha</Text>
                    <Text style={styles.headerSubtitle}>Property Tax</Text>
                </View>

            </View>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }}>
                <Text style={styles.invoiceTitle}>KhaanSheegad</Text>
                <Text style={styles.headerSubtitle}>Invoice</Text>
                <View style={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    position: "absolute",
                    right: 0
                }}>
                    <Text style={styles.barcodeText}>Barcode</Text>
                    <Text style={styles.barcodeText}>{data?.branch?.code}{data?.invoiceNumber}</Text>
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderBottom: "1px solid #000",
                paddingBottom: 5
            }}>
                <View style={styles.barcodeSection}>

                    {/* <View style={styles.barcodeBox} /> */}
                    <Text style={{
                        ...styles.referenceText,
                        fontWeight: "semibold"
                    }}>
                        {data.branch?.title}
                    </Text>
                    <Text style={styles.referenceText}>
                        WAAXDA XISAABAADKA DAKHLIGA
                    </Text>
                    <Text style={{
                        ...styles.referenceText,
                    }}>
                        XAFIISKA GUDOMIYAHA DEGMADA
                    </Text>
                    <Text style={styles.referenceText}>
                        +252-617171733 | +252-6644490
                    </Text>
                    <Text style={styles.referenceText}>
                        Email: G.Suldan@dhisomtax.so
                    </Text>
                </View>
                <View style={{
                    ...styles.barcodeSection,
                    alignItems: "flex-end"
                }}>

                    {/* <View style={styles.barcodeBox} /> */}
                    <Text style={{
                        ...styles.referenceText,
                        fontWeight: "semibold"
                    }}>
                        TIXRAAC NO. WARSADA LACAGBINTA
                    </Text>
                    <Text style={styles.referenceText}>
                        Receipt Reference No. MINISTRY OF FINANCE
                    </Text>
                    <Text style={{
                        ...styles.referenceText,
                        fontWeight: "semibold"
                    }}>
                        TAARIKHDA LA BIXIYEY
                    </Text>
                    <Text style={styles.referenceText}>
                        Date of Issue: {data.issueDate}
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
                        ${data.taxCalculation.propertyTax.toFixed(2)}
                    </Text>
                    <Text style={styles.detailValue}>
                        ${data.taxCalculation.propertyTax.toFixed(2)}
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
                        ${data.taxCalculation.administrativeFee.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>
                        WADARTA GUUD LA BIXIYEY (TOTAL AMOUNT PAID)
                    </Text>
                    <Text style={styles.detailValue}>

                    </Text>
                    <Text style={styles.detailValue}>
                        ${data.taxCalculation.totalAmount.toFixed(2)}
                    </Text>
                </View>


            </View>
            <View style={styles.sectionTitle}>
                <Text>QAABKA LACAG BIXINTA</Text>
                <Text style={{
                    fontSize: 7,
                    fontWeight: "normal",
                    marginTop: 2
                }}>PAYMENT METHOD</Text>
            </View>
            {/* Payment Method Section */}
            <View style={styles.paymentSection}>
                <View style={styles.bankDetails}>
                    <Text style={{ fontWeight: 'bold' }}>
                        WAXAA KU BIXIN KARTAA PAYABLE TO:
                    </Text>
                    <Text><Text style={{ fontWeight: 'semibold' }}>BANK ACCOUNT NAME</Text>: CANSHUURTA GOBOLKA SHABEELEHA HOOSE {data.branch.title}</Text>
                    <Text>BANK ACCOUNT NUMBER: 37517771</Text>
                    <Text>BANK NAME: SOMALI COMMERCIAL BANK</Text>
                </View>
            </View>
            <View style={styles.sectionTitle}>
                <Text>SHURUUDAHA BIXINTA</Text>
                <Text style={{
                    fontSize: 7,
                    fontWeight: "normal",
                    marginTop: 2
                }}>PAYMENT TERMS</Text>
            </View>
            {/* Payment Terms */}
            <View style={styles.paymentTerms}>
                <Text style={styles.paymentTermsText}>
                    1. WAA IN AAD KU BIXI SAA UGU DANBEYN 01/05/2025
                </Text>
                <Text style={styles.paymentTermsText}>
                    PAYMENT MUST BE MADE NO LATER THAN 01/05/2025
                </Text>
                <Text style={{
                    ...styles.paymentTermsText,
                    marginTop: 2
                }}>
                    2. CIDI AAN KU BIXIN WAQTIGA LAGU QABTAY WAXAA KU JIRO GUNAYS BOQOKI 5% QIIMA KORAR
                </Text>
                <Text style={styles.paymentTermsText}>
                    A 5% SURCHARGE WILL BE APPLIED TO OVERDUE PAYMENTS STARTING FROM 02/05/{new Date().getFullYear() + 1}
                </Text>
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
                    <Text style={{
                        ...styles.paymentTermsText,
                        fontWeight: 'semibold'
                    }}>
                        SA SOO SAXDAY:
                    </Text>
                    <Text style={styles.paymentTermsText}>
                        XAFIISKA SHIBILAHA KEER DEGMADADA
                    </Text>
                    <Text style={styles.paymentTermsText}>
                        LOWER SHABELLE REVENUE OFFICE
                    </Text>
                    <Text style={styles.paymentTermsText}>
                        TEL: 061715540
                    </Text>
                </View>

                <View style={{
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <Text style={styles.paymentTermsText}>
                        TAARIKH: 07/08/2025
                    </Text>
                    <Text style={styles.paymentTermsText}>
                        Barcode
                    </Text>
                    <Text style={styles.paymentTermsText}>
                        {data.branch?.code}{data?.invoiceNumber}
                    </Text>
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

export default InvoicePDF;