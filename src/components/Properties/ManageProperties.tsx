import { Plus } from "lucide-react";
import Filter from "./Filter";
import { Pagination, Table } from "antd";
import { Link } from "react-router";



const ManageProperties = () => {
    return (
        <div className="py-5">
            <Link to={'/property/create'}>
                <button className="bg-accent py-2 px-5 rounded-md text-sm text-white flex items-center gap-x-1 cursor-pointer" >
                    <Plus fontSize={10} />  Add New Property
                </button>
            </Link>
            <Filter />
            <Table
                pagination={false}
                className="mt-5"
                scroll={{ x: 'max-content' }}
                columns={[
                    {
                        title: 'Property Code',
                        dataIndex: 'propertyCode',
                        key: 'propertyCode',
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
                        dataIndex: 'propertyType',
                        key: 'propertyType',
                    },
                    {
                        title: 'House/Building Details',
                        dataIndex: 'houseDetails',
                        key: 'houseDetails',
                    },
                    {
                        title: "Property Status",
                        dataIndex: 'propertyStatus',
                        key: 'propertyStatus',
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