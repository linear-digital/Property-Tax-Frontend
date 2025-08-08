import type { Property } from "./property";

export interface PropertyDetails {
  ownerName: string;
  contactNumber: string;
  propertyCode: string;
  location: string;
  propertyType: string;
  totalArea: number;
  landmark: string;
  gpsLocation: string;
}

export interface TaxCalculation {
  propertyTax: number;
  administrativeFee: number;
  totalAmount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  receiptReference: string;
  issueDate: string;
  propertyDetails: PropertyDetails;
  taxCalculation: TaxCalculation;
  paymentMethod: string;
  bankDetails: {
    accountName: string;
    accountNumber: string;
  };
}

export interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
}

export interface InvoiceType {
  invoice_id: string;
  property_id: Property;
  property_code: string;
  createdAt: string;
  payment_date: string;
  tax: number;
  admin_fee: number;
  total_due: number;
  overdue: number;
  status: string;
  due_date: string;
  agent: string;
  dispute: boolean
}