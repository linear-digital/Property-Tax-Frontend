/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Input, InputSelect, TextArea } from '../../global/InputFeilds';
import MapWithDraw from './BoundariesSelectormap';
import { Button, Card } from 'antd';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const AddRegion = () => {
    const [GeoJSON, setGeoJSON] = React.useState<any>("");
    return (
        <div className='my-5'>
            <div className="flex items-center justify-between mb-4">
                <h3 className='text-xl dark:text-white text-dark font-semibold '>
                    Add New Region
                </h3>
                <Link to={'/locations/regions'} className='text-primary'>
                    <FontAwesomeIcon icon={faArrowLeftLong} />    Back to Regions
                </Link>
            </div>
            <Card
            >
                <form action="" className='flex flex-col gap-y-4 mt-5'>
                    <Input label="Region Name" />
                    <Input label="Region Code" />
                    <InputSelect label="State"
                        options={[
                            { value: 'state1', label: 'State 1' },
                            { value: 'state2', label: 'State 2' },
                            { value: 'state3', label: 'State 3' },
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

export default AddRegion;