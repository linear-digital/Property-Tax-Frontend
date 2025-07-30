/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import SelectorMap from "./SelectorMap";
import { Button } from "antd";
import { Input, InputSelect } from "../global/InputFeilds";



const CreateProperty = () => {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4' }
    ]
    const [latLong, setLatLong] = React.useState({
        lat: 4.31925300,
        lng: 45.44315300
    });
    return (
        <div>
            <div className="default-container p-4 mt-4">
                <h4 className="text-lg">New Taxable Property</h4>
                <form action="" className="grid lg:grid-cols-2 gap-x-4 gap-y-3 mt-4">
                    <InputSelect
                        label="State"
                        options={options}
                    />
                    <InputSelect
                        label="State"
                        options={options}
                    />
                    <InputSelect
                        label="District"
                        options={options}
                    />
                    <InputSelect
                        label="Village"
                        options={options}
                    />
                    <InputSelect
                        label="Branch"
                        options={options}
                    />
                    <Input
                        label="Property Code"
                    />
                    <Input
                        label="Village Code"
                    />
                    <div className="hidden lg:block"></div>
                    <Input
                        type="number"
                        value={latLong.lat}
                        label="Latitude"
                        onChange={(e: any) => setLatLong({ ...latLong, lat: parseFloat(e.target.value) })}
                    />
                    <Input
                        type="number"
                        value={latLong.lng}
                        label="Longitude"
                        onChange={(e: any) => setLatLong({ ...latLong, lng: parseFloat(e.target.value) })}
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
                    <Input
                        label="Street Name"
                    />
                    <Input
                        label="Property Type"
                    />

                    <InputSelect
                        label="Property Status"
                        options={options}
                    />
                    <Input
                        defaultValue={1}
                        type="number"
                        label="Property Direction"
                    />
                    <Input
                        type="number"
                        label="Property Size (Width)"
                    />
                    <Input
                        type="number"
                        label="Property Size (Length)"
                    />
                    <Input
                        type="number"
                        label="Property Size (SM2)"
                    />

                    <InputSelect
                        label="House/Building Details"
                        options={options}
                    />
                    <Input
                        type="number"
                        label="Villas/Stores"
                    />
                    <Input
                        label="Property Address"
                    />
                    <Input
                        label="Landmark or Nearby Features"
                    />
                    <InputSelect
                        label="Occupant Details"
                        options={options}
                    />

                    <Input
                        label="Owner Full Name"
                    />

                    <InputSelect
                        label="Gender"
                        options={options}
                    />

                    <Input
                        label="Age"
                        type="number"
                    />
                    <Input
                        label="National ID/ Passport Number"
                    />
                    <Input
                        label="Contact Number"
                    />
                    <InputSelect
                        label="Primary Source of Income"
                        options={options}
                    />
                    <div>
                        <Button type="primary" size="large" >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default CreateProperty;