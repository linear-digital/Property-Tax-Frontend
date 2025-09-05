/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { Button, Dropdown, Pagination, Table } from "antd";
import Filter from "./Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExcel, faFlag } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../util/axios.instance";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import InvoicePDFDowload from './InvoicePDFDownload';
import InvoiceListExcel from './ExportExcel';
import toast from 'react-hot-toast';
import { useUser } from '../../contexts/UserContext';
import { invoicePermissions } from './constants';
import NoPermission from '../global/NoPermission';



const TaxInvoice = () => {
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20
  });
  const [filters, setFilters] = useState({
    invoice_id: "",
    property_code: "",
    status: "",
    agent: "",
    stateDate: "",
    endDate: ""
  })
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["taxInvoice", pagination],
    queryFn: async () => {
      const data = await fetcher({
        path: "/invoice",
        params: {
          page: pagination.page,
          limit: pagination.limit,
          invoice_id: filters.invoice_id,
          property_code: filters.property_code,
          status: filters.status,
          agent: filters.agent,
          startDate: filters.stateDate,
          endDate: filters.endDate
        }
      });
      return data;
    }
  });
  useEffect(() => {
    if (data?.pagination) {
      setPagination(data.pagination)
    }
  }, [data])

  const navigate = useNavigate();
  const markDisputed = async (record: any) => {
    try {
      await fetcher({
        path: `/invoice/dispute/${record._id}`,
        method: "PUT"
      });
      refetch();
      toast.success("Invoice marked as disputed");
    } catch (error) {
      console.error(error);
    }
  }
  const columns = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoice_id',
      key: 'invoice_id',
    },
    {
      title: 'Property Code',
      dataIndex: 'property_code',
      key: 'property_code',
    },
    {
      title: 'Annual Tax ($)',
      dataIndex: 'tax',
      key: 'tax',
      render: (tax: any) => `$${tax || 0}`,
    },
    {
      title: 'Admin Fee ($)',
      dataIndex: 'admin_fee',
      key: 'admin_fee',
      render: (tax: any) => `$${tax || 0}`,
    },
    {
      title: 'Total Due ($)',
      dataIndex: 'total_due',
      key: 'total_due',
      render: (tax: any) => `$${tax || 0}`,
    },
    {
      title: 'Total Overdue ($)',
      dataIndex: 'overdue',
      key: 'overdue',
     render: (tax: any) => `$${tax || 0}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => (
        <div>
          {status === "Paid" ? (
            <button color="green" className="text-white bg-green-600 px-3 py-[2px] rounded-sm text-xs">Paid</button>
          ) : (
            <button color="green" className="text-white bg-red-600 px-3 py-[2px] rounded-sm text-xs">Not Paid</button>
          )}
        </div>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (due_date: any) => moment(due_date).format("YYYY-MM-DD"),
    },
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
      render: (agent: any) => agent || 'N/A',
    },
    {
      title: 'Disputed',
      dataIndex: 'dispute',
      key: 'dispute',
      render: (dispute: boolean) => <div>
        {dispute ? (
          <button className="text-white bg-red-600 px-3 py-[2px] rounded-sm text-xs">Disputed</button>
        ) : (
          <button className="text-white bg-green-600 px-3 py-[2px] rounded-sm text-xs">Not Disputed</button>
        )}
      </div>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Dropdown
          placement="bottomRight"
          trigger={['click']}
          menu={{
            items: [
              {
                key: '1',
                onClick: () => navigate(`/billing/invoice/${record._id}`),
                label: <button>
                  <FontAwesomeIcon icon={faEye} /> View
                </button>,
              }, {
                key: '12',
                label:  <InvoicePDFDowload invoice={record} />,
              }, {
                key: '123',
                label: <button
                  onClick={() => markDisputed(record)}
                >
                  <FontAwesomeIcon icon={faFlag} /> Mark as Disputed
                </button>,
              },
            ],
          }}
        >
          <Button>Action</Button>
        </Dropdown>
      ),
    },
  ];
  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({
      ...prev,
      page,
      ...(pageSize && { limit: pageSize })
    }));
  };
  const filename = `tax_invoice_${moment().format('YYYY-MM-DD')}.xlsx`;
  const { permissions } = useUser();

  if (!permissions.includes(invoicePermissions[5])) {
    return <NoPermission />
  }
  return (
    <div>
      <Filter
        filters={filters}
        setFilters={setFilters}
        refetch={refetch}
      />
      <button
        style={{
          display: permissions.includes(invoicePermissions[0]) ? 'flex' : 'none'
        }}
        className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer mt-4">
        <FontAwesomeIcon icon={faFileExcel} />  <InvoiceListExcel filename={filename} query={filters} />
      </button>
      <h4 className="text-lg dark:text-white text-dark my-5">
        Tax Invoices
      </h4>
      <Table
        style={{
          display: permissions.includes(invoicePermissions[0]) ? 'block' : 'none'
        }}
        loading={isLoading}
        dataSource={data?.data || []}
        scroll={{ x: 'max-content' }}
        bordered={false}
        columns={columns}
        pagination={false}
        rowKey="_id"
      />
      <div className="flex justify-end mt-4">
        <Pagination
          style={{
            display: permissions.includes(invoicePermissions[0]) ? 'block' : 'none'
          }}
          total={pagination.total}
          current={pagination.page}
          pageSize={pagination.limit}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={['10', '20', '50', '100']}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} properties`}
        />
      </div>
    </div>
  );
};

export default TaxInvoice;