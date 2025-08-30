/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";
import Filter from "./Filter";
import { Pagination, Popconfirm, Table } from "antd";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../util/axios.instance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { errorMessage } from "../../util/errorMessage";
import { useUser } from "../../contexts/UserContext";
import type { Property } from "../../types/property";

interface Properties extends Property {
  _id: string; // MongoDB ID
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface ApiResponse {
  data: Properties[];
  pagination: PaginationData;
}

const ManageProperties = () => {
  const { permissions } = useUser();
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  const [filters, setFilters] = useState({
    code: "",
    state: "",
    region: "",
    district: "",
    village: "",
    property_type: "",
    property_status: ""
  });
  const { data: apiResponse, isLoading, isFetching, refetch } = useQuery<ApiResponse>({
    queryKey: ['properties', pagination.page, pagination.limit],
    queryFn: async () => {
      const res = await fetcher({
        path: '/property/all',
        method: 'POST',
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
        body: filters
      });
      return res
    }
  });

  useEffect(() => {
    if (apiResponse?.pagination) {
      setPagination(apiResponse.pagination);
    }
  }, [apiResponse]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({
      ...prev,
      page,
      ...(pageSize && { limit: pageSize })
    }));
  };
  const handleDelete = (id: string) => {
    try {
      fetcher({
        path: `/property/${id}`,
        method: 'DELETE'
      }).then(() => {
        toast.success('Property deleted successfully');
        refetch();
      });
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }
  const columns = [
    {
      title: 'Property Info',
      dataIndex: 'code',
      key: 'code',
      render: (_: any, record: Property) => (
        <ul>
          <li>
            <strong>Code:</strong> {record.code}
          </li>
          <li>
            <strong>Property Type:</strong> {record.property_type}
          </li>
          <li>
            <strong>House/Building Details :</strong> {record.house_building_details || 'N/A'}
          </li>
          <li>
            <strong>Property Status:</strong> {record.property_status || 'N/A'}
          </li>
        </ul>
      )
    },
    {
      title: 'Property Location',
      dataIndex: 'location',
      key: 'location',
      render: (_: any, record: Property) => (
        <ul>
          <li>
            <strong>State:</strong> {record.state}
          </li>
          <li>
            <strong>Region:</strong> {record.region}
          </li>
          <li>
            <strong>District:</strong> {record.district}
          </li>
          <li>
            <strong>Village:</strong> {record.village || 'N/A'}
          </li>
        </ul>
      )
    },
    {
      title: 'Owner Info',
      dataIndex: 'owner_info',
      key: 'owner_info',
      render: (_: any, record: Property) => (
        <ul>
          <li>
            <strong>Name:</strong> {record.owner_name}
          </li>
          <li>
            <strong>Phone:</strong> {record.owner_phone}
          </li>
          <li>
            <strong>Email:</strong> {record.owner_email || 'N/A'}
          </li>
          <li>
            <strong>NID:</strong> {record.owner_nid || 'N/A'}
          </li>
        </ul>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Properties) => (
        <div className="flex items-center gap-x-2">
          <Link
            style={{
              display: !permissions.includes('property-edit') ? 'none' : 'block'
            }}
            to={`/property/${record._id}`}>
            <button className="bg-secondary py-1 px-3 rounded-md text-sm text-white cursor-pointer">Edit</button>
          </Link>
          <Popconfirm

            title="Are you sure to delete this property?"
            onConfirm={() => handleDelete(record._id)}
          >
            <button
              style={{
                display: !permissions.includes('property-delete') ? 'none' : 'block'
              }}
              className="bg-error py-1 px-3 rounded-md text-sm text-white cursor-pointer">Delete</button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="py-5">
      <div
        style={{
          display: !permissions.includes('property-create') ? 'none' : 'flex'
        }}
        className="items-center gap-x-4">
        <Link to={'/property/create'}>
          <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer">
            <Plus fontSize={10} /> Add New Property
          </button>
        </Link>
        <Link to={'/property/create-multiple'}>
          <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer">
            <Plus fontSize={10} /> Add Property From Excel
          </button>
        </Link>
      </div>

      <Filter
        filters={filters}
        setFilters={setFilters}
        refetch={refetch}
      />

      <Table
        style={{
          display: !permissions.includes('property-list') ? 'none' : 'block'
        }}
        dataSource={apiResponse?.data || []}
        columns={columns}
        pagination={false}
        className="mt-5"
        bordered
        scroll={{ x: 'max-content' }}
        loading={isLoading || isFetching}
        rowKey="_id"
      />

      <div className=" justify-end mt-4"
        style={{
          display: !permissions.includes('property-create') ? 'none' : 'flex'
        }}
      >
        <Pagination
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

export default ManageProperties;