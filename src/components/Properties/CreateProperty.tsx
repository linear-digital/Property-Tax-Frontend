/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

import SelectorMap from "./SelectorMap";
import { Button } from "antd";
import { Input, InputSelect } from "../global/InputFeilds";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../util/axios.instance";
import type { Property } from "../../types/property";
import { useLocation } from "../../contexts/LocationContext";
import { useFindBranch, useFindDistrict, useFindRegion, useFindVillage } from "../../hooks/locationhooks";
import toast from "react-hot-toast";
import { errorMessage } from "../../util/errorMessage";

const CreateProperty = () => {
    const { id } = useParams();
    const [data, setData] = React.useState<Property>({
        // Location Information
        state: "",
        region: "",
        district: "",
        village: "",
        zone: "",
        branch: "",

        // Coordinates
        coordinates: "",
        latitude: 0,
        longitude: 0,
        altitude: 0,
        precision: 0,

        // Property Identification
        code: "",
        street_name: "",
        property_type: "",
        property_status: "",
        others: "",

        // Property Directions
        property_direction_north: "",
        property_direction_south: "",
        property_direction_west: "",
        property_direction_east: "",
        property_direction: "",

        // Property Characteristics
        property_width: 0,
        property_length: 0,
        property_size_sm2: 0,
        house_building_details: "",
        type_of_villa: "",
        villas: 0,

        // Address Information
        property_address: "",
        landmark: "",

        // Media
        plot_picture: "",
        plot_picture_url: "",

        // Occupant Information
        occupant_details: "",

        // Owner Information
        owner_name: "",
        owner_gender: "",
        owner_age: 0,
        owner_nid: "",
        owner_phone: "",
        owner_email: "",
        owner_address: "",
        owner_income_source: "",

        // System Fields
        createdAt: undefined,
        updatedAt: undefined,
        _id: undefined
    });

    const handleChange = (field: keyof Property, value: any) => {
        setData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const propertyTypeOptions = [
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Agricultural', label: 'Agricultural' },
        { value: 'Mixed Use', label: 'Mixed Use' },
        { value: 'Residential', label: 'Residential' },
        { value: 'Other', label: 'Other' }
    ];

    const propertyStatusOptions = [
        { value: 'Leased', label: 'Leased' },
        { value: 'Owned', label: 'Owned' },
        { value: 'Rented', label: 'Rented' },
        { value: 'Vacant', label: 'Vacant' },
    ];

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' }
    ];

    const { data: propertyData, isLoading, refetch } = useQuery({
        queryKey: ['Property', id],
        queryFn: async () => {
            const res = await fetcher({
                path: `/property/${id}`
            });
            return res.data as Property;
        },
        enabled: !!id,
        // onSuccess: (data: any) => {
        //     setData(data);
        //     setLatLong({
        //         lat: data.latitude || 4.31925300,
        //         lng: data.longitude || 45.44315300
        //     });
        // }
    });
    useEffect(() => {
        if (propertyData) {
            setData(propertyData);
            setLatLong({
                lat: propertyData.latitude || 4.31925300,
                lng: propertyData.longitude || 45.44315300
            });
        }
    }, [propertyData])
    const [latLong, setLatLong] = React.useState({
        lat: 4.31925300,
        lng: 45.44315300
    });

    const { states } = useLocation();
    const regions = useFindRegion({ query: data.state });
    const districts = useFindDistrict({ query: data.region });
    const villages = useFindVillage({ query: data.district });
    const branches = useFindBranch({ query: data.village });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Update coordinates before submission
        const updatedData = {
            ...data,
            latitude: latLong.lat,
            longitude: latLong.lng,
            coordinates: `${latLong.lat} ${latLong.lng}`
        };

        try {
            // if (!updatedData.state ||
            //     !updatedData.region ||
            //     !updatedData.district ||
            //     !updatedData.village ||
            //     !updatedData.zone ||
            //     !updatedData.branch ||
            //     !updatedData.coordinates ||
            //     !updatedData.latitude ||
            //     !updatedData.longitude ||
            //     !updatedData.code
            // ) {
            //     return toast.error('Please fill all required fields');
            // }
            if (id) {
                await fetcher({
                    path: `/property/${id}`,
                    method: 'PUT',
                    body: updatedData
                });
                refetch();
                toast.success('Property updated successfully');
            } else {
                await fetcher({
                    path: '/property',
                    method: 'POST',
                    body: updatedData
                });
                toast.success('Property updated successfully');
            }
        } catch (error) {
            toast.error(errorMessage(error));
        }

    };

    if (isLoading && id) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="default-container p-4 mt-4">
                <h4 className="text-lg">{id ? 'Edit' : 'New'} Taxable Property</h4>
                <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-x-4 gap-y-3 mt-4">
                    {/* Location Information */}
                    <InputSelect
                        label="State"
                        value={data.state}
                        onChange={(value) => handleChange('state', value)}
                        options={states.map((state: any) => ({
                            value: state.name,
                            label: state.name
                        }))}
                    />
                    <InputSelect
                        label="Region"
                        value={data.region}
                        onChange={(value) => handleChange('region', value)}
                        options={regions.map((region: any) => ({
                            value: region.name,
                            label: region.name
                        }))}
                    />
                    <InputSelect
                        label="District"
                        value={data.district}
                        onChange={(value) => handleChange('district', value)}
                        options={districts.map((district: any) => ({
                            value: district.name,
                            label: district.name
                        }))}
                    />
                    <InputSelect
                        label="Village"
                        value={data.village}
                        onChange={(value) => handleChange('village', value)}
                        options={villages.map((village: any) => ({
                            value: village.name,
                            label: village.name
                        }))}
                    />
                    <InputSelect
                        label="Branch"
                        value={data.branch}
                        onChange={(value) => handleChange('branch', value)}
                        options={branches.map((branch: any) => ({
                            value: branch.name,
                            label: branch.name
                        }))}
                    />

                    {/* Property Identification */}
                    <Input
                        label="Property Code"
                        value={data.code}
                        onChange={(e) => handleChange('code', e.target.value)}
                    />
                    <Input
                        label="Street Name"
                        value={data.street_name}
                        onChange={(e) => handleChange('street_name', e.target.value)}
                    />

                    {/* Coordinates */}
                    <Input
                        type="number"
                        value={latLong.lat}
                        label="Latitude"
                        onChange={(e) => setLatLong({ ...latLong, lat: parseFloat(e.target.value) })}
                    />
                    <Input
                        type="number"
                        value={latLong.lng}
                        label="Longitude"
                        onChange={(e) => setLatLong({ ...latLong, lng: parseFloat(e.target.value) })}
                    />
                    <div className="col-span-2 mt-4">
                        <SelectorMap
                            latLong={[latLong.lat, latLong.lng]}
                            setLatLong={(latLong) => {
                                setLatLong({
                                    lat: latLong[0],
                                    lng: latLong[1]
                                });
                            }}
                        />
                    </div>

                    {/* Property Details */}
                    <InputSelect
                        label="Property Type"
                        value={data.property_type}
                        onChange={(value) => handleChange('property_type', value)}
                        options={propertyTypeOptions}
                    />
                    <InputSelect
                        label="Property Status"
                        value={data.property_status}
                        onChange={(value) => handleChange('property_status', value)}
                        options={propertyStatusOptions}
                    />

                    <Input
                        type="number"
                        label="Property Width"
                        value={data.property_width || ''}
                        onChange={(e) => handleChange('property_width', parseFloat(e.target.value))}
                    />
                    <Input
                        type="number"
                        label="Property Length"
                        value={data.property_length || ''}
                        onChange={(e) => handleChange('property_length', parseFloat(e.target.value))}
                    />
                    <Input
                        type="number"
                        label="Property Size (SM²)"
                        value={data.property_size_sm2 || ''}
                        onChange={(e) => handleChange('property_size_sm2', parseFloat(e.target.value))}
                    />
                    {/* Property Characteristics */}
                    <Input
                        label="House/Building Details"
                        value={data.house_building_details}
                        onChange={(e) => handleChange('house_building_details', e.target.value)}
                    />
                    <Input
                        label="Type of Villa"
                        value={data.type_of_villa}
                        onChange={(e) => handleChange('type_of_villa', e.target.value)}
                    />
                    <Input
                        type="number"
                        label="Villas/Stores"
                        value={data.villas || ''}
                        onChange={(e) => handleChange('villas', parseInt(e.target.value))}
                    />

                    {/* Address Information */}
                    <Input
                        label="Property Address"
                        value={data.property_address}
                        onChange={(e) => handleChange('property_address', e.target.value)}
                    />
                    <Input
                        label="Landmark or Nearby Features"
                        value={data.landmark}
                        onChange={(e) => handleChange('landmark', e.target.value)}
                    />

                    {/* Occupant Information */}
                    <InputSelect
                        label="Occupant Details"
                        value={data.occupant_details}
                        onChange={(value) => handleChange('occupant_details', value)}
                        options={[
                            { value: 'Owner', label: 'Owner Occupied' },
                            { value: 'Tenant', label: 'Tenant Occupied' },
                        ]}
                    />

                    {/* Owner Information */}
                    <Input
                        label="Owner Full Name"
                        value={data.owner_name}
                        onChange={(e) => handleChange('owner_name', e.target.value)}
                    />
                    <InputSelect
                        label="Gender"
                        value={data.owner_gender}
                        onChange={(value) => handleChange('owner_gender', value)}
                        options={genderOptions}
                    />
                    <Input
                        label="Age"
                        type="number"
                        value={data.owner_age || ''}
                        onChange={(e) => handleChange('owner_age', parseInt(e.target.value))}
                    />
                    <Input
                        label="National ID/Passport Number"
                        value={data.owner_nid}
                        onChange={(e) => handleChange('owner_nid', e.target.value)}
                    />
                    <Input
                        label="Contact Number"
                        value={data.owner_phone}
                        onChange={(e) => handleChange('owner_phone', e.target.value)}
                    />
                    <Input
                        label="Email Address"
                        type="string"
                        value={data.owner_email}
                        onChange={(e) => handleChange('owner_email', e.target.value)}
                    />
                    <Input
                        label="Owner Address"
                        value={data.owner_address}
                        onChange={(e) => handleChange('owner_address', e.target.value)}
                    />
                    <InputSelect
                        label="Primary Source of Income"
                        value={data.owner_income_source}
                        onChange={(value) => handleChange('owner_income_source', value)}
                        options={[
                            { value: 'Business', label: 'Business' },
                            { value: 'Employment', label: 'Employment' },
                            { value: 'Other', label: 'Other' }
                        ]}
                    />

                    <div className="col-span-2">
                        <Button type="primary" size="large" htmlType="submit">
                            {id ? 'Update' : 'Submit'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProperty;