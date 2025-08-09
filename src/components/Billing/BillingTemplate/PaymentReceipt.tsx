/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import type { Property } from '../../../types/property';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReceiptPDFTemplate from './ReceiptTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const PaymentReceiptDowload = ({ payment }: { payment: any }) => {

    const property: Property = payment?.property_code as any

    const formData: any = {
        payment: payment,
        invoiceNumber: payment?.invoice_id,
        receiptReference: 'TIXRAAC NO. WARSADA LACAGBINTA',
        issueDate: moment(payment?.createdAt).format('YYYY-MM-DD'),
        propertyDetails: {
            ownerName: property?.owner_name,
            contactNumber: property?.owner_phone,
            propertyCode: property?.code,
            location: property?.property_address,
            propertyType: property?.property_type,
            totalArea: property?.property_size_sm2,
            landmark: 'm',
            gpsLocation: `${property?.latitude}, ${property?.longitude}`
        },
        taxCalculation: {
            propertyTax: payment?.invoice_id?.tax,
            administrativeFee: payment?.invoice_id?.admin_fee,
            totalAmount: payment?.invoice_id?.total_due
        },
        paymentMethod: 'Bank Transfer',
        bankDetails: {
            accountName: 'CANSHUURTA GOBOLKA SHABEELLAHA HOOSE DEGMADA AFGOYE',
            accountNumber: '37517771'
        }
    }

    const filename = `payment_${payment?.invoice_id?.invoice_id}.pdf`
    return (
        <div>
            <PDFDownloadLink
                document={<ReceiptPDFTemplate data={formData} />}
                fileName={filename}
            >
                {({ loading }) =>
                    loading ? 'Generating PDF' : <span className='dark:text-white text-dark'><FontAwesomeIcon icon={faFilePdf} /> Download Invoice PDF</span>
                }
            </PDFDownloadLink>
            {/* <PDFViewer width="100%" height="1000px">
                <ReceiptPDFTemplate data={formData} />
            </PDFViewer> */}
        </div>
    );
};

export default PaymentReceiptDowload;