/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Input, TextArea } from '../../global/InputFeilds';
import MapWithDraw from './BoundariesSelectormap';
import { Button, Card, Spin } from 'antd';
import { Link, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { fetcher } from '../../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../../util/errorMessage';
import { useQuery } from '@tanstack/react-query';

const AddState = () => {
    const [GeoJSON, setGeoJSON] = React.useState<any>("");
    const [name, setName] = React.useState<string>("");
    const [code, setCode] = React.useState<string>("");
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['state', id],
        queryFn: async () => {
            const res = await fetcher({
                path: `/location/state/${id}`
            })
            return res
        },
        enabled: !!id
    })
    useEffect(() => {
        if (data) {
            setName(data.name || '')
            setCode(data.code || '')
            setGeoJSON(data.boundaries || '')
        }
    }, [data])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!GeoJSON) {
                return toast.error('Please select boundry')
            }
            await fetcher({
                path: data ? `/location/state/${id}` : '/location/state',
                method: data ? 'PUT' : 'POST',
                body: {
                    name,
                    code,
                    boundaries: GeoJSON
                }
            });
            if (!data) {
                // clear all
                setGeoJSON('')
                setName('')
                setCode('')
            }
           toast.success(`State ${data ? 'updated' : 'created'} successfully`);
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
                    {data ? 'Edit' : 'Add New'} State
                </h3>
                <Link to={'/locations/states'} className='text-primary'>
                    <FontAwesomeIcon icon={faArrowLeftLong} />    Back to States
                </Link>
            </div>
            <Card
            >
                <form className='flex flex-col gap-y-4 mt-5'
                    onSubmit={handleSubmit}
                >
                    <Input label="State Name"
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        required
                    />
                    <Input label="State Code"
                        value={code}
                        onChange={(e: any) => setCode(e.target.value)}
                        required
                    />
                    <TextArea label="Boundaries (GeoJSON)"
                        value={JSON.stringify(GeoJSON)}
                        onChange={(e: any) => setGeoJSON(e.target.value)}
                    />
                    {/* <Boundery /> */}
                    <MapWithDraw geoJson={GeoJSON} setGeoJson={setGeoJSON} />
                    <Button className='self-start' htmlType='submit' type='primary'>
                        Submit
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AddState;