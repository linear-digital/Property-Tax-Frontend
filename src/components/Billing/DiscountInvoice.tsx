/* eslint-disable @typescript-eslint/no-explicit-any */
import PropertyTaxInvoice, { type InvoiceData } from './InvoiceTemplate';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import { useParams } from 'react-router';
import { Spin } from 'antd';
import moment from 'moment';
import type { Property } from '../../types/property';



const DiscountInvoice = () => {
    const { id } = useParams();
    const { data: payment, isLoading } = useQuery({
        queryKey: ['payment', id],
        queryFn: async () => {
            const data = await fetcher({
                path: `/payment/single/${id}`
            });
            return data;
        },
        enabled: !!id
    })
    const property: Property = payment?.property_code || {}
    const iv: any = payment?.invoice_id || {}
    const invoiceData: InvoiceData = {
        invoiceNumber: iv.invoice_id,
        issueDate: moment(iv.createdAt).format('YYYY-MM-DD'),
        deadline: moment(iv.due_date).format('YYYY-MM-DD'),
        property: {
            ownerName: property.owner_name,
            nationalId: property.owner_nid || "N/A",
            propertyCode: property.code,
            location: property.property_address,
            type: property.property_type,
            dimensions: `Width: ${property.property_width}, Length: ${property.property_length}`,
            area: `${property.property_size_sm2} Square Meters`,
            landmark: property.landmark,
        },
        tax: {
            annualTax: 0,
            adminFee: 0,
            discount: payment?.discount
        },
        surchargePercentage: 0.05,
        contactEmail: 'XXXX@hotmail.com',
        contactPhone: '+252-617447777',
        payableTo: 'Canshuuraha Guriyaha (Daaraha) Gobolka Shabeelaha Hoose',
        bankAccount: '37360302',
    };
    if (isLoading) {
        return <Spin fullscreen />
    }
    return (
        <div>

            <PropertyTaxInvoice data={invoiceData} invoice={property} />
        </div>
    );
};

export default DiscountInvoice;