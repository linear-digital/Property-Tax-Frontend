/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Input, InputSelect, Password } from '../global/InputFeilds';
import type { Role } from '../../types/role';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import type { User } from '../../types/user';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: () => void;
    tergetUser?: User
}

const CreateNewUser: React.FC<Props> = ({ open, setOpen, refetch, tergetUser }) => {
    const [info, setInfo] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        nid: '',
        state: '',
        region: '',
        district: '',
        village: '',
        branch: '',
        roles: [] as string[],
    });
    useEffect(() => {
        if (tergetUser) {
            setInfo({
                name: tergetUser.name,
                email: tergetUser.email,
                mobile: tergetUser.mobile,
                designation: tergetUser.designation,
                nid: tergetUser.nid,
                state: tergetUser.state,
                region: tergetUser.region,
                district: tergetUser.district,
                village: tergetUser.village,
                branch: tergetUser.branch,
                roles: tergetUser.roles.map(role => role._id),
            })
        }
    }, [tergetUser])
    const [password, setPassword] = useState({ password: '', confirmPassword: '' });
    const [roles, setRoles] = useState<Role[]>([]);
    const [message, setMessage] = useState({ error: '', success: '' });

    useEffect(() => {
        (async () => {
            try {
                const res = await fetcher({ path: '/role', method: 'GET' });
                setRoles(res);
            } catch (err: any) {
                console.error(err);
                toast.error('Failed to fetch roles');
            }
        })();
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSelectChange = useCallback((name: string, value: string | string[]) => {
        setInfo(prev => ({ ...prev, [name]: value }));
    }, []);

    const roleOptions = useMemo(
        () => roles.map(role => ({ value: role._id, label: role.name })),
        [roles]
    );

    const addressOptions = useMemo(() => [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ], []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.password !== password.confirmPassword) {
            return toast.error('Passwords do not match');
        }

        try {
            if (tergetUser) {
                await fetcher({
                path: `/user/${tergetUser._id}`,
                method: 'PUT',
                body: {
                    ...info
                },
            });
            }
            else {
                await fetcher({
                path: '/user/create',
                method: 'POST',
                body: {
                    ...info,
                    password: password.password,
                },
            });
            }
            refetch();
            toast.success('User created successfully');
            setMessage({ error: '', success: 'User created successfully' });
            setInfo({
                name: '',
                email: '',
                mobile: '',
                designation: '',
                nid: '',
                state: '',
                region: '',
                district: '',
                village: '',
                branch: '',
                roles: [],
            });
            setPassword({ password: '', confirmPassword: '' });
        } catch (err) {
            const msg = errorMessage(err);
            toast.error(msg);
            setMessage({ error: msg, success: '' });
        }
    };

    return (
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
            title="Create New User"
            width={1000}
            centered
        >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <Input label="Name" name="name" value={info.name} onChange={handleInputChange} required />
                <Input label="Email" name="email" type="email" value={info.email} onChange={handleInputChange} required />
                <Input label="Mobile Number" name="mobile" type="number" value={info.mobile} onChange={handleInputChange} required />
                <Input label="Designation" name="designation" value={info.designation} onChange={handleInputChange} required />
                <Input label="National ID" name="nid" value={info.nid} onChange={handleInputChange} required />

                <InputSelect
                    value={info.state}
                    label="State" name="state" options={addressOptions} onChange={val => handleSelectChange('state', val)} required />
                <InputSelect
                    value={info.region}
                    label="Region" name="region" options={addressOptions} onChange={val => handleSelectChange('region', val)} required />
                <InputSelect
                    value={info.district}
                    label="District" name="district" options={addressOptions} onChange={val => handleSelectChange('district', val)} required />
                <InputSelect
                    value={info.village}
                    label="Village" name="village" options={addressOptions} onChange={val => handleSelectChange('village', val)} required />
                <InputSelect
                    value={info.branch}
                    label="Branch" name="branch" options={addressOptions} onChange={val => handleSelectChange('branch', val)} required />

                {
                    !tergetUser && <>
                        <Password label="Password" value={password.password} onChange={e => setPassword(prev => ({ ...prev, password: e.target.value }))} required />
                        <Password label="Confirm Password" value={password.confirmPassword} onChange={e => setPassword(prev => ({ ...prev, confirmPassword: e.target.value }))} required />
                    </>
                }

                <div className="col-span-1 md:col-span-2">
                    <InputSelect
                        label="Roles"
                        name="roles"
                        mode="multiple"
                        options={roleOptions}
                        value={info.roles}
                        onChange={val => handleSelectChange('roles', val)}
                        required
                    />
                </div>

                {message.error && <p className="text-red-500 col-span-2">{message.error}</p>}
                {message.success && <p className="text-green-500 col-span-2">{message.success}</p>}

                <div className="col-span-2 text-right">
                    <Button type="primary" size="large" htmlType="submit">{tergetUser ? 'Update' : 'Create'} User</Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateNewUser;