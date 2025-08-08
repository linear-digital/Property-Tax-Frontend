import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    textAlign: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'right',
  },
  invoiceText: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  barcode: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 10,
  },
  divider: {
    borderBottom: '1px solid #000',
    marginVertical: 8,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textDecoration: 'underline',
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    width: '50%',
  },
  value: {
    width: '50%',
  },
  table: {
    width: '100%',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #eee',
    paddingVertical: 3,
  },
  tableCol: {
    paddingHorizontal: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },
  col1: {
    width: '50%',
  },
  col2: {
    width: '25%',
  },
  col3: {
    width: '25%',
  },
  footer: {
    marginTop: 15,
    fontSize: 10,
  },
  contactInfo: {
    marginTop: 10,
    fontSize: 10,
  },
  paymentTerms: {
    marginTop: 10,
  },
  termItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  termBullet: {
    width: 15,
  },
  termText: {
    flex: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    fontWeight: 'bold',
  },
  totalLabel: {
    width: '50%',
    textAlign: 'right',
    paddingRight: 10,
  },
  totalValue: {
    width: '25%',
    textAlign: 'right',
  },
  addressBlock: {
    marginBottom: 8,
    lineHeight: 1.3,
  },
  paymentMethod: {
    marginTop: 10,
  },
});

export default styles;