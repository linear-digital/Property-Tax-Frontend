/* eslint-disable @typescript-eslint/no-explicit-any */
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Input } from '../global/InputFeilds';
import permissions from '../../util/permissions';
import { Button, Checkbox } from 'antd';
import { fetcher } from '../../util/axios.instance';
import toast from 'react-hot-toast';
import { errorMessage } from '../../util/errorMessage';
import { useQuery } from '@tanstack/react-query';




const CreateRole = () => {
    const [checked, setChecked] = React.useState<string[]>([]);
    const [name, setName] = React.useState<string>('');
    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ['role', id],
        queryFn: async () => {
            const res = await fetcher({
                path: `/role/${id}`
            })
            return res
        },
        enabled: !!id
    })
    useEffect(() => {
        if (data) {
            setName(data.name || '')
            setChecked(data.permissions || [])
        }
    }, [data])
    const handleSelectAll = (e: any) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setChecked(permissions)
        }
        else {
            setChecked([])
        }
    };

    const handleCheckboxChange = (value: string) => {
        if (checked.includes(value)) {
            setChecked(checked.filter((item) => item !== value));
        } else {
            setChecked([...checked, value]);
        }
    };
    const navigate = useNavigate();
    const handleCreateRole = async () => {
        try {
            await fetcher({
                path: data ? `/role/${id}` : '/role/create',
                method: data ? 'PUT' : 'POST',
                body: {
                    name: name,
                    permissions: checked
                }
            });
            toast.success(`Role ${data ? 'updated' : 'created'} successfully`);
            navigate('/roles');
        } catch (error) {
            toast.error(errorMessage(error) || 'Something went wrong');
        }
    };

    return (
        <div className="my-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl dark:text-white text-dark font-semibold">Add New Role</h3>
                <Link to={'/roles'} className="text-primary">
                    <FontAwesomeIcon icon={faArrowLeftLong} /> Back to Roles
                </Link>
            </div>

            <form className="p-4 bg-white dark:bg-background-dark mt-5 rounded-lg">
                <Input label="Role Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="mt-5">
                    <Checkbox
                        onChange={handleSelectAll}
                        checked={permissions.length === checked.length}
                        indeterminate={checked.length > 0 && checked.length < permissions.length}
                    >
                        Select All
                    </Checkbox>

                </div>
                <div className="grid grid-cols-2 gap-2 mt-5">
                    {permissions.map((perm: string, index: number) => (
                        <Checkbox
                            key={index}
                            checked={checked.includes(perm)}
                            onChange={() => handleCheckboxChange(perm)}
                        >
                            {perm}
                        </Checkbox>
                    ))}
                </div>

                <Button
                    onClick={handleCreateRole}
                    type="primary" className="mt-5">
                    {data ? 'Update' : 'Create'} Role
                </Button>
            </form>
        </div>
    );
};

export default CreateRole;