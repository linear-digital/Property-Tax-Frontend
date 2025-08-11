/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Spin, Tag } from 'antd';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { fetcher } from '../../util/axios.instance';

const ViewUser = () => {
    const { id } = useParams();
    const { data: user } = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const res = await fetcher({
                path: `/user/single/${id}`,
            })
            return res
        },
        enabled: !!id
    });
    if (!user) {
        return <Spin fullscreen />
    }
    return (
        <div className='mt-5'>
            <Card
            title={user.name}
            
        >
            <ul>
                <li>
                    <span className='font-semibold'>Name:</span> {user.name}
                </li>
                <li>
                    <span className='font-semibold'>Email:</span> {user.email}
                </li>
                <li>
                    <span className='font-semibold'>Phone:</span> {user.mobile}
                </li>
                <li>
                    <span className='font-semibold'>Designation:</span> {user.designation}
                </li>

                <li>
                    <span className='font-semibold'>Role:</span> {user.roles.map((role: any) => <Tag key={role._id}>{role.name}</Tag>)}
                </li>
            </ul>
        </Card>
        </div>
    );
};

export default ViewUser;