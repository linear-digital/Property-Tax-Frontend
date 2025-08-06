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

interface Property {
  _id: string;
  code: string;
  state: string;
  region: string;
  district: string;
  property_type: string;
  house_building_details: string;
  property_status: string;
  // Add other properties as needed
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface ApiResponse {
  data: Property[];
  pagination: PaginationData;
}

const ManageProperties = () => {
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
      title: 'Property Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Property Type',
      dataIndex: 'property_type',
      key: 'property_type',
    },
    {
      title: 'House/Building Details',
      dataIndex: 'house_building_details',
      key: 'house_building_details',
    },
    {
      title: "Property Status",
      dataIndex: 'property_status',
      key: 'property_status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Property) => (
        <div className="flex items-center gap-x-2">
          <Link to={`/property/${record._id}`}>
            <button className="bg-secondary py-1 px-3 rounded-md text-sm text-white cursor-pointer">Edit</button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this property?"
            onConfirm={() => handleDelete(record._id)}
          >
            <button 
          className="bg-error py-1 px-3 rounded-md text-sm text-white cursor-pointer">Delete</button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="py-5">
      <div className="flex items-center gap-x-4">
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
        dataSource={apiResponse?.data || []}
        columns={columns}
        pagination={false}
        className="mt-5"
        bordered
        scroll={{ x: 'max-content' }}
        loading={isLoading || isFetching}
        rowKey="_id"
      />

      <div className="flex justify-end mt-4">
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