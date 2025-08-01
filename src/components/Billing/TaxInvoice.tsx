
import { Table } from "antd";
import Filter from "./Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";


const TaxInvoice = () => {

  const columns = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Property Code',
      dataIndex: 'propertyCode',
      key: 'propertyCode',
    },
    {
      title: 'Annual Tax ($)',
      dataIndex: 'annualTax',
      key: 'annualTax',
    },
    {
      title: 'Admin Fee ($)',
      dataIndex: 'adminFee',
      key: 'adminFee',
    },
    {
      title: 'Total Due ($)',
      dataIndex: 'totalDue',
      key: 'totalDue',
    },
    {
      title: 'Total Overdue ($)',
      dataIndex: 'totalOverdue',
      key: 'totalOverdue',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
    },
    {
      title: 'Disputed',
      dataIndex: 'disputed',
      key: 'disputed',
      render: (disputed: boolean) => (disputed ? 'Yes' : 'No'),
    },
  ];
  return (
    <div>
      <Filter />
      <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
        <FontAwesomeIcon icon={faFileExcel} />   Download Excel
      </button>
      <h4 className="text-lg dark:text-white text-dark my-5">
        Tax Invoices
      </h4>
      <Table
        scroll={{ x: 'max-content' }}
        bordered={false}
        columns={columns}
      />
    </div>
  );
};

export default TaxInvoice;