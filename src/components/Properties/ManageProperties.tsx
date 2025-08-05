import { Plus } from "lucide-react";
import Filter from "./Filter";
import { Pagination, Table } from "antd";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../util/axios.instance";



const ManageProperties = () => {
    const { data: properties = [] } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await fetcher({
                path: '/property'
            })
            return res
        }
    });

    return (
        <div className="py-5">

            <div className="flex items-center gap-x-4">
                <Link to={'/property/create'}>
                    <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer" >
                        <Plus fontSize={10} />  Add New Property
                    </button>
                </Link>
                <Link to={'/property/create-multiple'}>
                    <button

                        className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer" >
                        <Plus fontSize={10} />  Add Property From Excel
                    </button>
                </Link>

            </div>
            <Filter />
            <Table
                dataSource={properties?.data || []}
                pagination={false}
                className="mt-5"
                bordered
                scroll={{ x: 'max-content' }}
                columns={[
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
                        dataIndex: 'action',
                        key: 'action',
                        render: () => (
                            <div className="flex items-center gap-x-2">
                                <button className="bg-secondary py-1 px-3 rounded-md text-sm text-white">Edit</button>
                                <button className="bg-error py-1 px-3 rounded-md text-sm text-white">Delete</button>
                            </div>
                        ),
                    },
                ]}
            />
            <div className="flex justify-end mt-4">
                <Pagination
                    className="mt-5"
                    total={50}
                    showSizeChanger={false}
                    pageSize={10}
                    defaultCurrent={1}
                />
            </div>
        </div>
    );
};

export default ManageProperties;