/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Tag } from 'antd';
import React from 'react';
import type { User } from '../../types/user';

const ViewUser = ({ user, open, setOpen }: { user: User, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    if (!user) {
        return null
    }
    return (
        <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={1000}
            title={"User Details"}
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
        </Modal>
    );
};

export default ViewUser;