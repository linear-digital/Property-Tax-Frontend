/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Tabs } from 'antd';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import type { Property } from '../../types/property';

interface ExcelData {
    [key: string]: any;
}

const AddPropertyFromExcel = () => {
    const [jsonData, setJsonData] = useState<ExcelData[]>([]);
    const [fileName, setFileName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [duplicates, setDuplicates] = useState<any>([]);
    const customKeys = [
        "state", "region", "district", "village", "zone", "branch",
        "coordinates", "latitude", "longitude", "altitude", "precision",
        "street_name", "code", "property_type", "others", "property_status",
        "property_direction_north", "property_direction_south",
        "property_direction_west", "property_direction_east",
        "property_direction", "property_size_sm2", "house_building_details",
        "type_of_villa", "villas", "property_address", "landmark",
        "plot_picture", "plot_picture_url", "occupant_details", "owner_name",
        "owner_gender", "owner_age", "owner_nid", "owner_phone", "owner_email",
        "owner_address", "owner_income_source"
    ];

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        setError(null);
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                if (!data) throw new Error('Failed to read file');

                const workbook = XLSX.read(data, { type: "array" });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

                const formattedData = jsonData.slice(1).map((row: any) => {
                    const obj: ExcelData = {};

                    // First initialize all fields with null
                    customKeys.forEach(key => obj[key] = null);

                    // Then process each cell in the row
                    row.forEach((value: any, index: number) => {
                        if (index < customKeys.length) {
                            const key = customKeys[index];

                            // Handle empty/undefined values
                            if (value === undefined || value === null || value === '') {
                                obj[key] = null;
                                return;
                            }

                            // Convert specific fields to numbers
                            if ([
                                'villas',
                                'owner_age',
                                'property_size_sm2',
                                'latitude',
                                'longitude',
                                'altitude',
                                'precision',
                            ].includes(key)) {
                                // Convert to number, default to 0 if conversion fails
                                obj[key] = isNaN(Number(value)) ? 0 : Number(value);
                            }

                            // Keep other fields as strings
                            else {
                                obj[key] = String(value);
                            }
                        }
                    });

                    return obj;
                });


                const codeMap = new Map<string, ExcelData[]>();

                formattedData.forEach((item) => {
                    const code = (item.code || "").toString().trim();
                    if (!code) return; // Skip empty codes

                    if (!codeMap.has(code)) {
                        codeMap.set(code, [item]);
                    } else {
                        codeMap.get(code)?.push(item);
                    }
                });

                const newToAdd: ExcelData[] = [];
                const duplicateEntries: ExcelData[] = [];

                codeMap.forEach((items) => {
                    if (items.length === 1) {
                        newToAdd.push(items[0]);
                    } else {
                        duplicateEntries.push(...items);
                    }
                });
                setJsonData(newToAdd);
                setDuplicates(duplicateEntries);
            } catch (err) {
                setError('Error processing file. Please try again.');
                console.error('Error converting Excel:', err);
            } finally {
                setIsLoading(false);
            }
        };

        reader.onerror = () => {
            setError('Error reading file');
            setIsLoading(false);
        };

        reader.readAsArrayBuffer(file);
    };
    const [responseFromServer, setResponseFromServer] = useState<any>(null);
    const resetConverter = () => {
        setJsonData([]);
        setFileName('');
        setError(null);
    };
    const createInvoice = async () => {
        await fetcher({
            path: '/invoice/create',
        });
    }
    const handleSubmit = async () => {
        if (jsonData.length === 0) {
            toast.error("No data to submit");
            return;
        }

        try {
            setSubmitLoading(true);
            setResponseFromServer(null);
            const response = await fetcher({
                path: "/property/bulk",
                method: "POST",
                body: jsonData
            });
            setResponseFromServer(response);
            createInvoice();
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(errorMessage(error) || "Failed to add properties");
        } finally {
            setSubmitLoading(false);

        }
    };
    const columns: any = [
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
    ];
    return (
        <div className="p-4 w-full mx-auto dark:bg-dark bg-white min-h-screen my-5 rounded-xl">
            <h1 className="text-xl font-bold mb-4 dark:text-white text-dark">
                Add Multiple Properties from Excel
            </h1>

            <div className="mb-4">
                <input
                    title='Upload Excel or CSV File'
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                />
                <p className="text-xs text-dark mt-1 dark:text-white">
                    Supports .xlsx, .xls, and .csv files
                </p>
            </div>

            {isLoading && <div className="mb-4 p-2 bg-blue-50 text-blue-700 rounded">Processing file...</div>}
            {error && <div className="mb-4 p-2 bg-red-50 text-red-700 rounded">{error}</div>}

            {fileName && !isLoading && (
                <div className="mb-4">
                    <p className="text-sm dark:text-white text-dark">
                        File: <span className="font-medium">{fileName}</span>
                        <Button danger onClick={resetConverter} className="ml-2">
                            Clear
                        </Button>
                    </p>
                </div>
            )}
            {
                responseFromServer && (
                    <div className="mb-4 p-2 bg-green-50 text-green-700 rounded">
                        <p>Message: {responseFromServer.message}</p>
                        <p>Properties Added: {responseFromServer.count}</p>
                        <p>Duplicates Found: {duplicates.length || 0}</p>
                    </div>
                )
            }
            {jsonData.length > 0 && (
                <div className="space-y-4 dark:text-white text-dark">
                    <Button
                        loading={submitLoading}
                        onClick={handleSubmit}
                        type="primary"
                        size="large"
                    >
                        {submitLoading ? 'Submitting...' : `Add ${jsonData.length} Properties to Database`}
                    </Button>
                </div>
            )}
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: `Unique Properties To Add (${jsonData.length})`,
                        key: '1',
                        children: <Table

                            dataSource={jsonData.map((item, index) => ({ key: index, ...item }))}
                            columns={columns}
                            scroll={{ x: 'max-content' }}
                            pagination={{ pageSize: 50 }}
                        />,
                    },
                    {
                        label: `Duplicates (${duplicates.length})`,
                        key: '2',
                        children: <Table
                            dataSource={duplicates.map((item: any, index: number) => ({ key: index, ...item }))}
                            columns={columns}
                            scroll={{ x: 'max-content' }}
                            pagination={{ pageSize: 50 }}
                        />,
                    },
                ]}
            />

        </div>
    );
};

export default AddPropertyFromExcel;