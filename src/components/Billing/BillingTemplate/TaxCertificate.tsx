/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import type { Property } from '../../../types/property';
import {  PDFViewer } from '@react-pdf/renderer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import TaxCertificatePDF from './TaxCertificatePDF';
import { useTheme } from '../../../contexts/ThemeContext';


const TaxCertificate = ({ payment }: { payment: any }) => {
    const {branch}= useTheme();
    const property: Property = payment?.property_code as any

    const formData: any = {
        branch: branch,
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
        bankDetails: {
            accountName: 'CANSHUURTA GOBOLKA SHABEELLAHA HOOSE DEGMADA AFGOYE',
            accountNumber: '37517771'
        }
    }

    // const filename = `TaxCertificate_${payment?.invoice_id?.invoice_id}.pdf`
    return (
        <div>
            {/* <PDFDownloadLink
                document={<TaxCertificatePDF data={formData} />}
                fileName={filename}
            >
                {({ loading }) =>
                    loading ? 'Generating PDF' : <span className='dark:text-white text-dark'><FontAwesomeIcon icon={faCertificate} /> Tax Certificate </span>
                }
            </PDFDownloadLink> */}
            <PDFViewer width="100%" height="1000px">
                <TaxCertificatePDF data={formData} />
            </PDFViewer>
        </div>
    );
};

export default TaxCertificate;