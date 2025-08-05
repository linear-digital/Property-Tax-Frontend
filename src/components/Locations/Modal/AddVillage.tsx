/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Input, InputSelect, TextArea } from '../../global/InputFeilds';
import MapWithDraw from './BoundariesSelectormap';
import { Button, Card, Spin } from 'antd';
import { Link, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { errorMessage } from '../../../util/errorMessage';
import { fetcher } from '../../../util/axios.instance';
import { useQuery } from '@tanstack/react-query';

const AddVillage = () => {
    const [GeoJSON, setGeoJSON] = React.useState<any>("");
    const [name, setName] = React.useState<string>("");
    const [code, setCode] = React.useState<string>("");
    const [region, setRegion] = React.useState<string>("");
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['village', id],
        queryFn: async () => {
            const res = await fetcher({
                path: `/location/village/${id}`
            })
            return res
        },
        enabled: !!id
    })
    const { data: districts = [] } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await fetcher({
                path: `/location/district`
            })
            return res
        },
    });
    useEffect(() => {
        if (data) {
            setName(data.name || '')
            setCode(data.code || '')
            setGeoJSON(data.boundaries || '')
            setRegion(data.district || '')
        }
    }, [data])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!GeoJSON) {
                return toast.error('Please select boundry')
            }
            await fetcher({
                path: data ? `/location/village/${id}` : '/location/village',
                method: data ? 'PUT' : 'POST',
                body: {
                    name,
                    code,
                    boundaries: GeoJSON,
                    district: region
                }
            });
            if (!data) {
                setGeoJSON('')
                setName('')
                setCode('')
                setRegion('')
            }
            toast.success(`Village ${data ? 'updated' : 'created'} successfully`);
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
                    {data ? 'Update' : 'Add New'} Village
                </h3>
                <Link to={'/locations/villages'} className='text-primary'>
                    <FontAwesomeIcon icon={faArrowLeftLong} />    Back to Villages
                </Link>
            </div>
            <Card
            >
                <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 mt-5'>
                    <Input label="Village Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input label="Village Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <InputSelect label="District"
                        value={region}
                        onChange={(e) => setRegion(e)}
                        options={districts.map((district: any) => ({
                            value: district.name,
                            label: district.name
                        }))}
                    />
                    <TextArea label="Boundaries (GeoJSON)"
                        value={JSON.stringify(GeoJSON)}
                        onChange={(e: any) => setGeoJSON(e.target.value)}
                    />
                    {/* <Boundery /> */}
                    <MapWithDraw geoJson={GeoJSON} setGeoJson={setGeoJSON} />
                    <Button htmlType='submit' className='self-start' type='primary'>
                        {
                            data ? "Update" : "Create"
                        }
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AddVillage;