/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Input, InputSelect, TextArea } from '../../global/InputFeilds';
import MapWithDraw from './BoundariesSelectormap';
import { Button, Card, Spin } from 'antd';
import { Link, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../../util/errorMessage';

const AddRegion = () => {
    const [GeoJSON, setGeoJSON] = React.useState<any>("");
    const [name, setName] = React.useState<string>("");
    const [code, setCode] = React.useState<string>("");
    const [state, setState] = React.useState<string>("");
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['region', id],
        queryFn: async () => {
            const res = await fetcher({
                path: `/location/region/${id}`
            })
            return res
        },
        enabled: !!id
    })
    const { data: states = [] } = useQuery({
        queryKey: ['states-all'],
        queryFn: async () => {
            const res = await fetcher({
                path: `/location/state`
            })
            return res
        },
    });
    useEffect(() => {
        if (data) {
            setName(data.name || '')
            setCode(data.code || '')
            setGeoJSON(data.boundaries || '')
            setState(data.state || '')
        }
    }, [data])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!GeoJSON) {
                return toast.error('Please select boundry')
            }
            await fetcher({
                path: data ? `/location/region/${id}` : '/location/region',
                method: data ? 'PUT' : 'POST',
                body: {
                    name,
                    code,
                    boundaries: GeoJSON,
                    state
                }
            });
            // clear all
            if (!data) {
                setGeoJSON('')
                setName('')
                setCode('')
                setState('')
            }
             toast.success(`Region ${data ? 'updated' : 'created'} successfully`);
        } catch (error) {
            toast.error(errorMessage(error))
        }
    }
    if (isLoading) {
        return <Spin fullscreen />
    }
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
                <form action="" className='flex flex-col gap-y-4 mt-5'
                    onSubmit={handleSubmit}
                >
                    <Input label="Region Name"
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                    />
                    <Input label="Region Code"
                        value={code}
                        onChange={(e: any) => setCode(e.target.value)}
                    />
                    <InputSelect
                        value={state}
                        onChange={(e) => setState(e)}
                        label="State"
                        options={states.map((state: any) => ({ value: state.name, label: state.name }))}
                    />
                    <TextArea label="Boundaries (GeoJSON)"
                        value={JSON.stringify(GeoJSON)}
                        onChange={(e: any) => setGeoJSON(e.target.value)}
                    />
                    {/* <Boundery /> */}
                    <MapWithDraw geoJson={GeoJSON} setGeoJson={setGeoJSON} />
                    <Button htmlType='submit' className='self-start' type='primary'>
                        Submit
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AddRegion;