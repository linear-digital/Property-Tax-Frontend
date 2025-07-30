/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Input, InputSelect, TextArea } from '../../global/InputFeilds';
import MapWithDraw from './BoundariesSelectormap';
import { Button, Card } from 'antd';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const AddDistrict = () => {
    const [GeoJSON, setGeoJSON] = React.useState<any>("");
    return (
        <div className='my-5'>
            <div className="flex items-center justify-between mb-4">
                <h3 className='text-xl dark:text-white text-dark font-semibold '>
                    Add New District
                </h3>
                <Link to={'/locations/districts'} className='text-primary'>
                    <FontAwesomeIcon icon={faArrowLeftLong} />    Back to Districts
                </Link>
            </div>
            <Card
            >
                <form action="" className='flex flex-col gap-y-4 mt-5'>
                    <Input label="District Name" />
                    <Input label="District Code" />
                    <InputSelect label="Region"
                        options={[
                            { value: 'region1', label: 'Region 1' },
                            { value: 'region2', label: 'Region 2' },
                            { value: 'region3', label: 'Region 3' },
                        ]}
                    />
                    <TextArea label="Boundaries (GeoJSON)"
                        value={JSON.stringify(GeoJSON)}
                        onChange={(e: any) => setGeoJSON(e.target.value)}
                    />
                    {/* <Boundery /> */}
                    <MapWithDraw geoJson={GeoJSON} setGeoJson={setGeoJSON} />
                    <Button className='self-start' type='primary'>
                        Submit
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AddDistrict;