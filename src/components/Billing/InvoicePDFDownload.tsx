/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import type { Property } from '../../types/property';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TaxInvoiceTemplate from './TaxInvoicePDF';
import type { InvoiceData, InvoiceType } from '../../types/invoice';

const InvoicePDFDowload = ({ invoice }: { invoice: InvoiceType }) => {

    const property: Property = invoice?.property_id as any

    const formData: InvoiceData = {
        invoiceNumber: invoice?.invoice_id,
        receiptReference: 'TIXRAAC NO. WARSADA LACAGBINTA',
        issueDate: moment(invoice?.createdAt).format('YYYY-MM-DD'),
        propertyDetails: {
            ownerName: property.owner_name,
            contactNumber: property.owner_phone,
            propertyCode: property.code,
            location: property.property_address,
            propertyType: property.property_type,
            totalArea: property.property_size_sm2,
            landmark: 'm',
            gpsLocation: `${property.latitude}, ${property.longitude}`
        },
        taxCalculation: {
            propertyTax: invoice.tax,
            administrativeFee: invoice.admin_fee,
            totalAmount: invoice.total_due
        },
        paymentMethod: 'Bank Transfer',
        bankDetails: {
            accountName: 'CANSHUURTA GOBOLKA SHABEELLAHA HOOSE DEGMADA AFGOYE',
            accountNumber: '37517771'
        }
    }

    const filename = `invoice_${invoice?.invoice_id}.pdf`
    return (
        <div>
            <PDFDownloadLink
                document={<TaxInvoiceTemplate data={formData} />}
                fileName={filename}
            >
                {({ loading }) =>
                    loading ? 'Generating PDF' : <span className='dark:text-white text-dark'>Download Invoice PDF</span>
                }
            </PDFDownloadLink>
        </div>
    );
};

export default InvoicePDFDowload;